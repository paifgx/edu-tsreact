import { useCallback, useEffect, useState } from 'react';
import type { Incident } from '../data/incidents';
import { readHttpErrorMessage } from '../lib/readHttpErrorMessage';

/**
 * Discriminated load state — branch on `state.status` in the UI so TypeScript
 * narrows (e.g. `state.data` exists only when status is `success`).
 */
export type UseIncidentsState =
  | { status: 'loading' }
  | { status: 'success'; data: Incident[] }
  | { status: 'error'; message: string };

export type UseIncidentsResult = {
  state: UseIncidentsState;
  /** Reloads data; the previous in-flight request is aborted (no stale updates). */
  refetch: () => void;
};

/** Fetches `/api/incidents` — keep list loading logic here, not in page components. */
export function useIncidents(): UseIncidentsResult {
  const [state, setState] = useState<UseIncidentsState>({ status: 'loading' });
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = useCallback(() => {
    setState({ status: 'loading' });
    setRefetchKey((key) => key + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch('/api/incidents', {
          signal: controller.signal,
        });

        if (!response.ok) {
          const message = await readHttpErrorMessage(response);
          throw new Error(message);
        }

        const data: Incident[] = await response.json();
        if (controller.signal.aborted) return;
        setState({ status: 'success', data });
      } catch (err) {
        if (controller.signal.aborted) return;
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const message =
          err instanceof Error ? err.message : 'Unknown error while loading incidents.';
        setState({ status: 'error', message });
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, [refetchKey]);

  return { state, refetch };
}

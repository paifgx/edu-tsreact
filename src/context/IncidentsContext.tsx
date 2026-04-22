/* @refresh reset — provider + hook in one module (same pattern as ThemeContext). */
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Incident } from '../data/incidents';
import { readHttpErrorMessage } from '../lib/readHttpErrorMessage';

export type UseIncidentsState =
  | { status: 'loading' }
  | { status: 'success'; data: Incident[] }
  | { status: 'error'; message: string };

export type UseIncidentsResult = {
  state: UseIncidentsState;
  refetch: () => void;
  /** Merge one incident into the cached list (e.g. after PATCH assignee on the detail page). */
  upsertIncident: (incident: Incident) => void;
};

const IncidentsContext = createContext<UseIncidentsResult | null>(null);

export function IncidentsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UseIncidentsState>({ status: 'loading' });
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = useCallback(() => {
    setState({ status: 'loading' });
    setRefetchKey((key) => key + 1);
  }, []);

  const upsertIncident = useCallback((incident: Incident) => {
    setState((prev) => {
      if (prev.status !== 'success') return prev;
      const next = prev.data.map((row) =>
        row.id === incident.id ? incident : row,
      );
      return { status: 'success', data: next };
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch('/api/incidents', {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(await readHttpErrorMessage(response));
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

  const value = useMemo<UseIncidentsResult>(
    () => ({
      state,
      refetch,
      upsertIncident,
    }),
    [state, refetch, upsertIncident],
  );

  return (
    <IncidentsContext.Provider value={value}>{children}</IncidentsContext.Provider>
  );
}

export function useIncidents(): UseIncidentsResult {
  const ctx = useContext(IncidentsContext);
  if (!ctx) {
    throw new Error(
      'useIncidents must be used within an IncidentsProvider — wrap routes in App.tsx.',
    );
  }
  return ctx;
}

import { useCallback, useEffect, useState } from 'react';
import type { Incident } from '../data/incidents';

const INCIDENTS_URL = '/api/incidents';

function isIncidentArray(value: unknown): value is Incident[] {
  return Array.isArray(value);
}

async function parseIncidentsResponse(res: Response): Promise<Incident[]> {
  const contentType = res.headers.get('content-type') ?? '';
  const raw =
    contentType.includes('application/json') ? await res.json() : await res.text();

  if (!isIncidentArray(raw)) {
    throw new Error('Unexpected response shape from /api/incidents.');
  }

  return raw;
}

export interface UseIncidentsResult {
  /** Last successfully loaded list (empty array before first success). */
  incidents: Incident[];
  /** First load: no data yet and a request is in flight. */
  isInitialLoading: boolean;
  /** Any request in flight (initial load, retry, or manual refresh). */
  isFetching: boolean;
  fetchError: string | null;
  /** Re-run fetch (retry after error or manual refresh). Uses the same effect path as mount. */
  refetch: () => void;
}

/**
 * Loads incidents from the mock API with explicit loading / error handling and AbortController cleanup.
 *
 * Stretch: we keep showing the last successful list while a retry or refresh is in flight so the UI
 * stays usable; the error banner and `isFetching` communicate that data may be stale.
 *
 * Expert note — TanStack Query / SWR would centralize this pattern: cached `data`, `error`,
 * `isLoading` vs `isFetching`, deduped requests, `staleTime`, background refetch, and built-in
 * focus/reconnect refetch — without hand-rolling a version counter + effect for each resource.
 *
 * Why not fetch in render? Calling `fetch` directly during render kicks off a side effect during
 * render (network I/O), repeats on every render unless guarded, and updates async without a clear
 * cancellation story — leading to race conditions, inconsistent UI, and warnings if state updates
 * fire after unmount.
 */
export function useIncidents(): UseIncidentsResult {
  const [data, setData] = useState<Incident[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [requestEpoch, setRequestEpoch] = useState(0);

  const refetch = useCallback(() => {
    setRequestEpoch((n) => n + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    void (async () => {
      setIsFetching(true);
      setFetchError(null);

      try {
        const res = await fetch(INCIDENTS_URL, { signal });

        if (!res.ok) {
          let message = `Request failed (${res.status}).`;
          try {
            const errBody = await res.json();
            if (errBody && typeof errBody === 'object' && 'message' in errBody) {
              const m = (errBody as { message?: unknown }).message;
              if (typeof m === 'string' && m.trim()) {
                message = m;
              }
            }
          } catch {
            /* non-JSON error body */
          }

          if (import.meta.env.DEV) {
            console.error('[useIncidents]', res.status, message);
          }

          if (!signal.aborted) {
            setFetchError(message);
          }
          return;
        }

        const incidents = await parseIncidentsResponse(res);

        if (!signal.aborted) {
          setData(incidents);
        }
      } catch (err) {
        if (signal.aborted || (err instanceof DOMException && err.name === 'AbortError')) {
          return;
        }

        const message = err instanceof Error ? err.message : 'Unknown error while loading incidents.';
        if (import.meta.env.DEV) {
          console.error('[useIncidents]', err);
        }

        if (!signal.aborted) {
          setFetchError(message);
        }
      } finally {
        if (!signal.aborted) {
          setIsFetching(false);
        }
      }
    })();

    return () => controller.abort();
  }, [requestEpoch]);

  const isInitialLoading = isFetching && data === null;

  return {
    incidents: data ?? [],
    isInitialLoading,
    isFetching,
    fetchError,
    refetch,
  };
}

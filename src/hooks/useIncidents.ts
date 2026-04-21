import { useCallback, useEffect, useState } from 'react';
import type { Incident } from '../data/incidents';

const INCIDENTS_URL = '/api/incidents';

/** Async state as a discriminated union: check `kind`, then TypeScript knows the other fields. */
export type AsyncState<T> =
  | { kind: 'idle' }
  | { kind: 'loading'; staleData?: T }
  | { kind: 'success'; data: T }
  | { kind: 'error'; error: string; staleData?: T };

function isIncidentArray(value: unknown): value is Incident[] {
  return Array.isArray(value);
}

function readHttpErrorMessage(res: Response): Promise<string> {
  return res
    .json()
    .then((body) => {
      if (body && typeof body === 'object' && 'message' in body) {
        const m = (body as { message?: unknown }).message;
        if (typeof m === 'string' && m.trim()) return m;
      }
      return `Request failed (${res.status}).`;
    })
    .catch(() => `Request failed (${res.status}).`);
}

function parseIncidentsFromResponse(res: Response): Promise<Incident[]> {
  const contentType = res.headers.get('content-type') ?? '';
  const rawPromise = contentType.includes('application/json') ? res.json() : res.text();

  return rawPromise.then((raw) => {
    if (!isIncidentArray(raw)) {
      throw new Error('Unexpected response shape from /api/incidents.');
    }
    return raw;
  });
}

function incidentsList(state: AsyncState<Incident[]>): Incident[] {
  switch (state.kind) {
    case 'success':
      return state.data;
    case 'loading':
      return state.staleData ?? [];
    case 'error':
      return state.staleData ?? [];
    case 'idle':
      return [];
    default: {
      const _never: never = state;
      return _never;
    }
  }
}

function nextLoadingState(prev: AsyncState<Incident[]>): AsyncState<Incident[]> {
  if (prev.kind === 'success') {
    return { kind: 'loading', staleData: prev.data };
  }
  if (prev.kind === 'error' && prev.staleData !== undefined) {
    return { kind: 'loading', staleData: prev.staleData };
  }
  if (prev.kind === 'loading') {
    return prev;
  }
  return { kind: 'loading' };
}

export interface UseIncidentsResult {
  state: AsyncState<Incident[]>;
  incidents: Incident[];
  isInitialLoading: boolean;
  isFetching: boolean;
  fetchError: string | null;
  refetch: () => void;
}

/** Loads incidents from `/api/incidents` with loading and error states. */
export function useIncidents(): UseIncidentsResult {
  const [state, setState] = useState<AsyncState<Incident[]>>({ kind: 'idle' });
  const [loadKey, setLoadKey] = useState(0);

  const refetch = useCallback(() => {
    setLoadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let ignore = false;

    setState((prev) => nextLoadingState(prev));

    fetch(INCIDENTS_URL)
      .then((res) => {
        if (res.ok) {
          return res;
        }
        return readHttpErrorMessage(res).then((message) => {
          throw new Error(message);
        });
      })
      .then((res) => parseIncidentsFromResponse(res))
      .then((data) => {
        if (ignore) return;
        setState({ kind: 'success', data });
      })
      .catch((err) => {
        if (ignore) return;
        if (import.meta.env.DEV) {
          console.error('[useIncidents]', err);
        }
        const message =
          err instanceof Error ? err.message : 'Unknown error while loading incidents.';
        setState((prev) => {
          if (prev.kind !== 'loading') {
            return prev;
          }
          if (prev.staleData !== undefined) {
            return { kind: 'error', error: message, staleData: prev.staleData };
          }
          return { kind: 'error', error: message };
        });
      });

    return () => {
      ignore = true;
    };
  }, [loadKey]);

  return {
    state,
    refetch,
    incidents: incidentsList(state),
    isInitialLoading: state.kind === 'loading' && state.staleData === undefined,
    isFetching: state.kind === 'loading',
    fetchError: state.kind === 'error' ? state.error : null,
  };
}

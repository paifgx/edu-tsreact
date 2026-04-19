import type { Incident } from '../data/incidents';

export type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export function useIncidents(): FetchState<Incident[]> {
  return { status: 'idle' };
}


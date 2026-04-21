import { useEffect, useState } from 'react';
import type { Incident } from '../data/incidents';
import { readHttpErrorMessage } from '../lib/readHttpErrorMessage';

export interface UseIncidentByIdResult {
  incident: Incident | null;
  isLoading: boolean;
  error: string | null;
}

/** Loads a single incident from `/api/incidents/:id`. */
export function useIncidentById(id: string): UseIncidentByIdResult {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);
    setIncident(null);

    async function load() {
      try {
        const response = await fetch(`/api/incidents/${id}`);

        if (!response.ok) {
          const message = await readHttpErrorMessage(response);
          throw new Error(message);
        }

        const data: Incident = await response.json();
        if (cancelled) return;
        setIncident(data);
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : 'Unknown error while loading incident.';
        setError(message);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { incident, isLoading, error };
}

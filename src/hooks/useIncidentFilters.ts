import { useCallback, useMemo } from 'react';
import type { Severity, Status } from '../data/incidents';
import {
  ASSIGNEE_FILTER_UNASSIGNED,
  DEFAULT_INCIDENT_FILTERS,
  normalizeStoredFilters,
  type IncidentFilters,
} from '../lib/incidentFilters';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'incident-dashboard-filters-v1';

export type { IncidentFilters };

export function useIncidentFilters() {
  const [stored, setStored] = useLocalStorage<IncidentFilters>(
    STORAGE_KEY,
    DEFAULT_INCIDENT_FILTERS,
  );

  const filters = useMemo(() => normalizeStoredFilters(stored), [stored]);

  const update = useCallback(
    (patch: Partial<IncidentFilters>) => {
      setStored((prev) => ({
        ...normalizeStoredFilters(prev),
        ...patch,
      }));
    },
    [setStored],
  );

  const reset = useCallback(() => {
    setStored(DEFAULT_INCIDENT_FILTERS);
  }, [setStored]);

  const toggleStatus = useCallback(
    (status: Status) => {
      setStored((prev) => {
        const base = normalizeStoredFilters(prev);
        const has = base.statuses.includes(status);
        const statuses = has
          ? base.statuses.filter((s) => s !== status)
          : [...base.statuses, status];
        return { ...base, statuses };
      });
    },
    [setStored],
  );

  const toggleSeverity = useCallback(
    (severity: Severity) => {
      setStored((prev) => {
        const base = normalizeStoredFilters(prev);
        const has = base.severities.includes(severity);
        const severities = has
          ? base.severities.filter((s) => s !== severity)
          : [...base.severities, severity];
        return { ...base, severities };
      });
    },
    [setStored],
  );

  return {
    filters,
    update,
    reset,
    toggleStatus,
    toggleSeverity,
    assigneeUnassignedValue: ASSIGNEE_FILTER_UNASSIGNED,
  };
}

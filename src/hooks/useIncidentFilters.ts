import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Severity, Status } from '../data/incidents';
import {
  ASSIGNEE_FILTER_UNASSIGNED,
  DEFAULT_INCIDENT_FILTERS,
  normalizeStoredFilters,
  type IncidentFilters,
} from '../lib/incidentFilters';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'incident-dashboard-filters-v1';

const URL_STATUS_KEY = 'status';
const URL_SEVERITY_KEY = 'severity';
const URL_ASSIGNEE_KEY = 'assignee';

export type { IncidentFilters };

/**
 * Read filters from `?status=...&severity=...&assignee=...`. Returns `null`
 * when none of the filter params are present, so the caller can fall back to
 * local storage without losing the user's last session when navigating to
 * `/incidents` without any query string.
 */
function filtersFromSearchParams(params: URLSearchParams): IncidentFilters | null {
  const hasAny =
    params.has(URL_STATUS_KEY) ||
    params.has(URL_SEVERITY_KEY) ||
    params.has(URL_ASSIGNEE_KEY);
  if (!hasAny) return null;

  const statuses = (params.get(URL_STATUS_KEY) ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const severities = (params.get(URL_SEVERITY_KEY) ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const assignee = params.get(URL_ASSIGNEE_KEY);

  return normalizeStoredFilters({
    statuses,
    severities,
    assigneeUserId: assignee,
  });
}

function writeFiltersToSearchParams(
  filters: IncidentFilters,
  current: URLSearchParams,
): URLSearchParams {
  const next = new URLSearchParams(current);
  next.delete(URL_STATUS_KEY);
  next.delete(URL_SEVERITY_KEY);
  next.delete(URL_ASSIGNEE_KEY);

  if (filters.statuses.length > 0) {
    next.set(URL_STATUS_KEY, filters.statuses.join(','));
  }
  if (filters.severities.length > 0) {
    next.set(URL_SEVERITY_KEY, filters.severities.join(','));
  }
  if (filters.assigneeUserId !== null) {
    next.set(URL_ASSIGNEE_KEY, filters.assigneeUserId);
  }
  return next;
}

/**
 * Filter state for the incident list.
 *
 * Source of truth order:
 *   1. URL search params (if any filter params are present) — shareable.
 *   2. Local storage fallback — recovers the last session when the user
 *      opens `/incidents` without a query string.
 *   3. `DEFAULT_INCIDENT_FILTERS`.
 *
 * Any user action updates **both** the URL (`replace: true`, so the back
 * button does not fill up with every checkbox click) and local storage.
 */
export function useIncidentFilters() {
  const [stored, setStored] = useLocalStorage<IncidentFilters>(
    STORAGE_KEY,
    DEFAULT_INCIDENT_FILTERS,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const fromUrl = filtersFromSearchParams(searchParams);
    return fromUrl ?? normalizeStoredFilters(stored);
  }, [searchParams, stored]);

  const commit = useCallback(
    (next: IncidentFilters) => {
      setStored(next);
      setSearchParams(
        (current) => writeFiltersToSearchParams(next, current),
        { replace: true },
      );
    },
    [setStored, setSearchParams],
  );

  const update = useCallback(
    (patch: Partial<IncidentFilters>) => {
      commit({ ...filters, ...patch });
    },
    [commit, filters],
  );

  const reset = useCallback(() => {
    commit(DEFAULT_INCIDENT_FILTERS);
  }, [commit]);

  const toggleStatus = useCallback(
    (status: Status) => {
      const has = filters.statuses.includes(status);
      const statuses = has
        ? filters.statuses.filter((s) => s !== status)
        : [...filters.statuses, status];
      commit({ ...filters, statuses });
    },
    [commit, filters],
  );

  const toggleSeverity = useCallback(
    (severity: Severity) => {
      const has = filters.severities.includes(severity);
      const severities = has
        ? filters.severities.filter((s) => s !== severity)
        : [...filters.severities, severity];
      commit({ ...filters, severities });
    },
    [commit, filters],
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

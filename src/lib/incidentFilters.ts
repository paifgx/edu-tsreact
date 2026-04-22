import {
  SEVERITIES,
  STATUSES,
  type Incident,
  type Severity,
  type Status,
} from '../data/incidents';

/** Sentinel value stored in JSON for “only unassigned incidents”. */
export const ASSIGNEE_FILTER_UNASSIGNED = '__unassigned__';

export interface IncidentFilters {
  /** Empty = no restriction (do not narrow to zero rows). */
  statuses: Status[];
  /** Empty = no restriction. */
  severities: Severity[];
  /**
   * `null` = any assignee (no filter on this dimension).
   * `ASSIGNEE_FILTER_UNASSIGNED` = incidents with no assignee only.
   * Otherwise a user id from `/api/users` / seed data.
   */
  assigneeUserId: string | null;
}

export const DEFAULT_INCIDENT_FILTERS: IncidentFilters = {
  statuses: [],
  severities: [],
  assigneeUserId: null,
};

function isStatus(value: unknown): value is Status {
  return typeof value === 'string' && (STATUSES as string[]).includes(value);
}

function isSeverity(value: unknown): value is Severity {
  return typeof value === 'string' && (SEVERITIES as string[]).includes(value);
}

/** Safe parse for values read from `localStorage` (migration / bad data). */
export function normalizeStoredFilters(raw: unknown): IncidentFilters {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ...DEFAULT_INCIDENT_FILTERS };
  }
  const o = raw as Record<string, unknown>;

  const statuses = Array.isArray(o.statuses)
    ? (o.statuses as unknown[]).filter(isStatus)
    : [];
  const severities = Array.isArray(o.severities)
    ? (o.severities as unknown[]).filter(isSeverity)
    : [];

  let assigneeUserId: string | null = null;
  if ('assigneeUserId' in o) {
    const v = o.assigneeUserId;
    if (v === null || v === undefined || v === '') {
      assigneeUserId = null;
    } else if (typeof v === 'string') {
      if (v === ASSIGNEE_FILTER_UNASSIGNED) {
        assigneeUserId = ASSIGNEE_FILTER_UNASSIGNED;
      } else if (v.length <= 64 && /^[\w-]+$/.test(v)) {
        assigneeUserId = v;
      }
    }
  }

  return { statuses, severities, assigneeUserId };
}

/** AND-combines dimension filters; empty multi-selects do not restrict. */
export function applyIncidentFilters(
  incidents: Incident[],
  filters: IncidentFilters,
): Incident[] {
  return incidents.filter((incident) => {
    if (filters.statuses.length > 0 && !filters.statuses.includes(incident.status)) {
      return false;
    }
    if (filters.severities.length > 0 && !filters.severities.includes(incident.severity)) {
      return false;
    }
    if (filters.assigneeUserId !== null) {
      if (filters.assigneeUserId === ASSIGNEE_FILTER_UNASSIGNED) {
        if (incident.assignee !== null) return false;
      } else if (incident.assignee?.id !== filters.assigneeUserId) {
        return false;
      }
    }
    return true;
  });
}

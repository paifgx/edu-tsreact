import type { Severity, Status } from '../data/incidents';

export interface IncidentFilters {
  statuses: Status[];
  severities: Severity[];
  assigneeId: string | null;
}

const DEFAULT_FILTERS: IncidentFilters = {
  statuses: [],
  severities: [],
  assigneeId: null,
};

export function useIncidentFilters() {
  return {
    filters: DEFAULT_FILTERS,
    update: (patch: Partial<IncidentFilters>) => {
      void patch;
    },
    reset: () => undefined,
  };
}

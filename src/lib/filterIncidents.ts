import type { Incident, Severity } from '../data/incidents';

export interface IncidentCriteria {
  search: string;
  severity: Severity | 'all';
}

export function filterIncidents(
  incidents: Incident[],
  criteria: IncidentCriteria,
): Incident[] {
  const term = criteria.search.trim().toLowerCase();

  return incidents.filter((incident) => {
    const matchesSeverity =
      criteria.severity === 'all' || incident.severity === criteria.severity;

    if (!matchesSeverity) return false;

    if (term === '') return true;

    const haystack = [
      incident.title,
      incident.description,
      ...incident.tags,
    ];

    return haystack.some((value) => value.toLowerCase().includes(term));
  });
}

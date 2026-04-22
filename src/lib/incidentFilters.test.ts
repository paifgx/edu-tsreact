import { describe, expect, it } from 'vitest';
import type { Incident, User } from '../data/incidents';
import {
  applyIncidentFilters,
  ASSIGNEE_FILTER_UNASSIGNED,
  DEFAULT_INCIDENT_FILTERS,
} from './incidentFilters';

const user: User = {
  id: 'user-1',
  name: 'Alex Example',
  email: 'alex@example.com',
  team: 'platform',
};

function makeIncident(overrides: Partial<Incident> = {}): Incident {
  return {
    id: 'inc-1',
    title: 'Sample',
    description: 'Desc',
    severity: 'medium',
    status: 'open',
    assignee: user,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
    tags: [],
    ...overrides,
  };
}

describe('applyIncidentFilters', () => {
  it('returns only incidents matching every active dimension (AND)', () => {
    const incidents: Incident[] = [
      makeIncident({ id: 'a', status: 'open', severity: 'high' }),
      makeIncident({ id: 'b', status: 'resolved', severity: 'high' }),
      makeIncident({ id: 'c', status: 'open', severity: 'low' }),
    ];

    const filtered = applyIncidentFilters(incidents, {
      ...DEFAULT_INCIDENT_FILTERS,
      statuses: ['open'],
      severities: ['high'],
    });

    expect(filtered.map((i) => i.id)).toEqual(['a']);
  });

  it('does not narrow when status and severity selections are empty', () => {
    const incidents: Incident[] = [
      makeIncident({ id: 'x', status: 'closed', severity: 'critical' }),
      makeIncident({ id: 'y', status: 'open', severity: 'low' }),
    ];

    const filtered = applyIncidentFilters(incidents, {
      statuses: [],
      severities: [],
      assigneeUserId: null,
    });

    expect(filtered).toHaveLength(2);
  });

  it('keeps only unassigned rows when assignee filter is unassigned sentinel', () => {
    const incidents: Incident[] = [
      makeIncident({ id: 'with', assignee: user }),
      makeIncident({ id: 'without', assignee: null }),
    ];

    const filtered = applyIncidentFilters(incidents, {
      ...DEFAULT_INCIDENT_FILTERS,
      assigneeUserId: ASSIGNEE_FILTER_UNASSIGNED,
    });

    expect(filtered.map((i) => i.id)).toEqual(['without']);
  });
});

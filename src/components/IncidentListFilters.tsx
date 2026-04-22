import type { User } from '../data/incidents';
import { SEVERITIES, STATUSES, type Severity, type Status } from '../data/incidents';
import type { IncidentFilters } from '../hooks/useIncidentFilters';

export interface IncidentListFiltersProps {
  filters: IncidentFilters;
  assigneeUnassignedToken: string;
  users: User[];
  toggleStatus: (status: Status) => void;
  toggleSeverity: (severity: Severity) => void;
  onAssigneeFilterChange: (assigneeUserId: string | null) => void;
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function IncidentListFilters({
  filters,
  assigneeUnassignedToken,
  users,
  toggleStatus,
  toggleSeverity,
  onAssigneeFilterChange,
  filteredCount,
  totalCount,
  hasActiveFilters,
  onClearFilters,
}: IncidentListFiltersProps) {
  const assigneeSelectValue =
    filters.assigneeUserId === null
      ? 'all'
      : filters.assigneeUserId === assigneeUnassignedToken
        ? 'unassigned'
        : filters.assigneeUserId;

  return (
    <section className="filters" aria-label="Incident filters">
      <div className="filters__controls filters__controls--stack">
        <fieldset className="filters__fieldset">
          <legend className="control__label">Status (any selected)</legend>
          <div className="filters__checkbox-row">
            {STATUSES.map((status) => (
              <label key={status} className="filters__checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.statuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="filters__fieldset">
          <legend className="control__label">Severity (any selected)</legend>
          <div className="filters__checkbox-row">
            {SEVERITIES.map((severity) => (
              <label key={severity} className="filters__checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.severities.includes(severity)}
                  onChange={() => toggleSeverity(severity)}
                />
                <span>{severity}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="control">
          <span className="control__label">Assignee</span>
          <select
            className="control__input"
            value={assigneeSelectValue}
            onChange={(event) => {
              const value = event.target.value;
              if (value === 'all') {
                onAssigneeFilterChange(null);
              } else if (value === 'unassigned') {
                onAssigneeFilterChange(assigneeUnassignedToken);
              } else {
                onAssigneeFilterChange(value);
              }
            }}
          >
            <option value="all">All assignees</option>
            <option value="unassigned">Unassigned only</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.team})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filters__meta">
        <p className="filters__count">
          Showing {filteredCount} of {totalCount} incidents
        </p>
        <div className="filters__actions">
          <button
            type="button"
            className="filters__clear"
            disabled={!hasActiveFilters}
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        </div>
      </div>
    </section>
  );
}

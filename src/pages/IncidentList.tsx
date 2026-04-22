import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IncidentList } from '../components/IncidentList';
import { IncidentListFilters } from '../components/IncidentListFilters';
import { useUser } from '../context/UserContext';
import { useFocusOnMount } from '../hooks/useFocusOnMount';
import { useIncidents } from '../hooks/useIncidents';
import { useIncidentFilters } from '../hooks/useIncidentFilters';
import { applyIncidentFilters } from '../lib/incidentFilters';

function IncidentListLoading() {
  return (
    <section className="panel" aria-busy="true" aria-live="polite">
      <h2 className="incident-loading__title">Loading incidents…</h2>
      <div className="skeleton-stack">
        <div className="skeleton-line skeleton-line--long" />
        <div className="skeleton-line skeleton-line--medium" />
        <div className="skeleton-line skeleton-line--short" />
      </div>
    </section>
  );
}

interface IncidentListErrorProps {
  message: string;
  onRetry: () => void;
}

function IncidentListError({ message, onRetry }: IncidentListErrorProps) {
  return (
    <section className="panel fetch-banner fetch-banner--error" role="alert">
      <p>{message}</p>
      <button type="button" className="fetch-banner__retry" onClick={onRetry}>
        Retry
      </button>
    </section>
  );
}

export function IncidentListPage() {
  const { state, refetch } = useIncidents();
  const {
    filters,
    update,
    reset,
    toggleStatus,
    toggleSeverity,
    assigneeUnassignedValue,
  } = useIncidentFilters();
  const { users } = useUser();
  const headingRef = useFocusOnMount<HTMLHeadingElement>();

  const filteredIncidents = useMemo(() => {
    if (state.status !== 'success') return [];
    return applyIncidentFilters(state.data, filters);
  }, [state, filters]);

  const hasActiveFilters =
    filters.statuses.length > 0 ||
    filters.severities.length > 0 ||
    filters.assigneeUserId !== null;

  if (state.status === 'loading') {
    return <IncidentListLoading />;
  }

  if (state.status === 'error') {
    return <IncidentListError message={state.message} onRetry={refetch} />;
  }

  return (
    <>
      <header className="section-header section-header--with-action">
        <div>
          <p className="eyebrow">Incidents</p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="section-header__title"
          >
            All incidents ({filteredIncidents.length} of {state.data.length})
          </h2>
        </div>
        <Link to="/incidents/new" className="button">
          New incident
        </Link>
      </header>

      <IncidentListFilters
        filters={filters}
        assigneeUnassignedToken={assigneeUnassignedValue}
        users={users}
        toggleStatus={toggleStatus}
        toggleSeverity={toggleSeverity}
        onAssigneeFilterChange={(assigneeUserId) =>
          update({ assigneeUserId })
        }
        filteredCount={filteredIncidents.length}
        totalCount={state.data.length}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={reset}
      />

      <IncidentList incidents={filteredIncidents} />
    </>
  );
}

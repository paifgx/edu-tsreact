import { Link } from 'react-router-dom';
import { IncidentList } from '../components/IncidentList';
import { useIncidents } from '../hooks/useIncidents';

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
          <h2 className="section-header__title">
            All incidents ({state.data.length})
          </h2>
        </div>
        <Link to="/incidents/new" className="button">
          New incident
        </Link>
      </header>

      <IncidentList incidents={state.data} />
    </>
  );
}

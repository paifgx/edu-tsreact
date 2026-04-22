import { IncidentForm } from '../components/IncidentForm';
import { useParams } from 'react-router-dom';
import { useIncidentById } from '../hooks/useIncidentById';
import { NotFoundPage } from './NotFound';

function IncidentEditLoading() {
  return (
    <section className="panel" aria-busy="true" aria-live="polite">
      <h2 className="incident-loading__title">Loading incident…</h2>
      <div className="skeleton-stack">
        <div className="skeleton-line skeleton-line--long" />
        <div className="skeleton-line skeleton-line--medium" />
        <div className="skeleton-line skeleton-line--short" />
      </div>
    </section>
  );
}

function IncidentEditError({ message }: { message: string }) {
  return (
    <section className="panel fetch-banner fetch-banner--error" role="alert">
      <p>{message}</p>
    </section>
  );
}

export function IncidentEditPage() {
  const { id } = useParams();
  const { incident, isLoading, error } = useIncidentById(id);

  if (!id) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <IncidentEditLoading />;
  }

  if (error) {
    return <IncidentEditError message={error} />;
  }

  if (!incident) {
    return <NotFoundPage />;
  }

  return (
    <IncidentForm
      key={incident.id}
      mode="edit"
      incidentId={id}
      initial={incident}
    />
  );
}

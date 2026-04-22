import { Link, useParams } from 'react-router-dom';
import type { Incident } from '../data/incidents';
import { useIncidentById } from '../hooks/useIncidentById';
import { NotFoundPage } from './NotFound';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function initials(name: string): string {
  return name
    .split(' ')
    .filter((part) => part.length > 0)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function IncidentDetailLoading() {
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

function IncidentDetailError({ message }: { message: string }) {
  return (
    <section className="panel fetch-banner fetch-banner--error" role="alert">
      <p>{message}</p>
    </section>
  );
}

export function IncidentDetailPage() {
  const { id } = useParams();
  const { incident, isLoading, error } = useIncidentById(id);

  if (!id) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <IncidentDetailLoading />;
  }

  if (error) {
    return <IncidentDetailError message={error} />;
  }

  if (!incident) {
    return <NotFoundPage />;
  }

  return <IncidentDetailView incident={incident} />;
}

interface IncidentDetailViewProps {
  incident: Incident;
}

function IncidentDetailView({ incident }: IncidentDetailViewProps) {
  const { assignee, tags } = incident;

  return (
    <article
      className={`panel incident-detail incident-detail--${incident.severity}`}
      aria-labelledby="incident-detail-title"
    >
      <header className="incident-detail__header">
        <p className="eyebrow">Incident · {incident.id}</p>
        <h2 id="incident-detail-title" className="incident-detail__title">
          {incident.title}
        </h2>

        <div className="badge-row">
          <span className={`badge badge--${incident.severity}`}>{incident.severity}</span>
          <span className={`badge badge--${incident.status}`}>{incident.status}</span>
        </div>

        <p className="incident-detail__actions">
          <Link to={`/incidents/${incident.id}/edit`} className="button button--secondary">
            Edit
          </Link>
        </p>
      </header>

      <p className="incident-detail__description">{incident.description}</p>

      <dl className="incident-detail__meta-grid">
        <div className="meta-tile">
          <dt className="meta-tile__label">Assignee</dt>
          <dd className="meta-tile__value">
            {assignee ? (
              <span className="assignee">
                <span className="avatar" aria-hidden>
                  {initials(assignee.name)}
                </span>
                <span className="assignee__text">
                  <span className="assignee__name">{assignee.name}</span>
                  <span className="assignee__email">{assignee.email}</span>
                </span>
              </span>
            ) : (
              <span className="meta-tile__muted">Unassigned</span>
            )}
          </dd>
        </div>

        <div className="meta-tile">
          <dt className="meta-tile__label">Team</dt>
          <dd className="meta-tile__value">
            {assignee ? (
              <span className="meta-tile__team">{assignee.team}</span>
            ) : (
              <span className="meta-tile__muted">—</span>
            )}
          </dd>
        </div>

        <div className="meta-tile">
          <dt className="meta-tile__label">Created</dt>
          <dd className="meta-tile__value">
            <time dateTime={incident.createdAt}>
              {dateFormatter.format(new Date(incident.createdAt))}
            </time>
          </dd>
        </div>

        <div className="meta-tile">
          <dt className="meta-tile__label">Updated</dt>
          <dd className="meta-tile__value">
            <time dateTime={incident.updatedAt}>
              {dateFormatter.format(new Date(incident.updatedAt))}
            </time>
          </dd>
        </div>
      </dl>

      {tags.length > 0 ? (
        <section className="incident-detail__tags" aria-label="Tags">
          <p className="meta-tile__label">Tags</p>
          <div className="badge-row">
            {tags.map((tag) => (
              <span key={tag} className="badge">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

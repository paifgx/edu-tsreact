import type { Incident } from '../data/incidents';
import { useIncidents } from '../hooks/useIncidents';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}

export function IncidentDetailPage() {
  const id = 'inc-1001';
  const { incidents, isInitialLoading, isFetching, fetchError, refetch } = useIncidents();

  if (isInitialLoading) {
    return (
      <section
        className="panel incident-loading"
        aria-label="Loading incident"
        aria-busy="true"
      >
        <p className="incident-loading__title">Loading incident…</p>
        <div className="skeleton-stack" aria-hidden>
          <div className="skeleton-line skeleton-line--long" />
          <div className="skeleton-line skeleton-line--medium" />
          <div className="skeleton-line skeleton-line--short" />
        </div>
      </section>
    );
  }

  if (fetchError !== null && incidents.length === 0) {
    return (
      <section className="panel incident-error" role="alert">
        <h2 className="incident-error__title">Could not load incident</h2>
        <p className="incident-error__message">{fetchError}</p>
        <button
          type="button"
          className="incident-error__retry"
          onClick={refetch}
          disabled={isFetching}
        >
          Retry
        </button>
      </section>
    );
  }

  const incident = incidents.find((entry) => entry.id === id);

  if (!incident) {
    return (
      <section className="panel incident-detail incident-detail--missing">
        <p className="eyebrow">Not found</p>
        <h2 className="incident-detail__title">No incident with id {id}</h2>
        <p className="incident-detail__description">
          The preview id does not exist in the current data set. Pick another id from{' '}
          <code>incidents.json</code>.
        </p>
      </section>
    );
  }

  return <IncidentDetailView incident={incident} />;
}

interface IncidentDetailViewProps {
  incident: Incident;
}

function IncidentDetailView({ incident }: IncidentDetailViewProps) {
  const { id, title, description, severity, status, assignee, createdAt, updatedAt, tags } =
    incident;

  return (
    <article
      className={`panel incident-detail incident-detail--${severity}`}
      aria-labelledby="incident-detail-title"
    >
      <header className="incident-detail__header">
        <p className="eyebrow">Incident · {id}</p>
        <h2 id="incident-detail-title" className="incident-detail__title">
          {title}
        </h2>

        <div className="badge-row">
          <span className={`badge badge--${severity}`}>{severity}</span>
          <span className={`badge badge--${status}`}>{status}</span>
        </div>
      </header>

      <p className="incident-detail__description">{description}</p>

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
            <time dateTime={createdAt}>{dateFormatter.format(new Date(createdAt))}</time>
          </dd>
        </div>

        <div className="meta-tile">
          <dt className="meta-tile__label">Updated</dt>
          <dd className="meta-tile__value">
            <time dateTime={updatedAt}>{dateFormatter.format(new Date(updatedAt))}</time>
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

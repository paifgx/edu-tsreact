import { useState, type ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Incident } from '../data/incidents';
import { useUser } from '../context/UserContext';
import { useIncidentById } from '../hooks/useIncidentById';
import { useIncidents } from '../hooks/useIncidents';
import { readHttpErrorMessage } from '../lib/readHttpErrorMessage';
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

  if (!id) {
    return <NotFoundPage />;
  }

  return <IncidentDetailPageContent id={id} />;
}

function IncidentDetailPageContent({ id }: { id: string }) {
  const { upsertIncident } = useIncidents();
  const { incident, isLoading, error, refetch } = useIncidentById(id);

  if (isLoading) {
    return <IncidentDetailLoading />;
  }

  if (error) {
    return <IncidentDetailError message={error} />;
  }

  if (!incident) {
    return <NotFoundPage />;
  }

  return (
    <IncidentDetailView
      incident={incident}
      onAssigneeSaved={(updated) => {
        upsertIncident(updated);
        refetch();
      }}
    />
  );
}

interface IncidentDetailViewProps {
  incident: Incident;
  onAssigneeSaved: (incident: Incident) => void;
}

function IncidentDetailView({ incident, onAssigneeSaved }: IncidentDetailViewProps) {
  const { users } = useUser();
  const { assignee, tags } = incident;
  const [assigneeError, setAssigneeError] = useState<string | null>(null);
  const [assigneeSaving, setAssigneeSaving] = useState(false);

  async function handleAssigneeChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextId = event.target.value;
    setAssigneeSaving(true);
    setAssigneeError(null);
    try {
      const response = await fetch(`/api/incidents/${incident.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assigneeId: nextId === '' ? null : nextId,
        }),
      });
      if (!response.ok) {
        throw new Error(await readHttpErrorMessage(response));
      }
      const updated: Incident = await response.json();
      onAssigneeSaved(updated);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not update assignee.';
      setAssigneeError(message);
      event.target.value = incident.assignee?.id ?? '';
    } finally {
      setAssigneeSaving(false);
    }
  }

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
            <label className="incident-detail__assignee-field">
              <span className="control__label">Change assignee</span>
              <select
                className="control__input"
                value={assignee?.id ?? ''}
                disabled={assigneeSaving}
                aria-busy={assigneeSaving}
                onChange={handleAssigneeChange}
              >
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.team})
                  </option>
                ))}
              </select>
            </label>
            {assigneeError ? (
              <p className="incident-form__error" role="alert">
                {assigneeError}
              </p>
            ) : null}
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

import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Incident } from '../data/incidents';

export interface IncidentCardProps {
  incident: Incident;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: 'medium',
  timeStyle: 'short',
});

// Wrapped in `memo` because filter toggles re-render the list page and pass
// the same `incident` reference for rows that did not change. The card is
// pure and only depends on `incident`, so identity-based bail-out is correct.
export const IncidentCard = memo(IncidentCardImpl);

function IncidentCardImpl({ incident }: IncidentCardProps) {
  const { id, title, description, severity, status, assignee, createdAt, tags } = incident;

  return (
    <article className="incident-card">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="badge-row">
        <span className={`badge badge--${severity}`}>{severity}</span>
        <span className={`badge badge--${status}`}>{status}</span>
        {tags.map((tag) => (
          <span key={tag} className="badge">
            #{tag}
          </span>
        ))}
      </div>

      <p className="incident-card__meta">
        <time dateTime={createdAt}>{dateFormatter.format(new Date(createdAt))}</time>
        {assignee ? <> · {assignee.name} ({assignee.team})</> : <> · unassigned</>}
      </p>

      <div className="incident-card__actions">
        <Link to={`/incidents/${id}`} className="button">View Details</Link>
      </div>
    </article>
  );
}

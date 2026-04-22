import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  SEVERITIES,
  STATUSES,
  type Incident,
  type Severity,
  type Status,
} from '../data/incidents';
import { useIncidents } from '../hooks/useIncidents';
import { readHttpErrorMessage } from '../lib/readHttpErrorMessage';

export type IncidentFormProps =
  | { mode: 'create' }
  | { mode: 'edit'; incidentId: string; initial: Incident };

type FormValues = {
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  /** Comma-separated in the UI; normalized on submit (trim, dedupe, drop empty). */
  tagsInput: string;
};

function tagsToInput(tags: string[]): string {
  return tags.join(', ');
}

function normalizeTagsFromInput(raw: string): string[] {
  const tokens = raw.split(',').map((t) => t.trim()).filter(Boolean);
  return [...new Set(tokens)];
}

function initialValues(props: IncidentFormProps): FormValues {
  if (props.mode === 'edit') {
    const { initial } = props;
    return {
      title: initial.title,
      description: initial.description,
      severity: initial.severity,
      status: initial.status,
      tagsInput: tagsToInput(initial.tags),
    };
  }
  return {
    title: '',
    description: '',
    severity: 'medium',
    status: 'open',
    tagsInput: '',
  };
}

export function IncidentForm(props: IncidentFormProps) {
  const navigate = useNavigate();
  const { refetch: refetchIncidents } = useIncidents();
  const isEdit = props.mode === 'edit';

  const [values, setValues] = useState<FormValues>(() => initialValues(props));
  const [titleError, setTitleError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const trimmedTitle = values.title.trim();
    if (!trimmedTitle) {
      setTitleError('Title must not be empty.');
      return;
    }
    setTitleError(null);

    const tags = normalizeTagsFromInput(values.tagsInput);
    const payload = {
      title: trimmedTitle,
      description: values.description.trim(),
      severity: values.severity,
      status: values.status,
      tags,
    };

    setIsSaving(true);
    try {
      if (isEdit) {
        const response = await fetch(`/api/incidents/${props.incidentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(await readHttpErrorMessage(response));
        }
        refetchIncidents();
        // After a successful save, always go to the detail page (same for create and edit).
        navigate(`/incidents/${props.incidentId}`);
      } else {
        const response = await fetch('/api/incidents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(await readHttpErrorMessage(response));
        }
        const created: Incident = await response.json();
        refetchIncidents();
        navigate(`/incidents/${created.id}`);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unknown error while saving.';
      setSubmitError(message);
    } finally {
      setIsSaving(false);
    }
  }

  const cancelHref = isEdit ? `/incidents/${props.incidentId}` : '/incidents';
  const headingId = isEdit ? 'incident-form-edit-title' : 'incident-form-new-title';
  const eyebrow = isEdit ? 'Edit incident' : 'Incidents';
  const displayTitle = isEdit ? props.initial.title : 'New incident';

  return (
    <section className="panel" aria-labelledby={headingId}>
      <header>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{displayTitle}</h2>
      </header>

      <form onSubmit={onSubmit} className="incident-form" noValidate>
        <label className="control">
          <span className="control__label">Title</span>
          <input
            className="control__input"
            type="text"
            value={values.title}
            aria-invalid={titleError ? true : undefined}
            aria-describedby={titleError ? 'incident-form-title-error' : undefined}
            onChange={(event) => {
              setValues({ ...values, title: event.target.value });
              if (titleError) setTitleError(null);
            }}
          />
          {titleError ? (
            <p id="incident-form-title-error" className="incident-form__error" role="alert">
              {titleError}
            </p>
          ) : null}
        </label>

        <label className="control">
          <span className="control__label">Description</span>
          <textarea
            className="control__input"
            rows={4}
            value={values.description}
            onChange={(event) =>
              setValues({ ...values, description: event.target.value })
            }
          />
        </label>

        <label className="control">
          <span className="control__label">Severity</span>
          <select
            className="control__input"
            value={values.severity}
            onChange={(event) =>
              setValues({ ...values, severity: event.target.value as Severity })
            }
          >
            {SEVERITIES.map((severity) => (
              <option key={severity} value={severity}>
                {severity}
              </option>
            ))}
          </select>
        </label>

        <label className="control">
          <span className="control__label">Status</span>
          <select
            className="control__input"
            value={values.status}
            onChange={(event) =>
              setValues({ ...values, status: event.target.value as Status })
            }
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="control">
          <span className="control__label">Tags</span>
          <input
            className="control__input"
            type="text"
            value={values.tagsInput}
            placeholder="e.g. billing, api, customer-123"
            onChange={(event) =>
              setValues({ ...values, tagsInput: event.target.value })
            }
          />
          <span className="control__hint">Comma-separated; spaces trimmed, duplicates removed on save.</span>
        </label>

        {submitError ? (
          <p className="incident-form__error" role="alert">
            {submitError}
          </p>
        ) : null}

        <div className="incident-form__actions">
          <button type="submit" className="button" disabled={isSaving}>
            {isSaving ? 'Saving…' : isEdit ? 'Save changes' : 'Create incident'}
          </button>
          <Link to={cancelHref} className="button button--secondary">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

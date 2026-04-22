import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    SEVERITIES,
    STATUSES,
    type Incident,
    type Severity,
    type Status,
} from '../data/incidents';
import { useIncidentById } from '../hooks/useIncidentById';
import { readHttpErrorMessage } from '../lib/readHttpErrorMessage';
import { NotFoundPage } from './NotFound';

interface FormValues {
    title: string;
    description: string;
    severity: Severity;
    status: Status;
}

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

    if (!id) {
        return <NotFoundPage />;
    }

    const { incident, isLoading, error } = useIncidentById(id);

    if (isLoading) {
        return <IncidentEditLoading />;
    }

    if (error) {
        return <IncidentEditError message={error} />;
    }

    if (!incident) {
        return <NotFoundPage />;
    }

    return <IncidentEditForm id={id} initial={incident} />;
}

interface IncidentEditFormProps {
    id: string;
    initial: Incident;
}

function IncidentEditForm({ id, initial }: IncidentEditFormProps) {
    const navigate = useNavigate();
    const [values, setValues] = useState<FormValues>({
        title: initial.title,
        description: initial.description,
        severity: initial.severity,
        status: initial.status,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSaving(true);
        setSubmitError(null);

        try {
            const response = await fetch(`/api/incidents/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const message = await readHttpErrorMessage(response);
                throw new Error(message);
            }

            navigate(`/incidents/${id}`);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error while saving.';
            setSubmitError(message);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <section className="panel" aria-labelledby="incident-edit-title">
            <header>
                <p className="eyebrow">Edit incident</p>
                <h2 id="incident-edit-title">{initial.title}</h2>
            </header>

            <form onSubmit={onSubmit} className="incident-form">
                <label className="control">
                    <span className="control__label">Title</span>
                    <input
                        className="control__input"
                        type="text"
                        value={values.title}
                        onChange={(event) => {
                            setValues({ ...values, title: event.target.value });
                        }}
                        required
                    />
                </label>

                <label className="control">
                    <span className="control__label">Description</span>
                    <textarea
                        className="control__input"
                        rows={4}
                        value={values.description}
                        onChange={(event) => setValues({ ...values, description: event.target.value })}
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

                {submitError ? (
                    <p className="incident-form__error" role="alert">
                        {submitError}
                    </p>
                ) : null}

                <div className="incident-form__actions">
                    <button type="submit" className="button" disabled={isSaving}>
                        {isSaving ? 'Saving…' : 'Save changes'}
                    </button>
                    <Link to={`/incidents/${id}`} className="button button--secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}

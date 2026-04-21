import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { IncidentList } from './components/IncidentList';
import { SearchBar } from './components/SearchBar';
import { SeverityFilter } from './components/SeverityFilter';
import { useIncidents } from './hooks/useIncidents';
import { filterIncidents } from './lib/filterIncidents';
import type { Severity } from './data/incidents';
import { IncidentDetailPage } from './pages/IncidentDetail';

export function App() {
  // const { incidents, isInitialLoading, isFetching, fetchError, refetch } = useIncidents();
  // const [search, setSearch] = useState('');
  // const [severity, setSeverity] = useState<Severity | 'all'>('all');

  // const visible = filterIncidents(incidents, { search, severity });

  // const hasActiveFilters = search !== '' || severity !== 'all';

  // const clearFilters = () => {
  //   setSearch('');
  //   setSeverity('all');
  // };

  // const total = incidents.length;
  // const showList =
  //   !isInitialLoading && (total > 0 || fetchError === null);
  // const showErrorWithoutList = fetchError !== null && total === 0 && !isFetching;

  return (
    <main className="app-shell">
      <Header />

      <IncidentDetailPage />

      {/* <section className="panel filters" aria-label="Filters">
        <div className="filters__controls">
          <SearchBar value={search} onChange={setSearch} />
          <SeverityFilter value={severity} onChange={setSeverity} />
        </div>

        <div className="filters__meta">
          <p className="filters__count" aria-live="polite">
            {isInitialLoading
              ? 'Loading incidents…'
              : `Showing ${visible.length} of ${total}`}
            {isFetching && !isInitialLoading ? (
              <span className="filters__fetching" aria-live="polite">
                {' '}
                (updating…)
              </span>
            ) : null}
          </p>
          <div className="filters__actions">
            <button
              type="button"
              className="filters__refresh"
              onClick={refetch}
              disabled={isFetching}
              aria-busy={isFetching}
            >
              Refresh
            </button>
            <button
              type="button"
              className="filters__clear"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              Clear filters
            </button>
          </div>
        </div>
      </section>

      {fetchError !== null && total > 0 ? (
        <div className="fetch-banner fetch-banner--error" role="alert">
          <p>{fetchError}</p>
          <button type="button" className="fetch-banner__retry" onClick={refetch} disabled={isFetching}>
            Retry
          </button>
        </div>
      ) : null}

      {isInitialLoading ? (
        <section
          className="panel incident-loading"
          aria-label="Loading incidents"
          aria-busy="true"
        >
          <p className="incident-loading__title">Loading incidents…</p>
          <div className="skeleton-stack" aria-hidden>
            <div className="skeleton-line skeleton-line--long" />
            <div className="skeleton-line skeleton-line--medium" />
            <div className="skeleton-line skeleton-line--short" />
          </div>
        </section>
      ) : null}

      {showErrorWithoutList ? (
        <section className="panel incident-error" role="alert">
          <h2 className="incident-error__title">Could not load incidents</h2>
          <p className="incident-error__message">{fetchError}</p>
          <button type="button" className="incident-error__retry" onClick={refetch} disabled={isFetching}>
            Retry
          </button>
        </section>
      ) : null}

      {showList ? <IncidentList incidents={visible} /> : null} */}
    </main>
  );
}

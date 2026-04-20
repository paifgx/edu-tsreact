import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { IncidentList } from './components/IncidentList';
import { SearchBar } from './components/SearchBar';
import { SeverityFilter } from './components/SeverityFilter';
import { INCIDENTS, type Severity } from './data/incidents';
import { filterIncidents } from './lib/filterIncidents';

export function App() {
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState<Severity | 'all'>('all');

  const visible = useMemo(
    () => filterIncidents(INCIDENTS, { search, severity }),
    [search, severity],
  );

  const hasActiveFilters = search !== '' || severity !== 'all';

  const clearFilters = () => {
    setSearch('');
    setSeverity('all');
  };

  return (
    <main className="app-shell">
      <Header />

      <section className="panel filters" aria-label="Filters">
        <div className="filters__controls">
          <SearchBar value={search} onChange={setSearch} />
          <SeverityFilter value={severity} onChange={setSeverity} />
        </div>

        <div className="filters__meta">
          <p className="filters__count" aria-live="polite">
            Showing {visible.length} of {INCIDENTS.length}
          </p>
          <button
            type="button"
            className="filters__clear"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
          >
            Clear filters
          </button>
        </div>
      </section>

      <IncidentList incidents={visible} />
    </main>
  );
}

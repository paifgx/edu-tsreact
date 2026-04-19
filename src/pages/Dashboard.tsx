import { incidents } from '../data/incidents';

export function Dashboard() {
  return (
    <section className="panel">
      <h3>Dashboard stub</h3>
      <p>The current seed dataset includes {incidents.length} typed incidents.</p>
    </section>
  );
}

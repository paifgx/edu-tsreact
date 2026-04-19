import { Header } from './components/Header';

export function App() {
  return (
    <main className="app-shell">
      <Header />

      <section className="panel">
        <h2>Project scaffold</h2>
        <p>
          This repository is the starting point for the Incident Dashboard. The application
          structure, seed data, and mock API are in place, but the actual features are still open
          for implementation.
        </p>
        <ul className="helper-list">
          <li>Application entry: <code>src/App.tsx</code></li>
          <li>Domain types and seed data: <code>src/data/incidents.ts</code></li>
          <li>Mock API: <code>npm run dev:api</code></li>
          <li>Prepared folders: <code>src/components</code>, <code>src/hooks</code>, <code>src/context</code>, <code>src/pages</code></li>
        </ul>
      </section>
    </main>
  );
}

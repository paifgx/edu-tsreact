import { Header } from './components/Header';
import { IncidentList } from './components/IncidentList';
import { INCIDENTS } from './data/incidents';

export function App() {
  return (
    <main className="app-shell">
      <Header />
      <IncidentList incidents={INCIDENTS} />
    </main>
  );
}

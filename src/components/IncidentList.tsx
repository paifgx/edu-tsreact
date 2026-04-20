import type { Incident } from '../data/incidents';
import { Empty } from './Empty';
import { IncidentCard } from './IncidentCard';

export interface IncidentListProps {
  incidents: Incident[];
}

export function IncidentList({ incidents }: IncidentListProps) {
  if (incidents.length === 0) {
    return <Empty />;
  }

  return (
    <section className="panel incident-list" aria-label="Incidents">
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </section>
  );
}

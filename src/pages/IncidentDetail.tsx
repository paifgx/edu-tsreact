import { useParams } from 'react-router-dom';

export function IncidentDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="panel">
      <h3>Incident detail stub</h3>
      <p>Current route id: {id ?? 'missing'}</p>
    </section>
  );
}


import type { Severity } from '../data/incidents';

interface Props {
  severity: Severity;
}

export function SeverityBadge({ severity }: Props) {
  return <span className={`badge badge--${severity}`}>{severity}</span>;
}


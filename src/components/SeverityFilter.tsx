import { SEVERITIES, type Severity } from '../data/incidents';

interface Props {
  value: Severity | 'all';
  onChange: (nextValue: Severity | 'all') => void;
}

export function SeverityFilter({ value, onChange }: Props) {
  return (
    <label className="control">
      <span className="control__label">Severity</span>
      <select
        className="control__input"
        value={value}
        onChange={(event) => onChange(event.target.value as Severity | 'all')}
      >
        <option value="all">All</option>
        {SEVERITIES.map((severity) => (
          <option key={severity} value={severity}>
            {severity}
          </option>
        ))}
      </select>
    </label>
  );
}


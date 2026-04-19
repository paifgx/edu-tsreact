interface Props {
  value: string;
  onChange: (nextValue: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <label className="control">
      <span className="control__label">Search</span>
      <input
        className="control__input"
        type="search"
        placeholder="Search by title or description"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}


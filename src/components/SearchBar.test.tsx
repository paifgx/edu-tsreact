import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { SearchBar } from './SearchBar';

function SearchBarHarness() {
  const [value, setValue] = useState('');
  return (
    <>
      <SearchBar value={value} onChange={setValue} />
      <p aria-live="polite">Current: {value}</p>
    </>
  );
}

describe('SearchBar', () => {
  it('updates visible text when the user types', async () => {
    const user = userEvent.setup();
    render(<SearchBarHarness />);

    await user.type(screen.getByRole('searchbox'), 'db outage');

    expect(screen.getByText(/Current:/)).toHaveTextContent('Current: db outage');
  });
});

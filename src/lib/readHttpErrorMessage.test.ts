import { afterEach, describe, expect, it, vi } from 'vitest';
import { readHttpErrorMessage } from './readHttpErrorMessage';

describe('readHttpErrorMessage', () => {
  it('returns message from JSON body when present', async () => {
    const response = new Response(JSON.stringify({ message: 'Rate limited' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });

    await expect(readHttpErrorMessage(response)).resolves.toBe('Rate limited');
  });

  it('falls back to status text when body has no usable message', async () => {
    const response = new Response(JSON.stringify({}), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });

    await expect(readHttpErrorMessage(response)).resolves.toBe('Request failed (502).');
  });
});

describe('readHttpErrorMessage with mocked fetch', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads error JSON from a failed fetch response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Server busy' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const response = await fetch('/api/incidents/inc-1');
    const message = await readHttpErrorMessage(response);

    expect(fetchMock).toHaveBeenCalledWith('/api/incidents/inc-1');
    expect(message).toBe('Server busy');
  });
});

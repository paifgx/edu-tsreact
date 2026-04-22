import { useEffect, useRef } from 'react';

/**
 * Focus the attached element once on mount.
 *
 * Rationale: after a route change the browser keeps focus where the user left
 * it (typically the triggering link). Screen reader users then do not hear the
 * new page title. Moving focus to the page heading (with `tabIndex={-1}` so it
 * can receive programmatic focus without being in the tab order) announces the
 * destination context without hijacking visible focus rings for keyboard users
 * who already see the new page.
 */
export function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
}

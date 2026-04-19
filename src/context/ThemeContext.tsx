/* eslint-disable react-refresh/only-export-components */

import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useTheme() {
  throw new Error('ThemeContext is not implemented yet.');
}

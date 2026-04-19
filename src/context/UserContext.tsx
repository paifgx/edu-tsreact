/* eslint-disable react-refresh/only-export-components */

import type { ReactNode } from 'react';

export function UserProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useUser() {
  throw new Error('UserContext is not implemented yet.');
}

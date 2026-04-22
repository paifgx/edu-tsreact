/* @refresh reset — same reason as ThemeContext: provider + hook in one module. */
/* eslint-disable react-refresh/only-export-components */
/**
 * "Current user" here is a **UI-only** pick (e.g. for demos), not authentication.
 * Real accounts would come from the server later — see task notes in tasks/06.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { type User, users as seedUsers } from '../data/incidents';
import { readHttpErrorMessage } from '../lib/readHttpErrorMessage';

const STORAGE_USER_ID = 'incident-dashboard-current-user-id';

export type UserContextValue = {
  /** From `/api/users` when available, otherwise seed data from `data/users.json`. */
  users: User[];
  isLoadingUsers: boolean;
  /** Selected user, or `null` if none — UI shows an explicit fallback. */
  currentUser: User | null;
  setCurrentUserId: (userId: string | null) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

function readStoredUserId(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_USER_ID);
    return raw && raw.trim() ? raw.trim() : null;
  } catch {
    return null;
  }
}

function persistUserId(userId: string | null) {
  try {
    if (userId == null || userId === '') {
      localStorage.removeItem(STORAGE_USER_ID);
    } else {
      localStorage.setItem(STORAGE_USER_ID, userId);
    }
  } catch {
    /* ignore */
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [selectedUserId, setSelectedUserIdState] = useState<string | null>(() =>
    readStoredUserId(),
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoadingUsers(true);
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error(await readHttpErrorMessage(response));
        }
        const data: User[] = await response.json();
        if (!cancelled) {
          setUsers(Array.isArray(data) && data.length > 0 ? data : seedUsers);
        }
      } catch {
        if (!cancelled) {
          setUsers(seedUsers);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingUsers(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrentUserId = useCallback((userId: string | null) => {
    setSelectedUserIdState(userId);
    persistUserId(userId);
  }, []);

  const currentUser = useMemo(() => {
    if (!selectedUserId) return null;
    return users.find((u) => u.id === selectedUserId) ?? null;
  }, [users, selectedUserId]);

  useEffect(() => {
    if (isLoadingUsers) return;
    if (selectedUserId && !users.some((u) => u.id === selectedUserId)) {
      setSelectedUserIdState(null);
      persistUserId(null);
    }
  }, [isLoadingUsers, selectedUserId, users]);

  const value = useMemo<UserContextValue>(
    () => ({
      users,
      isLoadingUsers,
      currentUser,
      setCurrentUserId,
    }),
    [users, isLoadingUsers, currentUser, setCurrentUserId],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error(
      'useUser must be used within a UserProvider — wrap the app in <UserProvider> in App.tsx.',
    );
  }
  return ctx;
}

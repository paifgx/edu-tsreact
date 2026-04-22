/* @refresh reset — gleicher Grund wie ThemeContext: Provider + Hook in einer Datei. */
/* eslint-disable react-refresh/only-export-components */
/**
 * "Aktueller Nutzer" ist hier nur eine **UI-Auswahl** (z. B. für Demos), kein Login.
 * Echte Accounts kommen später vom Server — siehe Aufgaben-Notiz in tasks/06.
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
  /** Liste aus API, sonst Seed-Daten aus `data/users.json`. */
  users: User[];
  isLoadingUsers: boolean;
  /** Ausgewählter Nutzer oder `null` = keiner gewählt (klarer Fallback in der UI). */
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
      'useUser: UserProvider fehlt — in App.tsx <UserProvider> um Router/Theme legen.',
    );
  }
  return ctx;
}

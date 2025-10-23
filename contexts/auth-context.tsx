import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type AuthUser = {
  name: string;
  email: string;
};

type StoredUser = AuthUser & { password: string };

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (payload: { name: string; email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const CURRENT_USER_KEY = 'auth:current-user';
const USERS_KEY = 'auth:users';

async function getStoredUsers(): Promise<StoredUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((entry) => entry && typeof entry.email === 'string' && typeof entry.password === 'string');
  } catch (error) {
    console.warn('Failed to parse stored users', error);
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        const rawUser = await AsyncStorage.getItem(CURRENT_USER_KEY);
        if (rawUser) {
          const parsed = JSON.parse(rawUser) as AuthUser;
          if (parsed && parsed.email) {
            setUser(parsed);
          }
        }
      } catch (error) {
        console.warn('Failed to restore auth user', error);
      } finally {
        setIsLoading(false);
      }
    };

    void restoreAuthState();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = await getStoredUsers();
    const found = users.find((entry) => entry.email.toLowerCase() === trimmedEmail);

    if (!found || found.password !== password) {
      throw new Error('Invalid email or password.');
    }

    const authUser: AuthUser = { name: found.name, email: found.email };
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
    setUser(authUser);
  }, []);

  const signUp = useCallback(async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedName) {
      throw new Error('Please enter your name.');
    }

    if (!trimmedEmail) {
      throw new Error('Please provide an email.');
    }

    if (!password.trim()) {
      throw new Error('Password cannot be empty.');
    }

    const users = await getStoredUsers();
    const alreadyExists = users.some((entry) => entry.email.toLowerCase() === trimmedEmail);

    if (alreadyExists) {
      throw new Error('An account with that email already exists.');
    }

    const storedUser: StoredUser = {
      name: trimmedName,
      email: trimmedEmail,
      password,
    };

    const updatedUsers = [...users, storedUser];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    const authUser: AuthUser = { name: trimmedName, email: trimmedEmail };
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
    setUser(authUser);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
    }),
    [isLoading, signIn, signUp, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

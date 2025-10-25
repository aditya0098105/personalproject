import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';
export type RefreshCadence = 'live' | '15m' | 'hourly';

export type PreferencesState = {
  theme: ThemePreference;
  realtimeAlerts: boolean;
  hapticFeedback: boolean;
  offlineMode: boolean;
  refreshCadence: RefreshCadence;
};

const DEFAULT_PREFERENCES: PreferencesState = {
  theme: 'system',
  realtimeAlerts: true,
  hapticFeedback: true,
  offlineMode: false,
  refreshCadence: '15m',
};

const STORAGE_KEY = 'timeline:preferences';

type PreferencesContextValue = {
  preferences: PreferencesState;
  isHydrated: boolean;
  setTheme: (theme: ThemePreference) => Promise<void>;
  setPreference: <K extends keyof PreferencesState>(key: K, value: PreferencesState[K]) => Promise<void>;
  resetPreferences: () => Promise<void>;
};

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

async function readStoredPreferences(): Promise<PreferencesState | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    return {
      ...DEFAULT_PREFERENCES,
      ...parsed,
    } satisfies PreferencesState;
  } catch (error) {
    console.warn('Failed to read stored preferences', error);
    return null;
  }
}

async function persistPreferences(next: PreferencesState) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn('Failed to persist preferences', error);
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<PreferencesState>(DEFAULT_PREFERENCES);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      const stored = await readStoredPreferences();
      if (stored) {
        setPreferences(stored);
      }
      setIsHydrated(true);
    };

    void hydrate();
  }, []);

  const updateAndPersist = useCallback(async (next: PreferencesState) => {
    setPreferences(next);
    await persistPreferences(next);
  }, []);

  const setTheme = useCallback(
    async (theme: ThemePreference) => {
      await updateAndPersist({
        ...preferences,
        theme,
      });
    },
    [preferences, updateAndPersist],
  );

  const setPreference = useCallback(
    async <K extends keyof PreferencesState>(key: K, value: PreferencesState[K]) => {
      const next = {
        ...preferences,
        [key]: value,
      } as PreferencesState;
      await updateAndPersist(next);
    },
    [preferences, updateAndPersist],
  );

  const resetPreferences = useCallback(async () => {
    setPreferences(DEFAULT_PREFERENCES);
    await persistPreferences(DEFAULT_PREFERENCES);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      isHydrated,
      setTheme,
      setPreference,
      resetPreferences,
    }),
    [isHydrated, preferences, resetPreferences, setPreference, setTheme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}

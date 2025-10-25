import { useColorScheme as useNativeColorScheme } from 'react-native';

import { usePreferences } from '@/contexts/preferences-context';

export function useColorScheme() {
  const systemScheme = useNativeColorScheme();
  const {
    preferences: { theme },
  } = usePreferences();
  const themePreference = theme === 'system' ? systemScheme : theme;

  return themePreference ?? systemScheme ?? 'light';
}

import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

import { usePreferences } from '@/contexts/preferences-context';

export function HapticTab(props: BottomTabBarButtonProps) {
  const {
    preferences: { hapticFeedback },
  } = usePreferences();

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (hapticFeedback && process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}

import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TimelineLogoProps = {
  size?: number;
  showWordmark?: boolean;
  stacked?: boolean;
};

export function TimelineLogo({ size = 48, showWordmark = false, stacked = false }: TimelineLogoProps) {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const borderWidth = Math.max(3, Math.round(size * 0.08));
  const innerSize = size - borderWidth * 2;
  const wordmarkColor = colorScheme === 'dark' ? '#f8fafc' : '#0f172a';
  const badgeBackground = colorScheme === 'dark' ? 'rgba(15,23,42,0.92)' : '#f8fafc';

  return (
    <View style={[styles.wrapper, stacked && styles.wrapperStacked]}>
      <LinearGradient
        colors={palette.gradient ?? [palette.tint, palette.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <View
          style={[
            styles.badgeInner,
            {
              borderRadius: innerSize / 2,
              padding: innerSize * 0.2,
              backgroundColor: badgeBackground,
            },
          ]}
        >
          <View style={styles.timelineRow}>
            <View style={styles.timelineColumn}>
              <View
                style={[
                  styles.timelinePulse,
                  {
                    backgroundColor: palette.accent,
                    opacity: colorScheme === 'dark' ? 0.3 : 0.2,
                  },
                ]}
              />
              <View style={[styles.timelineTrack, { backgroundColor: palette.muted }]} />
              <View style={[styles.timelineNode, { backgroundColor: palette.tint }]} />
            </View>
            <View style={styles.timelineSignals}>
              <View style={[styles.signalBar, { height: '70%', backgroundColor: palette.tint }]} />
              <View style={[styles.signalBar, { height: '100%', backgroundColor: palette.accent }]} />
              <View style={[styles.signalBar, { height: '45%', backgroundColor: palette.tint }]} />
            </View>
          </View>
        </View>
      </LinearGradient>
      {showWordmark && (
        <View style={styles.wordmarkBlock}>
          <ThemedText type="subtitle" style={[styles.wordmark, { color: wordmarkColor }]}>
            Timeline
          </ThemedText>
          <ThemedText style={[styles.tagline, { color: colorScheme === 'dark' ? '#cbd5f5' : '#475569' }]}>Intelligence</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wrapperStacked: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  badgeInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  timelineRow: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timelineColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  timelinePulse: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 999,
  },
  timelineTrack: {
    width: 6,
    borderRadius: 999,
    flexGrow: 1,
  },
  timelineNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineSignals: {
    flexDirection: 'row',
    flex: 1,
    gap: 4,
    marginLeft: 8,
    alignItems: 'flex-end',
  },
  signalBar: {
    width: 6,
    borderRadius: 999,
  },
  wordmarkBlock: {
    gap: 2,
  },
  wordmark: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  tagline: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default TimelineLogo;

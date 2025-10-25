import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TimelineLogoProps = {
  size?: number;
  showWordmark?: boolean;
};

export function TimelineLogo({ size = 48, showWordmark = false }: TimelineLogoProps) {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const circleSize = size;
  const lineWidth = Math.max(3, Math.round(circleSize * 0.08));

  return (
    <View style={styles.wrapper}>
      <View style={[styles.glyphRow, { gap: Math.round(circleSize * 0.18) }]}> 
        <View style={{ alignItems: 'center' }}>
          <LinearGradient
            colors={[palette.tint, palette.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}
          />
          <View
            style={[
              styles.verticalLine,
              {
                height: circleSize * 0.85,
                width: lineWidth,
                marginTop: -lineWidth,
                backgroundColor: colorScheme === 'dark' ? 'rgba(226,232,240,0.7)' : 'rgba(15,23,42,0.15)',
              },
            ]}
          />
          <View
            style={[
              styles.node,
              {
                width: circleSize * 0.35,
                height: circleSize * 0.35,
                borderRadius: (circleSize * 0.35) / 2,
                backgroundColor: colorScheme === 'dark' ? 'rgba(226,232,240,0.25)' : 'rgba(15,23,42,0.12)',
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.glyphPillar,
            {
              height: circleSize * 1.6,
              width: lineWidth,
              backgroundColor: palette.tint,
            },
          ]}
        >
          <View
            style={[
              styles.pillarHighlight,
              {
                backgroundColor: colorScheme === 'dark' ? 'rgba(148,163,184,0.35)' : 'rgba(255,255,255,0.65)',
              },
            ]}
          />
        </View>
      </View>
      {showWordmark && (
        <ThemedText type="subtitle" style={styles.wordmark}>
          Timeline
        </ThemedText>
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
  glyphRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  circle: {
    overflow: 'hidden',
  },
  verticalLine: {
    borderRadius: 999,
  },
  node: {
    marginTop: 6,
  },
  glyphPillar: {
    borderRadius: 999,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  pillarHighlight: {
    position: 'absolute',
    top: '12%',
    left: '26%',
    width: '38%',
    height: '76%',
    borderRadius: 999,
    opacity: 0.65,
  },
  wordmark: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});

export default TimelineLogo;

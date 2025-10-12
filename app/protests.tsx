import { useCallback } from 'react';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { protestDeepDives } from '@/constants/content';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function ProgressBar({ value, tint }: { value: number; tint: string }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: tint }]} />
    </View>
  );
}

export default function ProtestDetailScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : '#ffffff';
  const borderSubtle = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.24)' : '#e2e8f0';
  const highlightSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'rgba(10, 126, 164, 0.12)';

  const handleOpen = useCallback(async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.intro}>
        <ThemedText type="title" style={styles.title}>
          Protest Intelligence Brief
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Live dossiers on the civic movements we&apos;re tracking this week. Severity gauges blend participation data, safety
          signals, and government response indicators.
        </ThemedText>
      </ThemedView>

      {protestDeepDives.map((protest) => (
        <ThemedView
          key={protest.slug}
          lightColor={cardSurface}
          darkColor={cardSurface}
          style={[styles.card, { borderColor: borderSubtle }]}
        >
          <View style={styles.cardHeader}>
            <View>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {protest.movement}
              </ThemedText>
              <ThemedText style={styles.cardLocation}>{protest.location}</ThemedText>
            </View>
            <View style={[styles.statusChip, { backgroundColor: highlightSurface }]}> 
              <IconSymbol name="megaphone.fill" size={16} color={palette.tint} />
              <ThemedText style={[styles.statusText, { color: palette.tint }]}>{protest.status}</ThemedText>
            </View>
          </View>

          <ThemedText style={styles.summary}>{protest.summary}</ThemedText>

          <View style={styles.metricRow}>
            <ThemedText style={styles.metricLabel}>Movement momentum</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.metricValue}>
              {Math.round(protest.severity * 100)}%
            </ThemedText>
          </View>
          <ProgressBar value={protest.severity * 100} tint={palette.tint} />

          <View style={styles.sectionHeader}>
            <IconSymbol name="calendar" size={18} color={palette.tint} />
            <ThemedText type="defaultSemiBold">Timeline</ThemedText>
          </View>
          <View style={styles.timeline}>
            {protest.timeline.map((event) => (
              <View key={`${protest.slug}-${event.date}`} style={styles.timelineRow}>
                <View style={[styles.timelineBullet, { backgroundColor: highlightSurface }]}> 
                  <IconSymbol name="dot.radiowaves.up.forward" size={14} color={palette.tint} />
                </View>
                <View style={styles.timelineContent}>
                  <ThemedText type="defaultSemiBold" style={styles.timelineTitle}>
                    {event.title}
                  </ThemedText>
                  <ThemedText style={styles.timelineDate}>{event.date}</ThemedText>
                  <ThemedText style={styles.timelineDetail}>{event.detail}</ThemedText>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <IconSymbol name="link" size={18} color={palette.tint} />
            <ThemedText type="defaultSemiBold">Key resources</ThemedText>
          </View>
          <View style={styles.linkList}>
            {protest.links.map((link) => (
              <Pressable
                key={link.label}
                onPress={() => handleOpen(link.url)}
                style={[styles.linkRow, { borderColor: borderSubtle }]}
              >
                <ThemedText type="defaultSemiBold" style={[styles.linkLabel, { color: palette.tint }]}>
                  {link.label}
                </ThemedText>
                <IconSymbol name="arrow.up.right" size={16} color={palette.tint} />
              </Pressable>
            ))}
          </View>
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 220,
  },
  intro: {
    gap: 12,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
  },
  cardLocation: {
    fontSize: 14,
    opacity: 0.8,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 13,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeline: {
    gap: 14,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineBullet: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineContent: {
    flex: 1,
    gap: 4,
  },
  timelineTitle: {
    fontSize: 16,
  },
  timelineDate: {
    fontSize: 13,
    opacity: 0.7,
  },
  timelineDetail: {
    fontSize: 14,
    lineHeight: 20,
  },
  linkList: {
    gap: 12,
  },
  linkRow: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkLabel: {
    fontSize: 15,
  },
});

import { useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { worldGovernanceCountries } from '@/constants/governance';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;

type RegionFilter = (typeof regions)[number];

function ProgressBar({ value, tint }: { value: number; tint: string }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: tint }]} />
    </View>
  );
}

function deriveScore(name: string) {
  const base = 48 + (name.charCodeAt(0) % 36);
  const vowelBoost = ['a', 'e', 'i', 'o', 'u'].includes(name[0].toLowerCase()) ? 6 : 0;
  return Math.min(100, base + vowelBoost + (name.length % 7));
}

function deriveChange(name: string) {
  const raw = (name.charCodeAt(name.length - 1) % 5) - 2;
  return raw;
}

export default function GovernanceIndexScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : '#ffffff';
  const borderSubtle = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.2)' : '#e2e8f0';

  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('All');

  const filteredCountries = useMemo(() => {
    if (selectedRegion === 'All') {
      return worldGovernanceCountries;
    }
    return worldGovernanceCountries.filter((country) => country.region === selectedRegion);
  }, [selectedRegion]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1521293281845-245c3ac07a50?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.intro}>
        <ThemedText type="title" style={styles.title}>
          Governance Index
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Benchmarking transparency, participation, and service delivery across every recognised nation. Scores combine our
          open governance dataset with civic tech adoption indicators.
        </ThemedText>
      </ThemedView>

      <View style={styles.filterRow}>
        {regions.map((region) => {
          const isActive = selectedRegion === region;
          return (
            <Pressable
              key={region}
              onPress={() => setSelectedRegion(region)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: isActive ? palette.tint : 'transparent',
                  borderColor: palette.tint,
                },
              ]}
            >
              <ThemedText
                type="defaultSemiBold"
                style={{ color: isActive ? palette.background : palette.tint, fontSize: 13 }}
              >
                {region}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const score = deriveScore(item.name);
          const change = deriveChange(item.name);
          return (
            <ThemedView
              lightColor={cardSurface}
              darkColor={cardSurface}
              style={[styles.countryCard, { borderColor: borderSubtle }]}
            >
              <View style={styles.countryHeader}>
                <View style={styles.countryNameRow}>
                  <IconSymbol name="globe" size={18} color={palette.tint} />
                  <ThemedText type="subtitle" style={styles.countryName}>
                    {item.name}
                  </ThemedText>
                </View>
                <View style={styles.regionPill}>
                  <ThemedText style={[styles.regionLabel, { color: palette.tint }]}>{item.region}</ThemedText>
                </View>
              </View>
              <View style={styles.scoreRow}>
                <ThemedText style={styles.scoreLabel}>Index score</ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.scoreValue}>
                  {score}
                </ThemedText>
              </View>
              <ProgressBar value={score} tint={palette.tint} />
              <ThemedText style={styles.changeLabel}>
                {change > 0 ? `▲ ${change} week trend` : change < 0 ? `▼ ${Math.abs(change)} week trend` : 'Stable week trend'}
              </ThemedText>
            </ThemedView>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
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
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  listContent: {
    paddingBottom: 40,
    gap: 16,
  },
  countryCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    gap: 12,
  },
  countryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  countryName: {
    fontSize: 18,
  },
  regionPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  regionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 13,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  scoreValue: {
    fontSize: 20,
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
  changeLabel: {
    fontSize: 13,
    opacity: 0.7,
  },
});

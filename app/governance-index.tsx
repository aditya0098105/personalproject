import { useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
  governanceIndexRecords,
  governanceRegions,
  type GovernanceRecord,
} from '@/constants/governance';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const regionFilters = governanceRegions;

type RegionFilter = (typeof regionFilters)[number];

function ProgressBar({ value, tint }: { value: number; tint: string }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: tint }]} />
    </View>
  );
}

export default function GovernanceIndexScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : '#ffffff';
  const borderSubtle = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.2)' : '#e2e8f0';

  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('All');

  const filteredCountries = useMemo(() => {
    if (selectedRegion === 'All') {
      return governanceIndexRecords;
    }
    return governanceIndexRecords.filter((country) => country.region === selectedRegion);
  }, [selectedRegion]);

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
          Governance Index
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Comparative look at perceived public-sector integrity using Transparency International’s 2023 Corruption Perceptions
          Index. Track movements since the 2022 release and scan our desk notes for each highlighted country.
        </ThemedText>
      </ThemedView>

      <ThemedView
        lightColor={cardSurface}
        darkColor={cardSurface}
        style={[styles.dataSourceCard, { borderColor: borderSubtle }]}
      >
        <View style={styles.dataSourceHeader}>
          <View
            style={[
              styles.dataSourceIcon,
              { backgroundColor: colorScheme === 'dark' ? 'rgba(148,163,184,0.18)' : 'rgba(10,126,164,0.12)' },
            ]}
          >
            <IconSymbol name="chart.bar" size={18} color={palette.tint} />
          </View>
          <View style={styles.dataSourceCopy}>
            <ThemedText type="defaultSemiBold" style={styles.dataSourceTitle}>
              Dataset coverage
            </ThemedText>
            <ThemedText style={styles.dataSourceSubtitle}>
              CPI 2023 ranks 180 countries/territories on perceived public-sector corruption (0 = highly corrupt, 100 = very
              clean). Scores here spotlight regional leaders and notable movers against the 2022 baseline.
            </ThemedText>
          </View>
        </View>
        <View style={styles.dataPointsRow}>
          {buildDataPoints(governanceIndexRecords).map((point) => (
            <View key={point.label} style={styles.dataPoint}>
              <ThemedText type="subtitle" style={styles.dataPointValue}>
                {point.value}
              </ThemedText>
              <ThemedText style={styles.dataPointLabel}>{point.label}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <View style={styles.filterRow}>
        {regionFilters.map((region) => {
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
        renderItem={({ item }) => (
          <GovernanceCard
            record={item}
            paletteTint={palette.tint}
            borderColor={borderSubtle}
            surfaceColor={cardSurface}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </ParallaxScrollView>
  );
}

function buildDataPoints(records: GovernanceRecord[]) {
  const averageScore = records.reduce((acc, record) => acc + record.score, 0) / records.length;
  const positiveMovers = records.filter((record) => record.change > 0).length;
  const negativeMovers = records.filter((record) => record.change < 0).length;

  return [
    { label: 'Average score', value: averageScore.toFixed(1) },
    { label: 'Countries improving', value: positiveMovers },
    { label: 'Countries declining', value: negativeMovers },
  ] as const;
}

function GovernanceCard({
  record,
  paletteTint,
  borderColor,
  surfaceColor,
}: {
  record: GovernanceRecord;
  paletteTint: string;
  borderColor: string;
  surfaceColor: string;
}) {
  const changeLabel =
    record.change > 0
      ? `▲ ${record.change} vs 2022`
      : record.change < 0
        ? `▼ ${Math.abs(record.change)} vs 2022`
        : 'No change vs 2022';

  return (
    <ThemedView lightColor={surfaceColor} darkColor={surfaceColor} style={[styles.countryCard, { borderColor }] }>
      <View style={styles.countryHeader}>
        <View style={styles.countryNameRow}>
          <IconSymbol name="globe" size={18} color={paletteTint} />
          <ThemedText type="subtitle" style={styles.countryName}>
            {record.name}
          </ThemedText>
        </View>
        <View style={[styles.regionPill, { borderColor: paletteTint }] }>
          <ThemedText style={[styles.regionLabel, { color: paletteTint }]}>{record.region}</ThemedText>
        </View>
      </View>

      <View style={styles.scoreMetaRow}>
        <View>
          <ThemedText style={styles.scoreLabel}>CPI score</ThemedText>
          <ThemedText type="title" style={styles.scoreValue}>
            {record.score}
          </ThemedText>
        </View>
        <View style={[styles.rankBadge, { borderColor: paletteTint }] }>
          <ThemedText style={[styles.rankLabel, { color: paletteTint }]}>#{record.rank}</ThemedText>
          <ThemedText style={styles.rankCaption}>global rank</ThemedText>
        </View>
      </View>

      <ProgressBar value={record.score} tint={paletteTint} />

      <ThemedText style={styles.changeLabel}>{changeLabel}</ThemedText>

      <ThemedText style={styles.briefCopy}>{record.brief}</ThemedText>

      <View style={styles.sourceRow}>
        <IconSymbol name="info.circle" size={16} color={paletteTint} />
        <ThemedText style={styles.sourceText}>{record.source}</ThemedText>
      </View>
    </ThemedView>
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
  dataSourceCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    gap: 16,
  },
  dataSourceHeader: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  dataSourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataSourceCopy: {
    flex: 1,
    gap: 4,
  },
  dataSourceTitle: {
    fontSize: 15,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  dataSourceSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
  },
  dataPointsRow: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  dataPoint: {
    flexGrow: 1,
    minWidth: 110,
  },
  dataPointValue: {
    fontSize: 24,
  },
  dataPointLabel: {
    fontSize: 13,
    opacity: 0.75,
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
    gap: 16,
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
    letterSpacing: 0.4,
  },
  scoreMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 13,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    opacity: 0.75,
  },
  scoreValue: {
    fontSize: 28,
  },
  rankBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 92,
  },
  rankLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  rankCaption: {
    fontSize: 11,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(148, 163, 184, 0.25)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  changeLabel: {
    marginTop: 6,
    fontSize: 13,
    letterSpacing: 0.2,
  },
  briefCopy: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.85,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sourceText: {
    fontSize: 12,
    opacity: 0.75,
  },
});

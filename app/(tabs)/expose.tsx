import type { ComponentProps } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const dossierHighlights = [
  {
    title: 'USD $4.5B allegedly siphoned',
    detail:
      'U.S. Department of Justice investigators allege more than $4.5 billion was diverted from 1MDB into offshore vehicles linked to Malaysian and Emirati officials between 2009 and 2014.',
    icon: 'globe.asia.australia.fill',
  },
  {
    title: 'Luxuries seized worldwide',
    detail:
      'Civil forfeiture cases recovered assets including a $250M superyacht, Beverly Hills mansions, and rare art purchased with misappropriated funds, according to DoJ filings.',
    icon: 'sailboat.fill',
  },
  {
    title: 'Banks paid record fines',
    detail:
      'Goldman Sachs agreed to a $2.9B global settlement in 2020 and Malaysia negotiated $3.9B in penalties after prosecutors said bond offerings enabled the scheme.',
    icon: 'dollarsign.circle.fill',
  },
];

const timeline = [
  {
    year: '2009',
    headline: '1MDB founded under Najib Razak',
    summary:
      'Malaysia transformed the Terengganu Investment Authority into 1MDB with Najib as advisory board chair, pledging to spur strategic development projects.',
  },
  {
    year: '2015',
    headline: 'Wall Street Journal exposes $700M transfer',
    summary:
      'Investigative reporting revealed funds linked to 1MDB were wired into Najib’s personal accounts, prompting domestic protests and official denials.',
  },
  {
    year: '2016',
    headline: 'DoJ launches “kleptocracy” suits',
    summary:
      'U.S. authorities filed civil actions to seize $1B in assets, calling it the largest kleptocracy case in DoJ history.',
  },
  {
    year: '2022',
    headline: 'Najib begins 12-year prison term',
    summary:
      'Malaysia’s Federal Court upheld Najib’s conviction for abuse of power, criminal breach of trust, and money laundering tied to SRC International, a former 1MDB unit.',
  },
];

export default function ExposeScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const borderSubtle = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.2)' : '#e2e8f0';
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.75)' : '#ffffff';
  const accentSurface = colorScheme === 'dark' ? 'rgba(14, 116, 144, 0.24)' : 'rgba(14, 165, 233, 0.16)';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#082f49', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.hero}>
        <View style={styles.heroBadge}>
          <IconSymbol name="exclamationmark.triangle.fill" size={18} color={palette.background} />
          <ThemedText style={styles.heroBadgeText} lightColor={palette.background} darkColor={palette.background}>
            Accountability desk
          </ThemedText>
        </View>
        <ThemedText type="title" style={styles.heroTitle}>
          1MDB global money trail
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          How Malaysia’s sovereign development fund became the centre of a multi-billion-dollar fraud touching Hollywood, Gulf investment funds, and Wall Street banks.
        </ThemedText>
      </ThemedView>

      <LinearGradient
        colors={colorScheme === 'dark' ? ['rgba(14,116,144,0.28)', 'rgba(8,47,73,0.9)'] : ['rgba(14,165,233,0.35)', '#0ea5e9']}
        style={styles.highlightCard}
      >
        <ThemedText type="subtitle" style={styles.highlightTitle} lightColor="#ffffff" darkColor="#ffffff">
          “The largest kleptocracy case to date”
        </ThemedText>
        <ThemedText style={styles.highlightQuote} lightColor="rgba(255,255,255,0.85)" darkColor="rgba(255,255,255,0.85)">
          U.S. prosecutors say bonds arranged for 1MDB were immediately rerouted to shell companies controlled by financier Low Taek Jho and allies—funding luxury property, films like “The Wolf of Wall Street,” and political influence campaigns.
        </ThemedText>
      </LinearGradient>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        What we uncovered
      </ThemedText>
      <ThemedView style={[styles.grid, { borderColor: borderSubtle }]} lightColor={cardSurface} darkColor={cardSurface}>
        {dossierHighlights.map((item) => (
          <View key={item.title} style={styles.gridItem}>
            <View style={[styles.gridIconWrap, { backgroundColor: accentSurface }]}>
              <IconSymbol
                name={item.icon as ComponentProps<typeof IconSymbol>['name']}
                size={20}
                color={palette.tint}
              />
            </View>
            <ThemedText type="subtitle" style={styles.gridTitle}>
              {item.title}
            </ThemedText>
            <ThemedText style={styles.gridDetail}>{item.detail}</ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Timeline of the unraveling
      </ThemedText>
      <ThemedView style={[styles.timelineCard, { borderColor: borderSubtle }]} lightColor={cardSurface} darkColor={cardSurface}>
        {timeline.map((entry, index) => (
          <View
            key={entry.year}
            style={[
              styles.timelineRow,
              index !== timeline.length - 1 && [styles.timelineDivider, { borderBottomColor: borderSubtle }],
            ]}
          >
            <View style={[styles.timelineBadge, { backgroundColor: accentSurface }]}>
              <ThemedText type="defaultSemiBold" style={styles.timelineYear}>
                {entry.year}
              </ThemedText>
            </View>
            <View style={styles.timelineContent}>
              <ThemedText type="subtitle" style={styles.timelineHeadline}>
                {entry.headline}
              </ThemedText>
              <ThemedText style={styles.timelineSummary}>{entry.summary}</ThemedText>
            </View>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={[styles.takeawayCard, { borderColor: borderSubtle }]} lightColor={cardSurface} darkColor={cardSurface}>
        <IconSymbol name="lightbulb.fill" size={24} color={palette.tint} />
        <ThemedText type="subtitle" style={styles.takeawayTitle}>
          What’s next
        </ThemedText>
        <ThemedText style={styles.takeawayBody}>
          Malaysia continues pursuing Low Taek Jho and other fugitives while auditing recovery of 1MDB-linked assets. Stay alert for U.S. court filings on forfeiture auctions and Malaysia’s ongoing negotiations with international banks.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 240,
  },
  hero: {
    paddingTop: 24,
    paddingBottom: 8,
    gap: 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#38bdf8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroBadgeText: {
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 34,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  highlightCard: {
    borderRadius: 24,
    padding: 22,
    gap: 12,
    marginTop: 12,
  },
  highlightTitle: {
    color: '#ffffff',
    fontSize: 24,
  },
  highlightQuote: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    lineHeight: 23,
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 16,
  },
  grid: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 20,
  },
  gridItem: {
    gap: 10,
  },
  gridIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTitle: {
    fontSize: 18,
  },
  gridDetail: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  timelineCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 18,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 16,
  },
  timelineDivider: {
    borderBottomWidth: 1,
  },
  timelineBadge: {
    width: 66,
    height: 66,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineYear: {
    fontSize: 18,
  },
  timelineContent: {
    flex: 1,
    gap: 6,
  },
  timelineHeadline: {
    fontSize: 18,
  },
  timelineSummary: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  takeawayCard: {
    marginTop: 28,
    borderRadius: 24,
    borderWidth: 1,
    padding: 22,
    gap: 12,
  },
  takeawayTitle: {
    fontSize: 20,
  },
  takeawayBody: {
    fontSize: 15,
    lineHeight: 22,
  },
});

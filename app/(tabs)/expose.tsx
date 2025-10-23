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
    title: 'Layered shell companies feed a single fortune',
    detail:
      'Seven logistics subsidiaries registered in low-tax havens funneled municipal contracts into a private holding company. Each entity signed identical invoices for “strategic foresight consulting,” but only one junior analyst was on payroll.',
    icon: 'building.2.fill',
  },
  {
    title: 'Public funds diverted through charity partnerships',
    detail:
      'Crosswinds Humanity, a philanthropic front, raised $48M for disaster relief. Only 12% reached field programmes—most underwrote Horizon Gala events and luxury travel billed as “donor cultivation experiences.”',
    icon: 'heart.text.square.fill',
  },
  {
    title: 'Whistleblower dossiers corroborate the scheme',
    detail:
      'An operations lead leaked 2,300 emails showing executive directives to reclassify campaign donations as “community resilience grants,” unlocking exclusive city concessions.',
    icon: 'exclamationmark.bubble.fill',
  },
];

const timeline = [
  {
    year: '2018',
    headline: 'Awarded SmartPort modernization contract',
    summary:
      'City of New Avalon selected Horizon Nexus Logistics, chaired by Viktor Halden, to digitize port customs. Procurement board minutes later vanished from the public register.',
  },
  {
    year: '2019',
    headline: 'Shell network appears overnight',
    summary:
      'Six shell entities registered within 72 hours in Cascadia, Reykjavik, and the Azores. All list Halden’s brother-in-law as the director of record.',
  },
  {
    year: '2021',
    headline: 'Whistleblowers surface',
    summary:
      'Employees leak memos revealing back-dated invoices, falsified compliance reports, and off-ledger payments into Halden’s personal art foundation.',
  },
  {
    year: '2024',
    headline: 'Investigative task force unravels the flow',
    summary:
      'Forensic accountants trace $162M in diverted city funds, sparking emergency hearings and the suspension of the SmartPort initiative.',
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
            uri: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
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
          Horizon Nexus dossier
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Meet Viktor Halden: the charismatic “infrastructure saviour” whose empire siphoned public renewal funds into a private art vault while citizens waited for promised clean ports.
        </ThemedText>
      </ThemedView>

      <LinearGradient
        colors={colorScheme === 'dark' ? ['rgba(14,116,144,0.28)', 'rgba(8,47,73,0.9)'] : ['rgba(14,165,233,0.35)', '#0ea5e9']}
        style={styles.highlightCard}
      >
        <ThemedText type="subtitle" style={styles.highlightTitle} lightColor="#ffffff" darkColor="#ffffff">
          “The city’s best-kept secret investment”
        </ThemedText>
        <ThemedText style={styles.highlightQuote} lightColor="rgba(255,255,255,0.85)" darkColor="rgba(255,255,255,0.85)">
          Halden promised automated, carbon-neutral shipping lanes. Instead, our analysis shows 73% of SmartPort funds detoured through Horizon Nexus Consulting, a mailbox office sharing a fax machine with a private gallery.
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
          Investigators are preparing restitution orders while port workers vote on a cooperative alternative. We’re crowdsourcing new leads on Halden’s remaining offshore partners—send tips securely via the encrypted newsroom channel.
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

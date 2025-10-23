import type { ComponentProps, ReactNode } from 'react';
import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

const briefingSchedule = [
  {
    time: '06:30 GMT',
    title: 'Sunrise Global',
    lead: 'Tayo Adetola',
    focus: 'Asia-Pacific overnight markets & emergency alerts',
  },
  {
    time: '09:00 GMT',
    title: 'Diplomacy Desk',
    lead: 'Amelia Richter',
    focus: 'Security council updates and bilateral treaty trackers',
  },
  {
    time: '14:00 GMT',
    title: 'Movement Monitor',
    lead: 'Diego Fernández',
    focus: 'Live protest situation reports and civic response heatmap',
  },
];

const documentaryPipeline = [
  {
    name: 'Cities After the Storm',
    stage: 'On-location filming',
    delivery: 'May 12',
    lead: 'Documentary Unit · Resilience vertical',
  },
  {
    name: 'Democracy Architects',
    stage: 'Rough cut review',
    delivery: 'May 26',
    lead: 'Investigations · Governance desk',
  },
  {
    name: 'Voices of Tomorrow',
    stage: 'Pitch session',
    delivery: 'June 02',
    lead: 'Originals · Youth culture pod',
  },
];

const intelligenceSignals = [
  {
    icon: 'map.fill',
    label: 'Protest pulse',
    value: '64',
    delta: '+6',
    detail: 'Global movement momentum rising with strong civic organisation in 12 capitals.',
  },
  {
    icon: 'shield.checkered',
    label: 'Governance stability',
    value: '78',
    delta: '+3',
    detail: 'Legislative transparency scores improved in Canada, Kenya, and Portugal.',
  },
  {
    icon: 'sun.max.fill',
    label: 'Constructive headlines',
    value: '41',
    delta: '+9',
    detail: 'Positive-impact stories trending: renewable energy, climate adaptation, civic tech.',
  },
];

const resourceHub = [
  {
    title: 'Field guide: Covering demonstrations with care',
    description: 'Updated legal briefings, rapid deployment safety checklists, and encrypted contact trees.',
    action: 'Open protest protocols',
  },
  {
    title: 'Documentary stylebook 2025',
    description: 'Color grading LUTs, interview frameworks, and soundtrack licensing templates.',
    action: 'Review filmmakers kit',
  },
  {
    title: 'Editorial standards and ethics',
    description: 'Governance, verification workflows, and AI-aided fact-checking policies.',
    action: 'Read compliance charter',
  },
];

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const borderSubtle = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.25)' : '#e2e8f0';
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.65)' : '#ffffff';
  const signalSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'rgba(10, 126, 164, 0.08)';
  const tint = palette.tint;
  const accentSurface = colorScheme === 'dark' ? 'rgba(14, 116, 144, 0.28)' : 'rgba(14, 165, 233, 0.14)';
  const accentText = colorScheme === 'dark' ? '#e2e8f0' : '#0f172a';
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to leave the Global Dispatch?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: () => {
          void signOut();
        },
      },
    ]);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1e293b', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Newsroom Control Center
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Coordinate coverage, accelerate investigations, and align every desk around the biggest stories on the planet.
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[styles.accountCard, { borderColor: borderSubtle }]}
        lightColor={cardSurface}
        darkColor={cardSurface}
      >
        <View style={styles.accountHeader}>
          <View style={[styles.accountAvatar, { backgroundColor: accentSurface }]}>
            <ThemedText style={[styles.accountAvatarText, { color: accentText }]}> 
              {(user?.name || user?.email || 'Guest').charAt(0).toUpperCase()}
            </ThemedText>
          </View>
          <View style={styles.accountMeta}>
            <ThemedText type="subtitle" style={styles.accountGreeting}>
              Hey {user?.name?.split(' ')[0] ?? 'there'}
            </ThemedText>
            <ThemedText style={styles.accountCopy}>
              Your dashboards refresh every 15 minutes. Stay signed in to keep your alert routing active.
            </ThemedText>
          </View>
        </View>
        <Pressable onPress={handleSignOut} style={[styles.accountButton, { backgroundColor: accentSurface }]}> 
          <IconSymbol name="arrow.uturn.backward" size={18} color={accentText} />
          <ThemedText style={[styles.accountButtonText, { color: accentText }]}>Sign out</ThemedText>
        </Pressable>
      </ThemedView>

      <SectionBlock
        title="Live briefing schedule"
        caption="Join editorial stand-ups across regions"
        icon="clock.fill"
        surface={cardSurface}
        borderColor={borderSubtle}
        tint={tint}
      >
        {briefingSchedule.map((entry) => (
          <View key={entry.title} style={styles.briefingRow}>
            <View style={styles.briefingTime}>
              <ThemedText type="subtitle" style={styles.briefingTimeText}>
                {entry.time}
              </ThemedText>
            </View>
            <View style={styles.briefingDetails}>
              <ThemedText type="subtitle" style={styles.briefingTitle}>
                {entry.title}
              </ThemedText>
              <ThemedText style={styles.briefingLead}>{entry.lead}</ThemedText>
              <ThemedText style={styles.briefingFocus}>{entry.focus}</ThemedText>
            </View>
          </View>
        ))}
      </SectionBlock>

      <SectionBlock
        title="Documentary production slate"
        caption="Status of flagship investigative films"
        icon="film.stack"
        surface={cardSurface}
        borderColor={borderSubtle}
        tint={tint}
      >
        {documentaryPipeline.map((doc) => (
          <View key={doc.name} style={styles.pipelineRow}>
            <View style={[styles.pipelineBullet, { backgroundColor: signalSurface }]}>
              <IconSymbol name="sparkles" size={16} color={tint} />
            </View>
            <View style={styles.pipelineContent}>
              <ThemedText type="subtitle" style={styles.pipelineTitle}>
                {doc.name}
              </ThemedText>
              <ThemedText style={styles.pipelineMeta}>
                {doc.stage} · Delivery {doc.delivery}
              </ThemedText>
              <ThemedText style={styles.pipelineLead}>{doc.lead}</ThemedText>
            </View>
          </View>
        ))}
      </SectionBlock>

      <SectionBlock
        title="Intelligence signals"
        caption="Realtime dashboards powering the Global Dispatch"
        icon="waveform.path.ecg"
        surface={cardSurface}
        borderColor={borderSubtle}
        tint={tint}
      >
        {intelligenceSignals.map((signal) => (
          <View key={signal.label} style={[styles.signalCard, { borderColor: borderSubtle }]}>
            <View style={[styles.signalIconWrap, { backgroundColor: signalSurface }]}> 
              <IconSymbol name={signal.icon as ComponentProps<typeof IconSymbol>['name']} size={24} color={tint} />
            </View>
            <View style={styles.signalContent}>
              <View style={styles.signalHeader}>
                <ThemedText type="subtitle" style={styles.signalLabel}>
                  {signal.label}
                </ThemedText>
                <View style={styles.signalValueWrap}>
                  <ThemedText type="title" style={styles.signalValue}>
                    {signal.value}
                  </ThemedText>
                  <ThemedText style={[styles.signalDelta, { color: tint }]}>{signal.delta}</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.signalDetail}>{signal.detail}</ThemedText>
            </View>
          </View>
        ))}
      </SectionBlock>

      <SectionBlock
        title="Resource hub"
        caption="Best-practice playbooks from every bureau"
        icon="books.vertical.fill"
        surface={cardSurface}
        borderColor={borderSubtle}
        tint={tint}
      >
        {resourceHub.map((resource) => (
          <Pressable key={resource.title} style={[styles.resourceCard, { borderColor: borderSubtle }]}>
            <View style={styles.resourceContent}>
              <ThemedText type="subtitle" style={styles.resourceTitle}>
                {resource.title}
              </ThemedText>
              <ThemedText style={styles.resourceDescription}>{resource.description}</ThemedText>
            </View>
            <View style={styles.resourceAction}>
              <ThemedText type="defaultSemiBold" style={{ color: tint }}>
                {resource.action}
              </ThemedText>
              <IconSymbol name="arrow.up.right" size={16} color={tint} />
            </View>
          </Pressable>
        ))}
      </SectionBlock>
    </ParallaxScrollView>
  );
}

function SectionBlock({
  title,
  caption,
  icon,
  surface,
  borderColor,
  tint,
  children,
}: {
  title: string;
  caption: string;
  icon: ComponentProps<typeof IconSymbol>['name'];
  surface: string;
  borderColor: string;
  tint: string;
  children: ReactNode;
}) {
  return (
    <ThemedView style={[styles.section, { borderColor }]} lightColor={surface} darkColor={surface}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <IconSymbol name={icon} size={22} color={tint} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {title}
          </ThemedText>
        </View>
        <ThemedText style={styles.sectionCaption}>{caption}</ThemedText>
      </View>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 240,
  },
  titleContainer: {
    gap: 12,
    paddingTop: 28,
    paddingBottom: 12,
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.85,
  },
  accountCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 16,
    marginTop: 16,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  accountAvatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountAvatarText: {
    fontSize: 22,
    fontWeight: '700',
  },
  accountMeta: {
    flex: 1,
    gap: 4,
  },
  accountGreeting: {
    fontSize: 18,
  },
  accountCopy: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  accountButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  section: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    gap: 16,
    marginTop: 24,
  },
  sectionHeader: {
    gap: 6,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
  },
  sectionCaption: {
    opacity: 0.7,
  },
  briefingRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  briefingTime: {
    width: 88,
    paddingVertical: 10,
  },
  briefingTimeText: {
    fontSize: 16,
  },
  briefingDetails: {
    flex: 1,
    gap: 4,
  },
  briefingTitle: {
    fontSize: 18,
  },
  briefingLead: {
    fontSize: 14,
    opacity: 0.75,
  },
  briefingFocus: {
    fontSize: 14,
    lineHeight: 20,
  },
  pipelineRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  pipelineBullet: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 126, 164, 0.15)',
  },
  pipelineContent: {
    flex: 1,
    gap: 4,
  },
  pipelineTitle: {
    fontSize: 17,
  },
  pipelineMeta: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    opacity: 0.7,
  },
  pipelineLead: {
    fontSize: 14,
    lineHeight: 20,
  },
  signalCard: {
    flexDirection: 'row',
    gap: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  signalIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signalContent: {
    flex: 1,
    gap: 6,
  },
  signalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  signalLabel: {
    fontSize: 18,
  },
  signalValueWrap: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'baseline',
  },
  signalValue: {
    fontSize: 26,
    lineHeight: 30,
  },
  signalDelta: {
    fontSize: 14,
  },
  signalDetail: {
    fontSize: 15,
    lineHeight: 22,
  },
  resourceCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 16,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resourceContent: {
    flex: 1,
    gap: 6,
  },
  resourceTitle: {
    fontSize: 17,
  },
  resourceDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
  },
  resourceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});

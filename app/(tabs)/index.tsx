import type { ComponentProps } from 'react';
import { useCallback, useState } from 'react';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
  documentarySpotlight,
  governanceSpotlight,
  protestWatchHighlights,
} from '@/constants/content';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const heroMetrics = [
  { label: 'Global correspondents', value: '92' },
  { label: 'Daily briefings', value: '34' },
  { label: 'Investigations running', value: '18' },
];

const quickActions = [
  {
    title: 'Documentaries',
    subtitle: 'Field films & trailers',
    icon: 'film.fill',
    route: '/documentaries',
  },
  {
    title: 'Current News',
    subtitle: 'Rolling solution headlines',
    icon: 'newspaper.fill',
    route: '/news',
  },
  {
    title: 'Governance Index',
    subtitle: '195-nation scoreboard',
    icon: 'chart.bar.xaxis',
    route: '/governance-index',
  },
  {
    title: 'Protest Watch',
    subtitle: 'Movement dossiers',
    icon: 'megaphone.fill',
    route: '/protests',
  },
  {
    title: 'Expose',
    subtitle: 'Accountability spotlight',
    icon: 'exclamationmark.triangle.fill',
    route: '/(tabs)/expose',
  },
];

const forwardFocus = [
  {
    title: 'Carbon-negative cement reaches commercial scale',
    summary:
      'Two megacities approve rapid deployment of carbon-sequestering construction, lowering build emissions by 68%.',
  },
  {
    title: 'Indigenous innovation labs create circular economies',
    summary:
      'Community-led labs across the Pacific accelerate zero-waste supply chains with open-source tooling.',
  },
];

function ProgressBar({ value, tint }: { value: number; tint: string }) {
  const colorScheme = useColorScheme();
  const trackColor = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.35)' : '#e2e8f0';

  return (
    <View style={[styles.progressTrack, { backgroundColor: trackColor }]}>
      <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: tint }]} />
    </View>
  );
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const borderSubtle = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.25)' : '#e2e8f0';
  const highlightSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.65)' : '#ffffff';
  const featureSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.85)' : '#0f172a';
  const panelSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.65)' : '#ffffff';
  const forwardSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.1)' : '#fdfdfd';
  const tintedSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.25)' : 'rgba(10, 126, 164, 0.12)';
  const heroBadgeForeground = colorScheme === 'dark' ? '#f8fafc' : palette.background;
  const router = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleOpenDocumentary = useCallback(async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  }, []);

  const handleSubmitNewsletter = useCallback(() => {
    const trimmed = newsletterEmail.trim();

    if (!trimmed) {
      setNewsletterStatus({ type: 'error', message: 'Please enter an email address to continue.' });
      return;
    }

    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (!emailPattern.test(trimmed)) {
      setNewsletterStatus({ type: 'error', message: 'That email doesn’t look quite right. Try again?' });
      return;
    }

    setNewsletterEmail('');
    setNewsletterStatus({
      type: 'success',
      message: 'Thanks! Your weekend intelligence briefing will land in your inbox.',
    });
    Alert.alert('You’re on the list', 'We’ll deliver our next Global Dispatch digest straight to you.');
  }, [newsletterEmail]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.hero}>
        <View style={styles.heroBadge}>
          <IconSymbol name="sparkles" size={18} color={heroBadgeForeground} />
          <ThemedText style={[styles.heroBadgeText, { color: heroBadgeForeground }]}>Studio Signal</ThemedText>
        </View>
        <ThemedText type="title" style={styles.heroTitle}>
          Global Dispatch
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Precision reporting, cinematic storytelling, and daily intelligence for leaders navigating a fast-changing
          world.
        </ThemedText>
        <View style={styles.metricRow}>
          {heroMetrics.map((metric) => (
            <ThemedView
              key={metric.label}
              lightColor={highlightSurface}
              darkColor={highlightSurface}
              style={[styles.metricCard, { borderColor: borderSubtle }]}
            >
              <ThemedText type="subtitle" style={styles.metricValue}>
                {metric.value}
              </ThemedText>
              <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      <SectionHeader title="Quick launch" caption="Jump straight to live dashboards" icon="sparkles" />
      <View style={styles.quickGrid}>
        {quickActions.map((action) => (
          <Pressable
            key={action.title}
            onPress={() => router.push(action.route)}
            style={[styles.quickCard, { borderColor: borderSubtle, backgroundColor: highlightSurface }]}
          >
            <View style={[styles.quickIconWrap, { backgroundColor: tintedSurface }]}> 
              <IconSymbol name={action.icon as ComponentProps<typeof IconSymbol>['name']} size={22} color={palette.tint} />
            </View>
            <View style={styles.quickContent}>
              <ThemedText type="subtitle" style={styles.quickTitle}>
                {action.title}
              </ThemedText>
              <ThemedText style={styles.quickSubtitle}>{action.subtitle}</ThemedText>
            </View>
            <IconSymbol name="arrow.right" size={18} color={palette.tint} />
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Documentaries" caption="Immersive stories from the field" icon="film.fill" />
      {documentarySpotlight.map((feature) => (
        <Pressable
          key={feature.slug}
          onPress={() => handleOpenDocumentary(feature.url)}
          style={[styles.featureCard, { backgroundColor: featureSurface }]}
        >
          <Image source={{ uri: feature.image }} style={styles.featureImage} contentFit="cover" />
          <View style={styles.featureContent}>
            <ThemedText type="subtitle" style={styles.featureTitle}>
              {feature.title}
            </ThemedText>
            <ThemedText style={styles.featureMeta}>{feature.duration}</ThemedText>
            <ThemedText style={styles.featureSummary}>{feature.summary}</ThemedText>
            <View style={styles.featureAction}>
              <ThemedText type="defaultSemiBold" style={{ color: palette.tint }}>
                View documentary brief
              </ThemedText>
              <IconSymbol name="arrow.right" size={16} color={palette.tint} />
            </View>
          </View>
        </Pressable>
      ))}

      <SectionHeader title="Protest Watch" caption="Current movements shaping policy" icon="megaphone.fill" />
      <ThemedView
        style={[styles.panelCard, { borderColor: borderSubtle }]}
        lightColor={panelSurface}
        darkColor={panelSurface}
      >
        {protestWatchHighlights.map((protest) => (
          <Pressable
            key={protest.slug}
            onPress={() => router.push('/protests')}
            style={styles.protestRow}
          >
            <View style={styles.protestHeader}>
              <ThemedText type="subtitle" style={styles.protestRegion}>
                {protest.region}
              </ThemedText>
              <View style={[styles.statusChip, { backgroundColor: tintedSurface }]}> 
                <IconSymbol name="dot.radiowaves.up.forward" size={14} color={palette.tint} />
                <ThemedText style={[styles.statusLabel, { color: palette.tint }]}>{protest.status}</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.protestMovement}>{protest.movement}</ThemedText>
            <ThemedText style={styles.protestUpdate}>{protest.update}</ThemedText>
            <ProgressBar value={protest.severity * 100} tint={palette.tint} />
          </Pressable>
        ))}
      </ThemedView>

      <SectionHeader title="Government Good Index" caption="Governance, transparency & trust" icon="chart.bar.xaxis" />
      <ThemedView
        style={[styles.indexContainer, { borderColor: borderSubtle }]}
        lightColor={panelSurface}
        darkColor={panelSurface}
      >
        {governanceSpotlight.map((entry) => (
          <Pressable
            key={entry.country}
            onPress={() => router.push('/governance-index')}
            style={styles.indexRow}
          >
            <View style={styles.indexHeader}>
              <ThemedText type="subtitle" style={styles.indexCountry}>
                {entry.country}
              </ThemedText>
              <View style={styles.indexScoreGroup}>
                <IconSymbol name="shield.lefthalf.filled" size={16} color={palette.tint} />
                <ThemedText type="defaultSemiBold" style={styles.indexScore}>
                  {entry.score}
                </ThemedText>
              </View>
            </View>
            <ProgressBar value={entry.score} tint={palette.tint} />
            <ThemedText style={styles.indexDelta}>
              {entry.change > 0 ? `▲ ${entry.change} this week` : entry.change < 0 ? `▼ ${Math.abs(entry.change)} this week` : 'Unchanged'}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>

      <SectionHeader title="Forward Focus" caption="Solutions worth celebrating" icon="leaf.fill" />
      <ThemedView
        style={[styles.forwardContainer, { borderColor: borderSubtle }]}
        lightColor={forwardSurface}
        darkColor={forwardSurface}
      >
        {forwardFocus.map((item) => (
          <View key={item.title} style={styles.forwardCard}>
            <IconSymbol name="sparkle" size={20} color={palette.tint} />
            <View style={styles.forwardContent}>
              <ThemedText type="subtitle" style={styles.forwardTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.forwardSummary}>{item.summary}</ThemedText>
            </View>
          </View>
        ))}
      </ThemedView>

      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? ['#0f172a', '#0b2942']
            : ['#0ea5e9', '#0369a1']
        }
        style={styles.newsletterCard}
      >
        <View style={styles.newsletterHeader}>
          <View style={styles.newsletterIconWrap}>
            <IconSymbol name="envelope.open.fill" size={22} color="#0f172a" />
          </View>
          <View style={styles.newsletterTextBlock}>
            <ThemedText type="subtitle" style={styles.newsletterTitle} lightColor="#ffffff" darkColor="#ffffff">
              Get the weekend insider brief
            </ThemedText>
            <ThemedText style={styles.newsletterSubtitle} lightColor="rgba(255,255,255,0.85)" darkColor="rgba(255,255,255,0.85)">
              Receive curated investigations, accountability spotlights, and dispatch intel in your inbox.
            </ThemedText>
          </View>
        </View>
        <View style={styles.newsletterForm}>
          <TextInput
            value={newsletterEmail}
            onChangeText={(value) => {
              setNewsletterEmail(value);
              if (newsletterStatus) {
                setNewsletterStatus(null);
              }
            }}
            placeholder="you@example.com"
            placeholderTextColor="rgba(255,255,255,0.6)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.newsletterInput}
          />
          <Pressable
            accessibilityRole="button"
            onPress={handleSubmitNewsletter}
            style={styles.newsletterButton}
          >
            <ThemedText type="defaultSemiBold" style={styles.newsletterButtonText} lightColor="#0f172a" darkColor="#0f172a">
              Submit
            </ThemedText>
          </Pressable>
        </View>
        {newsletterStatus ? (
          <ThemedText
            style={styles.newsletterStatus}
            lightColor={newsletterStatus.type === 'success' ? '#e2f7ff' : '#facc15'}
            darkColor={newsletterStatus.type === 'success' ? '#e2f7ff' : '#fde68a'}
          >
            {newsletterStatus.message}
          </ThemedText>
        ) : null}
      </LinearGradient>
    </ParallaxScrollView>
  );
}

function SectionHeader({
  title,
  caption,
  icon,
}: {
  title: string;
  caption: string;
  icon: ComponentProps<typeof IconSymbol>['name'];
}) {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <IconSymbol name={icon} size={24} color={palette.tint} />
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {title}
        </ThemedText>
      </View>
      <ThemedText style={styles.sectionCaption}>{caption}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 260,
  },
  hero: {
    paddingTop: 24,
    paddingBottom: 8,
    gap: 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0f172a',
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
  metricRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  metricCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexGrow: 1,
    minWidth: 100,
    gap: 4,
  },
  metricValue: {
    fontSize: 24,
  },
  metricLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    gap: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 22,
  },
  sectionCaption: {
    opacity: 0.7,
  },
  quickGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  quickCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickContent: {
    flex: 1,
    gap: 2,
  },
  quickTitle: {
    fontSize: 17,
  },
  quickSubtitle: {
    fontSize: 13,
    opacity: 0.75,
  },
  featureCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featureImage: {
    width: '100%',
    height: 180,
  },
  featureContent: {
    padding: 20,
    gap: 10,
  },
  featureTitle: {
    fontSize: 20,
  },
  featureMeta: {
    fontSize: 13,
    opacity: 0.8,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  featureSummary: {
    fontSize: 15,
    lineHeight: 22,
  },
  featureAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  panelCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    gap: 20,
  },
  protestRow: {
    gap: 8,
  },
  protestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  protestRegion: {
    fontSize: 18,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  protestMovement: {
    fontSize: 15,
    fontWeight: '600',
  },
  protestUpdate: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
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
  indexContainer: {
    borderRadius: 20,
    padding: 20,
    gap: 18,
    borderWidth: 1,
  },
  indexRow: {
    gap: 6,
  },
  indexHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indexCountry: {
    fontSize: 18,
  },
  indexScoreGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  indexScore: {
    fontSize: 18,
  },
  indexDelta: {
    fontSize: 13,
    opacity: 0.7,
  },
  forwardContainer: {
    borderRadius: 20,
    padding: 20,
    gap: 16,
    borderWidth: 1,
  },
  forwardCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  forwardContent: {
    gap: 6,
    flex: 1,
  },
  forwardTitle: {
    fontSize: 18,
  },
  forwardSummary: {
    fontSize: 15,
    lineHeight: 22,
  },
  newsletterCard: {
    marginTop: 32,
    borderRadius: 26,
    padding: 24,
    gap: 18,
    overflow: 'hidden',
  },
  newsletterHeader: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  newsletterIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsletterTextBlock: {
    flex: 1,
    gap: 6,
  },
  newsletterTitle: {
    color: '#ffffff',
    fontSize: 22,
  },
  newsletterSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    lineHeight: 22,
  },
  newsletterForm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  newsletterInput: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 16,
  },
  newsletterButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
  },
  newsletterButtonText: {
    color: '#0f172a',
    fontSize: 16,
  },
  newsletterStatus: {
    fontSize: 14,
    opacity: 0.9,
  },
});

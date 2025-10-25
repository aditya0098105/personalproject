import type { ComponentProps } from 'react';
import { useCallback, useState } from 'react';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TimelineLogo } from '@/components/timeline-logo';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
  documentarySpotlight,
  governanceSpotlight,
  protestWatchHighlights,
} from '@/constants/content';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const heroMetrics = [
  { label: 'Global correspondents', value: '118' },
  { label: 'Policy briefings / week', value: '42' },
  { label: 'Investigations active', value: '23' },
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
  {
    title: 'Command Center',
    subtitle: 'Investor-grade controls',
    icon: 'slider.horizontal.3',
    route: '/(tabs)/command-center',
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
  const borderSubtle = colorScheme === 'dark' ? palette.stroke ?? 'rgba(148, 163, 184, 0.25)' : palette.stroke ?? '#e2e8f0';
  const highlightSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.72)' : palette.card ?? '#ffffff';
  const featureSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.85)' : '#0f172a';
  const panelSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : palette.card ?? '#ffffff';
  const forwardSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.12)' : '#f6f7fb';
  const tintedSurface = colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.28)' : 'rgba(99, 102, 241, 0.12)';
  const heroBadgeForeground = colorScheme === 'dark' ? '#f8fafc' : palette.background;
  const heroBadgeBackground = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.88)' : '#ffffff';
  const documentaryBadgeSurface = colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.35)' : 'rgba(15, 23, 42, 0.45)';
  const documentaryBadgeText = '#f8fafc';
  const documentaryTagSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(226, 232, 240, 0.76)';
  const documentaryTagText = colorScheme === 'dark' ? '#f8fafc' : '#0f172a';
  const documentaryDurationText = colorScheme === 'dark' ? 'rgba(226, 232, 240, 0.92)' : 'rgba(241, 245, 249, 0.95)';
  const documentarySummaryText = colorScheme === 'dark' ? 'rgba(226, 232, 240, 0.86)' : 'rgba(248, 250, 252, 0.92)';
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
    Alert.alert('You’re on the list', 'We’ll deliver our next Timeline Intelligence digest straight to you.');
  }, [newsletterEmail]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#111827', '#1f2937'] : ['#eef2ff', '#e0f2fe']}
        style={styles.heroShell}
      >
        <View style={[styles.hero, { backgroundColor: heroBadgeBackground }] }>
          <View style={styles.heroHeaderRow}>
            <TimelineLogo size={52} showWordmark stacked />
            <View style={styles.heroCtaBlock}>
              <ThemedText style={[styles.heroCtaLabel, { color: heroBadgeForeground }]}>Live brief</ThemedText>
              <Pressable
                onPress={() => router.push('/news')}
                style={[styles.heroButton, { backgroundColor: heroBadgeForeground }]}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={[styles.heroButtonLabel, { color: palette.tint }]}
                  lightColor={palette.tint}
                  darkColor={palette.tint}
                >
                  View headlines
                </ThemedText>
              </Pressable>
            </View>
          </View>
          <ThemedText type="title" style={styles.heroTitle}>
            Global Affairs Index
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Precision reporting, cinematic storytelling, and actionable briefings for decision-makers navigating volatile
            civic landscapes.
          </ThemedText>
          <View style={styles.metricRow}>
            {heroMetrics.map((metric) => (
              <ThemedView
                key={metric.label}
                lightColor={metric.tone === 'accent' ? 'rgba(20, 184, 166, 0.08)' : highlightSurface}
                darkColor={metric.tone === 'accent' ? 'rgba(45, 212, 191, 0.12)' : highlightSurface}
                style={[styles.metricCard, { borderColor: borderSubtle }]}
              >
                <View style={styles.metricPill}>
                  <LinearGradient
                    colors={
                      metric.tone === 'accent'
                        ? palette.secondaryGradient ?? [palette.tint, palette.accent]
                        : palette.gradient ?? [palette.tint, palette.accent]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.metricAccent}
                  />
                  <ThemedText type="subtitle" style={styles.metricValue}>
                    {metric.value}
                  </ThemedText>
                </View>
                <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
              </ThemedView>
            ))}
          </View>
        </View>
      </LinearGradient>

      <SectionHeader title="Quick launch" caption="Jump straight to live dashboards" icon="sparkles" />
      <View style={styles.quickGrid}>
        {quickActions.map((action) => (
          <Pressable
            key={action.title}
            onPress={() => router.push(action.route)}
            style={[styles.quickCard, { borderColor: borderSubtle, backgroundColor: highlightSurface }]}
          >
            <LinearGradient
              colors={palette.gradient ?? [palette.tint, palette.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickIconWrap}
            >
              <IconSymbol name={action.icon as ComponentProps<typeof IconSymbol>['name']} size={22} color="#ffffff" />
            </LinearGradient>
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.documentaryCarousel}
      >
        {documentarySpotlight.map((feature, index) => (
          <Pressable
            key={feature.slug}
            onPress={() => handleOpenDocumentary(feature.url)}
            style={[
              styles.documentaryCard,
              {
                backgroundColor: featureSurface,
                borderColor: borderSubtle,
                marginLeft: index === 0 ? 4 : 0,
              },
            ]}
          >
            <Image source={{ uri: feature.image }} style={styles.documentaryMedia} contentFit="cover" />
            <LinearGradient
              colors={['rgba(15,23,42,0.1)', 'rgba(15,23,42,0.92)']}
              style={styles.documentaryOverlay}
            />
            <View style={styles.documentaryInfo}>
              <View style={styles.documentaryMetaRow}>
                <View style={[styles.documentaryBadge, { backgroundColor: documentaryBadgeSurface }]}>
                  <IconSymbol name="sparkles" size={14} color={documentaryBadgeText} />
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.documentaryBadgeLabel}
                    lightColor={documentaryBadgeText}
                    darkColor={documentaryBadgeText}
                  >
                    Spotlight
                  </ThemedText>
                </View>
                <ThemedText
                  style={styles.documentaryDuration}
                  lightColor={documentaryDurationText}
                  darkColor={documentaryDurationText}
                >
                  {feature.duration}
                </ThemedText>
              </View>

              <ThemedText
                type="subtitle"
                style={styles.documentaryTitle}
                lightColor="#f8fafc"
                darkColor="#f8fafc"
              >
                {feature.title}
              </ThemedText>
              <ThemedText
                style={styles.documentarySummary}
                lightColor={documentarySummaryText}
                darkColor={documentarySummaryText}
              >
                {feature.summary}
              </ThemedText>

              <View style={styles.documentaryTags}>
                {feature.tags.slice(0, 2).map((tag) => (
                  <View
                    key={`${feature.slug}-${tag}`}
                    style={[styles.documentaryTag, { backgroundColor: documentaryTagSurface }]}
                  >
                    <ThemedText
                      style={styles.documentaryTagLabel}
                      lightColor={documentaryTagText}
                      darkColor={documentaryTagText}
                    >
                      {tag}
                    </ThemedText>
                  </View>
                ))}
              </View>

              <View style={styles.documentaryAction}>
                <IconSymbol name="play.fill" size={16} color={palette.tint} />
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.documentaryActionLabel}
                  lightColor={palette.tint}
                  darkColor={palette.tint}
                >
                  Watch trailer
                </ThemedText>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

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
        <LinearGradient
          colors={palette.secondaryGradient ?? [palette.tint, palette.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.sectionIconBadge}
        >
          <IconSymbol name={icon} size={18} color="#ffffff" />
        </LinearGradient>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {title}
        </ThemedText>
      </View>
      <View style={[styles.sectionAccent, { backgroundColor: palette.tint }]} />
      <ThemedText style={styles.sectionCaption}>{caption}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 260,
  },
  heroShell: {
    borderRadius: 28,
    padding: 2,
    marginTop: -32,
    marginBottom: 16,
  },
  hero: {
    padding: 24,
    gap: 18,
    borderRadius: 26,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroCtaBlock: {
    alignItems: 'flex-end',
    gap: 12,
  },
  heroCtaLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  heroButton: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heroButtonLabel: {
    fontSize: 15,
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 36,
    lineHeight: 40,
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
    paddingVertical: 16,
    flexGrow: 1,
    minWidth: 100,
    gap: 4,
  },
  metricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricAccent: {
    width: 8,
    height: 32,
    borderRadius: 999,
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
    gap: 6,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionIconBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
  },
  sectionAccent: {
    width: 36,
    height: 3,
    borderRadius: 999,
  },
  sectionCaption: {
    opacity: 0.7,
    fontSize: 14,
  },
  quickGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  quickCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
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
  documentaryCarousel: {
    paddingBottom: 4,
    paddingRight: 24,
  },
  documentaryCard: {
    width: 280,
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  documentaryMedia: {
    ...StyleSheet.absoluteFillObject,
  },
  documentaryOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  documentaryInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    gap: 10,
  },
  documentaryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  documentaryBadgeLabel: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  documentaryDuration: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  documentaryTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  documentarySummary: {
    fontSize: 14,
    lineHeight: 20,
  },
  documentaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  documentaryTag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  documentaryTagLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  documentaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  documentaryActionLabel: {
    fontSize: 14,
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

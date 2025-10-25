import { useMemo } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Switch, View, Pressable } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { tractionMetrics, productPillars, upcomingMilestones } from '@/constants/investor-highlights';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { RefreshCadence, ThemePreference, usePreferences } from '@/contexts/preferences-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

const themeOptions: { label: string; value: ThemePreference }[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const cadenceOptions: { label: string; value: RefreshCadence; blurb: string }[] = [
  { label: 'Live', value: 'live', blurb: 'Instant data sync & newsroom alerts' },
  { label: '15 min', value: '15m', blurb: 'Smart batching + battery saver' },
  { label: 'Hourly', value: 'hourly', blurb: 'Offline-first, long field ops' },
];

export default function CommandCenterScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const {
    preferences,
    setTheme,
    setPreference,
    resetPreferences,
  } = usePreferences();

  const cardSurface = isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff';
  const accentSurface = isDark ? 'rgba(99, 102, 241, 0.28)' : 'rgba(79, 70, 229, 0.12)';
  const borderSubtle = palette.stroke ?? (isDark ? 'rgba(148, 163, 184, 0.2)' : '#e2e8f0');
  const chipInactive = isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(226, 232, 240, 0.7)';
  const chipActiveText = isDark ? '#0f172a' : '#ffffff';
  const chipActiveBg = palette.tint;

  const investorHeadline = useMemo(() => {
    const firstName = user?.name?.split(' ')[0] ?? 'Investor';
    return `${firstName}, this is where Timeline breaks through.`;
  }, [user?.name]);

  const handleToggle = async (key: 'realtimeAlerts' | 'hapticFeedback' | 'offlineMode') => {
    await setPreference(key, !preferences[key]);
  };

  const handleCadenceChange = async (value: RefreshCadence) => {
    if (preferences.refreshCadence !== value) {
      await setPreference('refreshCadence', value);
    }
  };

  const handleThemeChange = async (value: ThemePreference) => {
    if (preferences.theme !== value) {
      await setTheme(value);
    }
  };

  const handleReset = () => {
    void resetPreferences();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1d1f3b', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }
    >
      <LinearGradient
        colors={isDark ? ['#111827', '#1e293b'] : ['#eef2ff', '#dbeafe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={[styles.heroBadge, { backgroundColor: accentSurface }] }>
          <IconSymbol name="sparkles" size={18} color={palette.tint} />
          <ThemedText style={[styles.heroBadgeText, { color: palette.tint }]}>Investor preview</ThemedText>
        </View>
        <ThemedText type="title" style={styles.heroTitle} lightColor="#0f172a" darkColor="#e2e8f0">
          {investorHeadline}
        </ThemedText>
        <ThemedText style={styles.heroSubtitle} lightColor="rgba(15, 23, 42, 0.75)" darkColor="rgba(226, 232, 240, 0.78)">
          From field reporters to policy labs, every signal lands here first. Personalise the operations stack and brief
          stakeholders with confidence.
        </ThemedText>
      </LinearGradient>

      <ThemedView style={[styles.metricCard, { borderColor: borderSubtle }]} lightColor={cardSurface} darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Traction signals
        </ThemedText>
        <ThemedText style={styles.sectionCaption}>
          Real usage from the past 30 days across global desks
        </ThemedText>
        <View style={styles.metricRow}>
          {tractionMetrics.map((metric) => (
            <View key={metric.label} style={styles.metricItem}>
              <ThemedText type="title" style={styles.metricValue}>
                {metric.value}
              </ThemedText>
              <ThemedText style={[styles.metricLabel, { color: palette.tint }]}>{metric.label}</ThemedText>
              <ThemedText style={styles.metricDelta} lightColor="rgba(15, 23, 42, 0.6)" darkColor="rgba(226, 232, 240, 0.7)">
                {metric.delta}
              </ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.settingsCard, { borderColor: borderSubtle }]} lightColor={cardSurface} darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Experience controls
        </ThemedText>
        <ThemedText style={styles.sectionCaption}>
          Tune Timeline to match your field team’s rhythms before launch day.
        </ThemedText>

        <View style={styles.preferenceGroup}>
          <ThemedText type="defaultSemiBold" style={styles.preferenceTitle}>
            Theme
          </ThemedText>
          <View style={styles.chipRow}>
            {themeOptions.map((option) => {
              const isActive = preferences.theme === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleThemeChange(option.value)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: isActive ? chipActiveBg : chipInactive,
                      borderColor: isActive ? chipActiveBg : 'transparent',
                    },
                  ]}
                >
                  <ThemedText style={[styles.chipLabel, { color: isActive ? chipActiveText : palette.tint }]}>
                    {option.label}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.preferenceGroup}>
          <ThemedText type="defaultSemiBold" style={styles.preferenceTitle}>
            Alert routing
          </ThemedText>
          <PreferenceToggle
            label="Realtime escalations"
            description="Push critical incidents to every logged-in editor without delay."
            value={preferences.realtimeAlerts}
            onValueChange={() => handleToggle('realtimeAlerts')}
            tint={palette.tint}
          />
          <PreferenceToggle
            label="Tactile feedback"
            description="Keep gentle haptics across navigation to reinforce mission-critical taps."
            value={preferences.hapticFeedback}
            onValueChange={() => handleToggle('hapticFeedback')}
            tint={palette.tint}
          />
          <PreferenceToggle
            label="Offline field kit"
            description="Cache investigations, briefings, and video packages for correspondents in low-connectivity regions."
            value={preferences.offlineMode}
            onValueChange={() => handleToggle('offlineMode')}
            tint={palette.tint}
          />
        </View>

        <View style={styles.preferenceGroup}>
          <ThemedText type="defaultSemiBold" style={styles.preferenceTitle}>
            Data cadence
          </ThemedText>
          <ThemedText style={styles.sectionCaption}>
            Choose how often dashboards pull fresh telemetry.
          </ThemedText>
          <View style={styles.cadenceRow}>
            {cadenceOptions.map((option) => {
              const isActive = preferences.refreshCadence === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleCadenceChange(option.value)}
                  style={[
                    styles.cadenceCard,
                    {
                      borderColor: isActive ? palette.tint : borderSubtle,
                      backgroundColor: isActive ? accentSurface : 'transparent',
                    },
                  ]}
                >
                  <ThemedText type="defaultSemiBold" style={styles.cadenceLabel}>
                    {option.label}
                  </ThemedText>
                  <ThemedText style={styles.cadenceBlurb}>{option.blurb}</ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable onPress={handleReset} style={[styles.resetButton, { borderColor: borderSubtle }]}>
          <IconSymbol name="arrow.counterclockwise" size={16} color={palette.tint} />
          <ThemedText style={[styles.resetLabel, { color: palette.tint }]}>Reset to recommended</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={[styles.pillarsCard, { borderColor: borderSubtle }]} lightColor={cardSurface} darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Product pillars
        </ThemedText>
        <ThemedText style={styles.sectionCaption}>
          Built with investigative teams, civic technologists, and movement leaders.
        </ThemedText>
        <View style={styles.pillarsGrid}>
          {productPillars.map((pillar) => (
            <View key={pillar.title} style={[styles.pillarItem, { backgroundColor: accentSurface }] }>
              <ThemedText type="defaultSemiBold" style={styles.pillarTitle}>
                {pillar.title}
              </ThemedText>
              <ThemedText style={styles.pillarSummary}>{pillar.summary}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.timelineCard, { borderColor: borderSubtle }]} lightColor={cardSurface} darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Upcoming milestones
        </ThemedText>
        <ThemedText style={styles.sectionCaption}>
          Each phase is resourced, staffed, and ready for boardroom scrutiny.
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.milestoneRow}>
          {upcomingMilestones.map((milestone) => (
            <View key={milestone.title} style={[styles.milestoneCard, { borderColor: borderSubtle }] }>
              <View style={[styles.milestoneBadge, { backgroundColor: accentSurface }]}>
                <IconSymbol name="calendar" size={16} color={palette.tint} />
                <ThemedText style={[styles.milestoneDue, { color: palette.tint }]}>{milestone.due}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.milestoneTitle}>
                {milestone.title}
              </ThemedText>
              <ThemedText style={styles.milestoneDetail}>{milestone.detail}</ThemedText>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

function PreferenceToggle({
  label,
  description,
  value,
  onValueChange,
  tint,
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: () => void | Promise<void>;
  tint: string;
}) {
  const colorScheme = useColorScheme();
  const trackTint = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.35)' : '#cbd5f5';

  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleCopy}>
        <ThemedText type="defaultSemiBold" style={styles.toggleLabel}>
          {label}
        </ThemedText>
        <ThemedText style={styles.toggleDescription}>{description}</ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={() => {
          void onValueChange();
        }}
        trackColor={{ true: tint, false: trackTint }}
        thumbColor="#ffffff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 260,
  },
  hero: {
    borderRadius: 28,
    padding: 24,
    gap: 14,
    marginBottom: 24,
  },
  heroBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroBadgeText: {
    fontSize: 13,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  metricCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    marginBottom: 24,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  metricItem: {
    flex: 1,
    minWidth: 110,
    gap: 6,
  },
  metricValue: {
    fontSize: 28,
  },
  metricLabel: {
    fontSize: 14,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  metricDelta: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 22,
  },
  sectionCaption: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  settingsCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    marginBottom: 24,
    gap: 24,
  },
  preferenceGroup: {
    gap: 14,
  },
  preferenceTitle: {
    fontSize: 17,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 12,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipLabel: {
    fontSize: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  toggleCopy: {
    flex: 1,
    gap: 6,
  },
  toggleLabel: {
    fontSize: 16,
  },
  toggleDescription: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.75,
  },
  cadenceRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  cadenceCard: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
    minWidth: 120,
  },
  cadenceLabel: {
    fontSize: 15,
  },
  cadenceBlurb: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.78,
  },
  resetButton: {
    borderWidth: 1,
    borderRadius: 999,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resetLabel: {
    fontSize: 14,
  },
  pillarsCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    marginBottom: 24,
    gap: 16,
  },
  pillarsGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  pillarItem: {
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  pillarTitle: {
    fontSize: 17,
  },
  pillarSummary: {
    fontSize: 14,
    lineHeight: 20,
  },
  timelineCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    gap: 16,
    marginBottom: 32,
  },
  milestoneRow: {
    gap: 18,
    paddingRight: 6,
  },
  milestoneCard: {
    width: 220,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  milestoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  milestoneDue: {
    fontSize: 13,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  milestoneTitle: {
    fontSize: 16,
  },
  milestoneDetail: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.82,
  },
});

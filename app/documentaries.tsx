import { useCallback } from 'react';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { documentaryLibrary } from '@/constants/content';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DocumentaryLibraryScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : '#ffffff';
  const tagSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 118, 110, 0.12)';
  const borderSubtle = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.24)' : '#e2e8f0';

  const handleOpenLink = useCallback(async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1522199994321-141d1a942d89?auto=format&fit=crop&w=1600&q=80',
            }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.05)', 'rgba(15, 23, 42, 0.55)', 'rgba(15, 23, 42, 0.85)']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroContent}>
            <View
              style={[
                styles.heroBadge,
                {
                  backgroundColor:
                    colorScheme === 'dark' ? 'rgba(45, 212, 191, 0.24)' : 'rgba(15, 118, 110, 0.18)',
                },
              ]}
            >
              <IconSymbol name="film" size={16} color={palette.tint} />
              <ThemedText style={[styles.heroBadgeLabel, { color: palette.tint }]}>Field Report Series</ThemedText>
            </View>
            <ThemedText type="title" style={styles.heroTitle}>
              Documentary Library
            </ThemedText>
            <ThemedText
              style={[
                styles.heroSubtitle,
                {
                  color: colorScheme === 'dark' ? 'rgba(226, 232, 240, 0.92)' : 'rgba(15, 23, 42, 0.76)',
                },
              ]}
            >
              Curated reportage and cinematic stories spotlighting communities shaping resilient futures.
            </ThemedText>
          </View>
        </View>
      }
    >
      <ThemedView style={styles.intro}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Explore immersive field reporting, cinematic stories, and co-productions from every region of the globe. Tap any film
          to open the latest cut or trailer on YouTube.
        </ThemedText>
      </ThemedView>

      {documentaryLibrary.map((doc) => (
        <Pressable
          key={doc.slug}
          onPress={() => handleOpenLink(doc.url)}
          android_ripple={{ color: palette.tint, borderless: false }}
          style={({ pressed }) => [
            styles.card,
            colorScheme === 'dark' ? styles.cardShadowDark : styles.cardShadowLight,
            { backgroundColor: cardSurface, borderColor: borderSubtle },
            pressed && styles.cardPressed,
          ]}
        >
          <Image source={{ uri: doc.image }} style={styles.cardImage} contentFit="cover" />
          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {doc.title}
              </ThemedText>
              <View style={styles.durationPill}>
                <IconSymbol name="clock.fill" size={14} color={palette.tint} />
                <ThemedText style={[styles.durationText, { color: palette.tint }]}>{doc.duration}</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.cardSummary}>{doc.summary}</ThemedText>
            <View style={styles.tagRow}>
              {doc.tags.map((tag) => (
                <ThemedView
                  key={tag}
                  lightColor={tagSurface}
                  darkColor={tagSurface}
                  style={[styles.tag, { borderColor: palette.tint }]}
                >
                  <ThemedText style={[styles.tagLabel, { color: palette.tint }]}>{tag}</ThemedText>
                </ThemedView>
              ))}
            </View>
            <View style={styles.cardFooter}>
              <ThemedText type="defaultSemiBold" style={[styles.footerText, { color: palette.tint }]}>
                Watch on YouTube
              </ThemedText>
              <IconSymbol name="arrow.up.right" size={16} color={palette.tint} />
            </View>
          </View>
        </Pressable>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroContent: {
    paddingHorizontal: 28,
    paddingBottom: 32,
    gap: 12,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroBadgeLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 36,
    lineHeight: 42,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  intro: {
    gap: 8,
    paddingBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  cardImage: {
    width: '100%',
    height: 220,
  },
  cardBody: {
    padding: 22,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 20,
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(15, 118, 110, 0.16)',
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cardSummary: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tagLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 14,
  },
  cardShadowLight: {
    shadowColor: 'rgba(15, 23, 42, 0.35)',
    shadowOpacity: 0.22,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  cardShadowDark: {
    shadowColor: 'rgba(15, 23, 42, 0.8)',
    shadowOpacity: 0.32,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 18 },
    elevation: 4,
  },
  cardPressed: {
    transform: [{ translateY: 2 }],
    opacity: 0.92,
  },
});

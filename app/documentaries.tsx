import { useCallback } from 'react';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
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
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1522199994321-141d1a942d89?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.intro}>
        <ThemedText type="title" style={styles.title}>
          Documentary Library
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Explore immersive field reporting, cinematic stories, and co-productions from every region of the globe. Tap any film
          to open the latest cut or trailer on YouTube.
        </ThemedText>
      </ThemedView>

      {documentaryLibrary.map((doc) => (
        <Pressable
          key={doc.slug}
          onPress={() => handleOpenLink(doc.url)}
          style={[styles.card, { backgroundColor: cardSurface, borderColor: borderSubtle }]}
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
                  style={styles.tag}
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
  headerImage: {
    width: '100%',
    height: 240,
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
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: 220,
  },
  cardBody: {
    padding: 20,
    gap: 12,
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
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 14,
  },
});

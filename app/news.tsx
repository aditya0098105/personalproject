import { useCallback } from 'react';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { newsBriefs } from '@/constants/content';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function NewsroomFeedScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : '#ffffff';
  const borderSubtle = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.24)' : '#e2e8f0';

  const handleOpen = useCallback(async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1e293b', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.intro}>
        <ThemedText type="title" style={styles.title}>
          Current News Desk
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Live wires, policy bulletins, and solution stories shaping today&apos;s agenda. Tap any headline to jump into the
          companion briefing clip.
        </ThemedText>
      </ThemedView>

      {newsBriefs.map((item) => (
        <Pressable
          key={item.slug}
          onPress={() => handleOpen(item.url)}
          style={[styles.card, { backgroundColor: cardSurface, borderColor: borderSubtle }]}
        >
          <Image source={{ uri: item.image }} style={styles.cardImage} contentFit="cover" />
          <View style={styles.cardBody}>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <IconSymbol name="newspaper.fill" size={16} color={palette.tint} />
                <ThemedText style={[styles.metaText, { color: palette.tint }]}>{item.source}</ThemedText>
              </View>
              <View style={styles.metaItem}>
                <IconSymbol name="clock" size={16} color={palette.tint} />
                <ThemedText style={styles.metaText}>{item.time}</ThemedText>
              </View>
            </View>
            <ThemedText type="subtitle" style={styles.headline}>
              {item.headline}
            </ThemedText>
            <ThemedText style={styles.summary}>{item.summary}</ThemedText>
            <View style={styles.cardFooter}>
              <ThemedText type="defaultSemiBold" style={[styles.footerText, { color: palette.tint }]}>
                View briefing
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
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 20,
    gap: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: 20,
    lineHeight: 28,
  },
  summary: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
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

import { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

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
  const cardAnimations = useRef(documentaryLibrary.map(() => new Animated.Value(0))).current;

  const handleOpenLink = useCallback(async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  }, []);

  useFocusEffect(
    useCallback(() => {
      cardAnimations.forEach((value) => value.setValue(0));

      const animations = cardAnimations.map((value, index) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 450,
          delay: index * 90,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      );

      const composite = Animated.stagger(90, animations);
      composite.start();

      return () => {
        animations.forEach((animation) => {
          animation.stop();
        });
      };
    }, [cardAnimations]),
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
            }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.05)', 'rgba(15, 23, 42, 0.55)', 'rgba(15, 23, 42, 0.9)']}
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
              <IconSymbol name="film.stack" size={16} color={palette.tint} />
              <ThemedText style={[styles.heroBadgeLabel, { color: palette.tint }]}>Timeline Originals</ThemedText>
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
              International investigations, climate field reports, and culture features from award-winning partners.
            </ThemedText>
          </View>
        </View>
      }
    >
      <ThemedView style={styles.intro}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Each title is verified for release rights and editorial sourcing before landing in this library. Tap any film to open
          the latest cut or trailer.
        </ThemedText>
        <ThemedView
          lightColor={colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.55)' : '#f8fafc'}
          darkColor={colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.55)' : '#f8fafc'}
          style={[styles.programmingNote, { borderColor: borderSubtle }]}
        >
          <IconSymbol name="checkmark.seal.fill" size={18} color={palette.tint} />
          <View style={styles.programmingCopy}>
            <ThemedText type="defaultSemiBold" style={styles.programmingTitle}>
              Programming brief
            </ThemedText>
            <ThemedText style={styles.programmingBody}>
              Metadata includes broadcaster, release year, and thematic tags so producers can assemble briefs in seconds.
            </ThemedText>
          </View>
        </ThemedView>
      </ThemedView>

      {documentaryLibrary.map((doc, index) => (
        <Animated.View
          key={doc.slug}
          style={[
            styles.animatedCard,
            {
              opacity: cardAnimations[index],
              transform: [
                {
                  translateY: cardAnimations[index].interpolate({ inputRange: [0, 1], outputRange: [24, 0] }),
                },
              ],
            },
          ]}
        >
          <Pressable
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
                <View style={styles.cardTitleBlock}>
                  <ThemedText type="subtitle" style={styles.cardTitle}>
                    {doc.title}
                  </ThemedText>
                  <ThemedText style={styles.cardMeta}>{doc.duration}</ThemedText>
                </View>
                <View style={styles.publisherBadge}>
                  <IconSymbol name="sparkles" size={14} color={palette.tint} />
                  <ThemedText style={[styles.publisherText, { color: palette.tint }]}>Timeline Picks</ThemedText>
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
                  View documentary briefing
                </ThemedText>
                <IconSymbol name="arrow.up.right" size={16} color={palette.tint} />
              </View>
            </View>
          </Pressable>
        </Animated.View>
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
    gap: 12,
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  programmingNote: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  programmingCopy: {
    flex: 1,
    gap: 4,
  },
  programmingTitle: {
    fontSize: 13,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  programmingBody: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.8,
  },
  animatedCard: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
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
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTitleBlock: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 20,
  },
  cardMeta: {
    fontSize: 13,
    opacity: 0.75,
  },
  publisherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.32)',
  },
  publisherText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
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
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 14,
    letterSpacing: 0.2,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  cardShadowLight: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardShadowDark: {
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
});

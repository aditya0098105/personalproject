import { useCallback, useMemo } from 'react';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ArticleSearchParams = {
  articleId?: string;
  title?: string;
  image?: string;
  author?: string;
  description?: string;
  content?: string;
  url?: string;
  source?: string;
};

export default function ArticleDetailsScreen() {
  const params = useLocalSearchParams<ArticleSearchParams>();
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  const placeholderImage = useMemo(
    () =>
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    [],
  );

  const imageSource = useMemo(() => {
    if (typeof params.image === 'string' && params.image.trim().length > 0) {
      return { uri: params.image };
    }

    return { uri: placeholderImage };
  }, [params.image, placeholderImage]);

  const articleTitle = useMemo(() => {
    if (typeof params.title === 'string' && params.title.trim().length > 0) {
      return params.title.trim();
    }

    return 'Top headline';
  }, [params.title]);

  const articleAuthor = useMemo(() => {
    if (typeof params.author === 'string' && params.author.trim().length > 0) {
      return params.author.trim();
    }

    if (typeof params.source === 'string' && params.source.trim().length > 0) {
      return params.source.trim();
    }

    return null;
  }, [params.author, params.source]);

  const articleBody = useMemo(() => {
    const baseText =
      (typeof params.content === 'string' && params.content.trim().length > 0
        ? params.content
        : typeof params.description === 'string' && params.description.trim().length > 0
          ? params.description
          : null) ??
      'No additional details are available for this headline right now.';

    return baseText.replace(/\s*\[[^\]]*\]$/g, '').trim();
  }, [params.content, params.description]);

  const headerTitle = useMemo(() => {
    if (typeof params.source === 'string' && params.source.trim().length > 0) {
      return params.source.trim();
    }

    return 'Article';
  }, [params.source]);

  const handleReadMore = useCallback(() => {
    if (typeof params.url === 'string' && params.url.trim().length > 0) {
      WebBrowser.openBrowserAsync(params.url);
    }
  }, [params.url]);

  const canOpenOriginal = typeof params.url === 'string' && params.url.trim().length > 0;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: headerTitle }} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image source={imageSource} style={styles.image} contentFit="cover" transition={200} />
        </View>
        <View style={styles.body}>
          <ThemedText type="title" style={styles.title}>
            {articleTitle}
          </ThemedText>
          {articleAuthor && (
            <ThemedText style={styles.author}>
              By {articleAuthor}
            </ThemedText>
          )}
          <ThemedText style={styles.description}>{articleBody}</ThemedText>
        </View>
      </ScrollView>
      {canOpenOriginal && (
        <Pressable
          style={[styles.readMoreButton, { backgroundColor: palette.tint }]}
          onPress={handleReadMore}
        >
          <ThemedText style={styles.readMoreLabel} lightColor="#ffffff" darkColor="#020617">
            Read More
          </ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#cbd5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.85,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.92,
  },
  readMoreButton: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  readMoreLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

import { useMemo } from 'react';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { isStreamingUrl, resolveVideoSource } from '@/utils/media';

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

  const videoSource = useMemo(() => resolveVideoSource(params.url), [params.url]);
  const isStreaming = isStreamingUrl(params.url);

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
        {videoSource && (
          <View style={styles.videoSection}>
            <ThemedText type="subtitle" style={styles.videoHeading}>
              Watch the briefing
            </ThemedText>
            <View style={styles.videoWrapper}>
              <Video
                key={params.articleId ?? 'article-video'}
                style={styles.video}
                source={videoSource}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay={false}
              />
            </View>
            <ThemedText style={styles.videoMeta}>
              {isStreaming ? 'Streaming from source link.' : 'Playing from local file path.'}
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
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
  videoSection: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  videoHeading: {
    fontSize: 20,
    lineHeight: 26,
  },
  videoWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  videoMeta: {
    fontSize: 14,
    opacity: 0.75,
  },
});

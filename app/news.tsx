import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Article = {
  title: string;
  url: string;
  urlToImage: string | null;
  source?: {
    name: string;
  };
};

const NEWS_ENDPOINT =
  'https://newsapi.org/v2/top-headlines?country=in&apiKey=74b7470ec5f24a8fa53345cf782bc0cc';

export default function NewsroomFeedScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardSurface = isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff';
  const borderSubtle = isDark ? 'rgba(148, 163, 184, 0.24)' : '#e2e8f0';
  const placeholderImage = useMemo(
    () =>
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    [],
  );

  const fetchArticles = useCallback(async (isRefresh = false) => {
    try {
      setError(null);
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(NEWS_ENDPOINT);
      if (!response.ok) {
        throw new Error('Unable to reach NewsAPI.');
      }

      const payload = await response.json();
      if (payload.status !== 'ok') {
        throw new Error(payload.message ?? 'Unexpected response from NewsAPI.');
      }

      setArticles(payload.articles ?? []);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError instanceof Error ? fetchError.message : 'Something went wrong.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles(false);
  }, [fetchArticles]);

  const handleOpen = useCallback(async (url: string) => {
    if (!url) return;
    await WebBrowser.openBrowserAsync(url);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchArticles(true);
  }, [fetchArticles]);

  const renderArticle: ListRenderItem<Article> = useCallback(
    ({ item }) => {
      const imageSource = item.urlToImage ? { uri: item.urlToImage } : { uri: placeholderImage };

      return (
        <Pressable
          onPress={() => handleOpen(item.url)}
          style={[styles.card, { backgroundColor: cardSurface, borderColor: borderSubtle }]}
        >
          <Image source={imageSource} style={styles.cardImage} contentFit="cover" transition={200} />
          <View style={styles.cardBody}>
            <ThemedText style={[styles.sourceLabel, { color: palette.tint }]} numberOfLines={1}>
              {item.source?.name ?? 'Unknown source'}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.headline} numberOfLines={3}>
              {item.title}
            </ThemedText>
          </View>
        </Pressable>
      );
    },
    [borderSubtle, cardSurface, handleOpen, palette.tint, placeholderImage],
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Top Headlines
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Stay updated with the latest stories from across India. Pull down to refresh for the newest headlines.
        </ThemedText>
      </View>
    ),
    [],
  );

  const listFooter = useMemo(
    () => (
      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Powered by NewsAPI.org</ThemedText>
      </View>
    ),
    [],
  );

  if (loading && !refreshing && articles.length === 0) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={palette.tint} />
        <ThemedText style={styles.loadingText}>Fetching the latest headlines...</ThemedText>
      </ThemedView>
    );
  }

  if (error && articles.length === 0) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <Pressable style={[styles.retryButton, { backgroundColor: palette.tint }]} onPress={() => fetchArticles(false)}>
          <ThemedText style={styles.retryLabel} lightColor="#ffffff" darkColor="#020617">
            Retry
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        renderItem={renderArticle}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={palette.tint}
            colors={[palette.tint]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
      {error && (
        <View style={[styles.inlineError, { borderColor: palette.tint }]}>
          <ThemedText style={styles.inlineErrorText}>
            {error}
          </ThemedText>
          <Pressable onPress={() => fetchArticles(false)} style={styles.inlineRetry}>
            <ThemedText style={[styles.inlineRetryText, { color: palette.tint }]}>Retry</ThemedText>
          </Pressable>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
  },
  header: {
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.85,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#cbd5f5',
  },
  cardBody: {
    padding: 16,
    gap: 12,
  },
  sourceLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: 20,
    lineHeight: 26,
  },
  separator: {
    height: 20,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  retryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  inlineError: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 149, 128, 0.08)',
    gap: 12,
  },
  inlineErrorText: {
    fontSize: 14,
    lineHeight: 20,
  },
  inlineRetry: {
    alignSelf: 'flex-start',
  },
  inlineRetryText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

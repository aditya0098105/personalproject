import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
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
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FALLBACK_ARTICLES } from '@/constants/news-fallback';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Article = {
  title: string;
  url: string;
  urlToImage: string | null;
  author?: string | null;
  description?: string | null;
  content?: string | null;
  source?: {
    name: string;
  };
};

const NEWS_ENDPOINT = 'https://saurav.tech/NewsAPI/top-headlines/category/general/in.json';
const heroTopics = ['Impact', 'Policy', 'Climate', 'Cities'];

export default function NewsroomFeedScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const cardSurface = palette.card ?? (isDark ? 'rgba(15, 23, 42, 0.78)' : '#ffffff');
  const borderSubtle = palette.stroke ?? (isDark ? 'rgba(148, 163, 184, 0.24)' : '#e2e8f0');
  const tintedSurface = isDark ? 'rgba(99, 102, 241, 0.28)' : 'rgba(99, 102, 241, 0.12)';
  const placeholderImage = useMemo(
    () =>
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    [],
  );

  const parseArticles = useCallback((payload: unknown): Article[] => {
    if (payload && typeof payload === 'object') {
      if ('articles' in payload && Array.isArray((payload as { articles: unknown }).articles)) {
        return (payload as { articles: any[] }).articles
          .map((item) => ({
            title: typeof item?.title === 'string' ? item.title : 'Untitled',
            url: typeof item?.url === 'string' ? item.url : '',
            urlToImage: typeof item?.urlToImage === 'string' ? item.urlToImage : null,
            author: typeof item?.author === 'string' ? item.author : null,
            description: typeof item?.description === 'string' ? item.description : null,
            content: typeof item?.content === 'string' ? item.content : null,
            source: {
              name:
                typeof item?.source?.name === 'string' && item.source.name.trim().length > 0
                  ? item.source.name
                  : 'Unknown source',
            },
          }))
          .filter((item) => item.url);
      }

      if ('data' in payload && Array.isArray((payload as { data: any[] }).data)) {
        return (payload as { data: any[] }).data
          .map((item) => ({
            title: item.title ?? item.content ?? 'Untitled',
            url: item.readMoreUrl ?? item.url ?? '',
            urlToImage: item.imageUrl ?? null,
            author: typeof item?.author === 'string' ? item.author : null,
            description:
              typeof item?.description === 'string'
                ? item.description
                : typeof item?.content === 'string'
                  ? item.content
                  : null,
            content: typeof item?.content === 'string' ? item.content : null,
            source: {
              name: item.author ?? 'Inshorts',
            },
          }))
          .filter((item) => item.url);
      }
    }

    return [];
  }, []);

  const fetchArticles = useCallback(async (isRefresh = false) => {
    try {
      setError(null);
      setUsingFallback(false);
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(NEWS_ENDPOINT, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!response.ok) {
        throw new Error('Unable to reach the headlines service.');
      }

      const payload = await response.json();
      const normalized = parseArticles(payload);
      if (!normalized.length) {
        throw new Error('No articles available right now.');
      }

      setArticles(normalized);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError instanceof Error ? fetchError.message : 'Something went wrong.');
      setArticles([...FALLBACK_ARTICLES]);
      setUsingFallback(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [parseArticles]);

  useEffect(() => {
    fetchArticles(false);
  }, [fetchArticles]);

  const handleNavigate = useCallback(
    (article: Article, index: number) => {
      router.push({
        pathname: '/news/[articleId]',
        params: {
          articleId: String(index),
          title: article.title,
          image: article.urlToImage ?? '',
          author: article.author ?? '',
          description: article.description ?? '',
          content: article.content ?? '',
          url: article.url,
          source: article.source?.name ?? '',
        },
      });
    },
    [router],
  );

  const handleRefresh = useCallback(() => {
    fetchArticles(true);
  }, [fetchArticles]);

  const renderArticle: ListRenderItem<Article> = useCallback(
    ({ item, index }) => {
      const imageSource = item.urlToImage ? { uri: item.urlToImage } : { uri: placeholderImage };

      return (
        <Pressable
          onPress={() => handleNavigate(item, index)}
          style={[styles.card, { backgroundColor: cardSurface, borderColor: borderSubtle }]}
        >
          <View style={styles.cardImageWrap}>
            <Image source={imageSource} style={styles.cardImage} contentFit="cover" transition={200} />
            <LinearGradient
              colors={['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.75)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardImageOverlay}
            />
            <View style={styles.cardBadgeRow}>
              <View style={[styles.cardBadge, { backgroundColor: tintedSurface }]}>
                <ThemedText style={[styles.cardBadgeLabel, { color: palette.tint }]}>Live</ThemedText>
              </View>
            </View>
          </View>
          <View style={styles.cardBody}>
            <ThemedText style={[styles.sourceLabel, { color: palette.tint }]} numberOfLines={1}>
              {item.source?.name ?? 'Unknown source'}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.headline} numberOfLines={3}>
              {item.title}
            </ThemedText>
            {item.description ? (
              <ThemedText style={styles.cardSummary} numberOfLines={3}>
                {item.description}
              </ThemedText>
            ) : null}
            <View style={styles.cardFooter}>
              <View style={styles.cardMeta}>
                {item.author ? <ThemedText style={styles.cardMetaText}>{item.author}</ThemedText> : null}
                <ThemedText style={styles.cardMetaSubtle}>
                  {usingFallback ? 'Cached update' : 'Updated moments ago'}
                </ThemedText>
              </View>
              <IconSymbol name="arrow.right" size={18} color={palette.tint} />
            </View>
          </View>
        </Pressable>
      );
    },
    [borderSubtle, cardSurface, handleNavigate, palette.tint, placeholderImage, tintedSurface, usingFallback],
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        <LinearGradient
          colors={
            colorScheme === 'dark'
              ? palette.gradient ?? ['#4c1d95', '#0f766e']
              : palette.gradient ?? ['#6366f1', '#14b8a6']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroCardBody}>
            <ThemedText style={styles.heroCardEyebrow} lightColor="rgba(255,255,255,0.85)" darkColor="rgba(255,255,255,0.85)">
              Daily briefing
            </ThemedText>
            <ThemedText type="title" style={styles.heroCardTitle} lightColor="#ffffff" darkColor="#ffffff">
              Top headlines
            </ThemedText>
            <ThemedText style={styles.heroCardSubtitle} lightColor="rgba(255,255,255,0.85)" darkColor="rgba(255,255,255,0.85)">
              Stay updated with the latest stories across India. Pull down anytime for a fresh intelligence sweep.
            </ThemedText>
            <View style={styles.heroChipRow}>
              {heroTopics.map((topic) => (
                <View
                  key={topic}
                  style={[
                    styles.heroChip,
                    {
                      backgroundColor: colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.18)',
                    },
                  ]}
                >
                  <ThemedText style={styles.heroChipText} lightColor="#ffffff" darkColor="#ffffff">
                    {topic}
                  </ThemedText>
                </View>
              ))}
            </View>
            <Pressable
              onPress={handleRefresh}
              style={[
                styles.heroRefresh,
                { backgroundColor: colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.24)' },
              ]}
            >
              <ThemedText style={styles.heroRefreshText} lightColor="#ffffff" darkColor="#ffffff">
                Refresh now
              </ThemedText>
              <IconSymbol name="arrow.right" size={16} color="#ffffff" />
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    ),
    [colorScheme, handleRefresh, palette.gradient],
  );

  const listFooter = useMemo(
    () => (
      <View style={styles.footer}>
        <View style={[styles.footerAccent, { backgroundColor: palette.tint }]} />
        <ThemedText style={styles.footerText}>
          {usingFallback
            ? 'Showing cached headlines while we reconnect to live sources.'
            : 'Powered by NewsAPI.org'}
        </ThemedText>
      </View>
    ),
    [palette.tint, usingFallback],
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
      {(error || usingFallback) && (
        <View style={[styles.inlineError, { borderColor: palette.tint }]}>
          <ThemedText style={styles.inlineErrorText}>
            {usingFallback
              ? 'We are showing a cached collection of headlines until the live feed is back online.'
              : error}
          </ThemedText>
          {usingFallback && error && (
            <ThemedText style={[styles.inlineErrorText, styles.inlineErrorSubtle]}>
              {error}
            </ThemedText>
          )}
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
    paddingBottom: 28,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
  },
  heroCard: {
    borderRadius: 26,
    padding: 1,
    overflow: 'hidden',
  },
  heroCardBody: {
    padding: 20,
    gap: 12,
  },
  heroCardEyebrow: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  heroCardTitle: {
    fontSize: 30,
    lineHeight: 34,
  },
  heroCardSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  heroChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  heroChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroChipText: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  heroRefresh: {
    marginTop: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  heroRefreshText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardImageWrap: {
    height: 200,
    position: 'relative',
    backgroundColor: '#cbd5f5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardBadgeRow: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  cardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  cardBadgeLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardBody: {
    padding: 18,
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
  cardSummary: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  cardMetaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  cardMetaSubtle: {
    fontSize: 13,
    opacity: 0.75,
  },
  separator: {
    height: 20,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    gap: 8,
  },
  footerAccent: {
    width: 36,
    height: 3,
    borderRadius: 999,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
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
  inlineErrorSubtle: {
    opacity: 0.8,
  },
  inlineRetry: {
    alignSelf: 'flex-start',
  },
  inlineRetryText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

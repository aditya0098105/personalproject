import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { XMLParser } from 'fast-xml-parser';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FALLBACK_ARTICLES } from '@/constants/news-fallback';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Category = 'Politics' | 'Science' | 'Climate' | 'Entertainment' | 'Art' | 'Technology';

type ArticleBase = {
  title: string;
  url: string;
  urlToImage: string | null;
  author?: string | null;
  description?: string | null;
  content?: string | null;
  publishedAt?: string | null;
  source?: {
    name: string;
  };
};

type Article = ArticleBase & {
  category: Category;
};

type ArticleSection = {
  title: Category;
  data: Article[];
};

const CATEGORY_ORDER: Category[] = [
  'Politics',
  'Science',
  'Climate',
  'Entertainment',
  'Art',
  'Technology',
];

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  Politics: [
    'election',
    'policy',
    'government',
    'minister',
    'president',
    'parliament',
    'congress',
    'senate',
    'cabinet',
    'politic',
    'diplomat',
  ],
  Science: [
    'science',
    'research',
    'study',
    'scientist',
    'laboratory',
    'medical',
    'health',
    'space',
    'astronomy',
    'nasa',
  ],
  Climate: [
    'climate',
    'emission',
    'carbon',
    'environment',
    'pollution',
    'warming',
    'sustainability',
    'green',
    'hydrogen',
    'renewable',
  ],
  Entertainment: [
    'entertainment',
    'film',
    'movie',
    'music',
    'celebrity',
    'show',
    'series',
    'hollywood',
    'bollywood',
    'festival',
  ],
  Art: [
    'art',
    'artist',
    'gallery',
    'museum',
    'painting',
    'sculpture',
    'exhibit',
    'culture',
    'literature',
  ],
  Technology: [
    'technology',
    'tech',
    'startup',
    'software',
    'digital',
    'innovation',
    'ai',
    'robot',
    'cyber',
    'device',
  ],
};

const GUARDIAN_API_KEY = process.env.EXPO_PUBLIC_GUARDIAN_API_KEY ?? 'test';
const GUARDIAN_ENDPOINT =
  `https://content.guardianapis.com/search?section=news&order-by=newest&show-fields=thumbnail,trailText,byline,bodyText&api-key=${GUARDIAN_API_KEY}`;
const BBC_RSS_URL = 'https://feeds.bbci.co.uk/news/rss.xml';
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

  const categorizeArticle = useCallback((article: ArticleBase): Category => {
    const text = `${article.title} ${article.description ?? ''} ${article.content ?? ''} ${article.source?.name ?? ''}`
      .toLowerCase();

    for (const category of CATEGORY_ORDER) {
      const keywords = CATEGORY_KEYWORDS[category];
      if (keywords.some((keyword) => text.includes(keyword))) {
        return category;
      }
    }

    return 'Politics';
  }, []);

  const cardSurface = palette.card ?? (isDark ? 'rgba(15, 23, 42, 0.78)' : '#ffffff');
  const borderSubtle = palette.stroke ?? (isDark ? 'rgba(148, 163, 184, 0.24)' : '#e2e8f0');
  const tintedSurface = isDark ? 'rgba(99, 102, 241, 0.28)' : 'rgba(99, 102, 241, 0.12)';
  const placeholderImage = useMemo(
    () =>
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    [],
  );
  const xmlParser = useMemo(
    () =>
      new XMLParser({
        ignoreAttributes: false,
        removeNSPrefix: true,
        attributeNamePrefix: '',
        textNodeName: 'text',
        trimValues: true,
      }),
    [],
  );

  const stripHtml = useCallback((value?: string | null) => {
    if (!value) {
      return null;
    }

    const normalized = value
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&apos;/gi, "'")
      .replace(/\s+/g, ' ')
      .trim();

    return normalized.length > 0 ? normalized : null;
  }, []);

  const fetchGuardianArticles = useCallback(async (): Promise<Article[]> => {
    const response = await fetch(GUARDIAN_ENDPOINT, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error('Unable to reach The Guardian headlines.');
    }

    const payload = await response.json();
    const results = payload?.response?.results;
    if (!Array.isArray(results)) {
      return [];
    }

    return results
      .map((item: any) => {
        const fields = item?.fields ?? {};
        const description = typeof fields?.trailText === 'string' ? stripHtml(fields.trailText) : null;
        const body = typeof fields?.bodyText === 'string' ? stripHtml(fields.bodyText) : null;

        const baseArticle: ArticleBase = {
          title: typeof item?.webTitle === 'string' ? item.webTitle : 'Untitled',
          url: typeof item?.webUrl === 'string' ? item.webUrl : '',
          urlToImage: typeof fields?.thumbnail === 'string' ? fields.thumbnail : null,
          author: typeof fields?.byline === 'string' ? fields.byline : null,
          description,
          content: body ?? description,
          publishedAt: typeof item?.webPublicationDate === 'string' ? item.webPublicationDate : null,
          source: {
            name: 'The Guardian',
          },
        };

        return { ...baseArticle, category: categorizeArticle(baseArticle) } satisfies Article;
      })
      .filter((article) => article.url);
  }, [categorizeArticle, stripHtml]);

  const fetchBBCArticles = useCallback(async (): Promise<Article[]> => {
    const response = await fetch(BBC_RSS_URL, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error('Unable to reach BBC News.');
    }

    const xml = await response.text();
    if (!xml) {
      return [];
    }

    const parsed = xmlParser.parse(xml);
    const itemsRaw = parsed?.rss?.channel?.item;
    const items = Array.isArray(itemsRaw) ? itemsRaw : itemsRaw ? [itemsRaw] : [];

    return items
      .map((item: any) => {
        const imageCandidate =
          typeof item?.thumbnail?.url === 'string'
            ? item.thumbnail.url
            : typeof item?.content?.url === 'string'
              ? item.content.url
              : typeof item?.['media:thumbnail']?.url === 'string'
                ? item['media:thumbnail'].url
                : typeof item?.['media:content']?.url === 'string'
                  ? item['media:content'].url
                  : null;

        const description =
          typeof item?.description === 'string' ? stripHtml(item.description) : null;
        const cleanedTitle = typeof item?.title === 'string' ? stripHtml(item.title) : null;
        const authorCandidate =
          typeof item?.creator === 'string'
            ? item.creator
            : typeof item?.['dc:creator'] === 'string'
              ? item['dc:creator']
              : null;

        const baseArticle: ArticleBase = {
          title: cleanedTitle ?? 'Untitled',
          url: typeof item?.link === 'string' ? item.link : '',
          urlToImage: imageCandidate,
          author: authorCandidate,
          description,
          content: description,
          publishedAt: typeof item?.pubDate === 'string' ? item.pubDate : null,
          source: {
            name: 'BBC News',
          },
        };

        return { ...baseArticle, category: categorizeArticle(baseArticle) } satisfies Article;
      })
      .filter((article) => article.url);
  }, [categorizeArticle, stripHtml, xmlParser]);

  const fetchArticles = useCallback(async (isRefresh = false) => {
    try {
      setError(null);
      setUsingFallback(false);
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const [guardianResult, bbcResult] = await Promise.allSettled([
        fetchGuardianArticles(),
        fetchBBCArticles(),
      ]);

      const aggregated: Article[] = [];
      const issues: string[] = [];

      if (guardianResult.status === 'fulfilled') {
        aggregated.push(...guardianResult.value);
        if (!guardianResult.value.length) {
          issues.push('No stories available from The Guardian at the moment.');
        }
      } else {
        issues.push('The Guardian feed is temporarily unavailable.');
      }

      if (bbcResult.status === 'fulfilled') {
        aggregated.push(...bbcResult.value);
        if (!bbcResult.value.length) {
          issues.push('No stories available from BBC News at the moment.');
        }
      } else {
        issues.push('BBC News feed is temporarily unavailable.');
      }

      const uniqueArticles = Array.from(
        new Map(
          aggregated.map((article) => [article.url, article] as const),
        ).values(),
      );

      const parseTime = (value?: string | null) => {
        if (!value) {
          return 0;
        }

        const timestamp = Date.parse(value);
        return Number.isNaN(timestamp) ? 0 : timestamp;
      };

      uniqueArticles.sort((a, b) => parseTime(b.publishedAt) - parseTime(a.publishedAt));

      if (!uniqueArticles.length) {
        throw new Error('No live headlines available right now.');
      }

      setArticles(uniqueArticles);
      setError(issues.length ? issues.join(' ') : null);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError instanceof Error ? fetchError.message : 'Something went wrong.');
      setArticles(
        FALLBACK_ARTICLES.map((article) => {
          const baseArticle: ArticleBase = {
            ...article,
          };

          return { ...baseArticle, category: categorizeArticle(baseArticle) } satisfies Article;
        }),
      );
      setUsingFallback(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [categorizeArticle, fetchBBCArticles, fetchGuardianArticles]);

  useEffect(() => {
    fetchArticles(false);
  }, [fetchArticles]);

  const handleNavigate = useCallback(
    (article: Article) => {
      const articleIndex = articles.findIndex((candidate) => candidate.url === article.url);

      router.push({
        pathname: '/news/[articleId]',
        params: {
          articleId: String(articleIndex >= 0 ? articleIndex : Date.now()),
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
    [articles, router],
  );

  const handleRefresh = useCallback(() => {
    fetchArticles(true);
  }, [fetchArticles]);

  const renderArticle: SectionListRenderItem<Article> = useCallback(
    ({ item }) => {
      const imageSource = item.urlToImage ? { uri: item.urlToImage } : { uri: placeholderImage };

      return (
        <Pressable
          onPress={() => handleNavigate(item)}
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
              Stay updated with the latest reporting from The Guardian and BBC News. Pull down anytime for a fresh
              intelligence sweep.
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
            : 'Powered by The Guardian Open Platform & BBC News'}
        </ThemedText>
      </View>
    ),
    [palette.tint, usingFallback],
  );

  const sections = useMemo<ArticleSection[]>(
    () =>
      CATEGORY_ORDER.map((category) => ({
        title: category,
        data: articles.filter((article) => article.category === category),
      })).filter((section) => section.data.length > 0),
    [articles],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: ArticleSection }) => (
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {section.title}
        </ThemedText>
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
      <SectionList<Article, ArticleSection>
        sections={sections}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        renderItem={renderArticle}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
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
  sectionHeader: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
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
  sectionSeparator: {
    height: 28,
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

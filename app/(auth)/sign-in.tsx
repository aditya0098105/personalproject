import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await signIn(email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to sign in. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const backgroundColor = colorScheme === 'dark' ? '#020617' : '#f1f5f9';
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : '#ffffff';
  const borderColor = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.2)' : '#e2e8f0';
  const placeholderColor = colorScheme === 'dark' ? '#94a3b8' : '#94a3b8';

  return (
    <ThemedView style={[styles.screen, { backgroundColor }]}
      lightColor={backgroundColor}
      darkColor={backgroundColor}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={[palette.tint, colorScheme === 'dark' ? '#1e293b' : '#0f172a']}
            style={styles.headerGradient}
          >
            <View style={styles.headerIconWrap}>
              <IconSymbol name="sparkles" size={20} color="#ffffff" />
            </View>
            <ThemedText type="title" style={styles.headerTitle}>
              Welcome back
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Sign in to continue tracking the biggest global stories in real time.
            </ThemedText>
          </LinearGradient>
        </View>

        <ThemedView style={[styles.card, { borderColor }]} lightColor={cardSurface} darkColor={cardSurface}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Access your briefing desk
          </ThemedText>
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>Email</ThemedText>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { borderColor }]}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>Password</ThemedText>
            <TextInput
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { borderColor }]}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {error ? (
            <ThemedText style={[styles.errorText, { color: palette.tint }]}>{error}</ThemedText>
          ) : null}
          <Pressable
            accessibilityRole="button"
            onPress={handleSignIn}
            style={[styles.primaryButton, { backgroundColor: palette.tint }]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
                Sign in
              </ThemedText>
            )}
          </Pressable>
          <View style={styles.footerRow}>
            <ThemedText style={styles.footerText}>Need an account?</ThemedText>
            <Link href="/sign-up" replace style={[styles.linkText, { color: palette.tint }]}>
              Create one now
            </Link>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginBottom: 28,
  },
  headerGradient: {
    borderRadius: 24,
    padding: 24,
    gap: 12,
  },
  headerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    gap: 18,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 22,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.75,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
  },
});

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

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await signUp({ name, email, password });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create account. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const backgroundColor = colorScheme === 'dark' ? '#020617' : '#f8fafc';
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.92)' : '#ffffff';
  const borderColor = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.25)' : '#e2e8f0';
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
            colors={[palette.tint, colorScheme === 'dark' ? '#0f172a' : '#075985']}
            style={styles.headerGradient}
          >
            <View style={styles.headerIconWrap}>
              <IconSymbol name="person.crop.circle.badge.plus" size={22} color="#ffffff" />
            </View>
            <ThemedText type="title" style={styles.headerTitle}>
              Create your newsroom ID
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Personalize alerts, save dossiers, and collaborate with your team across the Dispatch.
            </ThemedText>
          </LinearGradient>
        </View>

        <ThemedView style={[styles.card, { borderColor }]} lightColor={cardSurface} darkColor={cardSurface}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Tell us about you
          </ThemedText>
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>Full name</ThemedText>
            <TextInput
              placeholder="Alex Morgan"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { borderColor }]}
              value={name}
              onChangeText={setName}
            />
          </View>
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
              placeholder="Create a password"
              placeholderTextColor={placeholderColor}
              secureTextEntry
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
            onPress={handleSubmit}
            style={[styles.primaryButton, { backgroundColor: palette.tint }]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
                Create account
              </ThemedText>
            )}
          </Pressable>
          <View style={styles.footerRow}>
            <ThemedText style={styles.footerText}>Already have access?</ThemedText>
            <Link href="/sign-in" replace style={[styles.linkText, { color: palette.tint }]}>
              Sign in
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
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.88)',
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

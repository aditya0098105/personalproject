import { Stack } from 'expo-router';

export default function NewsStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[articleId]" options={{ title: 'Article' }} />
    </Stack>
  );
}

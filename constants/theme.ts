/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#6366f1';
const tintColorDark = '#8b5cf6';
const accentColorLight = '#14b8a6';
const accentColorDark = '#2dd4bf';
const surfaceColorLight = '#f5f7fb';
const surfaceColorDark = '#020617';
const elevatedSurfaceLight = '#ffffff';
const elevatedSurfaceDark = 'rgba(15, 23, 42, 0.92)';
const subtleStrokeLight = '#d4d8ed';
const subtleStrokeDark = 'rgba(148, 163, 184, 0.35)';

export const Colors = {
  light: {
    text: '#0f172a',
    background: surfaceColorLight,
    tint: tintColorLight,
    accent: accentColorLight,
    icon: '#475569',
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorLight,
    card: elevatedSurfaceLight,
    muted: '#64748b',
    stroke: subtleStrokeLight,
    gradient: ['#6366f1', '#14b8a6'],
    secondaryGradient: ['#38bdf8', '#ec4899'],
  },
  dark: {
    text: '#e2e8f0',
    background: surfaceColorDark,
    tint: tintColorDark,
    accent: accentColorDark,
    icon: '#94a3b8',
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorDark,
    card: elevatedSurfaceDark,
    muted: '#94a3b8',
    stroke: subtleStrokeDark,
    gradient: ['#4c1d95', '#0f766e'],
    secondaryGradient: ['#0ea5e9', '#ec4899'],
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

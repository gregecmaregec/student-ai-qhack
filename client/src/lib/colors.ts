/**
 * This file contains all the color definitions for the application.
 * It serves as a single source of truth for the color palette.
 */

// Main color palette
export const colors = {
  // Primary brand color and variants - Pastel Purple
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', // Main primary color - Vibrant Purple
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  
  // Main backgrounds
  background: {
    light: '#F7EFE6', // Light mode background - requested by client
    dark: '#0B0B0B', // Dark mode deep background
    paper: {
      light: '#ffffff',
      dark: '#1E1E1E',
    },
    card: {
      light: '#ffffff',
      dark: '#121212',
    },
    elevated: {
      light: '#F7EFE6',
      dark: '#262626',
    },
  },
  
  // Text colors
  text: {
    primary: {
      light: '#0A0A0A',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#4B5563',
      dark: '#A1A1AA',
    },
    tertiary: {
      light: '#6B7280',
      dark: '#71717A',
    },
    disabled: {
      light: '#9CA3AF',
      dark: '#52525B',
    },
  },
  
  // Border colors
  border: {
    light: '#E5E7EB',
    dark: '#303030',
    focus: {
      light: '#0EA5E9',
      dark: '#0EA5E9',
    },
  },
  
  // Status colors
  status: {
    success: {
      light: '#10B981',
      dark: '#0D9488',
    },
    warning: {
      light: '#F59E0B',
      dark: '#D97706',
    },
    error: {
      light: '#EF4444',
      dark: '#DC2626',
    },
    info: {
      light: '#3B82F6',
      dark: '#2563EB',
    },
  },
};

// Color palette for light mode
export const lightModeColors = {
  background: colors.background.light,
  foreground: colors.text.primary.light,
  card: colors.background.card.light,
  cardForeground: colors.text.primary.light,
  popover: colors.background.paper.light,
  popoverForeground: colors.text.primary.light,
  primary: colors.primary[500],
  primaryForeground: '#ffffff',
  secondary: colors.background.light,
  secondaryForeground: colors.text.primary.light,
  muted: '#f1f5f9',
  mutedForeground: colors.text.secondary.light,
  accent: '#f8fafc',
  accentForeground: colors.text.primary.light,
  destructive: colors.status.error.light,
  destructiveForeground: '#ffffff',
  border: colors.border.light,
  input: colors.border.light,
  ring: colors.primary[500],
};

// Color palette for dark mode
export const darkModeColors = {
  background: colors.background.dark,
  foreground: colors.text.primary.dark,
  card: colors.background.card.dark,
  cardForeground: colors.text.primary.dark,
  popover: colors.background.paper.dark,
  popoverForeground: colors.text.primary.dark,
  primary: colors.primary[500],
  primaryForeground: '#ffffff',
  secondary: colors.background.elevated.dark,
  secondaryForeground: colors.text.primary.dark,
  muted: '#27272a',
  mutedForeground: colors.text.secondary.dark,
  accent: '#18181b',
  accentForeground: colors.text.primary.dark,
  destructive: colors.status.error.dark,
  destructiveForeground: '#ffffff',
  border: colors.border.dark,
  input: colors.border.dark,
  ring: colors.primary[500],
};

export default colors;
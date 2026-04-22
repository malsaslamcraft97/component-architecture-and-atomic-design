import { theme as foundationTheme } from '../tokens';

export type ThemeMode = 'base' | 'dim' | 'dark';

export const themeModes: Array<{
  id: ThemeMode;
  label: string;
  detail: string;
  accent: string;
}> = [
  { id: 'base', label: 'Default', detail: 'Light canvas', accent: '#2563eb' },
  { id: 'dim', label: 'Dim', detail: 'Soft night', accent: '#38bdf8' },
  { id: 'dark', label: 'Lights out', detail: 'High contrast', accent: '#8b5cf6' }
];

export const makeTheme = (mode: ThemeMode) => {
  if (mode === 'base') {
    return foundationTheme;
  }

  if (mode === 'dim') {
    return {
      ...foundationTheme,
      color: {
        ...foundationTheme.color,
        background: '#15202b',
        surface: '#1e2936',
        surfaceMuted: '#253344',
        text: '#f8fafc',
        textMuted: '#9fb1c7',
        border: '#34465a',
        borderStrong: '#5b7083',
        focus: '#38bdf8',
        brand: {
          bg: '#1d9bf0',
          bgHover: '#1a8cd8',
          subtle: '#12344d',
          subtleHover: '#164464',
          text: '#ffffff',
          textSubtle: '#8bd3ff'
        },
        neutral: {
          bg: '#263445',
          bgHover: '#304155',
          text: '#d8e3ef'
        },
        success: {
          bg: '#123d35',
          text: '#7dd3bc'
        },
        warning: {
          bg: '#443817',
          text: '#f3cf72'
        },
        danger: {
          bg: '#f4212e',
          bgHover: '#dc1e29',
          subtle: '#4a1d26',
          text: '#ffffff',
          textSubtle: '#ff9aa2'
        }
      },
      shadow: {
        ...foundationTheme.shadow,
        focus: '0 0 0 3px rgba(56, 189, 248, 0.32)',
        floating: '0 18px 50px rgba(0, 0, 0, 0.32)'
      }
    } as unknown as typeof foundationTheme;
  }

  return {
    ...foundationTheme,
    color: {
      ...foundationTheme.color,
      background: '#050505',
      surface: '#111111',
      surfaceMuted: '#181818',
      text: '#f5f5f5',
      textMuted: '#a3a3a3',
      border: '#2d2d2d',
      borderStrong: '#525252',
      focus: '#8b5cf6',
      brand: {
        bg: '#7c3aed',
        bgHover: '#6d28d9',
        subtle: '#25154a',
        subtleHover: '#321c61',
        text: '#ffffff',
        textSubtle: '#c4b5fd'
      },
      neutral: {
        bg: '#1f1f1f',
        bgHover: '#292929',
        text: '#d4d4d4'
      },
      success: {
        bg: '#092f26',
        text: '#86efac'
      },
      warning: {
        bg: '#382f12',
        text: '#fde68a'
      },
      danger: {
        bg: '#dc2626',
        bgHover: '#b91c1c',
        subtle: '#3b1010',
        text: '#ffffff',
        textSubtle: '#fca5a5'
      }
    },
    shadow: {
      ...foundationTheme.shadow,
      focus: '0 0 0 3px rgba(139, 92, 246, 0.36)',
      floating: '0 20px 60px rgba(0, 0, 0, 0.52)'
    }
  } as unknown as typeof foundationTheme;
};

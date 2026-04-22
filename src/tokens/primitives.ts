export const primitiveTokens = {
  color: {
    white: '#ffffff',
    black: '#111827',
    slate50: '#f8fafc',
    slate100: '#f1f5f9',
    slate200: '#e2e8f0',
    slate300: '#cbd5e1',
    slate500: '#64748b',
    slate700: '#334155',
    slate900: '#0f172a',
    blue50: '#eff6ff',
    blue100: '#dbeafe',
    blue600: '#2563eb',
    blue700: '#1d4ed8',
    emerald50: '#ecfdf5',
    emerald700: '#047857',
    amber50: '#fffbeb',
    amber700: '#b45309',
    red50: '#fef2f2',
    red600: '#dc2626',
    red700: '#b91c1c'
  },
  font: {
    family: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5
    }
  },
  space: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem'
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    pill: '999px'
  },
  shadow: {
    focus: '0 0 0 3px rgba(37, 99, 235, 0.28)',
    floating: '0 18px 45px rgba(15, 23, 42, 0.18)'
  }
} as const;

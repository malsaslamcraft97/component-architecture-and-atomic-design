import { primitiveTokens } from './primitives';

const { color, font, space, radius, shadow } = primitiveTokens;

export const theme = {
  color: {
    background: color.white,
    surface: color.white,
    surfaceMuted: color.slate50,
    text: color.slate900,
    textMuted: color.slate500,
    border: color.slate300,
    borderStrong: color.slate500,
    focus: color.blue600,
    brand: {
      bg: color.blue600,
      bgHover: color.blue700,
      subtle: color.blue50,
      subtleHover: color.blue100,
      text: color.white,
      textSubtle: color.blue700
    },
    neutral: {
      bg: color.slate100,
      bgHover: color.slate200,
      text: color.slate700
    },
    success: {
      bg: color.emerald50,
      text: color.emerald700
    },
    warning: {
      bg: color.amber50,
      text: color.amber700
    },
    danger: {
      bg: color.red600,
      bgHover: color.red700,
      subtle: color.red50,
      text: color.white,
      textSubtle: color.red700
    }
  },
  font,
  space,
  radius,
  shadow
};

export type Theme = typeof theme;

# Component Architecture and Design System Foundations

React + TypeScript + Storybook workspace for practicing component architecture through a small design-system foundation.

## What is included

- Atomic design structure: `atoms`, `molecules`, `organisms`, and `headless` primitives.
- Design token system: primitive and semantic tokens for color, typography, spacing, radius, and shadows.
- CSS-in-JS implementation: Emotion-powered components consume the shared token theme.
- Reference-inspired atoms:
  - Button variants, sizes, disabled/focus states, and icon configurations.
  - Text input with label, hint, error, disabled state, icons, and ARIA wiring.
  - Badge with neutral, brand, success, warning, and danger tones across three sizes.
- Headless exercises:
  - Dropdown with compound parts, open state, menu roles, arrow-key movement, and escape dismissal.
  - Modal with compound parts, dialog roles, labelled-by support, escape dismissal, focus entry, and body scroll lock.
- Storybook documentation with a11y addon.
- Vitest + Testing Library + jest-axe accessibility checks.

## Commands

```bash
npm install
npm run dev
npm run storybook
npm run test
npm run build
```

## Folder Map

```text
src/
  components/
    atoms/
      Badge/
      Button/
      TextInput/
    molecules/
      FormField/
    organisms/
      PreferencesPanel/
    headless/
      Dropdown/
      Modal/
  tokens/
  styles/
  test/
```

## Learning Path

1. Start in `src/tokens` and adjust primitive or semantic tokens.
2. Inspect atom stories to see variant and state APIs.
3. Compose atoms into `FormField` and `PreferencesPanel`.
4. Study `Dropdown` and `Modal` to compare compound component APIs with hook-level state.
5. Run `npm run storybook` and use the accessibility panel on each story.
6. Run `npm run test` after changing behavior or ARIA contracts.

## Source References

This repo uses the GreatFrontEnd challenge briefs as scope references for component capabilities:

- Button: variants, states, sizes, and icon configurations.
- Text Input: label, placeholder, hint/error messaging, icons, and accessible associations.
- Badge: neutral/error/warning/success/brand colors and small/medium/large sizing.

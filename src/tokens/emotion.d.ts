import '@emotion/react';
import type { Theme as DesignSystemTheme } from './semantic';

declare module '@emotion/react' {
  export interface Theme extends DesignSystemTheme {}
}

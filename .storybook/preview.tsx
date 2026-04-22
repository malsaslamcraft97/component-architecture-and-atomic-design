import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import '../src/styles/global.css';
import { theme } from '../src/tokens';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    )
  ],
  parameters: {
    a11y: {
      test: 'todo'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;

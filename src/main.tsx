import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { Badge, Button, PreferencesPanel, TextInput } from './components';
import { theme } from './tokens';
import './styles/global.css';
import styled from '@emotion/styled';

const Page = styled.main`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  margin: 0 auto;
  max-width: 72rem;
  padding: ${({ theme }) => theme.space[8]} ${({ theme }) => theme.space[4]};
`;

const Intro = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
`;

const Eyebrow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1;
  margin: 0;
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  margin: 0;
  max-width: 42rem;
`;

const DemoGrid = styled.section`
  align-items: start;
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
`;

const DemoBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Page>
        <Intro>
          <Eyebrow>
            <Badge tone="brand">Atomic design</Badge>
            <Badge tone="neutral">Headless primitives</Badge>
            <Badge tone="success">Storybook ready</Badge>
          </Eyebrow>
          <Title>Component architecture foundations</Title>
          <Lead>
            A React and TypeScript design-system playground covering tokens, composition, CSS-in-JS, accessible
            components, and Storybook documentation.
          </Lead>
        </Intro>

        <DemoGrid>
          <DemoBlock>
            <Button size="lg">Primary action</Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="destructive">Delete item</Button>
          </DemoBlock>
          <TextInput label="Email address" placeholder="you@example.com" hint="The label and hint are linked with ARIA." />
        </DemoGrid>

        <PreferencesPanel />
      </Page>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

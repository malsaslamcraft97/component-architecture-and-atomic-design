import React, { useMemo, useState, type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, Button, TextInput } from './components';
import { theme as foundationTheme } from './tokens';
import './styles/global.css';

type ThemeMode = 'base' | 'dim' | 'dark';

const themeModes: Array<{
  id: ThemeMode;
  label: string;
  detail: string;
  accent: string;
}> = [
  { id: 'base', label: 'Default', detail: 'Light canvas', accent: '#2563eb' },
  { id: 'dim', label: 'Dim', detail: 'Soft night', accent: '#38bdf8' },
  { id: 'dark', label: 'Lights out', detail: 'High contrast', accent: '#8b5cf6' }
];

const makeTheme = (mode: ThemeMode) => {
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

const Shell = styled.div<{ $mode: ThemeMode }>`
  background:
    linear-gradient(120deg, ${({ theme }) => theme.color.surfaceMuted} 0, transparent 34rem),
    ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text};
  display: grid;
  grid-template-columns: 17.5rem minmax(0, 1fr);
  min-height: 100vh;

  @media (max-width: 56rem) {
    display: block;
  }
`;

const Sidebar = styled.aside`
  border-right: 1px solid ${({ theme }) => theme.color.border};
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[6]};
  position: sticky;
  top: 0;

  @media (max-width: 56rem) {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    border-right: 0;
    min-height: auto;
    position: relative;
  }
`;

const BrandBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

const LogoMark = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.color.brand.bg};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.brand.text};
  display: inline-flex;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  height: 2.75rem;
  justify-content: center;
  width: 2.75rem;
`;

const BrandTitle = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]};

  strong {
    font-size: ${({ theme }) => theme.font.size.lg};
  }

  span {
    color: ${({ theme }) => theme.color.textMuted};
    font-size: ${({ theme }) => theme.font.size.sm};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;

const NavStack = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;

const NavItem = styled.a<{ $active?: boolean }>`
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.text};
  display: flex;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  gap: ${({ theme }) => theme.space[3]};
  min-height: 2.75rem;
  padding: 0 ${({ theme }) => theme.space[3]};
  text-decoration: none;

  background: ${({ theme, $active }) => ($active ? theme.color.brand.subtle : 'transparent')};

  &:hover {
    background: ${({ theme }) => theme.color.neutral.bg};
  }

  svg {
    color: ${({ theme, $active }) => ($active ? theme.color.brand.textSubtle : theme.color.textMuted)};
    height: 1.1rem;
    width: 1.1rem;
  }
`;

const AppearancePanel = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[3]};
`;

const PanelLabel = styled.div`
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const ThemeChoice = styled.button<{ $active: boolean; $accent: string }>`
  align-items: center;
  background: ${({ theme, $active }) => ($active ? theme.color.neutral.bg : 'transparent')};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.color.borderStrong : 'transparent')};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  grid-template-columns: auto 1fr auto;
  min-height: 3.25rem;
  padding: ${({ theme }) => theme.space[2]};
  text-align: left;

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    outline: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.color.neutral.bg};
  }

  span:first-of-type {
    background: ${({ $accent }) => $accent};
    border-radius: ${({ theme }) => theme.radius.pill};
    height: 1rem;
    width: 1rem;
  }

  strong,
  small {
    display: block;
  }

  small {
    color: ${({ theme }) => theme.color.textMuted};
    margin-top: 0.125rem;
  }
`;

const Main = styled.main`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  min-width: 0;
  padding: ${({ theme }) => theme.space[8]};

  @media (max-width: 56rem) {
    padding: ${({ theme }) => theme.space[5]};
  }
`;

const Hero = styled.section`
  align-items: end;
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  grid-template-columns: minmax(0, 1fr) minmax(17rem, 25rem);

  @media (max-width: 72rem) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  max-width: 54rem;
`;

const BadgeRail = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

const Title = styled.h1`
  font-size: clamp(2.75rem, 7vw, 6.5rem);
  letter-spacing: 0;
  line-height: 0.92;
  margin: 0;
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  margin: 0;
  max-width: 43rem;
`;

const HeroActions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
`;

const Metrics = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[5]};
`;

const MetricRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]};

  strong {
    font-size: 2rem;
    line-height: 1;
  }

  span {
    color: ${({ theme }) => theme.color.textMuted};
    font-size: ${({ theme }) => theme.font.size.sm};
  }
`;

const Showcase = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
`;

const SectionHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};

  h2 {
    font-size: 1.75rem;
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.color.textMuted};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    margin: 0;
    max-width: 42rem;
  }
`;

const ComponentGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 76rem) {
    grid-template-columns: 1fr;
  }
`;

const ComponentCard = styled.article`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.floating};
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  padding: ${({ theme }) => theme.space[5]};
`;

const CardHeader = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};

  h3 {
    font-size: ${({ theme }) => theme.font.size.xl};
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.color.textMuted};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    margin: 0;
  }
`;

const VariantStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
`;

const VariantGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

const GroupLabel = styled.div`
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  text-transform: uppercase;
`;

const ComponentRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
`;

const ButtonColumn = styled.div`
  align-items: stretch;
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

const FooterBand = styled.section`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[5]};
`;

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    {children}
  </svg>
);

const ArrowIcon = () => (
  <Icon>
    <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </Icon>
);

const SearchIcon = () => (
  <Icon>
    <path d="M14 14l4 4M8.5 15a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  </Icon>
);

const GridIcon = () => (
  <Icon>
    <path d="M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
  </Icon>
);

const SparkIcon = () => (
  <Icon>
    <path d="M10 2l1.7 5.2L17 9l-5.3 1.8L10 16l-1.7-5.2L3 9l5.3-1.8L10 2z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
  </Icon>
);

function App() {
  const [mode, setMode] = useState<ThemeMode>('base');
  const selectedTheme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Shell $mode={mode}>
        <Sidebar aria-label="Workspace navigation">
          <BrandBlock>
            <LogoMark>DS</LogoMark>
            <BrandTitle>
              <strong>Foundations Lab</strong>
              <span>Component architecture, tokens, and production-ready primitives.</span>
            </BrandTitle>
          </BrandBlock>

          <NavStack>
            <NavItem href="#overview" $active>
              <GridIcon />
              Overview
            </NavItem>
            <NavItem href="#components">
              <SparkIcon />
              Components
            </NavItem>
            <NavItem href="#system">
              <ArrowIcon />
              System notes
            </NavItem>
          </NavStack>

          <AppearancePanel aria-label="Theme settings">
            <PanelLabel>Appearance</PanelLabel>
            {themeModes.map((themeMode) => (
              <ThemeChoice
                key={themeMode.id}
                type="button"
                $active={mode === themeMode.id}
                $accent={themeMode.accent}
                aria-pressed={mode === themeMode.id}
                onClick={() => setMode(themeMode.id)}
              >
                <span />
                <span>
                  <strong>{themeMode.label}</strong>
                  <small>{themeMode.detail}</small>
                </span>
                {mode === themeMode.id ? <Badge size="sm" tone="brand">On</Badge> : null}
              </ThemeChoice>
            ))}
          </AppearancePanel>
        </Sidebar>

        <Main>
          <Hero id="overview">
            <HeroCopy>
              <BadgeRail>
                <Badge tone="brand">Atomic design</Badge>
                <Badge tone="neutral">Headless primitives</Badge>
                <Badge tone="success">Storybook ready</Badge>
              </BadgeRail>
              <Title>Component architecture foundations</Title>
              <Lead>
                A premium dashboard preview for the same React and TypeScript design-system playground, now showing
                component breadth, theme behavior, and composition patterns in one place.
              </Lead>
              <HeroActions>
                <Button size="lg" rightIcon={<ArrowIcon />}>Explore components</Button>
                <Button variant="secondary" size="lg">Open Storybook</Button>
                <Button variant="link">View tokens</Button>
              </HeroActions>
            </HeroCopy>

            <Metrics aria-label="Design system summary">
              <MetricRow>
                <strong>3</strong>
                <span>Atomic components showcased with variants</span>
              </MetricRow>
              <MetricRow>
                <strong>5</strong>
                <span>Button intents from primary to link</span>
              </MetricRow>
              <MetricRow>
                <strong>3</strong>
                <span>Homepage appearance modes</span>
              </MetricRow>
            </Metrics>
          </Hero>

          <Showcase id="components">
            <SectionHeader>
              <h2>Component Inventory</h2>
              <p>Each vertical card renders the actual exported component across the versions documented in Storybook.</p>
            </SectionHeader>

            <ComponentGrid>
              <ComponentCard>
                <CardHeader>
                  <h3>Badge</h3>
                  <p>Status, category, and metadata markers with tone and size coverage.</p>
                </CardHeader>
                <VariantStack>
                  <VariantGroup>
                    <GroupLabel>Tones</GroupLabel>
                    <ComponentRow>
                      <Badge tone="neutral">Neutral</Badge>
                      <Badge tone="brand">Brand</Badge>
                      <Badge tone="success">Success</Badge>
                      <Badge tone="warning">Warning</Badge>
                      <Badge tone="danger">Error</Badge>
                    </ComponentRow>
                  </VariantGroup>
                  <VariantGroup>
                    <GroupLabel>Sizes</GroupLabel>
                    <ComponentRow>
                      <Badge size="sm">Small</Badge>
                      <Badge size="md">Medium</Badge>
                      <Badge size="lg">Large</Badge>
                    </ComponentRow>
                  </VariantGroup>
                </VariantStack>
              </ComponentCard>

              <ComponentCard>
                <CardHeader>
                  <h3>Button</h3>
                  <p>Action hierarchy, destructive actions, icon support, and disabled states.</p>
                </CardHeader>
                <VariantStack>
                  <VariantGroup>
                    <GroupLabel>Variants</GroupLabel>
                    <ButtonColumn>
                      <Button>Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="tertiary">Tertiary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="link">Link action</Button>
                    </ButtonColumn>
                  </VariantGroup>
                  <VariantGroup>
                    <GroupLabel>Sizes and icons</GroupLabel>
                    <ComponentRow>
                      <Button size="md" rightIcon={<ArrowIcon />}>Medium</Button>
                      <Button size="lg" rightIcon={<ArrowIcon />}>Large</Button>
                      <Button size="xl" leftIcon={<ArrowIcon />} rightIcon={<ArrowIcon />}>Extra large</Button>
                      <Button size="2xl" iconOnly rightIcon={<ArrowIcon />} aria-label="Open details" />
                      <Button disabled>Disabled</Button>
                    </ComponentRow>
                  </VariantGroup>
                </VariantStack>
              </ComponentCard>

              <ComponentCard>
                <CardHeader>
                  <h3>TextInput</h3>
                  <p>Accessible label, hint, validation, icon, and disabled examples.</p>
                </CardHeader>
                <VariantStack>
                  <TextInput label="Email address" placeholder="you@example.com" hint="Use a work email for team workspaces." />
                  <TextInput label="Search" placeholder="Search components" leftIcon={<SearchIcon />} />
                  <TextInput
                    label="Email address"
                    defaultValue="not-an-email"
                    error="Enter a valid email address."
                    hint="This message is associated with aria-describedby."
                  />
                  <TextInput label="Read only contact" disabled defaultValue="readonly@example.com" />
                </VariantStack>
              </ComponentCard>
            </ComponentGrid>
          </Showcase>

          <FooterBand id="system">
            <div>
              <Badge tone="success">Ready for composition</Badge>
              <Lead>Storybook remains the source for isolated docs; this dashboard shows the product-facing surface.</Lead>
            </div>
            <Button variant="secondary" rightIcon={<ArrowIcon />}>Review foundations</Button>
          </FooterBand>
        </Main>
      </Shell>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

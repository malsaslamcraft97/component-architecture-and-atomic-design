import { useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Badge, Button, Dropdown, Modal, TextInput } from '../components';
import { ArrowIcon, GridIcon, LayersIcon, SearchIcon, SparkIcon } from './icons';
import {
  ActionLink,
  AppearancePanel,
  BadgeRail,
  BrandBlock,
  BrandTitle,
  ButtonColumn,
  CardHeader,
  ComponentCard,
  ComponentGrid,
  ComponentRow,
  DialogBody,
  FooterBand,
  GroupLabel,
  Hero,
  HeroActions,
  HeroCopy,
  InteractionStatus,
  Lead,
  LogoMark,
  Main,
  MetricRow,
  Metrics,
  NavItem,
  NavStack,
  PanelLabel,
  SectionHeader,
  Shell,
  Showcase,
  Sidebar,
  SwatchPreview,
  ThemeChoice,
  Title,
  TokenGrid,
  TokenSwatch,
  VariantGroup,
  VariantStack
} from './HomePage.styles';
import { makeTheme, themeModes, type ThemeMode } from './theme';

function HomeSidebar({ mode, onModeChange }: { mode: ThemeMode; onModeChange: (mode: ThemeMode) => void }) {
  return (
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
        <NavItem href="#tokens">
          <LayersIcon />
          Tokens
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
            onClick={() => onModeChange(themeMode.id)}
          >
            <span />
            <span>
              <strong>{themeMode.label}</strong>
              <small>{themeMode.detail}</small>
            </span>
            {mode === themeMode.id ? (
              <Badge size="sm" tone="brand">
                On
              </Badge>
            ) : null}
          </ThemeChoice>
        ))}
      </AppearancePanel>
    </Sidebar>
  );
}

function HeroSection() {
  return (
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
          <ActionLink href="#components" $size="lg">
            Explore components
            <ArrowIcon />
          </ActionLink>
          <ActionLink href="http://localhost:6006" target="_blank" rel="noreferrer" $variant="secondary" $size="lg">
            Open Storybook
          </ActionLink>
          <ActionLink href="#tokens" $variant="link">
            View tokens
          </ActionLink>
        </HeroActions>
      </HeroCopy>

      <Metrics aria-label="Design system summary">
        <MetricRow>
          <strong>5</strong>
          <span>Core and headless components showcased with variants</span>
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
  );
}

function ComponentInventory() {
  const [lastAction, setLastAction] = useState('No button action selected yet');

  return (
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
                <Button onClick={() => setLastAction('Primary action selected')}>Primary</Button>
                <Button variant="secondary" onClick={() => setLastAction('Secondary action selected')}>
                  Secondary
                </Button>
                <Button variant="tertiary" onClick={() => setLastAction('Tertiary action selected')}>
                  Tertiary
                </Button>
                <Button variant="destructive" onClick={() => setLastAction('Destructive action selected')}>
                  Destructive
                </Button>
                <Button variant="link" onClick={() => setLastAction('Link-style action selected')}>
                  Link action
                </Button>
                <InteractionStatus aria-live="polite">
                  <Badge size="sm" tone="neutral">
                    Live
                  </Badge>
                  {lastAction}
                </InteractionStatus>
              </ButtonColumn>
            </VariantGroup>
            <VariantGroup>
              <GroupLabel>Sizes and icons</GroupLabel>
              <ComponentRow>
                <Button size="md" rightIcon={<ArrowIcon />} onClick={() => setLastAction('Medium button selected')}>
                  Medium
                </Button>
                <Button size="lg" rightIcon={<ArrowIcon />} onClick={() => setLastAction('Large button selected')}>
                  Large
                </Button>
                <Button
                  size="xl"
                  leftIcon={<ArrowIcon />}
                  rightIcon={<ArrowIcon />}
                  onClick={() => setLastAction('Extra large button selected')}
                >
                  Extra large
                </Button>
                <Button
                  size="2xl"
                  iconOnly
                  rightIcon={<ArrowIcon />}
                  aria-label="Open details"
                  onClick={() => setLastAction('Icon-only button selected')}
                />
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

        <ComponentCard>
          <CardHeader>
            <h3>Headless</h3>
            <p>Compositional primitives for menus and dialogs, styled here only by the homepage shell.</p>
          </CardHeader>
          <VariantStack>
            <VariantGroup>
              <GroupLabel>Dropdown</GroupLabel>
              <Dropdown.Root>
                <Dropdown.Trigger>Component actions</Dropdown.Trigger>
                <Dropdown.Content aria-label="Component actions">
                  <Dropdown.Item onClick={() => document.getElementById('tokens')?.scrollIntoView({ behavior: 'smooth' })}>
                    Review tokens
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => window.open('http://localhost:6006', '_blank', 'noopener,noreferrer')}>
                    Open Storybook
                  </Dropdown.Item>
                  <Dropdown.Item disabled>Archive snapshot</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            </VariantGroup>
            <VariantGroup>
              <GroupLabel>Modal</GroupLabel>
              <Modal.Root>
                <Modal.Trigger>Open component brief</Modal.Trigger>
                <Modal.Content aria-labelledby="component-brief-title">
                  <DialogBody>
                    <h2 id="component-brief-title">Composition brief</h2>
                    <p>
                      The modal primitive owns dialog semantics, escape dismissal, focus entry, and backdrop behavior while
                      the homepage supplies the content and placement.
                    </p>
                    <Modal.Close>Close brief</Modal.Close>
                  </DialogBody>
                </Modal.Content>
              </Modal.Root>
            </VariantGroup>
          </VariantStack>
        </ComponentCard>
      </ComponentGrid>
    </Showcase>
  );
}

function TokenOverview() {
  return (
    <Showcase id="tokens">
      <SectionHeader>
        <h2>Token Surface</h2>
        <p>The homepage responds to semantic color, radius, spacing, typography, and shadow tokens without changing component internals.</p>
      </SectionHeader>
      <TokenGrid>
        <TokenSwatch>
          <SwatchPreview $tone="brand" />
          <strong>Brand action</strong>
          <span>Interactive affordances and selected navigation states.</span>
        </TokenSwatch>
        <TokenSwatch>
          <SwatchPreview $tone="surface" />
          <strong>Layered surfaces</strong>
          <span>Cards, panels, controls, and soft page backgrounds.</span>
        </TokenSwatch>
        <TokenSwatch>
          <SwatchPreview $tone="success" />
          <strong>Status feedback</strong>
          <span>Semantic state tokens shared by badges and messaging.</span>
        </TokenSwatch>
      </TokenGrid>
    </Showcase>
  );
}

function SystemNotes() {
  return (
    <FooterBand id="system">
      <div>
        <Badge tone="success">Ready for composition</Badge>
        <Lead>Storybook remains the source for isolated docs; this dashboard shows the product-facing surface.</Lead>
      </div>
      <ActionLink href="#overview" $variant="secondary">
        Review foundations
        <ArrowIcon />
      </ActionLink>
    </FooterBand>
  );
}

export function HomePage() {
  const [mode, setMode] = useState<ThemeMode>('base');
  const selectedTheme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Shell $mode={mode}>
        <HomeSidebar mode={mode} onModeChange={setMode} />
        <Main>
          <HeroSection />
          <ComponentInventory />
          <TokenOverview />
          <SystemNotes />
        </Main>
      </Shell>
    </ThemeProvider>
  );
}

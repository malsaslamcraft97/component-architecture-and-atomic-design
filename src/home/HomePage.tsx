import { type ReactNode, useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Badge, Button, Dropdown, FormField, Modal, PreferencesPanel, TextInput } from '../components';
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
  SplitGrid,
  SwatchPreview,
  SystemGrid,
  SystemItem,
  ThemeChoice,
  Title,
  TokenGrid,
  TokenSwatch,
  VariantGroup,
  VariantStack
} from './HomePage.styles';
import { makeTheme, themeModes, type ThemeMode } from './theme';

const metrics = [
  ['7', 'Exported atom, molecule, organism, and headless components'],
  ['3', 'Token layers across primitives, semantic theme, and modes'],
  ['8', 'Storybook stories covering foundations and component variants']
] as const;

const badgeTones = ['neutral', 'brand', 'success', 'warning', 'danger'] as const;
const buttonVariants = ['primary', 'secondary', 'tertiary', 'destructive', 'link'] as const;

const tokenHighlights = [
  ['brand', 'Brand action', 'Interactive affordances and selected navigation states.'],
  ['surface', 'Layered surfaces', 'Cards, panels, controls, and soft page backgrounds.'],
  ['success', 'Status feedback', 'Semantic state tokens shared by badges and messaging.']
] as const;

const systemChecklist: Array<{ label: string; detail: string; checked: boolean }> = [
  {
    label: 'Atomic design methodology',
    detail: 'Atoms, molecules, organisms, and headless primitives are separated under src/components.',
    checked: true
  },
  {
    label: 'Component composition patterns',
    detail: 'PreferencesPanel composes atoms with Dropdown and Modal primitives.',
    checked: true
  },
  {
    label: 'Headless Dropdown and Modal',
    detail: 'Root, Trigger, Content, Item, and Close APIs expose behavior separately from product copy.',
    checked: true
  },
  {
    label: 'Tokens and theming',
    detail: 'Primitive tokens feed a semantic theme plus three homepage appearance modes.',
    checked: true
  },
  {
    label: 'CSS-in-JS with tokens',
    detail: 'Emotion styled components consume theme color, type, spacing, radius, and shadow values.',
    checked: true
  },
  {
    label: 'Storybook documentation',
    detail: 'Stories cover tokens, atoms, molecules, organism examples, and headless primitives.',
    checked: true
  },
  {
    label: 'WCAG AA readiness',
    detail: 'Core components have axe tests; full AA certification still needs manual contrast and focus review.',
    checked: false
  }
];

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

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
        <NavItem href="#composition">
          <GridIcon />
          Composition
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
        {metrics.map(([value, label]) => (
          <MetricRow key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </MetricRow>
        ))}
      </Metrics>
    </Hero>
  );
}

function VariantCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <ComponentCard>
      <CardHeader>
        <h3>{title}</h3>
        <p>{description}</p>
      </CardHeader>
      {children}
    </ComponentCard>
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
        <VariantCard title="Badge" description="Status, category, and metadata markers with tone and size coverage.">
          <VariantStack>
            <VariantGroup>
              <GroupLabel>Tones</GroupLabel>
              <ComponentRow>
                {badgeTones.map((tone) => (
                  <Badge key={tone} tone={tone}>
                    {tone === 'danger' ? 'Error' : titleCase(tone)}
                  </Badge>
                ))}
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
        </VariantCard>

        <VariantCard title="Button" description="Action hierarchy, destructive actions, icon support, and disabled states.">
          <VariantStack>
            <VariantGroup>
              <GroupLabel>Variants</GroupLabel>
              <ButtonColumn>
                {buttonVariants.map((variant) => (
                  <Button
                    key={variant}
                    variant={variant}
                    onClick={() => setLastAction(`${titleCase(variant)} action selected`)}
                  >
                    {variant === 'link' ? 'Link action' : titleCase(variant)}
                  </Button>
                ))}
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
        </VariantCard>

        <VariantCard title="TextInput" description="Accessible label, hint, validation, icon, and disabled examples.">
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
        </VariantCard>

        <VariantCard title="Headless" description="Compositional primitives for menus and dialogs, styled here only by the homepage shell.">
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
        </VariantCard>
      </ComponentGrid>
    </Showcase>
  );
}

function CompositionOverview() {
  return (
    <Showcase id="composition">
      <SectionHeader>
        <h2>Composition Model</h2>
        <p>Atoms stay small, molecules bind structure, organisms combine real product behavior, and headless primitives own interaction state.</p>
      </SectionHeader>
      <SplitGrid>
        <ComponentCard>
          <CardHeader>
            <h3>Molecule</h3>
            <p>FormField accepts any control so products can compose labels, help text, and validation around custom inputs.</p>
          </CardHeader>
          <FormField
            label="Release channel"
            description="A molecule wrapper can frame a headless primitive without owning its behavior."
            control={
              <Dropdown.Root>
                <Dropdown.Trigger>Stable</Dropdown.Trigger>
                <Dropdown.Content aria-label="Release channels">
                  <Dropdown.Item>Stable</Dropdown.Item>
                  <Dropdown.Item>Beta</Dropdown.Item>
                  <Dropdown.Item disabled>Experimental</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            }
          />
        </ComponentCard>
        <PreferencesPanel />
      </SplitGrid>
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
        {tokenHighlights.map(([tone, title, description]) => (
          <TokenSwatch key={title}>
            <SwatchPreview $tone={tone} />
            <strong>{title}</strong>
            <span>{description}</span>
          </TokenSwatch>
        ))}
      </TokenGrid>
    </Showcase>
  );
}

function SystemNotes() {
  return (
    <Showcase id="system">
      <SectionHeader>
        <h2>System Notes</h2>
        <p>Validation summary for the foundation exercises in this repo.</p>
      </SectionHeader>
      <SystemGrid>
        {systemChecklist.map((item) => (
          <SystemItem key={item.label} $checked={item.checked}>
            <Badge tone={item.checked ? 'success' : 'warning'}>{item.checked ? 'Checked' : 'Needs review'}</Badge>
            <strong>{item.label}</strong>
            <span>{item.detail}</span>
          </SystemItem>
        ))}
      </SystemGrid>
      <FooterBand>
        <div>
          <Badge tone="success">Ready for composition</Badge>
          <Lead>Storybook remains the source for isolated docs; this dashboard shows the product-facing surface.</Lead>
        </div>
        <ActionLink href="#overview" $variant="secondary">
          Review foundations
          <ArrowIcon />
        </ActionLink>
      </FooterBand>
    </Showcase>
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
          <CompositionOverview />
          <TokenOverview />
          <SystemNotes />
        </Main>
      </Shell>
    </ThemeProvider>
  );
}

import styled from '@emotion/styled';
import type { ThemeMode } from './theme';

export const Shell = styled.div<{ $mode: ThemeMode }>`
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

export const Sidebar = styled.aside`
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

export const BrandBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export const LogoMark = styled.div`
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

export const BrandTitle = styled.div`
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

export const NavStack = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;

export const NavItem = styled.a<{ $active?: boolean }>`
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

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    outline: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.color.neutral.bg};
  }

  svg {
    color: ${({ theme, $active }) => ($active ? theme.color.brand.textSubtle : theme.color.textMuted)};
    height: 1.1rem;
    width: 1.1rem;
  }
`;

export const AppearancePanel = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[3]};
`;

export const PanelLabel = styled.div`
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

export const ThemeChoice = styled.button<{ $active: boolean; $accent: string }>`
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

export const Main = styled.main`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  min-width: 0;
  padding: ${({ theme }) => theme.space[8]};

  @media (max-width: 56rem) {
    padding: ${({ theme }) => theme.space[5]};
  }
`;

export const Hero = styled.section`
  align-items: end;
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  grid-template-columns: minmax(0, 1fr) minmax(17rem, 25rem);
  scroll-margin-top: ${({ theme }) => theme.space[6]};

  @media (max-width: 72rem) {
    grid-template-columns: 1fr;
  }
`;

export const HeroCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  max-width: 54rem;
`;

export const BadgeRail = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Title = styled.h1`
  font-size: clamp(2.75rem, 7vw, 6.5rem);
  letter-spacing: 0;
  line-height: 0.92;
  margin: 0;
`;

export const Lead = styled.p`
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  margin: 0;
  max-width: 43rem;
`;

export const HeroActions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
`;

export const ActionLink = styled.a<{ $variant?: 'primary' | 'secondary' | 'link'; $size?: 'md' | 'lg' }>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  display: inline-flex;
  font-size: ${({ $size = 'md' }) => ($size === 'lg' ? '0.9375rem' : '0.875rem')};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  gap: ${({ theme }) => theme.space[2]};
  justify-content: center;
  min-height: ${({ $variant, $size = 'md' }) => ($variant === 'link' ? 'auto' : $size === 'lg' ? '2.75rem' : '2.5rem')};
  padding: ${({ $variant, $size = 'md' }) => ($variant === 'link' ? '0' : $size === 'lg' ? '0 1rem' : '0 0.875rem')};
  text-decoration: none;

  ${({ theme, $variant = 'primary' }) => {
    if ($variant === 'secondary') {
      return `
        background: ${theme.color.surface};
        border-color: ${theme.color.border};
        color: ${theme.color.text};
        &:hover { background: ${theme.color.neutral.bg}; }
      `;
    }

    if ($variant === 'link') {
      return `
        background: transparent;
        color: ${theme.color.brand.textSubtle};
        &:hover { text-decoration: underline; }
      `;
    }

    return `
      background: ${theme.color.brand.bg};
      color: ${theme.color.brand.text};
      &:hover { background: ${theme.color.brand.bgHover}; }
    `;
  }}

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    outline: none;
  }

  svg {
    height: 1.1em;
    width: 1.1em;
  }
`;

export const Metrics = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[5]};
`;

export const MetricRow = styled.div`
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

export const Showcase = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  scroll-margin-top: ${({ theme }) => theme.space[6]};
`;

export const SectionHeader = styled.div`
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

export const ComponentGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 76rem) {
    grid-template-columns: 1fr;
  }
`;

export const SplitGrid = styled.div`
  align-items: start;
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: minmax(18rem, 0.85fr) minmax(20rem, 1.15fr);

  @media (max-width: 76rem) {
    grid-template-columns: 1fr;
  }
`;

export const ComponentCard = styled.article`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.floating};
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  padding: ${({ theme }) => theme.space[5]};
`;

export const CardHeader = styled.header`
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

export const VariantStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
`;

export const VariantGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export const GroupLabel = styled.div`
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  text-transform: uppercase;
`;

export const ComponentRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
`;

export const ButtonColumn = styled.div`
  align-items: stretch;
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export const InteractionStatus = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.color.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.textMuted};
  display: flex;
  font-size: ${({ theme }) => theme.font.size.sm};
  gap: ${({ theme }) => theme.space[2]};
  min-height: 2.5rem;
  padding: 0 ${({ theme }) => theme.space[3]};
`;

export const DialogBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};

  h2 {
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.color.textMuted};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    margin: 0;
  }
`;

export const TokenGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 64rem) {
    grid-template-columns: 1fr;
  }
`;

export const TokenSwatch = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]};

  strong {
    font-size: ${({ theme }) => theme.font.size.lg};
  }

  span {
    color: ${({ theme }) => theme.color.textMuted};
  }
`;

export const SwatchPreview = styled.div<{ $tone: 'brand' | 'surface' | 'success' }>`
  background: ${({ theme, $tone }) => {
    if ($tone === 'brand') return theme.color.brand.bg;
    if ($tone === 'success') return theme.color.success.bg;
    return theme.color.surfaceMuted;
  }};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  height: 3rem;
`;

export const SystemGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 72rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 44rem) {
    grid-template-columns: 1fr;
  }
`;

export const SystemItem = styled.div<{ $checked: boolean }>`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme, $checked }) => ($checked ? theme.color.border : theme.color.warning.text)};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]};

  strong {
    font-size: ${({ theme }) => theme.font.size.lg};
  }

  span {
    color: ${({ theme }) => theme.color.textMuted};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;

export const FooterBand = styled.section`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[5]};
  scroll-margin-top: ${({ theme }) => theme.space[6]};
`;

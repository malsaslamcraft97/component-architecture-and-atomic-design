import type { HTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
  children: ReactNode;
}

const paddingBySize: Record<BadgeSize, string> = {
  sm: '0.125rem 0.5rem',
  md: '0.25rem 0.625rem',
  lg: '0.375rem 0.75rem'
};

const fontSizeBySize: Record<BadgeSize, string> = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem'
};

const StyledBadge = styled.span<{ $tone: BadgeTone; $size: BadgeSize }>`
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  display: inline-flex;
  font-size: ${({ $size }) => fontSizeBySize[$size]};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  line-height: 1;
  min-height: 1.5rem;
  padding: ${({ $size }) => paddingBySize[$size]};

  ${({ theme, $tone }) => {
    const tones = {
      neutral: `background: ${theme.color.neutral.bg}; color: ${theme.color.neutral.text};`,
      brand: `background: ${theme.color.brand.subtle}; color: ${theme.color.brand.textSubtle};`,
      success: `background: ${theme.color.success.bg}; color: ${theme.color.success.text};`,
      warning: `background: ${theme.color.warning.bg}; color: ${theme.color.warning.text};`,
      danger: `background: ${theme.color.danger.subtle}; color: ${theme.color.danger.textSubtle};`
    };

    return tones[$tone];
  }}
`;

export function Badge({ tone = 'neutral', size = 'md', ...props }: BadgeProps) {
  return <StyledBadge $tone={tone} $size={size} {...props} />;
}

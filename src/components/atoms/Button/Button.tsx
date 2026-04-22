import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styled from '@emotion/styled';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link';
export type ButtonSize = 'md' | 'lg' | 'xl' | '2xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
}

const heightBySize: Record<ButtonSize, string> = {
  md: '2.5rem',
  lg: '2.75rem',
  xl: '3rem',
  '2xl': '3.5rem'
};

const paddingBySize: Record<ButtonSize, string> = {
  md: '0 0.875rem',
  lg: '0 1rem',
  xl: '0 1.125rem',
  '2xl': '0 1.375rem'
};

const fontSizeBySize: Record<ButtonSize, string> = {
  md: '0.875rem',
  lg: '0.9375rem',
  xl: '1rem',
  '2xl': '1.125rem'
};

const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize; $iconOnly: boolean }>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  display: inline-flex;
  font-size: ${({ $size }) => fontSizeBySize[$size]};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  gap: ${({ theme }) => theme.space[2]};
  height: ${({ $size }) => heightBySize[$size]};
  justify-content: center;
  min-width: ${({ $size, $iconOnly }) => ($iconOnly ? heightBySize[$size] : 'max-content')};
  padding: ${({ $size, $iconOnly }) => ($iconOnly ? '0' : paddingBySize[$size])};
  text-decoration: none;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;

  ${({ theme, $variant }) => {
    const variants = {
      primary: `
        background: ${theme.color.brand.bg};
        color: ${theme.color.brand.text};
        &:hover:not(:disabled) { background: ${theme.color.brand.bgHover}; }
      `,
      secondary: `
        background: ${theme.color.surface};
        border-color: ${theme.color.border};
        color: ${theme.color.text};
        &:hover:not(:disabled) { background: ${theme.color.neutral.bg}; }
      `,
      tertiary: `
        background: ${theme.color.brand.subtle};
        color: ${theme.color.brand.textSubtle};
        &:hover:not(:disabled) { background: ${theme.color.brand.subtleHover}; }
      `,
      destructive: `
        background: ${theme.color.danger.bg};
        color: ${theme.color.danger.text};
        &:hover:not(:disabled) { background: ${theme.color.danger.bgHover}; }
      `,
      link: `
        background: transparent;
        border-color: transparent;
        color: ${theme.color.brand.textSubtle};
        height: auto;
        min-width: auto;
        padding: 0;
        &:hover:not(:disabled) { text-decoration: underline; }
      `
    };

    return variants[$variant];
  }}

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  svg {
    flex: 0 0 auto;
    height: 1.1em;
    width: 1.1em;
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', leftIcon, rightIcon, iconOnly = false, type = 'button', ...props }, ref) => (
    <StyledButton ref={ref} type={type} $variant={variant} $size={size} $iconOnly={iconOnly} {...props}>
      {leftIcon}
      {!iconOnly && children}
      {rightIcon}
    </StyledButton>
  )
);

Button.displayName = 'Button';

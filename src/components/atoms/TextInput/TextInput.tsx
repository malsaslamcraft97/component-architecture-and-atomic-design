import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import styled from '@emotion/styled';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
  max-width: 24rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const InputShell = styled.div<{ $invalid: boolean; $disabled: boolean }>`
  align-items: center;
  background: ${({ theme, $disabled }) => ($disabled ? theme.color.surfaceMuted : theme.color.surface)};
  border: 1px solid ${({ theme, $invalid }) => ($invalid ? theme.color.danger.textSubtle : theme.color.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.textMuted};
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  min-height: 2.75rem;
  padding: 0 ${({ theme }) => theme.space[3]};
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:focus-within {
    border-color: ${({ theme, $invalid }) => ($invalid ? theme.color.danger.textSubtle : theme.color.focus)};
    box-shadow: ${({ theme }) => theme.shadow.focus};
  }

  svg {
    height: 1.125rem;
    width: 1.125rem;
  }
`;

const Input = styled.input`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.color.text};
  flex: 1;
  font-size: ${({ theme }) => theme.font.size.md};
  min-width: 0;
  outline: 0;

  &::placeholder {
    color: ${({ theme }) => theme.color.textMuted};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const HelpText = styled.p<{ $invalid?: boolean }>`
  color: ${({ theme, $invalid }) => ($invalid ? theme.color.danger.textSubtle : theme.color.textMuted)};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  margin: 0;
`;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, hint, error, leftIcon, rightIcon, disabled = false, required, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <Wrapper>
        <Label htmlFor={inputId}>
          {label}
          {required ? ' *' : ''}
        </Label>
        <InputShell $invalid={Boolean(error)} $disabled={disabled}>
          {leftIcon}
          <Input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            {...props}
          />
          {rightIcon}
        </InputShell>
        {hint && <HelpText id={hintId}>{hint}</HelpText>}
        {error && (
          <HelpText id={errorId} $invalid role="alert">
            {error}
          </HelpText>
        )}
      </Wrapper>
    );
  }
);

TextInput.displayName = 'TextInput';

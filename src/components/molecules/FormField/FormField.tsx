import type { ReactNode } from 'react';
import styled from '@emotion/styled';

export interface FormFieldProps {
  label: ReactNode;
  control: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;

const Label = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const Message = styled.div<{ $invalid?: boolean }>`
  color: ${({ theme, $invalid }) => ($invalid ? theme.color.danger.textSubtle : theme.color.textMuted)};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export function FormField({ label, control, description, error }: FormFieldProps) {
  return (
    <Field>
      <Label>{label}</Label>
      {control}
      {description && <Message>{description}</Message>}
      {error && <Message $invalid>{error}</Message>}
    </Field>
  );
}

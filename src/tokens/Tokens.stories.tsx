import type { Meta, StoryObj } from '@storybook/react';
import { primitiveTokens, theme } from '.';

const meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs']
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
      {Object.entries(primitiveTokens.color).map(([name, value]) => (
        <div key={name} style={{ border: `1px solid ${theme.color.border}`, borderRadius: 8, overflow: 'hidden', background: theme.color.surface }}>
          <div style={{ background: value, height: 64 }} />
          <div style={{ padding: 12 }}>
            <strong>{name}</strong>
            <div>{value}</div>
          </div>
        </div>
      ))}
    </div>
  )
};

export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {Object.entries(theme.space).map(([name, value]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <code style={{ width: 32 }}>{name}</code>
          <div style={{ width: value, height: 16, background: theme.color.brand.bg }} />
          <span>{value}</span>
        </div>
      ))}
    </div>
  )
};

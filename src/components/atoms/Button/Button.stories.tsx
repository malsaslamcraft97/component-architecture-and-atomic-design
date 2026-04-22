import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'destructive', 'link'] },
    size: { control: 'select', options: ['md', 'lg', 'xl', '2xl'] }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

export const SizesAndIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Button size="md" rightIcon={<ArrowIcon />}>
        Medium
      </Button>
      <Button size="lg" rightIcon={<ArrowIcon />}>
        Large
      </Button>
      <Button size="xl" leftIcon={<ArrowIcon />} rightIcon={<ArrowIcon />}>
        Extra large
      </Button>
      <Button size="2xl" iconOnly rightIcon={<ArrowIcon />} aria-label="Open details" />
    </div>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled'
  }
};

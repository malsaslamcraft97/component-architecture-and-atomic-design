import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M14 14l4 4M8.5 15a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  </svg>
);

const meta = {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: 'Use a work email for team workspaces.'
  }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search components',
    leftIcon: <SearchIcon />
  }
};

export const Error: Story = {
  args: {
    label: 'Email address',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address.',
    hint: 'This message is associated with aria-describedby.'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'readonly@example.com'
  }
};

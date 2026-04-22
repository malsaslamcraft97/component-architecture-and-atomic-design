import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Headless/Dropdown',
  component: Dropdown.Root,
  tags: ['autodocs']
} satisfies Meta<typeof Dropdown.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = {
  args: {
    children: null
  },
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger>Actions</Dropdown.Trigger>
      <Dropdown.Content aria-label="Component actions">
        <Dropdown.Item>Duplicate</Dropdown.Item>
        <Dropdown.Item>Rename</Dropdown.Item>
        <Dropdown.Item disabled>Archive</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
};

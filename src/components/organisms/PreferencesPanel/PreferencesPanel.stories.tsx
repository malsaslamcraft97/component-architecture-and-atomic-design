import type { Meta, StoryObj } from '@storybook/react';
import { PreferencesPanel } from './PreferencesPanel';

const meta = {
  title: 'Organisms/PreferencesPanel',
  component: PreferencesPanel,
  tags: ['autodocs']
} satisfies Meta<typeof PreferencesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

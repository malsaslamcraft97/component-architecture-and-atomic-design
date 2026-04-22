import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '../../atoms/TextInput';
import { Dropdown } from '../../headless/Dropdown';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs']
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTextInput: Story = {
  args: {
    label: 'Workspace name',
    description: 'The wrapped input keeps its own accessible label and description.',
    control: <TextInput label="Workspace name" placeholder="Foundations Lab" />
  }
};

export const WithHeadlessControl: Story = {
  args: {
    label: 'Release channel',
    description: 'FormField can compose around non-input controls without taking over their behavior.',
    control: (
      <Dropdown.Root>
        <Dropdown.Trigger>Stable</Dropdown.Trigger>
        <Dropdown.Content aria-label="Release channels">
          <Dropdown.Item>Stable</Dropdown.Item>
          <Dropdown.Item>Beta</Dropdown.Item>
          <Dropdown.Item disabled>Experimental</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    )
  }
};

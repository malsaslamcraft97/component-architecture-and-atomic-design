import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Headless/Modal',
  component: Modal.Root,
  tags: ['autodocs']
} satisfies Meta<typeof Modal.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dialog: Story = {
  args: {
    children: null
  },
  render: () => (
    <Modal.Root>
      <Modal.Trigger>Open modal</Modal.Trigger>
      <Modal.Content aria-labelledby="modal-story-title">
        <h2 id="modal-story-title" style={{ marginTop: 0 }}>
          Accessible dialog
        </h2>
        <p>The dialog uses role, aria-modal, labelled-by support, escape to dismiss, and focus entry.</p>
        <Modal.Close>Close</Modal.Close>
      </Modal.Content>
    </Modal.Root>
  )
};

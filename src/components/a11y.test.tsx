import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Badge, Button, FormField, PreferencesPanel, TextInput } from './index';
import { Dropdown } from './headless/Dropdown';
import { Modal } from './headless/Modal';
import { renderWithTheme } from '../test/renderWithTheme';

describe('design system accessibility', () => {
  it('renders atoms without axe violations', async () => {
    const { container } = renderWithTheme(
      <div>
        <Button>Save</Button>
        <Button iconOnly aria-label="Next" rightIcon={<span aria-hidden="true">›</span>} />
        <TextInput label="Email" hint="Use your work email." placeholder="you@example.com" />
        <Badge tone="success">Ready</Badge>
      </div>
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders molecule and organism compositions without axe violations', async () => {
    const { container } = renderWithTheme(
      <div>
        <FormField
          label="Project handle"
          description="Used in generated examples."
          control={<input aria-label="Project handle" defaultValue="foundations-lab" />}
        />
        <PreferencesPanel />
      </div>
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('links text input label and help text', () => {
    renderWithTheme(<TextInput label="Project name" hint="Keep it short." error="Project name is required." />);

    expect(screen.getByLabelText(/project name/i)).toHaveAccessibleDescription(/keep it short/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/required/i);
  });

  it('supports keyboard interaction in dropdown and modal primitives', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <div>
        <Dropdown.Root>
          <Dropdown.Trigger>Actions</Dropdown.Trigger>
          <Dropdown.Content aria-label="Actions">
            <Dropdown.Item>Duplicate</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
        <Modal.Root>
          <Modal.Trigger>Open modal</Modal.Trigger>
          <Modal.Content aria-labelledby="test-modal-title">
            <h2 id="test-modal-title">Confirm</h2>
            <Modal.Close>Close</Modal.Close>
          </Modal.Content>
        </Modal.Root>
      </div>
    );

    await user.click(screen.getByRole('button', { name: /actions/i }));
    expect(screen.getByRole('menuitem', { name: /duplicate/i })).toBeVisible();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menuitem', { name: /duplicate/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /open modal/i }));
    expect(screen.getByRole('dialog', { name: /confirm/i })).toBeVisible();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /confirm/i })).not.toBeInTheDocument();
  });
});

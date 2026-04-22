import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../test/renderWithTheme";
import { Button, Dropdown, FormField, Modal, PreferencesPanel, TextInput } from "./index";

describe("component composition flows", () => {
  it("composes FormField with different control types", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <div>
        <FormField label="Workspace" description="Shown in examples." control={<TextInput label="Workspace name" />} />
        <FormField
          label="Release channel"
          control={
            <Dropdown.Root>
              <Dropdown.Trigger>Stable</Dropdown.Trigger>
              <Dropdown.Content aria-label="Release channels">
                <Dropdown.Item>Stable</Dropdown.Item>
                <Dropdown.Item>Beta</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Root>
          }
        />
      </div>,
    );

    await user.type(screen.getByLabelText("Workspace name"), "Foundations Lab");
    expect(screen.getByLabelText("Workspace name")).toHaveValue("Foundations Lab");

    await user.click(screen.getByRole("button", { name: "Stable" }));
    expect(screen.getByRole("menuitem", { name: "Beta" })).toBeVisible();
  });

  it("composes modal content with design-system actions", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Modal.Root>
        <Modal.Trigger>Preview changes</Modal.Trigger>
        <Modal.Content aria-labelledby="changes-title">
          <h2 id="changes-title">Pending changes</h2>
          <Button>Apply</Button>
          <Modal.Close>Cancel</Modal.Close>
        </Modal.Content>
      </Modal.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Preview changes" }));
    const dialog = screen.getByRole("dialog", { name: "Pending changes" });

    expect(within(dialog).getByRole("button", { name: "Apply" })).toBeVisible();

    await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("drives the PreferencesPanel organism from nested primitives", async () => {
    const user = userEvent.setup();

    renderWithTheme(<PreferencesPanel />);

    await user.click(screen.getByRole("button", { name: "Theme" }));
    await user.click(screen.getByRole("menuitem", { name: "High contrast" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Preview modal" }));
    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

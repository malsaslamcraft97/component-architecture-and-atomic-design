import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../../test/renderWithTheme";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("opens and closes with the close button", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Modal.Root>
        <Modal.Trigger>Open modal</Modal.Trigger>
        <Modal.Content aria-labelledby="modal-title">
          <h2 id="modal-title">Confirm</h2>
          <Modal.Close>Close</Modal.Close>
        </Modal.Content>
      </Modal.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(screen.getByRole("dialog", { name: "Confirm" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports controlled open state changes", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    renderWithTheme(
      <Modal.Root open={false} onOpenChange={onOpenChange}>
        <Modal.Trigger>Open modal</Modal.Trigger>
        <Modal.Content aria-labelledby="modal-title">
          <h2 id="modal-title">Confirm</h2>
        </Modal.Content>
      </Modal.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Open modal" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on escape and restores body overflow", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Modal.Root>
        <Modal.Trigger>Open modal</Modal.Trigger>
        <Modal.Content aria-labelledby="modal-title">
          <h2 id="modal-title">Confirm</h2>
        </Modal.Content>
      </Modal.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });
});

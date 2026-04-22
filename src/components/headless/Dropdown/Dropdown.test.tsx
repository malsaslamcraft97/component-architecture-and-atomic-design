import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../../test/renderWithTheme";
import { Dropdown } from "./Dropdown";

describe("Dropdown", () => {
  it("opens, selects an item, and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    renderWithTheme(
      <Dropdown.Root>
        <Dropdown.Trigger>Actions</Dropdown.Trigger>
        <Dropdown.Content aria-label="Actions">
          <Dropdown.Item onClick={onSelect}>Duplicate</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Actions" });
    await user.click(trigger);
    await user.click(screen.getByRole("menuitem", { name: "Duplicate" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("supports controlled open state", () => {
    renderWithTheme(
      <Dropdown.Root open>
        <Dropdown.Trigger>Actions</Dropdown.Trigger>
        <Dropdown.Content aria-label="Actions">
          <Dropdown.Item>Duplicate</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>,
    );

    expect(screen.getByRole("menu", { name: "Actions" })).toBeVisible();
  });

  it("supports keyboard navigation and escape dismissal", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Dropdown.Root>
        <Dropdown.Trigger>Actions</Dropdown.Trigger>
        <Dropdown.Content aria-label="Actions">
          <Dropdown.Item>Duplicate</Dropdown.Item>
          <Dropdown.Item>Rename</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Actions" });
    await user.keyboard("{Tab}");
    expect(trigger).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

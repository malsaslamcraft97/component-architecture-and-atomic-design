import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../../test/renderWithTheme";
import { Button } from "./Button";

describe("Button", () => {
  it("defaults to a non-submit button", () => {
    renderWithTheme(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("type", "button");
  });

  it("fires click handlers", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire click handlers while disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("supports icon-only accessible names", () => {
    renderWithTheme(
      <Button iconOnly aria-label="Open details" rightIcon={<span aria-hidden="true">→</span>}>
        Hidden label
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Open details" })).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
  });
});

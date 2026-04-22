import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../../test/renderWithTheme";
import { PreferencesPanel } from "./PreferencesPanel";

describe("PreferencesPanel", () => {
  it("renders the composed organism content", () => {
    renderWithTheme(<PreferencesPanel />);

    expect(screen.getByRole("heading", { name: "Design system profile" })).toBeInTheDocument();
    expect(screen.getByLabelText("Workspace name")).toHaveValue("Foundations Lab");
    expect(screen.getByText("AA ready")).toBeInTheDocument();
  });

  it("opens nested dropdown and modal controls", async () => {
    const user = userEvent.setup();

    renderWithTheme(<PreferencesPanel />);

    await user.click(screen.getByRole("button", { name: "Theme" }));
    expect(screen.getByRole("menuitem", { name: "High contrast" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Preview modal" }));
    expect(screen.getByRole("dialog", { name: "Headless modal" })).toBeVisible();
  });
});

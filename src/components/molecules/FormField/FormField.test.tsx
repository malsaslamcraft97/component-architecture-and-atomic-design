import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../../test/renderWithTheme";
import { TextInput } from "../../atoms/TextInput";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders label, control, and description", () => {
    renderWithTheme(
      <FormField
        label="Workspace"
        description="Visible in generated examples."
        control={<TextInput label="Workspace name" placeholder="Foundations Lab" />}
      />,
    );

    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByLabelText("Workspace name")).toHaveAttribute("placeholder", "Foundations Lab");
    expect(screen.getByText("Visible in generated examples.")).toBeInTheDocument();
  });

  it("renders error messaging", () => {
    renderWithTheme(<FormField label="Workspace" control={<input aria-label="Workspace" />} error="Workspace is required." />);

    expect(screen.getByText("Workspace is required.")).toBeInTheDocument();
  });
});

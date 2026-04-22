import { createRef } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../../test/renderWithTheme";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("associates the label with the input", () => {
    renderWithTheme(<TextInput label="Email" placeholder="you@example.com" />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("placeholder", "you@example.com");
  });

  it("connects hint and error text through the accessible description", () => {
    renderWithTheme(<TextInput label="Project" hint="Keep it short." error="Project is required." />);

    expect(screen.getByLabelText("Project")).toHaveAccessibleDescription("Keep it short. Project is required.");
    expect(screen.getByRole("alert")).toHaveTextContent("Project is required.");
  });

  it("updates value from user input", async () => {
    const user = userEvent.setup();

    renderWithTheme(<TextInput label="Search" />);
    await user.type(screen.getByLabelText("Search"), "modal");

    expect(screen.getByLabelText("Search")).toHaveValue("modal");
  });

  it("supports disabled and ref forwarding", () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(<TextInput ref={ref} label="Read only contact" disabled defaultValue="readonly@example.com" />);

    expect(screen.getByLabelText("Read only contact")).toBeDisabled();
    expect(ref.current).toBe(screen.getByLabelText("Read only contact"));
  });
});

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../../test/renderWithTheme";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders badge content", () => {
    renderWithTheme(<Badge tone="success">Ready</Badge>);

    expect(screen.getByText("Ready")).toBeInTheDocument();
  });

  it("forwards span attributes", () => {
    renderWithTheme(
      <Badge tone="warning" size="lg" data-testid="status-badge">
        Pending
      </Badge>,
    );

    expect(screen.getByTestId("status-badge")).toHaveTextContent("Pending");
  });
});

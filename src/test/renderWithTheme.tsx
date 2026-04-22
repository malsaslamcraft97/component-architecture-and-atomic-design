import { ThemeProvider } from "@emotion/react";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { theme } from "../tokens";

export function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

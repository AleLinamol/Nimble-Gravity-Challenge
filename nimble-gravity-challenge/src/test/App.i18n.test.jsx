import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "../theme";
import App from "../App";
import { I18nProvider } from "../i18n/I18nProvider";

function renderApp() {
  return render(
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </I18nProvider>
  );
}

test("toggles language ES/EN and updates header text", async () => {
  // ✅ Mock del GET jobs para que no renderice error
  vi.mocked(fetch).mockResolvedValue({
    ok: true,
    json: async () => [],
  });

  renderApp();

  // ✅ Texto específico (evita matches múltiples)
  expect(
    screen.getByRole("heading", { name: /Posiciones Abiertas/i })
  ).toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "EN" }));

  expect(
    screen.getByRole("heading", { name: /Open Positions/i })
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "ES" }));

  expect(
    screen.getByRole("heading", { name: /Posiciones Abiertas/i })
  ).toBeInTheDocument();
});
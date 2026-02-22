import { test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import CandidateForm from "../components/CandidateForm";
import { I18nProvider } from "../i18n/I18nProvider";

function renderForm(props) {
  return render(
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <CandidateForm {...props} />
      </ThemeProvider>
    </I18nProvider>
  );
}

test("loads candidate by email and calls onCandidateLoaded", async () => {
  const candidate = {
    uuid: "u",
    candidateId: "c",
    applicationId: "a",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
  };

  vi.mocked(fetch).mockResolvedValue({
    ok: true,
    json: async () => candidate,
  });

  const onCandidateLoaded = vi.fn();
  renderForm({ candidate: null, onCandidateLoaded });

  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Email/i), "jane@doe.com");
  await user.click(screen.getByRole("button", { name: /Buscar|Search/i }));

  await waitFor(() => {
    expect(onCandidateLoaded).toHaveBeenCalledWith(candidate);
  });
});

test("shows localized not-found error in ES when backend says no candidate found", async () => {
  vi.mocked(fetch).mockResolvedValue({
    ok: false,
    status: 404,
    statusText: "Not Found",
    json: async () => ({ error: "No candidate found with that email" }),
  });

  const onCandidateLoaded = vi.fn();
  renderForm({ candidate: null, onCandidateLoaded });

  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Email/i), "no@found.com");
  await user.click(screen.getByRole("button", { name: /Buscar|Search/i }));

  await waitFor(() => {
    expect(
      screen.getByText(/No se encontró ningún candidato/i)
    ).toBeInTheDocument();
  });
});
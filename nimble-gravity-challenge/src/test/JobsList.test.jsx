import { test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import JobsList from "../components/JobsList";
import { I18nProvider } from "../i18n/I18nProvider";

function renderJobsList(props = {}) {
  return render(
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <JobsList {...props} />
      </ThemeProvider>
    </I18nProvider>
  );
}

test("loads jobs and renders translated title in ES (by id)", async () => {
  const jobs = [{ id: "4416372005", title: "Fullstack developer" }];

  vi.mocked(fetch).mockResolvedValue({
    ok: true,
    json: async () => jobs,
  });

  renderJobsList({ candidate: null });

  await waitFor(() => {
    expect(screen.getByText(/Desarrollador Fullstack/i)).toBeInTheDocument();
  });

  expect(fetch).toHaveBeenCalledTimes(1);
});
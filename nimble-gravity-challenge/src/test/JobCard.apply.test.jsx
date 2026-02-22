import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import JobCard from "../components/JobCard";
import { I18nProvider } from "../i18n/I18nProvider";

function renderJobCard(props) {
  return render(
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <JobCard {...props} />
      </ThemeProvider>
    </I18nProvider>
  );
}

test("submits application with required body fields including applicationId", async () => {
  const candidate = {
    uuid: "uuid-1",
    candidateId: "cand-1",
    applicationId: "app-1",
  };
  const job = { id: "4416372005", title: "Fullstack developer" };

  vi.mocked(fetch).mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true }),
  });

  renderJobCard({ job, candidate });

  const user = userEvent.setup();
  await user.type(
    screen.getByLabelText(/GitHub|URL del repo/i),
    "https://github.com/user/repo"
  );

  await user.click(screen.getByRole("button", { name: /Enviar|Submit/i }));

  const [url, options] = vi.mocked(fetch).mock.calls[0];

  expect(url).toMatch(/\/api\/candidate\/apply-to-job$/);
  expect(options.method).toBe("POST");

  const body = JSON.parse(options.body);

  expect(body).toEqual({
    uuid: "uuid-1",
    jobId: "4416372005",
    candidateId: "cand-1",
    applicationId: "app-1",
    repoUrl: "https://github.com/user/repo",
  });
});
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import CandidateForm from "./components/CandidateForm";
import JobsList from "./components/JobsList";
import { useI18n } from "./i18n/I18nProvider";

const LS_KEY = "job-apply:candidate";

export default function App() {
  const { lang, setLang, t } = useI18n();

  const [candidate, setCandidate] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (candidate) localStorage.setItem(LS_KEY, JSON.stringify(candidate));
      else localStorage.removeItem(LS_KEY);
    } catch {
      // ignore
    }
  }, [candidate]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky">
        <Toolbar sx={{ maxWidth: 960, width: "100%", mx: "auto", gap: 2 }}>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {t("appTitle")}
          </Typography>

          <ToggleButtonGroup
            size="small"
            value={lang}
            exclusive
            onChange={(_, v) => v && setLang(v)}
          >
            <ToggleButton value="es">ES</ToggleButton>
            <ToggleButton value="en">EN</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {t("openPositions")}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 720 }}
        >
          {t("subtitle")}
        </Typography>

        <CandidateForm candidate={candidate} onCandidateLoaded={setCandidate} />
        <JobsList candidate={candidate} />
      </Container>
    </Box>
  );
}
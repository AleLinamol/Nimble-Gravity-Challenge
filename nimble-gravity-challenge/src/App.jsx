import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CandidateForm from "./components/CandidateForm";
import JobsList from "./components/JobsList";

const LS_KEY = "job-apply:candidate";

export default function App() {
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
        <Toolbar sx={{ maxWidth: 960, width: "100%", mx: "auto" }}>
          <Typography variant="h6">Job Apply</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Posiciones Abiertas
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 720 }}
        >
          Elege una posición, pega la URL de tu repo de GitHub y envia tu
          postulación.
        </Typography>

        <CandidateForm candidate={candidate} onCandidateLoaded={setCandidate} />

        <JobsList candidate={candidate} />
      </Container>
    </Box>
  );
}
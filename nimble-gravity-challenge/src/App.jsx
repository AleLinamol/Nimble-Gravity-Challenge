import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import JobsList from "./components/JobsList";

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{ backdropFilter: "blur(8px)" }}
      >
        <Toolbar sx={{ maxWidth: 960, width: "100%", mx: "auto" }}>
          <Typography variant="h6">Job Apply</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Posiciones abiertas
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 720 }}
        >
          Elege una posición, pega la URL de tu repo de GitHub y envia tu
          postulación.
        </Typography>

        <JobsList />
      </Container>
    </Box>
  );
}

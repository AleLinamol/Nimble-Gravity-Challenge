import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import JobsList from './components/JobsList';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f6f7fb' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Job Apply
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centrado horizontal */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Container
          maxWidth="md"
          sx={{
            py: 5,
            // centra el container y evita que quede pegado a la izquierda
            mx: 'auto',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Posiciones abiertas
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Elegí una posición, pegá la URL de tu repo de GitHub y enviá tu postulación.
          </Typography>

          <JobsList />
        </Container>
      </Box>
    </Box>
  );
}
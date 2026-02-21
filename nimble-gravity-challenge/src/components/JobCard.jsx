import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function JobCard({ job }) {
  const [repoUrl, setRepoUrl] = useState('');

  const isValidGithubUrl = useMemo(() => {
    const v = repoUrl.trim();
    if (!v) return false;
    // simple y suficiente para UI
    return /^https?:\/\/(www\.)?github\.com\/[^/\s]+\/[^/\s]+\/?$/.test(v);
  }, [repoUrl]);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        bgcolor: 'white',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={1.5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {job.title}
            </Typography>

            <Chip size="small" label={`ID: ${job.id}`} variant="outlined" />
          </Box>

          <Divider />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <TextField
              label="URL del repo de GitHub"
              placeholder="https://github.com/tu-usuario/tu-repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              fullWidth
              size="small"
              error={repoUrl.length > 0 && !isValidGithubUrl}
              helperText={
                repoUrl.length === 0
                  ? 'Ej: https://github.com/user/proyecto'
                  : !isValidGithubUrl
                    ? 'Pegá una URL válida de GitHub (user/repo).'
                    : ' '
              }
            />

            <Button
              variant="contained"
              sx={{ minWidth: 140, height: 40, fontWeight: 700 }}
              disabled={!isValidGithubUrl}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
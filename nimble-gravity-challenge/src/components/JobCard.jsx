import { useMemo, useState } from "react";
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
} from "@mui/material";

export default function JobCard({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const canSubmitLater = !!candidate?.uuid;

  const isValidGithubUrl = useMemo(() => {
    const v = repoUrl.trim();
    if (!v) return false;
    return /^https?:\/\/(www\.)?github\.com\/[^/\s]+\/[^/\s]+\/?$/.test(v);
  }, [repoUrl]);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        bgcolor: "white",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={1.5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems="stretch"
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
                  ? "Ej: https://github.com/user/proyecto"
                  : !isValidGithubUrl
                    ? "Pegá una URL válida de GitHub (user/repo)."
                    : " "
              }
              sx={{
                flex: 1,
                "& .MuiInputBase-root": { height: 40 }, 
              }}
            />

            <Button
              variant="contained"
              sx={{
                height: 40,
                minWidth: 140,
                alignSelf: "flex-start", 
              }}
              disabled={!isValidGithubUrl || !canSubmitLater}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getCandidateByEmail } from "../api/candidate";

export default function CandidateForm({ candidate, onCandidateLoaded }) {
  const [email, setEmail] = useState(candidate?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Si candidate viene de localStorage o cambia, sincroniza el input
  useEffect(() => {
    if (candidate?.email) setEmail(candidate.email);
  }, [candidate?.email]);

  const isValidEmail = useMemo(() => {
    const v = email.trim();
    if (!v) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const onSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCandidateByEmail(email);
      console.log("[GET /api/candidate/get-by-email] response:", data);

      onCandidateLoaded(data);
    } catch (e) {
      console.error("[GET /api/candidate/get-by-email] error:", e);
      setError(e?.message ?? "Error buscando candidato");
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    onCandidateLoaded(null);
    setEmail("");
    setError(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!loading && isValidEmail) onSearch();
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={1.5}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 0.25 }}>
              Datos del candidato
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingresa tu email.
            </Typography>
          </Box>

          {candidate?.uuid ? (
            <Chip
              label={`Cargado: ${candidate.firstName ?? ""} ${candidate.lastName ?? ""}`.trim()}
              color="primary"
              variant="outlined"
            />
          ) : (
            <Chip label="No cargado" variant="outlined" />
          )}
        </Stack>

        {/* form para Enter */}
        <Box component="form" onSubmit={onSubmit}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems="stretch"
          >
            <TextField
              label="Email"
              placeholder="tu.email@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              error={email.length > 0 && !isValidEmail}
              helperText={
                email.length === 0
                  ? "Usá el mismo email con el que estás registrado/a."
                  : !isValidEmail
                    ? "Email inválido."
                    : " "
              }
              sx={{
                flex: 1,
                "& .MuiInputBase-root": { height: 40 }, 
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!isValidEmail || loading}
              sx={{
                height: 40,
                minWidth: 160,
                alignSelf: "flex-start", 
              }}
            >
              {loading ? "Buscando..." : "Buscar"}
            </Button>

            {candidate?.uuid && (
              <Button
                type="button"
                variant="outlined"
                onClick={onClear}
                disabled={loading}
                sx={{
                  height: 40,
                  minWidth: 120,
                  alignSelf: "flex-start",
                }}
              >
                Limpiar
              </Button>
            )}
          </Stack>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {candidate?.uuid && (
          <Alert severity="success" variant="outlined">
            Candidato cargado: <b>{candidate.email}  </b>
            {candidate?.firstName || candidate?.lastName
              ? ` — ${candidate.firstName ?? ""} ${candidate.lastName ?? ""}`.trim()
              : ""}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
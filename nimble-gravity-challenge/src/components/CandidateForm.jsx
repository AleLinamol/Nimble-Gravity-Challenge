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
import { useI18n } from "../i18n/I18nProvider";

export default function CandidateForm({ candidate, onCandidateLoaded }) {
  const { t } = useI18n();

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

      // Tomar el mensaje real del backend si viene en details
      const rawMsg =
        (e?.details && (e.details.message || e.details.error)) ||
        e?.message ||
        "";

      const normalized = String(rawMsg).toLowerCase();

      if (normalized.includes("no candidate found")) {
        setError(t("candidateNotFound"));
      } else {
        setError(t("candidateFetchError"));
      }
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
              {t("candidateTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("candidateSubtitle")}
            </Typography>
          </Box>

          {candidate?.uuid ? (
            <Chip
              label={`${t("loaded")}: ${candidate.firstName ?? ""} ${candidate.lastName ?? ""}`.trim()}
              color="primary"
              variant="outlined"
            />
          ) : (
            <Chip label={t("notLoaded")} variant="outlined" />
          )}
        </Stack>

        {/* Form to support Enter */}
        <Box component="form" onSubmit={onSubmit}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems="stretch"
          >
            <TextField
              label={t("emailLabel")}
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              error={email.length > 0 && !isValidEmail}
              helperText={
                email.length === 0
                  ? t("emailHelpEmpty")
                  : !isValidEmail
                    ? t("emailHelpInvalid")
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
              {loading ? t("searching") : t("search")}
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
                {t("clear")}
              </Button>
            )}
          </Stack>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {candidate?.uuid && (
          <Alert severity="success" variant="outlined">
            {t("candidateLoaded")}: <b>{candidate.email}</b>
            {candidate?.firstName || candidate?.lastName
              ? ` — ${candidate.firstName ?? ""} ${candidate.lastName ?? ""}`.trim()
              : ""}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}

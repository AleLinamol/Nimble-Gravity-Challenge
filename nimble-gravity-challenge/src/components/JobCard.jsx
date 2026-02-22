import { useMemo, useState } from "react";
import {
  Alert,
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
import { applyToJob } from "../api/apply";
import { useI18n } from "../i18n/I18nProvider";

export default function JobCard({ job, candidate }) {
  const { t } = useI18n();

  const [repoUrl, setRepoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitOk, setSubmitOk] = useState(false);

  const hasCandidate =
    !!candidate?.uuid && !!candidate?.candidateId && !!candidate?.applicationId;

  const isValidGithubUrl = useMemo(() => {
    const v = repoUrl.trim();
    if (!v) return false;
    return /^https?:\/\/(www\.)?github\.com\/[^/\s]+\/[^/\s]+\/?$/.test(v);
  }, [repoUrl]);

  const canSubmit = hasCandidate && isValidGithubUrl && !submitting;

  // Translate job title when available
  const titlesById = t("jobTitlesById");
  const titlesByName = t("jobTitlesByName");
  const displayTitle =
    (titlesById && titlesById[job.id]) ||
    (titlesByName && titlesByName[job.title]) ||
    job.title;

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      setSubmitOk(false);

      const payload = {
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl.trim(),
      };

      console.log("[POST /api/candidate/apply-to-job] body:", payload);

      const res = await applyToJob(payload);
      console.log("[POST /api/candidate/apply-to-job] response:", res);

      setSubmitOk(true);
    } catch (e) {
      console.error("[POST /api/candidate/apply-to-job] error:", e);
      console.error("[POST /api/candidate/apply-to-job] error.details:", e?.details);

      const fieldErrors = e?.details?.details?.fieldErrors;
      const fieldErrorsMsg = fieldErrors
        ? Object.entries(fieldErrors)
            .flatMap(([field, msgs]) => (msgs || []).map((m) => `${field}: ${m}`))
            .join(" | ")
        : null;

      const backendMsg =
        fieldErrorsMsg ||
        e?.details?.details?.formErrors?.join(" | ") ||
        e?.details?.message ||
        e?.details?.error ||
        (Array.isArray(e?.details?.errors) ? e.details.errors.join(", ") : null);

      setSubmitError(backendMsg || e?.message || t("applyErrorDefault"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: "white" }}>
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
              {displayTitle}
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
              label={t("githubRepoLabel")}
              placeholder={t("githubRepoPlaceholder")}
              value={repoUrl}
              onChange={(e) => {
                setRepoUrl(e.target.value);
                setSubmitOk(false);
                setSubmitError(null);
              }}
              fullWidth
              size="small"
              disabled={!hasCandidate || submitting}
              error={repoUrl.length > 0 && !isValidGithubUrl}
              helperText={
                !hasCandidate
                  ? t("mustLoadCandidate")
                  : repoUrl.length === 0
                    ? t("githubHelpEmpty")
                    : !isValidGithubUrl
                      ? t("githubHelpInvalid")
                      : " "
              }
              sx={{
                flex: 1,
                "& .MuiInputBase-root": { height: 40 },
              }}
            />

            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={!canSubmit}
              sx={{
                height: 40,
                minWidth: 140,
                alignSelf: "flex-start",
              }}
            >
              {submitting ? t("submitting") : t("submit")}
            </Button>
          </Stack>

          {submitError && (
            <Alert severity="error" variant="outlined">
              {submitError}
            </Alert>
          )}

          {submitOk && (
            <Alert severity="success" variant="outlined">
              {t("applySuccess")}
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
import { apiPost } from "./client";

export function applyToJob({ uuid, jobId, candidateId, applicationId, repoUrl }) {
  return apiPost("/api/candidate/apply-to-job", {
    uuid,
    jobId,
    candidateId,
    applicationId,
    repoUrl,
  });
}
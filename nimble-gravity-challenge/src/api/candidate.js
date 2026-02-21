import { apiGet } from "./client";

export function getCandidateByEmail(email) {
  const encoded = encodeURIComponent(email.trim());
  return apiGet(`/api/candidate/get-by-email?email=${encoded}`);
}
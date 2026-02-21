import { apiGet } from './client';

export function getJobs() {
  return apiGet('/api/jobs/get-list');
}
import { useEffect, useState } from 'react';
import { Alert, CircularProgress, Stack } from '@mui/material';
import { getJobs } from '../api/jobs';
import JobCard from './JobCard';

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getJobs();
        if (!cancelled) setJobs(data);
      } catch (e) {
        if (!cancelled) setError(e?.message ?? 'Error fetching jobs');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        No se pudieron cargar las posiciones. {error}
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </Stack>
  );
}
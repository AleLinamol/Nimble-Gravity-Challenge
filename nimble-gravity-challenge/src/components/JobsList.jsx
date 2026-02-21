import { useEffect, useState } from "react";
import { Alert, Stack, Skeleton } from "@mui/material";
import { getJobs } from "../api/jobs";
import JobCard from "./JobCard";

export default function JobsList({ candidate }) {
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
        console.log("[GET /api/jobs/get-list] response:", data);

        if (!cancelled) setJobs(data);
      } catch (e) {
        console.error("[GET /api/jobs/get-list] error:", e);

        if (!cancelled) setError(e?.message ?? "Error fetching jobs");
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
      <Stack spacing={2}>
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rounded"
            height={118}
            sx={{ borderRadius: 3 }}
          />
        ))}
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
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} candidate={candidate} />
      ))}
    </Stack>
  );
}
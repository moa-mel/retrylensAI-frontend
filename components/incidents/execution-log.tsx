"use client";

import { useEffect, useState } from "react";
import { getIncident } from "@/lib/incidents";
import type { Incident } from "@/lib/types";

export function ExecutionLog({ id }: { id: string }) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getIncident(id).then(setIncident).catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to load logs"));
  }, [id]);

  return <section className="card">
    <div className="section-heading"><div><h2>Captured logs</h2><p>Log lines recorded with the incident</p></div></div>
    {error && <div className="error-box">{error}</div>}
    {!incident && !error ? <div className="empty-state">Loading logs…</div> : (
      <pre className="code-block">{incident?.logs?.length ? incident.logs.join("\n") : "No log lines were captured."}</pre>
    )}
  </section>;
}
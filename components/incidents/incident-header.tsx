"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getIncident } from "@/lib/incidents";
import type { Incident } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function IncidentHeader({ id }: { id: string }) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getIncident(id).then(setIncident).catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to load incident"));
  }, [id]);

  if (error) return <div className="error-box">{error} <Link href="/incidents">Return to incidents</Link></div>;
  if (!incident) return <section className="card">Loading incident…</section>;

  return <section className="card" style={{ marginBottom: 18 }}>
    <div className="section-heading">
      <div><div className="eyebrow">INCIDENT #{incident.id}</div><h2 className="detail-title" style={{ marginTop: 8 }}>{incident.title}</h2><p className="muted">{incident.method} {incident.path}</p></div>
      <Badge tone={incident.statusCode >= 500 ? "danger" : incident.statusCode >= 400 ? "warning" : "neutral"}>{incident.statusCode}</Badge>
    </div>
    <dl className="kv-grid">
      <dt>Request ID</dt><dd>{incident.requestId}</dd>
      <dt>Captured at</dt><dd>{new Date(incident.timestamp).toLocaleString()}</dd>
      <dt>Replay verified</dt><dd>{incident.replayVerified ? "Yes" : "No"}</dd>
    </dl>
    <div className="detail-grid" style={{ marginTop: 20 }}>
      <div><h3 className="detail-title">Request payload</h3><pre className="code-block">{JSON.stringify(incident.payload, null, 2)}</pre></div>
      <div><h3 className="detail-title">Response body</h3><pre className="code-block">{JSON.stringify(incident.responseBody, null, 2)}</pre></div>
    </div>
  </section>;
}
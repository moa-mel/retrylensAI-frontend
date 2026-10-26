"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getIncidents } from "@/lib/incidents";
import type { IncidentSummary } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function RecentIncidents() {
  const [items, setItems] = useState<IncidentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getIncidents().then(setItems).catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to load incidents")).finally(() => setLoading(false));
  }, []);

  return <section className="card">
    <div className="section-heading"><div><h2>Recent incidents</h2><p>Latest captured failures</p></div><Link href="/incidents" className="button">View all</Link></div>
    {error && <div className="error-box">{error}</div>}
    {loading ? <div className="empty-state">Loading recent incidents…</div> : items.length === 0 ? <div className="empty-state">No incidents to show yet.</div> : (
      <div className="table-wrap"><table className="data-table">
        <thead><tr><th>Incident</th><th>Status</th><th>Timestamp</th><th>Replay</th><th /></tr></thead>
        <tbody>{items.slice(0, 5).map((item) => <tr key={item.id}>
          <td><strong>{item.title}</strong><div className="muted">#{item.id}</div></td>
          <td><Badge tone={item.statusCode >= 500 ? "danger" : item.statusCode >= 400 ? "warning" : "neutral"}>{item.statusCode}</Badge></td>
          <td>{new Date(item.timestamp).toLocaleString()}</td>
          <td><Badge tone={item.replayVerified ? "success" : "neutral"}>{item.replayVerified ? "Verified" : "Pending"}</Badge></td>
          <td><Link className="button" href={`/incidents/${item.id}`}>Open</Link></td>
        </tr>)}</tbody>
      </table></div>
    )}
  </section>;
}
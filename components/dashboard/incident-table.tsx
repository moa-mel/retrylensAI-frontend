"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getIncidents } from "@/lib/incidents";
import type { IncidentSummary } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function IncidentTable() {
  const [items, setItems] = useState<IncidentSummary[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getIncidents()
      .then(setItems)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to load incidents"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter((item) => `${item.id} ${item.title} ${item.statusCode}`.toLowerCase().includes(term));
  }, [items, query]);

  return (
    <section className="card">
      <div className="section-heading">
        <div><h2>All incidents</h2><p>{items.length} captured incident{items.length === 1 ? "" : "s"}</p></div>
      </div>
      <div className="search-row">
        <input className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, ID, or status…" aria-label="Search incidents" />
      </div>
      {error && <div className="error-box">{error}</div>}
      {loading ? <Skeleton height={180} /> : filtered.length === 0 ? (
        <div className="empty-state">{items.length ? "No incidents match your search." : "No incidents found. Check that the API is running and has data."}</div>
      ) : (
        <div className="table-wrap"><table className="data-table">
          <thead><tr><th>Incident</th><th>Status</th><th>Captured</th><th>Analysis</th><th>Replay</th><th /></tr></thead>
          <tbody>{filtered.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.title}</strong><div className="muted">ID: {item.id}</div></td>
              <td><Badge tone={item.statusCode >= 500 ? "danger" : item.statusCode >= 400 ? "warning" : "neutral"}>{item.statusCode}</Badge></td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
              <td><Badge tone={item.analyzed ? "success" : "neutral"}>{item.analyzed ? "Analyzed" : "Pending"}</Badge></td>
              <td><Badge tone={item.replayVerified ? "success" : "neutral"}>{item.replayVerified ? "Verified" : "Unverified"}</Badge></td>
              <td><Link className="button" href={`/incidents/${item.id}`}>Inspect</Link></td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
    </section>
  );
}
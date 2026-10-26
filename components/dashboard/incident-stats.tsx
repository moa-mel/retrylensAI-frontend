"use client";

import { useEffect, useState } from "react";
import { getIncidents } from "@/lib/incidents";
import type { IncidentSummary } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export function IncidentStats() {
  const [items, setItems] = useState<IncidentSummary[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getIncidents().then(setItems).catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to load metrics"));
  }, []);

  if (!items && !error) return <div className="stats-grid">{[1, 2, 3, 4].map((n) => <Skeleton key={n} height={132} />)}</div>;
  const stats = [
    { label: "Total incidents", value: items?.length ?? "—", note: "Captured by the API" },
    { label: "Analyzed", value: items?.filter((i) => i.analyzed).length ?? "—", note: "Diagnosis recorded" },
    { label: "Replay verified", value: items?.filter((i) => i.replayVerified).length ?? "—", note: "Fix passed replay" },
    { label: "Unresolved", value: items?.filter((i) => !i.replayVerified).length ?? "—", note: "Not yet verified" },
  ];
  return <>
    {error && <div className="error-box">{error}</div>}
    <div className="stats-grid">{stats.map((s) => <section className="card" key={s.label}>
      <div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div><div className="stat-note">{s.note}</div>
    </section>)}</div>
  </>;
}
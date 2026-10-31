"use client";

import { useEffect, useState } from "react";
import { getIncidents } from "@/lib/incidents";
import type { IncidentSummary } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export function IncidentStats() {
  const [items, setItems] = useState<IncidentSummary[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getIncidents()
      .then(setItems)
      .catch((err: unknown) =>
        setError(
          err instanceof Error ? err.message : "Unable to load metrics"
        )
      );
  }, []);

  if (!items && !error) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4].map((n) => (
          <Skeleton key={n} height={132} />
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: "Total incidents",
      value: items?.length ?? "—",
      note: "Captured by your API",
      icon: "◫",
    },
    {
      label: "Analyzed",
      value: items?.filter((i) => i.analyzed).length ?? "—",
      note: "Root cause identified",
      icon: "⌕",
    },
    {
      label: "Replay verified",
      value: items?.filter((i) => i.replayVerified).length ?? "—",
      note: "Fix passed replay",
      icon: "✓",
    },
    {
      label: "Unresolved",
      value: items?.filter((i) => !i.replayVerified).length ?? "—",
      note: "Awaiting verification",
      icon: "◷",
    },
  ];

  return (
    <>
      {error && <div className="error-box">{error}</div>}

      <div className="stats-grid">
        {stats.map((stat) => (
          <section className="stat-card" key={stat.label}>
            <div className="stat-top">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-icon">{stat.icon}</span>
            </div>

            <div className="stat-value">{stat.value}</div>
            <div className="stat-note">{stat.note}</div>
          </section>
        ))}
      </div>
    </>
  );
}
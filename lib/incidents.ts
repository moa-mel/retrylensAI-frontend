import { apiFetch } from "@/lib/api";
import type { Incident, IncidentSummary } from "@/lib/types";

export function getIncidents() {
  return apiFetch<IncidentSummary[]>("/incidents");
}

export function getIncident(id: string | number) {
  return apiFetch<Incident>(`/incidents/${encodeURIComponent(String(id))}`);
}

export function analyzeIncident(id: string | number) {
  return apiFetch<Incident>(`/incidents/${encodeURIComponent(String(id))}/analyze`, {
    method: "POST",
  });
}

export function replayIncident(id: string | number, mode: "broken" | "fixed" = "broken") {
  return apiFetch<Incident>(`/incidents/${encodeURIComponent(String(id))}/replay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode }),
  });
}
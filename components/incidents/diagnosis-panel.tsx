"use client";

import { useState } from "react";
import { analyzeIncident, getIncident } from "@/lib/incidents";
import type { Incident } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function DiagnosisPanel({ id }: { id: string }) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  async function refresh() {
    const data = await getIncident(id);
    setIncident(data);
    setLoaded(true);
  }

  async function runAnalysis() {
    setLoading(true); setError("");
    try { setIncident(await analyzeIncident(id)); setLoaded(true); }
    catch (err) { setError(err instanceof Error ? err.message : "Analysis failed"); }
    finally { setLoading(false); }
  }

  return <section className="card">
    <div className="section-heading"><div><h2>AI diagnosis</h2><p>Root-cause analysis for this incident</p></div></div>
    <div className="button-row">
      <Button variant="primary" onClick={runAnalysis} disabled={loading}>{loading ? "Analyzing…" : "Run analysis"}</Button>
      <Button onClick={() => { setError(""); refresh().catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to refresh")); }}>Refresh</Button>
    </div>
    {error && <div className="error-box">{error}</div>}
    {loaded && incident?.diagnosis && <div style={{ marginTop: 18 }}>
      <pre className="code-block">{JSON.stringify(incident.diagnosis, null, 2)}</pre>
      <p className="footer-note">Evidence checked: {incident.diagnosisEvidenceChecked ? "Yes" : "No"}</p>
    </div>}
    {loaded && !incident?.diagnosis && <div className="empty-state">No diagnosis is attached to this incident yet.</div>}
    {!loaded && <p className="footer-note">Run analysis to request a diagnosis, or select Refresh to load an existing result.</p>}
  </section>;
}
"use client";

import { useState } from "react";
import { replayIncident } from "@/lib/incidents";
import type { Incident } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ReplayPanel({ id }: { id: string }) {
  const [mode, setMode] = useState<"broken" | "fixed">("broken");
  const [result, setResult] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runReplay() {
    setLoading(true); setError("");
    try { setResult(await replayIncident(id, mode)); }
    catch (err) { setError(err instanceof Error ? err.message : "Replay failed"); }
    finally { setLoading(false); }
  }

  return <section className="card">
    <div className="section-heading"><div><h2>Replay verification</h2><p>Run a predefined sandbox scenario</p></div></div>
    <label className="field">Replay mode
      <select value={mode} onChange={(e) => setMode(e.target.value as "broken" | "fixed")}>
        <option value="broken">Broken baseline</option>
        <option value="fixed">Fixed candidate</option>
      </select>
    </label>
    <div className="button-row" style={{ marginTop: 14 }}>
      <Button variant="primary" onClick={runReplay} disabled={loading}>{loading ? "Running…" : "Run replay"}</Button>
    </div>
    {error && <div className="error-box">{error}</div>}
    {result?.lastReplay && <div style={{ marginTop: 18 }}>
      <Badge tone={result.lastReplay.passed ? "success" : "danger"}>{result.lastReplay.passed ? "Passed" : "Failed"}</Badge>
      <p className="footer-note">Mode: {result.lastReplay.mode} · {new Date(result.lastReplay.ranAt).toLocaleString()}</p>
      <h3 className="detail-title" style={{ marginTop: 18 }}>Assertions</h3>
      <pre className="code-block">{JSON.stringify(result.lastReplay.assertions, null, 2)}</pre>
    </div>}
    {!result && <p className="footer-note">Choose a mode and run the sandbox replay to see the outcome.</p>}
  </section>;
}
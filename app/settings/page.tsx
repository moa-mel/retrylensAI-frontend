import { PageContainer } from "@/components/layout/page-container";

export default function SettingsPage() {
  return (
    <PageContainer eyebrow="PREFERENCES" title="Settings" description="Configure the frontend connection and review current app behavior.">
      <section className="card">
        <h2 className="detail-title">API connection</h2>
        <div className="settings-list">
          <div className="setting-row">
            <div><strong>Backend base URL</strong><p>Set NEXT_PUBLIC_API_URL in web/.env.local.</p></div>
            <span className="badge">Environment</span>
          </div>
          <div className="setting-row">
            <div><strong>Incident analysis</strong><p>Analysis requests are sent to your NestJS API.</p></div>
            <span className="badge">API-managed</span>
          </div>
          <div className="setting-row">
            <div><strong>Replay safety</strong><p>Only run the predefined sandbox scenarios supported by your backend.</p></div>
            <span className="badge badge-success">Sandbox</span>
          </div>
        </div>
        <p className="footer-note">This page is informational. It does not change backend configuration.</p>
      </section>
    </PageContainer>
  );
}
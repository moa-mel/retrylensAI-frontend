import { IncidentHeader } from "@/components/incidents/incident-header";
import { DiagnosisPanel } from "@/components/incidents/diagnosis-panel";
import { ReplayPanel } from "@/components/incidents/replay-panel";
import { ExecutionLog } from "@/components/incidents/execution-log";
import { PageContainer } from "@/components/layout/page-container";

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  

  return (
    <PageContainer
      eyebrow={`INCIDENT/${id}`}
      title="Incident details"
      description="Inspect the captured request and response, run a diagnosis, and verify a replay."
    >
      <IncidentHeader id={id} />
      <div className="detail-grid">
        <div className="stack">
          <DiagnosisPanel id={id} />
          <ExecutionLog id={id} />
        </div>
        <ReplayPanel id={id} />
      </div>
    </PageContainer>
  );
}
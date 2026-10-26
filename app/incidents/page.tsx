import { IncidentTable } from "@/components/dashboard/incident-table";
import { PageContainer } from "@/components/layout/page-container";

export default function IncidentsPage() {
  return (
    <PageContainer
      eyebrow="OBSERVABILITY"
      title="Incidents"
      description="Browse captured failures, inspect their context, and run analysis or replay."
    >
      <IncidentTable />
    </PageContainer>
  );
}
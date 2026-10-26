import Link from "next/link";
import { IncidentStats } from "@/components/dashboard/incident-stats";
import { RecentIncidents } from "@/components/dashboard/recent-incidents";
import { PageContainer } from "@/components/layout/page-container";

export default function DashboardPage() {
  return (
    <PageContainer
      eyebrow="OVERVIEW"
      title="Incident dashboard"
      description="Understand production failures and verify your fixes."
      actions={<Link className="button button-primary" href="/incidents">View all incidents</Link>}
    >
      <IncidentStats />
      <RecentIncidents />
    </PageContainer>
  );
}
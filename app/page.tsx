import Link from "next/link";
import { IncidentStats } from "@/components/dashboard/incident-stats";
import { RecentIncidents } from "@/components/dashboard/recent-incidents";
import { PageContainer } from "@/components/layout/page-container";

export default function DashboardPage() {
  return (
    <PageContainer
      eyebrow="YOUR WORKSPACE"
      title="Good to have you back."
      description="Monitor application failures, investigate their causes, and verify your fixes."
      actions={
        <Link className="button button-primary" href="/incidents">
          Explore incidents <span aria-hidden="true">→</span>
        </Link>
      }
    >
      <IncidentStats />
      <RecentIncidents />
    </PageContainer>
  );
}
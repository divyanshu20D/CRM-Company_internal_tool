import { qaDashboardData } from "@/components/qa/qa-data";
import { QaSectionCard, QaSignalList } from "@/components/qa/qa-ui";

export function QaNotificationsPage() {
  return (
    <QaSectionCard
      title="QA notifications"
      description="This prototype keeps QA notifications focused on retests, blockers, and sign-off movement instead of broad project noise."
    >
      <QaSignalList items={qaDashboardData.updates} />
    </QaSectionCard>
  );
}

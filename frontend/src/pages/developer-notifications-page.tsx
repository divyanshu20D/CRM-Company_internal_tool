import { developerDashboardData } from "@/components/developer/dev-data";
import { DeveloperSectionCard, DeveloperSignalList } from "@/components/developer/dev-ui";

export function DeveloperNotificationsPage() {
  return (
    <DeveloperSectionCard
      title="Developer notifications"
      description="This prototype keeps developer notifications tight and action-oriented instead of showing broad project-level noise."
    >
      <DeveloperSignalList items={developerDashboardData.updates} />
    </DeveloperSectionCard>
  );
}

import { tlDashboardData } from "@/components/team-lead/tl-data";
import { TeamLeadProjectCard } from "@/components/team-lead/tl-ui";

export function TeamLeadProjectsPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {tlDashboardData.projectRows.map((project) => (
        <TeamLeadProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

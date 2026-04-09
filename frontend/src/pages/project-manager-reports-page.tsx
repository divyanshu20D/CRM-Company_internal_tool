import { useParams } from "react-router-dom";

import { SectionHeading } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";

export function ProjectManagerReportsPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
      <SectionHeading
        title="Reports"
        description="Reports the PM would use to judge readiness, risk, and sprint health."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {project.reports.map((report) => (
          <div key={report.title} className="rounded-md border border-border bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-foreground">{report.title}</div>
              <div className="text-xs text-muted-foreground">{report.period}</div>
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">{report.signal}</div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{report.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

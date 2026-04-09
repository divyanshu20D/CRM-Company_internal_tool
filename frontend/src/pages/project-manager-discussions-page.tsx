import { useParams } from "react-router-dom";

import { SectionHeading } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";

export function ProjectManagerDiscussionsPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
      <SectionHeading
        title="Discussions"
        description="Project conversations and decisions that the PM needs to actively track."
      />

      <div className="grid gap-4">
        {project.discussions.map((discussion) => (
          <div key={discussion.title} className="rounded-md border border-border bg-muted/20 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-foreground">{discussion.title}</div>
              <div className="text-xs text-muted-foreground">{discussion.updated}</div>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{discussion.owner}</div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{discussion.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

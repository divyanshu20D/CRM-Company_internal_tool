import { useParams } from "react-router-dom";

import { getTlProject } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard } from "@/components/team-lead/tl-ui";

export function TeamLeadProjectDiscussionsPage() {
  const { projectId } = useParams();
  const project = getTlProject(projectId);

  return (
    <TeamLeadSectionCard
      title="Open discussions"
      description="These are the ongoing delivery conversations the team lead should keep tight so work does not stall in discussion loops."
    >
      <div className="grid gap-3">
        {project.discussions.map((discussion) => (
          <div key={discussion.title} className="rounded-xl border border-border/60 bg-muted/10 p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="grid gap-1">
                <div className="text-sm font-semibold text-foreground">{discussion.title}</div>
                <div className="text-sm text-muted-foreground">{discussion.channel}</div>
              </div>
              <div className="text-xs text-muted-foreground">{discussion.updated}</div>
            </div>
            <p className="pt-3 text-sm leading-7 text-muted-foreground">{discussion.summary}</p>
          </div>
        ))}
      </div>
    </TeamLeadSectionCard>
  );
}

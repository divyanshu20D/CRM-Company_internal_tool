import { useParams } from "react-router-dom";

import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { getPmIssue, getPmProject } from "@/components/project-manager/pm-data";

export function ProjectManagerIssueDetailPage() {
  const { projectId, issueId } = useParams();
  const project = getPmProject(projectId);
  const issue = getPmIssue(projectId, issueId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title={`${issue.id} · ${issue.title}`}
          description="Issue detail view for PM follow-up, ownership, and acceptance tracking."
        />

        <div className="grid gap-4">
          <div className="rounded-md border border-border bg-muted/20 p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Description</div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{issue.description}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/20 p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Acceptance</div>
            <div className="mt-2 flex flex-col gap-2">
              {issue.acceptance.map((item) => (
                <div key={item} className="rounded-md border border-border bg-background p-3 text-sm leading-6 text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Issue context"
          description={`Current PM context for ${project.name}.`}
          items={[
            { copy: `Type: ${issue.type}` },
            { copy: `Status: ${issue.status}` },
            { copy: `Priority: ${issue.priority}` },
            { copy: `Assignee: ${issue.assignee}` },
            { copy: `Updated: ${issue.updated}` },
          ]}
        />
      </aside>
    </div>
  );
}

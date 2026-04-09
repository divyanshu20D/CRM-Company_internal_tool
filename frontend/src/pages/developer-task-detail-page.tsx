import { useParams } from "react-router-dom";

import { getDeveloperTask } from "@/components/developer/dev-data";
import { DeveloperSectionCard, DeveloperSignalList, DeveloperStatusBadge } from "@/components/developer/dev-ui";

export function DeveloperTaskDetailPage() {
  const { taskId } = useParams();
  const task = getDeveloperTask(taskId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_340px]">
      <section className="flex min-w-0 flex-col gap-4">
        <DeveloperSectionCard
          title="Task summary"
          description="This page gives the developer the minimum working surface needed to finish the task without hunting through multiple screens."
        >
          <div className="grid gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border/60 bg-muted/10 p-4">
              <div className="grid gap-1">
                <div className="text-base font-semibold text-foreground">{task.title}</div>
                <div className="text-sm text-muted-foreground">
                  {task.id} · {task.project} · {task.type}
                </div>
              </div>
              <DeveloperStatusBadge value={task.status} />
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Priority</div>
                <div className="pt-1 text-sm font-medium text-foreground">{task.priority}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Due</div>
                <div className="pt-1 text-sm font-medium text-foreground">{task.due}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Estimate</div>
                <div className="pt-1 text-sm font-medium text-foreground">{task.estimate}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Branch</div>
                <div className="pt-1 text-sm font-medium text-foreground">{task.branch}</div>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/90 p-4 text-sm leading-7 text-muted-foreground">
              {task.summary}
            </div>
          </div>
        </DeveloperSectionCard>

        <DeveloperSectionCard title="Acceptance criteria" description="These are the conditions that define when this task is actually done.">
          <DeveloperSignalList items={task.acceptance} variant="priority" />
        </DeveloperSectionCard>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <DeveloperSectionCard title="Dependencies" description="Dependencies should be visible so the developer knows what to escalate instead of guessing.">
          <DeveloperSignalList items={task.dependencies} variant="blocked" />
        </DeveloperSectionCard>

        <DeveloperSectionCard title="Working notes" description="These are the latest working notes attached to the task.">
          <DeveloperSignalList items={task.notes} />
        </DeveloperSectionCard>
      </aside>
    </div>
  );
}

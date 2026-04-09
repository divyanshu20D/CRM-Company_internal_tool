import { useParams } from "react-router-dom";

import { getQaItem } from "@/components/qa/qa-data";
import { QaSectionCard, QaSignalList, QaStatusBadge } from "@/components/qa/qa-ui";

export function QaTaskDetailPage() {
  const { taskId } = useParams();
  const item = getQaItem(taskId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_340px]">
      <section className="flex min-w-0 flex-col gap-4">
        <QaSectionCard
          title="Validation summary"
          description="This view keeps the QA item focused on what needs to be checked, what build is under test, and what evidence must exist before closure."
        >
          <div className="grid gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border/60 bg-muted/10 p-4">
              <div className="grid gap-1">
                <div className="text-base font-semibold text-foreground">{item.title}</div>
                <div className="text-sm text-muted-foreground">
                  {item.id} · {item.project} · {item.type}
                </div>
              </div>
              <QaStatusBadge value={item.status} />
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Priority</div>
                <div className="pt-1 text-sm font-medium text-foreground">{item.priority}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Due</div>
                <div className="pt-1 text-sm font-medium text-foreground">{item.due}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Owner</div>
                <div className="pt-1 text-sm font-medium text-foreground">{item.owner}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Build</div>
                <div className="pt-1 text-sm font-medium text-foreground">{item.build}</div>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/90 p-4 text-sm leading-7 text-muted-foreground">
              {item.summary}
            </div>
          </div>
        </QaSectionCard>

        <QaSectionCard title="Validation checks" description="These checks define what QA still needs to confirm before closing the item.">
          <QaSignalList items={item.checks} variant="priority" />
        </QaSectionCard>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <QaSectionCard title="Current blockers" description="Blockers should be made explicit so validation risk is visible to PM and engineering.">
          <QaSignalList items={item.blockers.length ? item.blockers : ["No active blockers on this QA item."]} variant="blocked" />
        </QaSectionCard>

        <QaSectionCard title="Required evidence" description="These are the files, checklists, or artifacts needed before the QA item is truly complete.">
          <QaSignalList items={item.evidence} />
        </QaSectionCard>
      </aside>
    </div>
  );
}

import { qaDiscussions } from "@/components/qa/qa-data";
import { QaSectionCard } from "@/components/qa/qa-ui";

export function QaDiscussionsPage() {
  return (
    <QaSectionCard
      title="QA discussions"
      description="These threads help QA surface what still needs clarification before retests or sign-off can close."
    >
      <div className="grid gap-3">
        {qaDiscussions.map((discussion) => (
          <div key={discussion.title} className="rounded-xl border border-border/60 bg-muted/10 p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="grid gap-1">
                <div className="text-sm font-semibold text-foreground">{discussion.title}</div>
                <div className="text-sm text-muted-foreground">{discussion.project}</div>
              </div>
              <div className="text-xs text-muted-foreground">{discussion.updated}</div>
            </div>
            <p className="pt-3 text-sm leading-7 text-muted-foreground">{discussion.summary}</p>
          </div>
        ))}
      </div>
    </QaSectionCard>
  );
}

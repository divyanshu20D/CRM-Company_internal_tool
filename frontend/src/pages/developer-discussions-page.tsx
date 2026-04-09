import { developerDiscussions } from "@/components/developer/dev-data";
import { DeveloperSectionCard } from "@/components/developer/dev-ui";

export function DeveloperDiscussionsPage() {
  return (
    <DeveloperSectionCard
      title="Task discussions"
      description="These are the active technical or delivery threads still influencing the assigned work."
    >
      <div className="grid gap-3">
        {developerDiscussions.map((discussion) => (
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
    </DeveloperSectionCard>
  );
}

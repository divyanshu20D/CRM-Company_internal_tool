import { developerSprintItems } from "@/components/developer/dev-data";
import { DeveloperSectionCard } from "@/components/developer/dev-ui";
import { Badge } from "@/components/ui/badge";

export function DeveloperSprintPage() {
  return (
    <DeveloperSectionCard
      title="Current sprint lanes"
      description="The sprint is shown the way a developer usually experiences it: work being built, work in review, and work that is ready for QA."
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {developerSprintItems.map((lane) => (
          <div key={lane.lane} className="rounded-xl border border-border/60 bg-muted/10 p-4">
            <div className="flex items-center justify-between gap-2 pb-3">
              <span className="text-sm font-semibold text-foreground">{lane.lane}</span>
              <Badge variant="secondary">{lane.count}</Badge>
            </div>
            <div className="flex flex-col gap-2">
              {lane.items.map((item) => (
                <div key={item} className="rounded-lg border border-border/60 bg-card/90 p-3 text-sm text-foreground shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DeveloperSectionCard>
  );
}

import { Link } from "react-router-dom";

import { developerDashboardData, developerTasks } from "@/components/developer/dev-data";
import { DeveloperSectionCard, DeveloperSignalList, DeveloperTaskCard } from "@/components/developer/dev-ui";
import { Button } from "@/components/ui/button";
import { MetricGrid, StackedNoteCard } from "@/components/workspace/workspace-ui";

export function DeveloperDashboardPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_340px]">
      <section className="flex min-w-0 flex-col gap-4">
        <MetricGrid items={developerDashboardData.metrics} />

        <DeveloperSectionCard
          title="Current assignments"
          description="These are the tasks the developer is actively responsible for right now across current projects."
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/developer/tasks">Open all tasks</Link>
            </Button>
          }
        >
          <div className="grid gap-3 lg:grid-cols-2">
            {developerTasks.map((task) => (
              <DeveloperTaskCard
                key={task.id}
                task={{
                  id: task.id,
                  title: task.title,
                  project: task.project,
                  status: task.status,
                  due: task.due,
                  priority: task.priority,
                }}
              />
            ))}
          </div>
        </DeveloperSectionCard>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Today's priorities"
          description="The most important execution outcomes to protect before the day closes."
          items={developerDashboardData.priorities.map((copy) => ({ copy }))}
        />

        <DeveloperSectionCard title="Live updates" description="Recent changes that affect build decisions, handoffs, or validation flow.">
          <DeveloperSignalList items={developerDashboardData.updates} />
        </DeveloperSectionCard>
      </aside>
    </div>
  );
}

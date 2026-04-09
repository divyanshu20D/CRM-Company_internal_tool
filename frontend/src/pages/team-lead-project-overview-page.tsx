import { useParams } from "react-router-dom";

import { getTlProject } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadSignalList, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { MetricGrid } from "@/components/workspace/workspace-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadProjectOverviewPage() {
  const { projectId } = useParams();
  const project = getTlProject(projectId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="flex min-w-0 flex-col gap-4">
        <MetricGrid
          items={[
            { label: "Current sprint", value: project.sprint.replace("Sprint ", ""), tone: "blue" },
            { label: "Open blockers", value: String(project.blockers.length).padStart(2, "0"), tone: "amber" },
            { label: "QA handoffs", value: String(project.qaHandoffs.length).padStart(2, "0"), tone: "teal" },
            { label: "Progress", value: project.progress, tone: "green" },
          ]}
        />

        <TeamLeadSectionCard
          title="Project focus"
          description="This view is for what the team lead actually needs: what the sprint is protecting, what is moving today, and what is at risk."
        >
          <div className="rounded-xl border border-border/60 bg-muted/10 p-4 text-sm leading-7 text-muted-foreground">
            {project.focus}
          </div>
        </TeamLeadSectionCard>

        <TeamLeadSectionCard
          title="Live delivery items"
          description="A compact slice of the task queue that needs the most active team-lead supervision."
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>QA state</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium text-foreground">{task.title}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>
                    <TeamLeadStatusBadge value={task.status} />
                  </TableCell>
                  <TableCell>{task.eta}</TableCell>
                  <TableCell>{task.qaState}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TeamLeadSectionCard>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <TeamLeadSectionCard
          title="Blocker pressure"
          description="Use this snapshot to decide what needs escalation before the next standup or QA window."
        >
          <TeamLeadSignalList items={project.blockers.map((blocker) => `${blocker.title} - ${blocker.nextStep}`)} />
        </TeamLeadSectionCard>

        <TeamLeadSectionCard
          title="QA handoff state"
          description="This keeps the line between development and QA clean, visible, and time-bound."
        >
          <div className="flex flex-col gap-2.5">
            {project.qaHandoffs.map((handoff) => (
              <div key={handoff.story} className="rounded-lg border border-border/60 bg-muted/10 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid gap-1">
                    <div className="text-sm font-medium text-foreground">{handoff.story}</div>
                    <div className="text-sm text-muted-foreground">
                      {handoff.developer} to {handoff.qaOwner}
                    </div>
                  </div>
                  <TeamLeadStatusBadge value={handoff.status} />
                </div>
              </div>
            ))}
          </div>
        </TeamLeadSectionCard>
      </aside>
    </div>
  );
}

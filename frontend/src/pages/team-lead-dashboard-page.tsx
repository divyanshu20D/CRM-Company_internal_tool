import { Link } from "react-router-dom";

import { tlDashboardData, tlGlobalBlockers, tlGlobalQaHandoffs } from "@/components/team-lead/tl-data";
import { TeamLeadProjectCard, TeamLeadSectionCard, TeamLeadSignalList, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MetricGrid, StackedNoteCard } from "@/components/workspace/workspace-ui";

export function TeamLeadDashboardPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_360px]">
      <section className="flex min-w-0 flex-col gap-4">
        <MetricGrid items={tlDashboardData.metrics} />

        <TeamLeadSectionCard
          title="Assigned delivery streams"
          description="Project-level execution view showing sprint pressure, next standup, and current movement."
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/team-lead/projects">Open all projects</Link>
            </Button>
          }
        >
          <div className="grid gap-3 lg:grid-cols-2">
            {tlDashboardData.projectRows.map((project) => (
              <TeamLeadProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TeamLeadSectionCard>

        <TeamLeadSectionCard
          title="Delivery pressure"
          description="The most important blockers and QA handoffs that are shaping today's execution decisions."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <div className="pb-3 text-sm font-semibold text-foreground">Open blockers</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Age</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tlGlobalBlockers.map((blocker) => (
                    <TableRow key={`${blocker.project}-${blocker.title}`}>
                      <TableCell className="font-medium text-foreground">{blocker.project}</TableCell>
                      <TableCell>{blocker.owner}</TableCell>
                      <TableCell>{blocker.age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <div className="pb-3 text-sm font-semibold text-foreground">QA handoffs</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Story</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tlGlobalQaHandoffs.map((handoff) => (
                    <TableRow key={`${handoff.project}-${handoff.story}`}>
                      <TableCell className="font-medium text-foreground">{handoff.project}</TableCell>
                      <TableCell>{handoff.story}</TableCell>
                      <TableCell>
                        <TeamLeadStatusBadge value={handoff.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TeamLeadSectionCard>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Action queue"
          description="The immediate calls that will change build flow today."
          items={tlDashboardData.actionQueue.map((copy) => ({ copy }))}
        />

        <TeamLeadSectionCard title="Team signals" description="Load and sequencing notes to keep in mind before moving more work.">
          <TeamLeadSignalList items={tlDashboardData.teamSignals} variant="progress" />
        </TeamLeadSectionCard>
      </aside>
    </div>
  );
}

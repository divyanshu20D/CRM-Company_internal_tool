import { Link } from "react-router-dom";

import { MetricGrid, SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { pmDashboardData } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getStatusClasses(status: string) {
  if (status === "Final polish") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "QA pressure") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-amber-200 bg-amber-50 text-amber-700";
}

export function ProjectManagerDashboardPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="flex min-w-0 flex-col gap-4">
        <MetricGrid items={pmDashboardData.metrics} />

        <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3 pb-4">
            <SectionHeading
              title="Execution portfolio"
              description="Project-level operating view across team leads, QA owners, sprint pressure, and current progress."
            />
            <Button asChild>
              <Link to="/project-manager/projects/new">Create Project</Link>
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Sprint</TableHead>
                <TableHead>Tech Lead</TableHead>
                <TableHead>QA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pmDashboardData.portfolioRows.map((row) => (
                <TableRow key={row.project}>
                  <TableCell className="font-medium text-foreground">{row.project}</TableCell>
                  <TableCell>{row.client}</TableCell>
                  <TableCell>{row.sprint}</TableCell>
                  <TableCell>{row.techLead}</TableCell>
                  <TableCell>{row.qaLead}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusClasses(row.status)}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.progress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
          <SectionHeading
            title="Today's meetings"
            description="Delivery, QA, and project coordination calls that are shaping the current workday."
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Meeting</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Attendees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pmDashboardData.meetings.map((meeting) => (
                <TableRow key={`${meeting.project}-${meeting.title}`}>
                  <TableCell className="font-medium text-foreground">{meeting.project}</TableCell>
                  <TableCell>{meeting.title}</TableCell>
                  <TableCell>{meeting.time}</TableCell>
                  <TableCell>{meeting.attendees}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Decision queue"
          description="The immediate PM decisions that will change delivery flow today."
          items={pmDashboardData.actionQueue.map((copy) => ({ copy }))}
        />
        <StackedNoteCard
          title="QA alerts"
          description="Testing and sign-off issues that need project-manager attention."
          items={pmDashboardData.qaAlerts.map((copy) => ({ copy }))}
        />
      </aside>
    </div>
  );
}

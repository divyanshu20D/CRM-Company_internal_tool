import { useParams } from "react-router-dom";

import { MetricGrid, SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectManagerProjectOverviewPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="flex min-w-0 flex-col gap-4">
        <MetricGrid
          items={[
            { label: "Progress", value: project.progress, tone: "blue" },
            { label: "Current sprint", value: project.sprint, tone: "sky" },
            { label: "Developers", value: String(project.developers.length), tone: "green" },
            { label: "Next meeting", value: project.nextMeeting, tone: "teal" },
          ]}
        />

        <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
          <SectionHeading
            title="Project leadership"
            description="The core ownership structure the PM relies on for coordination and delivery."
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coordinator</TableHead>
                <TableHead>Tech Lead</TableHead>
                <TableHead>Team Lead</TableHead>
                <TableHead>QA Lead</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{project.coordinator}</TableCell>
                <TableCell>{project.techLead}</TableCell>
                <TableCell>{project.teamLead}</TableCell>
                <TableCell>{project.qaLead}</TableCell>
                <TableCell>
                  <Badge variant="outline">{project.status}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
          <SectionHeading
            title="Recent issues"
            description="The issues currently shaping the project's delivery risk and sprint movement."
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium text-foreground">{issue.id}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{issue.status}</TableCell>
                  <TableCell>{issue.assignee}</TableCell>
                  <TableCell>{issue.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Current focus"
          description="The main areas the PM should be managing right now."
          items={[
            { copy: `Status: ${project.status}` },
            { copy: `Next meeting: ${project.nextMeeting}` },
            { copy: `Developers on the project: ${project.developers.join(", ")}` },
          ]}
        />
      </aside>
    </div>
  );
}

import { useParams } from "react-router-dom";

import { SectionHeading } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectManagerTimelinePage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
      <SectionHeading
        title="Timeline"
        description="Milestones, due dates, and owner-level delivery tracking."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Milestone</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.timeline.map((item) => (
            <TableRow key={item.milestone}>
              <TableCell className="font-medium text-foreground">{item.milestone}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

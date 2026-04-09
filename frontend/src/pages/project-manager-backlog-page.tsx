import { useParams } from "react-router-dom";

import { SectionHeading } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectManagerBacklogPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
      <SectionHeading
        title="Backlog"
        description="Groomed work waiting for PM prioritization, estimation, and sprint assignment."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Estimate</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.backlog.map((item) => (
            <TableRow key={item.title}>
              <TableCell className="font-medium text-foreground">{item.title}</TableCell>
              <TableCell>{item.estimate}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>{item.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

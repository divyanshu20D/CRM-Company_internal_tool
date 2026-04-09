import { useParams } from "react-router-dom";

import { SectionHeading } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectManagerTeamPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
      <SectionHeading
        title="Team"
        description="Ownership, allocation, and current focus for the project delivery team."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Allocation</TableHead>
            <TableHead>Current focus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.team.map((member) => (
            <TableRow key={`${member.name}-${member.role}`}>
              <TableCell className="font-medium text-foreground">{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.allocation}</TableCell>
              <TableCell>{member.currentFocus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

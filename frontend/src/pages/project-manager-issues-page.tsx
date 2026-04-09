import { Link, useParams } from "react-router-dom";

import { SectionHeading } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectManagerIssuesPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
      <SectionHeading
        title="Issues"
        description="Tasks, bugs, stories, and blockers currently owned under the project."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Issue</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium text-foreground">
                <Link to={`/project-manager/projects/${project.id}/issues/${issue.id}`} className="hover:text-blue-700">
                  {issue.id}
                </Link>
              </TableCell>
              <TableCell>{issue.title}</TableCell>
              <TableCell>{issue.type}</TableCell>
              <TableCell>{issue.status}</TableCell>
              <TableCell>{issue.priority}</TableCell>
              <TableCell>{issue.assignee}</TableCell>
              <TableCell>{issue.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

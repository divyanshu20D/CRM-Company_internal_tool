import { useNavigate, useParams } from "react-router-dom";

import { getSprintDetailsForProject } from "@/components/sprint/sprint-detail-data";
import { getTlProject } from "@/components/team-lead/tl-data";
import { SectionHeading } from "@/components/workspace/workspace-ui";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadSprintsPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = getTlProject(projectId);
  const sprints = getSprintDetailsForProject(project.id);

  return (
    <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3 pb-4">
        <SectionHeading
          title="Sprints"
          description="All sprint cycles for the selected project, with direct access to the full sprint working surface."
        />
      </div>

      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">Sprint</TableHead>
            <TableHead className="w-[540px]">Summary</TableHead>
            <TableHead className="w-[180px]">Owner</TableHead>
            <TableHead className="w-[100px]">Priority</TableHead>
            <TableHead className="w-[140px]">Due Date</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sprints.map((sprint) => (
            <TableRow
              key={sprint.id}
              className="cursor-pointer transition-colors hover:bg-muted/40"
              onClick={() => navigate(`/team-lead/projects/${project.id}/sprints/${sprint.id}`)}
            >
              <TableCell>
                <div className="grid gap-1">
                  <div className="font-medium text-foreground">{sprint.sprintLabel}</div>
                  <div className="text-xs text-muted-foreground">{project.name}</div>
                </div>
              </TableCell>
              <TableCell className="align-top">
                <div className="text-sm leading-6 text-muted-foreground whitespace-normal break-words">{sprint.summary}</div>
              </TableCell>
              <TableCell className="align-top">{sprint.owner}</TableCell>
              <TableCell className="align-top">{sprint.priority}</TableCell>
              <TableCell className="align-top">{sprint.dueDate}</TableCell>
              <TableCell>
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                  {sprint.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

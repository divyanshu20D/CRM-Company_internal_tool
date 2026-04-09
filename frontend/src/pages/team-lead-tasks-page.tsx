import { useParams } from "react-router-dom";

import { getTlProject } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadTasksPage() {
  const { projectId } = useParams();
  const project = getTlProject(projectId);

  return (
    <TeamLeadSectionCard
      title="Task ownership"
      description="This list is optimized for the team lead's real decisions: who owns what, what is slipping, and what is genuinely ready for QA."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>QA state</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell className="font-medium text-foreground">{task.title}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <TeamLeadStatusBadge value={task.status} />
              </TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{task.eta}</TableCell>
              <TableCell>{task.qaState}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TeamLeadSectionCard>
  );
}

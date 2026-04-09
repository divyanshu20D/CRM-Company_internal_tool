import { developerTasks } from "@/components/developer/dev-data";
import { DeveloperSectionCard, DeveloperStatusBadge } from "@/components/developer/dev-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DeveloperTasksPage() {
  return (
    <DeveloperSectionCard
      title="Assigned tasks"
      description="A single task list for the developer to scan what is in progress, what is in review, and what is waiting for QA evidence."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Estimate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {developerTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell className="font-medium text-foreground">{task.title}</TableCell>
              <TableCell>{task.project}</TableCell>
              <TableCell>
                <DeveloperStatusBadge value={task.status} />
              </TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.due}</TableCell>
              <TableCell>{task.estimate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DeveloperSectionCard>
  );
}

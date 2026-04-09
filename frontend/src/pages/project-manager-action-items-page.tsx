import { useParams } from "react-router-dom";

import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getActionItemClasses(status: string) {
  if (status === "Open") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-sky-200 bg-sky-50 text-sky-700";
}

export function ProjectManagerActionItemsPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Meeting action items"
          description="Actions that came out of meetings, reviews, and coordination calls and still need follow-through."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action item</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project.actionItems.map((item) => (
              <TableRow key={item.title}>
                <TableCell className="font-medium text-foreground">{item.title}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getActionItemClasses(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Why keep this separate"
          description="Meeting action items deserve their own working surface instead of disappearing into notes."
          items={[
            { copy: "This helps the PM turn discussions into owned follow-through." },
            { copy: "Use the source field to connect the action back to the meeting that created it." },
            { copy: "Overdue action items should later feed notifications and escalation rules." },
          ]}
        />
      </aside>
    </div>
  );
}

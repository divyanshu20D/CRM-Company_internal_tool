import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { pmNotifications } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getStatusClasses(status: string) {
  if (status === "Open") return "border-sky-200 bg-sky-50 text-sky-700";
  if (status === "Pending") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

export function ProjectManagerNotificationsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Notification stream"
          description="Approvals, sprint updates, QA signals, and meeting movement relevant to the PM role."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Notification</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pmNotifications.map((item) => (
              <TableRow key={item.title}>
                <TableCell className="font-medium text-foreground">{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusClasses(item.status)}>
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
          title="Notification behavior"
          description="What should actually be surfaced to the PM by default."
          items={[
            { copy: "Escalations and pending approvals should stay pinned until handled." },
            { copy: "QA and meeting changes should notify in-app and via email when they affect current sprint flow." },
            { copy: "Routine status noise should stay low so the PM sees only actionable changes." },
          ]}
        />
      </aside>
    </div>
  );
}

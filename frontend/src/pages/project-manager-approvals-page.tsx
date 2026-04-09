import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { pmApprovals } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getApprovalClasses(status: string) {
  if (status === "Pending") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "In review") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-blue-200 bg-blue-50 text-blue-700";
}

export function ProjectManagerApprovalsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Approval queue"
          description="The PM's pending approvals across resources, QA scope, UAT, and release movement."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Approval item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pmApprovals.map((item) => (
              <TableRow key={item.item}>
                <TableCell className="font-medium text-foreground">{item.item}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.project}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getApprovalClasses(item.status)}>
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
          title="Why this matters"
          description="Approvals tend to be the quiet blockers that delay delivery if they are not grouped visibly."
          items={[
            { copy: "Keep release, QA, UAT, and staffing decisions in one PM-owned queue." },
            { copy: "Reduce missed sign-offs hidden across meetings, chats, and emails." },
            { copy: "Give leadership a cleaner escalation path when approvals stall." },
          ]}
        />
      </aside>
    </div>
  );
}

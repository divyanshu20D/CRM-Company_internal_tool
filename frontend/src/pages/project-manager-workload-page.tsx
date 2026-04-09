import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { pmWorkloadRows } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getLoadClasses(status: string) {
  if (status === "High load") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "Available") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  return "border-sky-200 bg-sky-50 text-sky-700";
}

export function ProjectManagerWorkloadPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Workload & capacity"
          description="A PM-facing view of who is overloaded, who is available, and where project pressure is concentrating."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Allocation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pmWorkloadRows.map((row) => (
              <TableRow key={`${row.name}-${row.role}`}>
                <TableCell className="font-medium text-foreground">{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.projects}</TableCell>
                <TableCell>{row.allocation}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getLoadClasses(row.status)}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="PM usage"
          description="What this workload view should help the PM decide quickly."
          items={[
            { copy: "Shift developers or QA before blockers turn into sprint spillover." },
            { copy: "See who can absorb extra work without relying on guesswork." },
            { copy: "Spot when one lead or QA owner is carrying too much of the project load." },
          ]}
        />
      </aside>
    </div>
  );
}

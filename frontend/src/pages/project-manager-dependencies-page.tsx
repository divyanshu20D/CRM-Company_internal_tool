import { useParams } from "react-router-dom";

import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getDependencyClasses(status: string) {
  if (status === "Blocked") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "Waiting") return "border-blue-200 bg-blue-50 text-blue-700";
  return "border-sky-200 bg-sky-50 text-sky-700";
}

export function ProjectManagerDependenciesPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Dependency tracker"
          description="External and internal dependencies that are affecting the project's current sprint and milestone plan."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dependency</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project.dependencies.map((dependency) => (
              <TableRow key={dependency.title}>
                <TableCell className="font-medium text-foreground">{dependency.title}</TableCell>
                <TableCell>{dependency.type}</TableCell>
                <TableCell>{dependency.owner}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getDependencyClasses(dependency.status)}>
                    {dependency.status}
                  </Badge>
                </TableCell>
                <TableCell>{dependency.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Dependency usage"
          description="Dependencies should be visible before they silently become blockers."
          items={[
            { copy: "Separate client-side waits from engineering-side waits so ownership is obvious." },
            { copy: "Use this page to justify scope changes, escalations, or deadline resets." },
            { copy: "Keep dependency notes short, specific, and tied to the next decision." },
          ]}
        />
      </aside>
    </div>
  );
}

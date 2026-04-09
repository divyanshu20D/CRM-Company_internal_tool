import { Link } from "react-router-dom";

import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { pmProjects } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getStatusClasses(status: string) {
  if (status === "Final polish") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "QA pressure") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-amber-200 bg-amber-50 text-amber-700";
}

export function ProjectManagerProjectsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_340px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-4">
          <SectionHeading
            title="Assigned projects"
            description="Every active project the PM is responsible for across engineering, QA, coordination, and delivery."
          />
          <Button asChild>
            <Link to="/project-manager/projects/new">Create Project</Link>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[24%]">Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Coordinator</TableHead>
              <TableHead>Tech Lead</TableHead>
              <TableHead>QA</TableHead>
              <TableHead>Sprint</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pmProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium text-foreground">
                  <Link to={`/project-manager/projects/${project.id}`} className="hover:text-blue-700">
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{project.coordinator}</TableCell>
                <TableCell>{project.techLead}</TableCell>
                <TableCell>{project.qaLead}</TableCell>
                <TableCell>{project.sprint}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusClasses(project.status)}>
                    {project.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Quick view"
          description="Fast context on who is carrying the project from tech, QA, and coordination."
          items={pmProjects.map((project) => ({
            title: project.name,
            copy: `${project.techLead} · ${project.teamLead} · ${project.qaLead}`,
          }))}
        />
      </aside>
    </div>
  );
}

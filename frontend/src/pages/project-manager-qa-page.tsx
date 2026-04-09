import { Link2 } from "lucide-react";
import { useParams } from "react-router-dom";

import { SectionHeading } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectManagerQaPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="QA status"
          description="Test suites, blockers, and sign-off readiness for the selected project."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Suite</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Blockers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project.qa.map((item) => (
              <TableRow key={item.suite}>
                <TableCell className="font-medium text-foreground">{item.suite}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.status}</Badge>
                </TableCell>
                <TableCell>{item.blockers}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <Card className="rounded-md border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>External QA trackers</CardTitle>
            <CardDescription>
              QA can maintain bug and enhancement sheets externally and link them here for PM visibility.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {project.qaTrackers.map((tracker) => (
              <div key={tracker.title} className="rounded-md border border-border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Link2 className="size-4 text-blue-600" />
                  {tracker.title}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {tracker.type} · {tracker.owner}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{tracker.description}</p>
                <a
                  href={tracker.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-medium text-blue-700 underline underline-offset-4"
                >
                  Open tracker sheet
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

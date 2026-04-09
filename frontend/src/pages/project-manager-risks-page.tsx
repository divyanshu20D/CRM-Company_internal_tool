import { useParams } from "react-router-dom";

import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getSeverityClasses(severity: string) {
  if (severity === "High") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-sky-200 bg-sky-50 text-sky-700";
}

export function ProjectManagerRisksPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Risk register"
          description="Risks the PM is actively tracking for delivery, QA, approvals, and upcoming milestones."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Risk</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Mitigation</TableHead>
              <TableHead>Due date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project.risks.map((risk) => (
              <TableRow key={risk.title}>
                <TableCell className="font-medium text-foreground">{risk.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getSeverityClasses(risk.severity)}>
                    {risk.severity}
                  </Badge>
                </TableCell>
                <TableCell>{risk.owner}</TableCell>
                <TableCell>{risk.mitigation}</TableCell>
                <TableCell>{risk.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="PM focus"
          description="The PM should use this page to keep risk conversations structured instead of reactive."
          items={[
            { copy: "Every risk needs a real owner and mitigation, not just a status label." },
            { copy: "Use this page before sprint reviews, stakeholder calls, and release decisions." },
            { copy: "Escalate to the CEO only after mitigation and deadlines are already visible here." },
          ]}
        />
      </aside>
    </div>
  );
}

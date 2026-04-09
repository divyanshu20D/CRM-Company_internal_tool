import { useParams } from "react-router-dom";

import { getTlProject } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadProjectQaHandoffPage() {
  const { projectId } = useParams();
  const project = getTlProject(projectId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <TeamLeadSectionCard
        title="Project QA handoff queue"
        description="A team lead should not push work to QA blindly. This table makes the evidence quality and target timing explicit."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Story</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead>QA owner</TableHead>
              <TableHead>Evidence</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project.qaHandoffs.map((handoff) => (
              <TableRow key={handoff.story}>
                <TableCell className="font-medium text-foreground">{handoff.story}</TableCell>
                <TableCell>{handoff.developer}</TableCell>
                <TableCell>{handoff.qaOwner}</TableCell>
                <TableCell>{handoff.evidence}</TableCell>
                <TableCell>
                  <TeamLeadStatusBadge value={handoff.status} />
                </TableCell>
                <TableCell>{handoff.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TeamLeadSectionCard>

      <TeamLeadSectionCard
        title="Handoff checklist"
        description="This is the minimum standard before a story leaves development and starts burning QA capacity."
      >
        <div className="flex flex-col gap-2.5">
          {[
            "Build notes are attached and written in task language, not code-only shorthand.",
            "Test data, flags, or environment setup are included with the handoff.",
            "If a known limitation remains, it is clearly stated before QA starts.",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-border/60 bg-muted/10 p-3 text-sm text-muted-foreground">
              {item}
            </div>
          ))}
        </div>
      </TeamLeadSectionCard>
    </div>
  );
}

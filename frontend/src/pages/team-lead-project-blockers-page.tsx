import { useParams } from "react-router-dom";

import { getTlProject } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadSignalList } from "@/components/team-lead/tl-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadProjectBlockersPage() {
  const { projectId } = useParams();
  const project = getTlProject(projectId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <TeamLeadSectionCard
        title="Project blockers"
        description="These blockers are shown with the exact information a team lead needs to remove them or escalate them fast."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blocker</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Next step</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project.blockers.map((blocker) => (
              <TableRow key={blocker.title}>
                <TableCell className="font-medium text-foreground">{blocker.title}</TableCell>
                <TableCell>{blocker.owner}</TableCell>
                <TableCell>{blocker.age}</TableCell>
                <TableCell>{blocker.impact}</TableCell>
                <TableCell>{blocker.nextStep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TeamLeadSectionCard>

      <TeamLeadSectionCard title="Response rules" description="These cues help the team lead make fast calls without waiting for PM input on every issue.">
        <TeamLeadSignalList
          items={[
            "If the blocker affects QA readiness, protect the QA window first and cut lower-value work.",
            "If the blocker belongs to environment or data setup, route it immediately to the owner instead of holding engineers idle.",
            "If one blocker holds multiple stories, freeze new assignments until the dependency clears.",
          ]}
        />
      </TeamLeadSectionCard>
    </div>
  );
}

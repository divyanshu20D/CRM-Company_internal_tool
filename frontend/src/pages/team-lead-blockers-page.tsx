import { tlGlobalBlockers } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadSignalList } from "@/components/team-lead/tl-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadBlockersPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <TeamLeadSectionCard
        title="Cross-project blockers"
        description="This is the global blocker register the team lead uses to decide what gets escalated, sequenced, or cut from the day."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Blocker</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Next step</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tlGlobalBlockers.map((blocker) => (
              <TableRow key={`${blocker.project}-${blocker.title}`}>
                <TableCell className="font-medium text-foreground">{blocker.project}</TableCell>
                <TableCell>{blocker.title}</TableCell>
                <TableCell>{blocker.owner}</TableCell>
                <TableCell>{blocker.age}</TableCell>
                <TableCell>{blocker.nextStep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TeamLeadSectionCard>

      <TeamLeadSectionCard
        title="Escalation notes"
        description="Use this view to decide what the team lead should unblock directly versus what must go back to PM or engineering leadership."
      >
        <TeamLeadSignalList
          items={[
            "Anything older than one day with QA impact should be escalated in the same workday.",
            "If staging data or environment access is the blocker, route it immediately to the project coordinator or infra owner.",
            "If a blocker hides two or more downstream stories, protect the sprint by freezing side work until it clears.",
          ]}
        />
      </TeamLeadSectionCard>
    </div>
  );
}

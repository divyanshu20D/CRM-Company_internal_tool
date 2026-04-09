import { tlGlobalQaHandoffs } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadQaHandoffsPage() {
  return (
    <TeamLeadSectionCard
      title="Cross-project QA handoffs"
      description="The team lead needs a single place to see what is genuinely ready for QA and what still lacks evidence or review closure."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Story</TableHead>
            <TableHead>Developer</TableHead>
            <TableHead>QA owner</TableHead>
            <TableHead>Evidence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Target</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tlGlobalQaHandoffs.map((handoff) => (
            <TableRow key={`${handoff.project}-${handoff.story}`}>
              <TableCell className="font-medium text-foreground">{handoff.project}</TableCell>
              <TableCell>{handoff.story}</TableCell>
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
  );
}

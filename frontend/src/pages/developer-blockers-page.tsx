import { developerBlockers } from "@/components/developer/dev-data";
import { DeveloperSectionCard, DeveloperSignalList } from "@/components/developer/dev-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DeveloperBlockersPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <DeveloperSectionCard
        title="My blockers"
        description="This page keeps blockers practical: what is blocked, who owns the unblock, and what the next action really is."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blocker</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Next step</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developerBlockers.map((blocker) => (
              <TableRow key={blocker.title}>
                <TableCell className="font-medium text-foreground">{blocker.title}</TableCell>
                <TableCell>{blocker.project}</TableCell>
                <TableCell>{blocker.owner}</TableCell>
                <TableCell>{blocker.impact}</TableCell>
                <TableCell>{blocker.nextStep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DeveloperSectionCard>

      <DeveloperSectionCard
        title="How to use this view"
        description="The goal is to help the developer surface blockers early instead of working around them invisibly."
      >
        <DeveloperSignalList
          variant="blocked"
          items={[
            "If a blocker affects code completion, escalate it before taking on another task.",
            "If the blocker is environment-only, write it down clearly so QA and team lead see the exact impact.",
            "Do not mark work as review-ready if the blocker still hides key acceptance coverage.",
          ]}
        />
      </DeveloperSectionCard>
    </div>
  );
}

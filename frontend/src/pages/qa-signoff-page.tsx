import { qaSignoffRows } from "@/components/qa/qa-data";
import { QaSectionCard, QaSignalList, QaStatusBadge } from "@/components/qa/qa-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function QaSignoffPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <QaSectionCard
        title="Sign-off readiness"
        description="This view keeps sign-off honest by showing what is truly close to ready and what is still waiting on validation or fixes."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Next step</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qaSignoffRows.map((row) => (
              <TableRow key={row.project}>
                <TableCell className="font-medium text-foreground">{row.project}</TableCell>
                <TableCell>
                  <QaStatusBadge value={row.status} />
                </TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.nextStep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </QaSectionCard>

      <QaSectionCard
        title="QA sign-off rules"
        description="Use the same rules each time so sign-off remains trustworthy as the platform grows."
      >
        <QaSignalList
          variant="priority"
          items={[
            "Do not close sign-off if one blocker still hides a high-priority scenario.",
            "Evidence should exist for the final retest, not just the initial pass.",
            "If build stability is uncertain, hold sign-off and push the decision back to PM and team lead.",
          ]}
        />
      </QaSectionCard>
    </div>
  );
}

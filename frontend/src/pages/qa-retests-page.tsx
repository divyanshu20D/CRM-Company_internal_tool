import { qaRetests } from "@/components/qa/qa-data";
import { QaSectionCard, QaStatusBadge } from "@/components/qa/qa-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function QaRetestsPage() {
  return (
    <QaSectionCard
      title="Retest queue"
      description="Retests and regression checks that still need to close before the project can move cleanly toward sign-off."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qaRetests.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-foreground">{item.title}</TableCell>
              <TableCell>{item.project}</TableCell>
              <TableCell>
                <QaStatusBadge value={item.status} />
              </TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>{item.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </QaSectionCard>
  );
}

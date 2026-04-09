import { qaQueueItems } from "@/components/qa/qa-data";
import { QaSectionCard, QaStatusBadge } from "@/components/qa/qa-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function QaQueuesPage() {
  return (
    <QaSectionCard
      title="QA queue"
      description="A single list for validation, regression, and bug verification work currently assigned to QA."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Build</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qaQueueItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="font-medium text-foreground">{item.title}</TableCell>
              <TableCell>{item.project}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <QaStatusBadge value={item.status} />
              </TableCell>
              <TableCell>{item.priority}</TableCell>
              <TableCell>{item.build}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </QaSectionCard>
  );
}

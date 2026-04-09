import { Link } from "react-router-dom";

import { qaDashboardData, qaQueueItems } from "@/components/qa/qa-data";
import { QaSectionCard, QaSignalList, QaStatusBadge } from "@/components/qa/qa-ui";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MetricGrid, StackedNoteCard } from "@/components/workspace/workspace-ui";

export function QaDashboardPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_340px]">
      <section className="flex min-w-0 flex-col gap-4">
        <MetricGrid items={qaDashboardData.metrics} />

        <QaSectionCard
          title="Assigned validation queue"
          description="This is the live queue of builds and fixes QA is currently responsible for validating."
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/qa/queues">Open full queue</Link>
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qaQueueItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-medium text-foreground">{item.title}</TableCell>
                  <TableCell>{item.project}</TableCell>
                  <TableCell>
                    <QaStatusBadge value={item.status} />
                  </TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>{item.due}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </QaSectionCard>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Today's priorities"
          description="The checks that matter most before the workday closes."
          items={qaDashboardData.priorities.map((copy) => ({ copy }))}
        />

        <QaSectionCard title="Live updates" description="Recent changes affecting validation flow or sign-off readiness.">
          <QaSignalList items={qaDashboardData.updates} />
        </QaSectionCard>
      </aside>
    </div>
  );
}

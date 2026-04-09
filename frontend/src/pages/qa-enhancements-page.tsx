import { qaProjects } from "@/components/qa/qa-data";
import { QaSectionCard } from "@/components/qa/qa-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function QaEnhancementsPage() {
  return (
    <QaSectionCard
      title="Enhancement sheets"
      description="Enhancements that should not clutter the QA queue can still be tracked clearly through linked external sheets."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Current sprint</TableHead>
            <TableHead>Enhancement sheet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qaProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium text-foreground">{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{project.sprint}</TableCell>
              <TableCell className="text-sky-700">{project.enhancementSheet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </QaSectionCard>
  );
}

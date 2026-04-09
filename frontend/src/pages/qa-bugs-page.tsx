import { qaProjects } from "@/components/qa/qa-data";
import { QaSectionCard } from "@/components/qa/qa-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function QaBugsPage() {
  return (
    <QaSectionCard
      title="Bug sheets"
      description="QA can maintain detailed bug tracking externally while still exposing the correct sheet links inside the platform."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Current sprint</TableHead>
            <TableHead>Bug sheet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qaProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium text-foreground">{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{project.sprint}</TableCell>
              <TableCell className="text-sky-700">{project.bugSheet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </QaSectionCard>
  );
}

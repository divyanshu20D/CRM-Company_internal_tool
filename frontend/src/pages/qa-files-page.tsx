import { qaFiles } from "@/components/qa/qa-data";
import { QaSectionCard } from "@/components/qa/qa-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function QaFilesPage() {
  return (
    <QaSectionCard
      title="QA files"
      description="This surface keeps evidence files, checklists, and repro recordings easy to scan during validation work."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qaFiles.map((file) => (
            <TableRow key={file.name}>
              <TableCell className="font-medium text-foreground">{file.name}</TableCell>
              <TableCell>{file.project}</TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell>{file.owner}</TableCell>
              <TableCell>{file.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </QaSectionCard>
  );
}

import { developerFiles } from "@/components/developer/dev-data";
import { DeveloperSectionCard } from "@/components/developer/dev-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DeveloperFilesPage() {
  return (
    <DeveloperSectionCard
      title="Reference files"
      description="Files here are limited to working evidence, repro captures, and notes that help the developer finish or hand off current tasks."
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
          {developerFiles.map((file) => (
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
    </DeveloperSectionCard>
  );
}

import { adminAssignmentRows } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminStatusBadge } from "@/components/admin/admin-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminAssignmentsPage() {
  return (
    <AdminSectionCard
      title="Project assignments"
      description="This table keeps the organization-to-project mapping explicit so the access model can follow cleanly later."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminAssignmentRows.map((row) => (
            <TableRow key={`${row.employee}-${row.project}`}>
              <TableCell className="font-medium text-foreground">{row.employee}</TableCell>
              <TableCell>{row.project}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                <AdminStatusBadge value={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

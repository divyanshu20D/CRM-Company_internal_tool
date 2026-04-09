import { adminPermissionRows } from "@/components/admin/admin-data";
import { AdminSectionCard } from "@/components/admin/admin-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminSettingsPermissionsPage() {
  return (
    <AdminSectionCard
      title="Permission matrix"
      description="This is the draft access model that should become the source of truth for backend authorization later."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>CEO</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>PM</TableHead>
            <TableHead>Team Lead</TableHead>
            <TableHead>Developer</TableHead>
            <TableHead>QA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminPermissionRows.map((row) => (
            <TableRow key={row.action}>
              <TableCell className="font-medium text-foreground">{row.action}</TableCell>
              <TableCell>{row.ceo}</TableCell>
              <TableCell>{row.admin}</TableCell>
              <TableCell>{row.pm}</TableCell>
              <TableCell>{row.teamLead}</TableCell>
              <TableCell>{row.developer}</TableCell>
              <TableCell>{row.qa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

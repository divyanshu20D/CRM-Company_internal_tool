import { adminRoleRows } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminStatusBadge } from "@/components/admin/admin-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminRolesPage() {
  return (
    <AdminSectionCard
      title="Role matrix"
      description="This is the current role model the UI is built around, including scope and the permissions each role implies."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Scope</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Permissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminRoleRows.map((row) => (
            <TableRow key={row.role}>
              <TableCell className="font-medium text-foreground">{row.role}</TableCell>
              <TableCell>
                <AdminStatusBadge value={row.scope} />
              </TableCell>
              <TableCell>{row.members}</TableCell>
              <TableCell>{row.permissions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

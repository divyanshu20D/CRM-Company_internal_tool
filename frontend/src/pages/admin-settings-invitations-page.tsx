import { adminInvitationRows } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminStatusBadge } from "@/components/admin/admin-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminSettingsInvitationsPage() {
  return (
    <AdminSectionCard
      title="Invitation control"
      description="Pending invites and onboarding state should be visible here so access does not drift before auth is fully wired."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sent on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminInvitationRows.map((row) => (
            <TableRow key={`${row.email}-${row.role}`}>
              <TableCell className="font-medium text-foreground">{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                <AdminStatusBadge value={row.status} />
              </TableCell>
              <TableCell>{row.sentOn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

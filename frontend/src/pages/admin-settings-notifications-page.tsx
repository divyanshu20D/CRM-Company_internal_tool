import { adminNotificationRows } from "@/components/admin/admin-data";
import { AdminSectionCard } from "@/components/admin/admin-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminSettingsNotificationsPage() {
  return (
    <AdminSectionCard
      title="Notification defaults"
      description="These are the role-aware defaults for in-app and email notifications across key workflow events."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>In-app</TableHead>
            <TableHead>Default role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminNotificationRows.map((row) => (
            <TableRow key={row.event}>
              <TableCell className="font-medium text-foreground">{row.event}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.inApp}</TableCell>
              <TableCell>{row.defaultRole}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

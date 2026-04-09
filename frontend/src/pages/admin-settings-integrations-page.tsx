import { adminIntegrationRows } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminStatusBadge } from "@/components/admin/admin-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminSettingsIntegrationsPage() {
  return (
    <AdminSectionCard
      title="Integration settings"
      description="This page shows what external systems are planned, who owns them, and what business scope each one supports."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Integration</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scope</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminIntegrationRows.map((row) => (
            <TableRow key={row.integration}>
              <TableCell className="font-medium text-foreground">{row.integration}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>
                <AdminStatusBadge value={row.status} />
              </TableCell>
              <TableCell>{row.scope}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

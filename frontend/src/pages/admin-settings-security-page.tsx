import { adminSecurityRows } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminSettingList } from "@/components/admin/admin-ui";

export function AdminSettingsSecurityPage() {
  return (
    <AdminSectionCard
      title="Security controls"
      description="These are the core platform controls that should guide file access, audit logging, exports, and operational safety."
    >
      <AdminSettingList rows={adminSecurityRows.map((row) => ({ label: row.control, value: row.value, status: row.status }))} />
    </AdminSectionCard>
  );
}

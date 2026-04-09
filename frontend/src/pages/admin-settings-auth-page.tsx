import { adminAuthSettings } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminSettingList } from "@/components/admin/admin-ui";

export function AdminSettingsAuthPage() {
  return (
    <AdminSectionCard
      title="Authentication settings"
      description="These rows define the current WorkOS-ready auth plan for sessions, MFA, and organization login rules."
    >
      <AdminSettingList rows={adminAuthSettings.map((row) => ({ label: row.label, value: row.value, status: row.status }))} />
    </AdminSectionCard>
  );
}

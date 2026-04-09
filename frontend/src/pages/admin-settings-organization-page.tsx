import { adminOrganizationSettings } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminSettingList } from "@/components/admin/admin-ui";

export function AdminSettingsOrganizationPage() {
  return (
    <AdminSectionCard
      title="Organization defaults"
      description="These settings shape how the platform behaves across all workspaces before tenant-specific controls are introduced."
    >
      <AdminSettingList rows={adminOrganizationSettings} />
    </AdminSectionCard>
  );
}

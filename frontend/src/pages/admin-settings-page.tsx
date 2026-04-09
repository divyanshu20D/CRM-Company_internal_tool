import { Link } from "react-router-dom";

import { AdminSectionCard, AdminSignalList } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";

export function AdminSettingsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <AdminSectionCard
        title="Settings map"
        description="These settings pages define how the platform should behave before backend auth and permissions are wired."
        action={
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/settings/permissions">Open permissions</Link>
          </Button>
        }
      >
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { title: "Organization", copy: "Timezone, working days, cadence, and org-wide defaults." },
            { title: "Permissions", copy: "Role-based rules for project creation, access scope, and settings control." },
            { title: "Invitations", copy: "Pending invites, onboarding defaults, and access assignment flow." },
            { title: "Auth", copy: "WorkOS planning, MFA, sessions, and allowed-domain rules." },
            { title: "Integrations", copy: "Google Calendar, Meet, Gmail, and secure storage ownership." },
            { title: "Notifications", copy: "Role-aware email and in-app notification defaults." },
            { title: "Security", copy: "Audit, file access, export policy, and operational safety controls." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border/60 bg-muted/10 p-4 shadow-sm">
              <div className="text-sm font-semibold text-foreground">{item.title}</div>
              <p className="pt-2 text-sm leading-7 text-muted-foreground">{item.copy}</p>
            </div>
          ))}
        </div>
      </AdminSectionCard>

      <AdminSectionCard
        title="Implementation priorities"
        description="These are the settings areas that matter most before the backend permission model is finalized."
      >
        <AdminSignalList
          variant="priority"
          items={[
            "Freeze the permissions matrix before WorkOS role mapping is implemented.",
            "Lock organization defaults like timezone and sprint cadence so project creation stays consistent.",
            "Define who can manage integrations and security controls before external client onboarding begins.",
          ]}
        />
      </AdminSectionCard>
    </div>
  );
}

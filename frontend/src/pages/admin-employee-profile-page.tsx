import { useParams } from "react-router-dom";

import { getAdminEmployee } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminSignalList, AdminStatusBadge } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";

export function AdminEmployeeProfilePage() {
  const { employeeId } = useParams();
  const employee = getAdminEmployee(employeeId);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <section className="flex min-w-0 flex-col gap-4">
        <AdminSectionCard
          title="Employee profile"
          description="The profile combines reporting context, access level, and current project allocation in one operating view."
        >
          <div className="grid gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border/60 bg-muted/10 p-4">
              <div className="grid gap-1">
                <div className="text-base font-semibold text-foreground">{employee.name}</div>
                <div className="text-sm text-muted-foreground">
                  {employee.email} · {employee.phone}
                </div>
              </div>
              <AdminStatusBadge value={employee.status} />
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Role</div>
                <div className="pt-1 text-sm font-medium text-foreground">{employee.role}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Department</div>
                <div className="pt-1 text-sm font-medium text-foreground">{employee.department}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Manager</div>
                <div className="pt-1 text-sm font-medium text-foreground">{employee.manager}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/90 p-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Access</div>
                <div className="pt-1 text-sm font-medium text-foreground">{employee.access}</div>
              </div>
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Assigned projects"
          description="The employee should only have visibility into the work they actually need to operate."
        >
          <div className="flex flex-wrap gap-2">
            {employee.projects.map((project) => (
              <Badge key={project} variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                {project}
              </Badge>
            ))}
          </div>
        </AdminSectionCard>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <AdminSectionCard title="Profile notes" description="These notes are useful when reviewing access, reporting line, and operating fit.">
          <AdminSignalList
            items={[
              `Joined: ${employee.joined}`,
              `Location: ${employee.location}`,
              `Current capacity view: ${employee.capacity}`,
            ]}
          />
        </AdminSectionCard>

        <AdminSectionCard title="Admin checks" description="Use this when deciding whether the employee record is fully ready for production auth wiring.">
          <AdminSignalList
            variant="attention"
            items={[
              "Confirm reporting manager and access scope before WorkOS group mapping is introduced.",
              "Make sure project assignments match the role-specific workspace they should land in.",
              "If the employee is still invited, do not grant extra project access until onboarding completes.",
            ]}
          />
        </AdminSectionCard>
      </aside>
    </div>
  );
}

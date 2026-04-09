import { Link } from "react-router-dom";

import { adminDashboardData, adminEmployees } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminSignalList, AdminStatusBadge } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MetricGrid, StackedNoteCard } from "@/components/workspace/workspace-ui";

export function AdminDashboardPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_340px]">
      <section className="flex min-w-0 flex-col gap-4">
        <MetricGrid items={adminDashboardData.metrics} />

        <AdminSectionCard
          title="Employee directory snapshot"
          description="A compact view of the people currently onboarded into the platform and how they are structured."
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/employees">Open directory</Link>
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium text-foreground">{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.manager}</TableCell>
                  <TableCell>{employee.access}</TableCell>
                  <TableCell>
                    <AdminStatusBadge value={employee.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AdminSectionCard>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Admin priorities"
          description="The most important people and access decisions to close before backend auth is wired."
          items={adminDashboardData.priorities.map((copy) => ({ copy }))}
        />

        <AdminSectionCard title="Live updates" description="Recent changes affecting onboarding, access, or structure.">
          <AdminSignalList items={adminDashboardData.updates} />
        </AdminSectionCard>
      </aside>
    </div>
  );
}

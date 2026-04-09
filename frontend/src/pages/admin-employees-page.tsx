import { Link } from "react-router-dom";

import { adminEmployees } from "@/components/admin/admin-data";
import { AdminSectionCard, AdminStatusBadge } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminEmployeesPage() {
  return (
    <AdminSectionCard
      title="Employee directory"
      description="This is the main employee surface for onboarding status, reporting line, role, and access visibility."
      action={
        <Button asChild size="sm">
          <Link to="/admin/employees/new">Add employee</Link>
        </Button>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium text-foreground">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.manager}</TableCell>
              <TableCell>{employee.capacity}</TableCell>
              <TableCell>
                <AdminStatusBadge value={employee.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

import { AdminSectionCard, AdminSignalList } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function AdminNewEmployeePage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <AdminSectionCard
        title="Add employee"
        description="This is the first-pass onboarding form for creating a new employee, placing them in the hierarchy, and assigning initial access."
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Basic details</FieldLegend>
            <FieldGroup className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="employee-name">Full name</FieldLabel>
                <FieldContent>
                  <Input id="employee-name" placeholder="Enter employee name" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="employee-email">Work email</FieldLabel>
                <FieldContent>
                  <Input id="employee-email" type="email" placeholder="name@company.com" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="employee-role">Role</FieldLabel>
                <FieldContent>
                  <Input id="employee-role" placeholder="Project Manager / Developer / QA" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="employee-department">Department</FieldLabel>
                <FieldContent>
                  <Input id="employee-department" placeholder="Delivery / Engineering / Quality" />
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Hierarchy and access</FieldLegend>
            <FieldGroup className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="employee-manager">Reporting manager</FieldLabel>
                <FieldContent>
                  <Input id="employee-manager" placeholder="Select or enter manager name" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="employee-access">Access scope</FieldLabel>
                <FieldContent>
                  <Input id="employee-access" placeholder="Global / Portfolio / Assigned projects / Assigned tasks" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="employee-location">Location</FieldLabel>
                <FieldContent>
                  <Input id="employee-location" placeholder="City or Remote" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="employee-phone">Phone number</FieldLabel>
                <FieldContent>
                  <Input id="employee-phone" placeholder="+91 ..." />
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Assignments</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="employee-projects">Initial project assignments</FieldLabel>
                <FieldContent>
                  <Textarea id="employee-projects" placeholder="Northstar Client Portal, Helix Patient Ops Console" />
                  <FieldDescription>
                    Start with the projects the employee should see immediately after onboarding.
                  </FieldDescription>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="employee-notes">Admin notes</FieldLabel>
                <FieldContent>
                  <Textarea id="employee-notes" placeholder="Onboarding notes, permission caveats, device restrictions, or joining context." />
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex flex-wrap gap-2">
            <Button>Save employee</Button>
            <Button variant="outline">Send invite</Button>
          </div>
        </FieldGroup>
      </AdminSectionCard>

      <AdminSectionCard title="Onboarding checklist" description="Keep onboarding consistent so role access stays predictable as the product grows.">
        <AdminSignalList
          variant="priority"
          items={[
            "Lock reporting manager before enabling project access.",
            "Grant only the role-scoped workspace access the employee actually needs.",
            "Add at least one project assignment before the invite is sent if the employee is operational.",
          ]}
        />
      </AdminSectionCard>
    </div>
  );
}

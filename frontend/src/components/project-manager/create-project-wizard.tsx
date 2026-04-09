import { startTransition, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  ClipboardList,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  Users,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";

import { employeeDirectory } from "@/components/project-manager/pm-create-project-data";
import { getToneClasses } from "@/components/workspace/workspace-theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const selectClasses =
  "flex h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const steps = [
  { id: "project-basics", title: "Project Basics", description: "Core project setup and delivery classification", icon: Briefcase },
  { id: "client-info", title: "Client Information", description: "Primary contacts, communication details, and account notes", icon: User },
  { id: "ownership", title: "Ownership & Leads", description: "Assign PM, associate PM, leads, and QA ownership", icon: Shield },
  { id: "team-selection", title: "Team Selection", description: "Select the initial delivery team from the employee directory", icon: UsersRound },
  { id: "planning", title: "Planning & Scope", description: "Sprint cadence, dates, kickoff, and implementation notes", icon: Calendar },
] as const;

function getEmployeesByRole(role: string) {
  return employeeDirectory.filter((employee) => employee.role === role);
}

function getRoleBadge(role: string) {
  if (role === "Project Manager" || role === "Associate Project Manager") return "blue";
  if (role === "Tech Lead" || role === "Team Lead") return "amber";
  if (role === "QA") return "green";
  return "sky";
}

function StepRail({
  activeStep,
  completedSteps,
  onStepChange,
}: {
  activeStep: number;
  completedSteps: Set<number>;
  onStepChange: (step: number) => void;
}) {
  return (
    <nav className="flex flex-col gap-1.5" aria-label="Project setup steps">
      {steps.map((step, index) => {
        const isActive = activeStep === index;
        const isCompleted = completedSteps.has(index);
        const Icon = step.icon;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepChange(index)}
            className={cn(
              "group relative rounded-xl border p-3.5 text-left transition-all duration-200",
              isActive
                ? "border-blue-200 bg-blue-50/70 shadow-sm"
                : "border-border/60 bg-card hover:border-border hover:bg-muted/30"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : isCompleted
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted/50 text-muted-foreground"
                )}
              >
                {isCompleted && !isActive ? (
                  <Check className="size-4" />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("text-sm font-semibold", isActive ? "text-blue-700" : "text-foreground")}>
                    {step.title}
                  </span>
                  <span className={cn(
                    "text-[10px] font-bold tabular-nums",
                    isActive ? "text-blue-500" : "text-muted-foreground/50"
                  )}>
                    {index + 1}/{steps.length}
                  </span>
                </div>
                <span className="truncate text-xs text-muted-foreground">{step.description}</span>
              </div>
            </div>

            {/* Active indicator bar */}
            {isActive ? (
              <div className="absolute left-0 top-3 h-6 w-[3px] rounded-r-full bg-blue-500" />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  description,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  description?: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldContent>
        <select id={id} className={selectClasses} value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {description ? <FieldDescription>{description}</FieldDescription> : null}
      </FieldContent>
    </Field>
  );
}

function EmployeeSelector({
  selectedIds,
  onToggle,
}: {
  selectedIds: string[];
  onToggle: (employeeId: string) => void;
}) {
  const grouped = useMemo(() => {
    const map = new Map<string, typeof employeeDirectory>();
    for (const emp of employeeDirectory) {
      const list = map.get(emp.department) ?? [];
      list.push(emp);
      map.set(emp.department, list);
    }
    return map;
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {Array.from(grouped.entries()).map(([dept, employees]) => (
        <div key={dept}>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{dept}</span>
            <span className="text-[10px] tabular-nums text-muted-foreground/60">{employees.length}</span>
          </div>
          <div className="grid gap-2 lg:grid-cols-2">
            {employees.map((employee) => {
              const selected = selectedIds.includes(employee.id);
              const badgeTone = getRoleBadge(employee.role);

              return (
                <button
                  key={employee.id}
                  type="button"
                  onClick={() => onToggle(employee.id)}
                  className={cn(
                    "group rounded-xl border p-3.5 text-left transition-all duration-200",
                    selected
                      ? "border-blue-200 bg-blue-50/60 shadow-sm"
                      : "border-border/60 bg-card hover:border-border hover:bg-muted/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors duration-200",
                      selected
                        ? "bg-blue-100 text-blue-700"
                        : "bg-muted/40 text-muted-foreground"
                    )}>
                      {selected ? <Check className="size-4" /> : employee.name.charAt(0)}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">{employee.name}</span>
                      <span className={cn("inline-flex w-fit rounded-md border px-1.5 py-0.5 text-[10px] font-medium", getToneClasses(badgeTone))}>
                        {employee.role}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CreateProjectWizard() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [pm, setPm] = useState("neha-verma");
  const [associatePm, setAssociatePm] = useState("devika-sharma");
  const [techLead, setTechLead] = useState("kabir-arora");
  const [teamLead, setTeamLead] = useState("aashish-kapoor");
  const [qaLead, setQaLead] = useState("ritika-jain");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([
    "rohan-pandey",
    "megha-desai",
    "ritika-jain",
  ]);

  const selectedTeam = useMemo(
    () => employeeDirectory.filter((employee) => selectedEmployees.includes(employee.id)),
    [selectedEmployees]
  );

  const completedSteps = useMemo(() => {
    const set = new Set<number>();
    if (projectName || projectCode) set.add(0);
    if (clientName || clientContact) set.add(1);
    if (pm && techLead) set.add(2);
    if (selectedEmployees.length > 0) set.add(3);
    return set;
  }, [projectName, projectCode, clientName, clientContact, pm, techLead, selectedEmployees]);

  const handleToggleEmployee = (employeeId: string) => {
    setSelectedEmployees((current) =>
      current.includes(employeeId) ? current.filter((id) => id !== employeeId) : [...current, employeeId]
    );
  };

  const goToStep = (step: number) => {
    setActiveStep(step);
  };

  const handleNext = () => goToStep(Math.min(activeStep + 1, steps.length - 1));
  const handleBack = () => goToStep(Math.max(activeStep - 1, 0));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(() => {
      toast.success(projectName ? `${projectName} is ready for backend wiring.` : "Project creation flow is ready for backend wiring.");
      navigate("/project-manager/projects");
    });
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_340px]">
      {/* ── Left rail: Steps ── */}
      <aside className="flex min-w-0 flex-col gap-5">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <div className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20 px-4 py-3.5">
            <h3 className="text-sm font-semibold">Project setup</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Complete each section to create a new project.</p>
          </div>
          <div className="p-3">
            <StepRail activeStep={activeStep} completedSteps={completedSteps} onStepChange={goToStep} />
          </div>
        </div>

        {/* Progress indicator */}
        <div className="rounded-xl border border-border/60 bg-card px-4 py-3.5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">Progress</span>
            <span className="tabular-nums">{completedSteps.size}/{steps.length} sections</span>
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-in-out"
              style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </aside>

      {/* ── Main form ── */}
      <section className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <div className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20 px-5 py-4">
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = steps[activeStep].icon;
              return (
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Icon className="size-4" />
                </div>
              );
            })()}
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{steps[activeStep].title}</h2>
              <p className="text-sm text-muted-foreground">{steps[activeStep].description}</p>
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-6 p-5" onSubmit={handleSubmit}>
          {activeStep === 0 ? (
            <>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="project-name">Project name</FieldLabel>
                  <FieldContent>
                    <Input
                      id="project-name"
                      placeholder="Northstar Client Portal"
                      value={projectName}
                      onChange={(event) => setProjectName(event.target.value)}
                    />
                    <FieldDescription>The name used across all role-based panels, sprint views, and reports.</FieldDescription>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="project-code">Project code</FieldLabel>
                  <FieldContent>
                    <Input
                      id="project-code"
                      placeholder="NSP-01"
                      value={projectCode}
                      onChange={(event) => setProjectCode(event.target.value)}
                    />
                  </FieldContent>
                </Field>
              </FieldGroup>

              <Separator className="opacity-40" />

              <FieldGroup className="grid gap-5 lg:grid-cols-2">
                <SelectField
                  id="project-type"
                  label="Project type"
                  value="software-delivery"
                  onChange={() => undefined}
                  options={[
                    { label: "Software delivery", value: "software-delivery" },
                    { label: "Implementation", value: "implementation" },
                    { label: "Internal product", value: "internal-product" },
                  ]}
                />
                <SelectField
                  id="delivery-model"
                  label="Delivery model"
                  value="client-project"
                  onChange={() => undefined}
                  options={[
                    { label: "Client project", value: "client-project" },
                    { label: "Retainer", value: "retainer" },
                    { label: "Fixed milestone", value: "fixed-milestone" },
                  ]}
                />
              </FieldGroup>

              <FieldGroup className="grid gap-5 lg:grid-cols-3">
                <SelectField
                  id="priority"
                  label="Priority"
                  value="high"
                  onChange={() => undefined}
                  options={[
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" },
                  ]}
                />
                <SelectField
                  id="default-status"
                  label="Initial status"
                  value="kickoff-ready"
                  onChange={() => undefined}
                  options={[
                    { label: "Kickoff ready", value: "kickoff-ready" },
                    { label: "Planning", value: "planning" },
                    { label: "Awaiting client inputs", value: "awaiting-client" },
                  ]}
                />
                <SelectField
                  id="sprint-cadence"
                  label="Sprint cadence"
                  value="two-weeks"
                  onChange={() => undefined}
                  options={[
                    { label: "1 week", value: "one-week" },
                    { label: "2 weeks", value: "two-weeks" },
                    { label: "Custom", value: "custom" },
                  ]}
                />
              </FieldGroup>
            </>
          ) : null}

          {activeStep === 1 ? (
            <>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="client-name">Client / organization</FieldLabel>
                  <FieldContent>
                    <Input
                      id="client-name"
                      placeholder="Northstar Health"
                      value={clientName}
                      onChange={(event) => setClientName(event.target.value)}
                    />
                  </FieldContent>
                </Field>
              </FieldGroup>

              <Separator className="opacity-40" />

              <FieldGroup className="grid gap-5 lg:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="client-contact">
                    <span className="flex items-center gap-1.5"><User className="size-3 text-muted-foreground" /> Primary contact</span>
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="client-contact"
                      placeholder="Aditi Sharma"
                      value={clientContact}
                      onChange={(event) => setClientContact(event.target.value)}
                    />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="client-email">
                    <span className="flex items-center gap-1.5"><Mail className="size-3 text-muted-foreground" /> Client email</span>
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="client-email"
                      type="email"
                      placeholder="aditi@northstarhealth.com"
                      value={clientEmail}
                      onChange={(event) => setClientEmail(event.target.value)}
                    />
                  </FieldContent>
                </Field>
              </FieldGroup>

              <FieldGroup className="grid gap-5 lg:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="client-phone">
                    <span className="flex items-center gap-1.5"><Phone className="size-3 text-muted-foreground" /> Client phone</span>
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="client-phone"
                      placeholder="+91 98XXXXXX12"
                      value={clientPhone}
                      onChange={(event) => setClientPhone(event.target.value)}
                    />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="client-website">
                    <span className="flex items-center gap-1.5"><MapPin className="size-3 text-muted-foreground" /> Client website</span>
                  </FieldLabel>
                  <FieldContent>
                    <Input id="client-website" placeholder="https://northstarhealth.com" />
                  </FieldContent>
                </Field>
              </FieldGroup>

              <Field>
                <FieldLabel htmlFor="client-notes">Client notes</FieldLabel>
                <FieldContent>
                  <Textarea id="client-notes" rows={4} placeholder="Stakeholder expectations, communication preferences, compliance notes, etc." />
                </FieldContent>
              </Field>
            </>
          ) : null}

          {activeStep === 2 ? (
            <>
              <FieldGroup className="grid gap-5 lg:grid-cols-2">
                <SelectField
                  id="project-manager"
                  label="Project manager"
                  value={pm}
                  onChange={setPm}
                  options={getEmployeesByRole("Project Manager").map((employee) => ({
                    label: employee.name,
                    value: employee.id,
                  }))}
                  description="PM owns the project lifecycle and drives execution."
                />
                <SelectField
                  id="associate-project-manager"
                  label="Associate project manager"
                  value={associatePm}
                  onChange={setAssociatePm}
                  options={getEmployeesByRole("Associate Project Manager").map((employee) => ({
                    label: employee.name,
                    value: employee.id,
                  }))}
                  description="Supports delivery follow-ups, meetings, and coordination."
                />
              </FieldGroup>

              <Separator className="opacity-40" />

              <FieldGroup className="grid gap-5 lg:grid-cols-3">
                <SelectField
                  id="tech-lead"
                  label="Tech lead"
                  value={techLead}
                  onChange={setTechLead}
                  options={getEmployeesByRole("Tech Lead").map((employee) => ({
                    label: employee.name,
                    value: employee.id,
                  }))}
                />
                <SelectField
                  id="team-lead"
                  label="Team lead"
                  value={teamLead}
                  onChange={setTeamLead}
                  options={getEmployeesByRole("Team Lead").map((employee) => ({
                    label: employee.name,
                    value: employee.id,
                  }))}
                />
                <SelectField
                  id="qa-lead"
                  label="QA lead"
                  value={qaLead}
                  onChange={setQaLead}
                  options={getEmployeesByRole("QA").map((employee) => ({
                    label: employee.name,
                    value: employee.id,
                  }))}
                />
              </FieldGroup>

              <Separator className="opacity-40" />

              <FieldGroup className="grid gap-5 lg:grid-cols-2">
                <SelectField
                  id="project-governance"
                  label="Governance level"
                  value="standard"
                  onChange={() => undefined}
                  options={[
                    { label: "Standard", value: "standard" },
                    { label: "High sensitivity", value: "high-sensitivity" },
                    { label: "Executive visibility", value: "executive" },
                  ]}
                />
                <SelectField
                  id="meeting-mode"
                  label="Default meeting mode"
                  value="google-meet"
                  onChange={() => undefined}
                  options={[
                    { label: "Google Meet", value: "google-meet" },
                    { label: "Internal only", value: "internal" },
                    { label: "Client-led", value: "client-led" },
                  ]}
                />
              </FieldGroup>
            </>
          ) : null}

          {activeStep === 3 ? (
            <>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/10 p-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Users className="size-4 text-blue-600" />
                    Team selection
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select from the employee directory. In the real product, this would come from the tenant's active employee list.
                  </p>
                </div>
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 shadow-sm">
                  {selectedEmployees.length} selected
                </Badge>
              </div>

              <EmployeeSelector selectedIds={selectedEmployees} onToggle={handleToggleEmployee} />
            </>
          ) : null}

          {activeStep === 4 ? (
            <>
              <FieldGroup className="grid gap-5 lg:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="start-date">Start date</FieldLabel>
                  <FieldContent>
                    <Input id="start-date" type="date" />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="deadline">Expected deadline</FieldLabel>
                  <FieldContent>
                    <Input id="deadline" type="date" />
                  </FieldContent>
                </Field>
              </FieldGroup>

              <FieldGroup className="grid gap-5 lg:grid-cols-2">
                <SelectField
                  id="kickoff-mode"
                  label="Kickoff meeting"
                  value="required"
                  onChange={() => undefined}
                  options={[
                    { label: "Required", value: "required" },
                    { label: "Optional", value: "optional" },
                  ]}
                />
                <SelectField
                  id="first-sprint-setup"
                  label="First sprint setup"
                  value="auto-create"
                  onChange={() => undefined}
                  options={[
                    { label: "Auto-create first sprint", value: "auto-create" },
                    { label: "Create later", value: "later" },
                  ]}
                />
              </FieldGroup>

              <Separator className="opacity-40" />

              <Field>
                <FieldLabel htmlFor="project-scope">Scope note</FieldLabel>
                <FieldContent>
                  <Textarea
                    id="project-scope"
                    placeholder="Summarize what this project is trying to deliver, the key stakeholders, dependencies, and early risks."
                    rows={5}
                  />
                  <FieldDescription>
                    This will later drive kickoff preparation, first sprint setup, and default PM notifications.
                  </FieldDescription>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="risk-notes">Early risk and dependency notes</FieldLabel>
                <FieldContent>
                  <Textarea
                    id="risk-notes"
                    placeholder="Mention any dependency on client teams, access requests, deadlines, QA constraints, or compliance considerations."
                    rows={4}
                  />
                </FieldContent>
              </Field>
            </>
          ) : null}

          {/* Footer nav */}
          <Separator className="opacity-40" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-md bg-muted/50 text-[10px] font-bold tabular-nums">
                {activeStep + 1}
              </span>
              <span>of {steps.length} steps</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button type="button" variant="outline" size="sm" onClick={() => navigate("/project-manager/projects")}>
                Cancel
              </Button>
              {activeStep > 0 ? (
                <Button type="button" variant="outline" size="sm" onClick={handleBack}>
                  Back
                </Button>
              ) : null}
              {activeStep < steps.length - 1 ? (
                <Button type="button" size="sm" onClick={handleNext}>
                  Continue
                  <ChevronRight data-icon="inline-end" />
                </Button>
              ) : (
                <Button type="submit" size="sm">
                  <Check data-icon="inline-start" />
                  Create Project
                </Button>
              )}
            </div>
          </div>
        </form>
      </section>

      {/* ── Right sidebar: Summary ── */}
      <aside className="flex min-w-0 flex-col gap-5">
        {/* Project summary */}
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <div className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20 px-4 py-3.5">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <ClipboardList className="size-4 text-blue-600" />
              Setup summary
            </h3>
          </div>
          <div className="flex flex-col gap-3 p-3.5">
            {/* Project info */}
            <div className="rounded-xl border border-border/60 bg-muted/10 p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <Briefcase className="size-3" />
                Project
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">{projectName || "Untitled project"}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{projectCode || "No code yet"}</div>
            </div>

            {/* Client info */}
            <div className="rounded-xl border border-border/60 bg-muted/10 p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <User className="size-3" />
                Client
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">{clientName || "No client selected"}</div>
              {clientContact ? <div className="mt-0.5 text-xs text-muted-foreground">{clientContact}</div> : null}
              {clientEmail ? <div className="text-xs text-muted-foreground">{clientEmail}</div> : null}
            </div>

            {/* Team */}
            <div className="rounded-xl border border-border/60 bg-muted/10 p-3.5">
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  <UsersRound className="size-3" />
                  Team
                </div>
                <span className="text-[10px] font-bold tabular-nums text-muted-foreground/60">
                  {selectedTeam.length}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {selectedTeam.length ? (
                  selectedTeam.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 bg-card px-3 py-2"
                    >
                      <span className="text-xs font-medium text-foreground">{employee.name}</span>
                      <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-medium", getToneClasses(getRoleBadge(employee.role)))}>
                        {employee.role}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-2 text-center text-xs text-muted-foreground">No team members selected.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick tips */}
        <div className="rounded-xl border border-border/60 bg-card px-4 py-3.5 shadow-sm">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <FileText className="size-3" />
            Quick tip
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {activeStep === 0 && "Choose a clear, descriptive project name — it'll appear in all dashboards, reports, and notifications."}
            {activeStep === 1 && "Adding the primary contact now saves time during kickoff and helps auto-populate meeting invites."}
            {activeStep === 2 && "Ownership assignments drive notification routing and sprint review scheduling."}
            {activeStep === 3 && "You can always add or remove team members after the project is created."}
            {activeStep === 4 && "The scope note helps the PM and leads align before the first sprint begins."}
          </p>
        </div>
      </aside>
    </div>
  );
}

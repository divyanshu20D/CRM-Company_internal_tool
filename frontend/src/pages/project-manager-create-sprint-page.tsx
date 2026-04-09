import { startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, CheckSquare, Link2, Paperclip, Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { getPmProject } from "@/components/project-manager/pm-data";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const selectClasses =
  "flex h-10 w-full rounded-md border border-border/80 bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30";

const quickActions = [
  { label: "Attach brief", icon: Paperclip },
  { label: "Link issues", icon: Link2 },
  { label: "Checklist", icon: CheckSquare },
  { label: "Plan review", icon: CalendarDays },
];

const activityTabs = ["Notes", "History", "Checklist history", "Work logs"];

function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
      {action}
    </div>
  );
}

function MetaRow({
  label,
  control,
}: {
  label: string;
  control: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-3 py-3 sm:grid-cols-[128px_minmax(0,1fr)]">
      <div className="pt-2 text-sm font-medium text-muted-foreground">{label}</div>
      <div className="min-w-0">{control}</div>
    </div>
  );
}

function PlannedIssueRow({
  issue,
  summary,
  owner,
  status,
}: {
  issue: string;
  summary: string;
  owner: string;
  status: string;
}) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)_150px_122px] items-center gap-3 rounded-md border border-border/80 bg-background px-3 py-3">
      <Input defaultValue={issue} className="h-9" />
      <Input defaultValue={summary} className="h-9" />
      <Input defaultValue={owner} className="h-9" />
      <select className={cn(selectClasses, "h-9")}>
        <option defaultValue={status}>{status}</option>
        <option>To do</option>
        <option>In progress</option>
        <option>Review</option>
        <option>Done</option>
      </select>
    </div>
  );
}

export function ProjectManagerCreateSprintPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  const peopleOptions = Array.from(
    new Set([project.coordinator, project.techLead, project.teamLead, project.qaLead, ...project.developers, ...project.team.map((member) => member.name)]),
  );
  const qaOptions = Array.from(new Set([project.qaLead, ...project.team.filter((member) => member.role.includes("QA")).map((member) => member.name)]));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(() => {
      toast.success(`Sprint setup for ${project.name} is ready for backend wiring.`);
      navigate(`/project-manager/projects/${project.id}/sprints`);
    });
  };

  return (
    <form className="overflow-hidden rounded-md border border-border/80 bg-card shadow-sm" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-3 border-b border-border/80 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          <span>Projects</span>
          <span>/</span>
          <button
            type="button"
            className="truncate rounded-md bg-primary/8 px-2.5 py-1 font-medium text-primary transition-colors hover:bg-primary/12"
            onClick={() => navigate(`/project-manager/projects/${project.id}`)}
          >
            {project.name}
          </button>
          <span>/</span>
          <span className="font-medium text-foreground">New sprint</span>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="icon" onClick={() => navigate(`/project-manager/projects/${project.id}/sprints`)}>
            <X />
          </Button>
          <Button type="submit" className="gap-2">
            <Plus data-icon="inline-start" />
            Create Sprint
          </Button>
        </div>
      </div>

      <div className="grid min-h-[calc(100vh-13rem)] xl:grid-cols-[minmax(0,1fr)_430px]">
        <section className="flex min-w-0 flex-col border-r border-border/80 bg-background">
          <div className="space-y-5 px-5 py-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-primary/20 bg-primary/8 px-2.5 py-1 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {project.sprint}
              </span>
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase">
                Planned
              </span>
              <span className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold tracking-[0.14em] text-sky-700 uppercase">
                {project.client}
              </span>
            </div>

            <div className="space-y-3">
              <Input
                id="sprint-name"
                defaultValue={`${project.sprint} - Delivery hardening`}
                className="h-auto border-0 px-0 text-4xl leading-tight font-semibold tracking-tight shadow-none focus-visible:ring-0"
              />
              <p className="max-w-4xl text-base leading-7 text-muted-foreground">
                Create the sprint shell, planned work, review checkpoints, and ownership model for {project.name}. This should feel like the operating brief the PM,
                team lead, QA, and developers work from every day.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Button key={action.label} type="button" variant="outline" className="gap-2 rounded-md">
                    <Icon data-icon="inline-start" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-7 border-t border-border/80 px-5 py-5">
            <section className="space-y-3">
              <SectionTitle title="Description" />
              <Textarea
                id="description"
                rows={5}
                defaultValue={`Drive ${project.name} through the next delivery cycle with a clear sprint goal, QA alignment, issue sequencing, and review readiness.`}
                className="min-h-[140px] rounded-md"
              />
            </section>

            <section className="space-y-3">
              <SectionTitle
                title="Sprint planning details"
                action={
                  <button
                    type="button"
                    className="rounded-md border border-border/80 px-2.5 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    + Add note
                  </button>
                }
              />

              <FieldGroup className="grid gap-4 lg:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="sprint-goal">Sprint goal</FieldLabel>
                  <FieldContent>
                    <Input id="sprint-goal" defaultValue="Close QA blockers, finish release cleanup, and prepare stakeholder-ready review." />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="release-name">Release / milestone</FieldLabel>
                  <FieldContent>
                    <Input id="release-name" defaultValue="April client review" />
                  </FieldContent>
                </Field>
              </FieldGroup>

              <FieldGroup className="grid gap-4 lg:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="scope-note">Scope note</FieldLabel>
                  <FieldContent>
                    <Textarea
                      id="scope-note"
                      rows={5}
                      defaultValue="Keep scope tightly aligned to active QA pressure, auth hardening, and client-facing polish items. Push optional enhancements to the next sprint."
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="risk-note">Risk note</FieldLabel>
                  <FieldContent>
                    <Textarea
                      id="risk-note"
                      rows={5}
                      defaultValue="Main risks are QA bandwidth, delayed environment access, and late review feedback from stakeholder-facing items."
                    />
                  </FieldContent>
                </Field>
              </FieldGroup>
            </section>

            <section className="space-y-3">
              <SectionTitle
                title="Planned issues"
                action={
                  <Button type="button" variant="outline" size="icon">
                    <Plus />
                  </Button>
                }
              />

              <div className="space-y-2">
                <PlannedIssueRow issue="NS-214" summary="Auth refresh fallback validation" owner={project.teamLead} status="To do" />
                <PlannedIssueRow issue="NS-219" summary="QA regression retest sequence" owner={project.qaLead} status="To do" />
                <PlannedIssueRow issue="NS-227" summary="Provider setup polish and copy" owner={project.coordinator} status="To do" />
                <PlannedIssueRow issue="NS-231" summary="Stakeholder review checklist" owner={project.techLead} status="To do" />
              </div>
            </section>

            <section className="space-y-3">
              <SectionTitle title="Activity" />
              <div className="flex flex-wrap gap-2">
                {activityTabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                      index === 0
                        ? "border-primary/20 bg-primary/8 text-primary"
                        : "border-border/80 bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <Textarea
                id="communication-note"
                rows={4}
                placeholder="Add kickoff note, meeting plan, dependency summary, or sprint communication guidance here."
                className="min-h-[112px]"
              />
            </section>
          </div>
        </section>

        <aside className="flex min-w-0 flex-col bg-card/70">
          <div className="border-b border-border/80 px-5 py-5">
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" className="gap-2 rounded-md">
                <Sparkles data-icon="inline-start" />
                Draft from template
              </Button>
              <Button type="button" variant="outline" className="rounded-md">
                Save draft
              </Button>
            </div>
          </div>

          <div className="flex-1 divide-y divide-border/80 px-5">
            <MetaRow
              label="Sprint owner"
              control={
                <select id="sprint-owner" className={selectClasses} defaultValue={project.teamLead}>
                  {peopleOptions.map((person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              }
            />

            <MetaRow
              label="Reporter"
              control={
                <select id="reporter" className={selectClasses} defaultValue={project.coordinator}>
                  {peopleOptions.map((person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              }
            />

            <MetaRow
              label="Sprint type"
              control={
                <select id="sprint-type" className={selectClasses} defaultValue="delivery">
                  <option value="delivery">Delivery sprint</option>
                  <option value="stabilization">Stabilization sprint</option>
                  <option value="release">Release sprint</option>
                  <option value="uat">UAT sprint</option>
                </select>
              }
            />

            <MetaRow
              label="Priority"
              control={
                <select id="priority" className={selectClasses} defaultValue="high">
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              }
            />

            <MetaRow
              label="Status"
              control={
                <select id="status" className={selectClasses} defaultValue="planned">
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="stabilization">Stabilization</option>
                  <option value="review">In review</option>
                </select>
              }
            />

            <MetaRow
              label="Team lead"
              control={
                <select id="team-lead" className={selectClasses} defaultValue={project.teamLead}>
                  {peopleOptions.map((person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              }
            />

            <MetaRow
              label="QA owner"
              control={
                <select id="qa-owner" className={selectClasses} defaultValue={project.qaLead}>
                  {qaOptions.map((person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              }
            />

            <MetaRow label="Tags" control={<Input id="tags" defaultValue="qa-recovery, stakeholder-review, release-hardening" />} />

            <MetaRow
              label="Start date"
              control={<Input id="start-date" type="date" defaultValue="2026-04-09" />}
            />

            <MetaRow
              label="End date"
              control={<Input id="end-date" type="date" defaultValue="2026-04-19" />}
            />

            <MetaRow
              label="Review date"
              control={<Input id="review-date" type="date" defaultValue="2026-04-18" />}
            />

            <MetaRow
              label="Estimated time"
              control={<Input id="estimated-time" defaultValue="120 hours" />}
            />

            <MetaRow
              label="Time tracking"
              control={
                <div className="space-y-2">
                  <select id="time-tracking" className={selectClasses} defaultValue="team-log">
                    <option value="team-log">Team log required</option>
                    <option value="manual">Manual tracking</option>
                    <option value="milestone-only">Milestone only</option>
                  </select>
                  <div className="rounded-md border border-border/80 bg-background px-3 py-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Logged time</span>
                      <span>0d 0h 0m</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div className="h-2 w-0 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              }
            />

            <MetaRow
              label="Velocity"
              control={<Input id="velocity-target" defaultValue="30 story points" />}
            />

            <MetaRow
              label="Meeting mode"
              control={
                <select id="meeting-mode" className={selectClasses} defaultValue="google-meet">
                  <option value="google-meet">Google Meet</option>
                  <option value="in-office">In office</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              }
            />
          </div>

          <div className="border-t border-border/80 px-5 py-4 text-sm text-muted-foreground">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="font-medium text-foreground">Created by</div>
                <div>{project.coordinator}</div>
                <div>08-Apr-2026, 01:13 PM</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Last modified by</div>
                <div>{project.teamLead}</div>
                <div>08-Apr-2026, 03:16 PM</div>
              </div>
            </div>
            <FieldDescription className="mt-4">
              This layout is intentionally close to an issue-detail working surface so sprint setup feels familiar to the team.
            </FieldDescription>
          </div>
        </aside>
      </div>
    </form>
  );
}

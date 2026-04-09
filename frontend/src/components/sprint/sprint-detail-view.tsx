import { useState } from "react";
import { CheckSquare, ChevronRight, Link2, Paperclip, Plus, Search, X } from "lucide-react";
import { toast } from "sonner";

import type { SprintDetailRecord } from "@/components/sprint/sprint-detail-types";
import { MorphingNotePopover } from "@/components/shared/morphing-note-popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "Attach", icon: Paperclip },
  { label: "Add Child", icon: Plus },
  { label: "Link Issue", icon: Link2 },
  { label: "Add Checklist", icon: CheckSquare },
];

const activityTabs = ["Comments", "History", "Checklist History", "Work Logs"];

function getOptionToneClasses(option: string) {
  const normalized = option.toLowerCase();

  if (normalized.includes("active") || normalized.includes("progress")) {
    return {
      item: "text-sky-700 focus:bg-sky-50 focus:text-sky-700",
      trigger: "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100/70",
    };
  }

  if (normalized.includes("done") || normalized.includes("delivery") || normalized.includes("uat")) {
    return {
      item: "text-emerald-700 focus:bg-emerald-50 focus:text-emerald-700",
      trigger: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70",
    };
  }

  if (normalized.includes("review") || normalized.includes("medium")) {
    return {
      item: "text-violet-700 focus:bg-violet-50 focus:text-violet-700",
      trigger: "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100/70",
    };
  }

  if (normalized.includes("critical") || normalized.includes("high")) {
    return {
      item: "text-rose-700 focus:bg-rose-50 focus:text-rose-700",
      trigger: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100/70",
    };
  }

  if (normalized.includes("to do") || normalized.includes("stabilization")) {
    return {
      item: "text-amber-700 focus:bg-amber-50 focus:text-amber-700",
      trigger: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100/70",
    };
  }

  return {
    item: "text-slate-700 focus:bg-slate-50 focus:text-slate-700",
    trigger: "border-border/80 bg-background text-foreground",
  };
}

function DetailSelect({
  value,
  options,
  accent = "default",
  onChange,
}: {
  value: string;
  options: string[];
  accent?: "default" | "primary" | "muted";
  onChange?: (value: string) => void;
}) {
  const optionTone = getOptionToneClasses(value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "h-10 w-full rounded-md border px-3",
          accent === "primary" && optionTone.trigger,
          accent === "muted" && "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70",
          accent === "default" && "border-border/80 bg-background",
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-md border border-border/80 bg-popover shadow-lg">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className={cn(
              "rounded-sm",
              accent === "primary" && getOptionToneClasses(option).item,
              accent === "muted" && "focus:bg-emerald-50 focus:text-emerald-700",
            )}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-3 py-3 sm:grid-cols-[124px_minmax(0,1fr)]">
      <div className="pt-2 text-sm font-medium text-muted-foreground">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function PersonRow({
  name,
  subtitle,
  onClear,
}: {
  name: string;
  subtitle: string;
  onClear: () => void;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarFallback className="bg-violet-100 font-semibold text-violet-700">{initials}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <div className="text-sm font-semibold text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </div>
      </div>
      <button type="button" className="text-muted-foreground transition-colors hover:text-foreground" onClick={onClear}>
        <X className="size-4" />
      </button>
    </div>
  );
}

export function SprintDetailView({
  sprint,
  roleLabel,
}: {
  sprint: SprintDetailRecord;
  roleLabel: string;
}) {
  const [activeTab, setActiveTab] = useState("Comments");
  const [sprintStatus, setSprintStatus] = useState(sprint.status);
  const [plannedIssues, setPlannedIssues] = useState(
    sprint.plannedIssues.map((issue) => ({
      ...issue,
      checked: true,
    })),
  );

  const activityContent =
    activeTab === "Comments"
      ? sprint.activity
      : activeTab === "History"
        ? sprint.activity.map((entry) => ({
            ...entry,
            note: `${entry.author} updated sprint metadata, planning notes, or issue movement.`,
          }))
        : activeTab === "Checklist History"
          ? sprint.checklist.map((item, index) => ({
              author: `Checklist item ${index + 1}`,
              role: "Sprint workflow",
              time: sprint.modifiedAt,
              note: item,
            }))
          : [
              {
                author: sprint.owner,
                role: "Sprint owner",
                time: sprint.modifiedAt,
                note: `Logged effort is ${sprint.loggedTime} against ${sprint.estimatedTime}.`,
              },
            ];

  return (
    <div className="overflow-hidden rounded-md border border-border/80 bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border/80 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          <button
            type="button"
            className="rounded-md p-1 transition-colors hover:bg-accent hover:text-foreground"
            onClick={() => toast.success("Sprint search will connect here.")}
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            className="transition-colors hover:text-foreground"
            onClick={() => toast.success("Task list route will connect here.")}
          >
            Tasks
          </button>
          <ChevronRight className="size-4" />
          <button
            type="button"
            className="truncate rounded-md bg-primary/8 px-2.5 py-1 font-medium text-primary transition-colors hover:bg-primary/12"
            onClick={() => toast.success(`Open ${sprint.projectName} project view next.`)}
          >
            {sprint.projectLabel}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-[228px]">
            <DetailSelect
              value={sprintStatus}
              options={["To Do", "Active", "Review", "Done"]}
              accent="primary"
              onChange={(value) => {
                setSprintStatus(value);
                toast.success(`Sprint status updated to ${value}.`);
              }}
            />
          </div>
          <Button type="button" variant="outline" size="icon" onClick={() => toast.success("Add action panel will connect here.")}>
            <Plus />
          </Button>
        </div>
      </div>

      <div className="grid min-h-[calc(100vh-13rem)] xl:grid-cols-[minmax(0,1fr)_500px]">
        <section className="border-r border-border/80 bg-background">
          <div className="space-y-5 px-5 py-5">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="border-violet-200 bg-violet-50 text-violet-700">
                {sprint.parentItemType}
              </Badge>
              <button type="button" className="transition-colors hover:text-foreground" onClick={() => toast.success(`Open ${sprint.parentItem} next.`)}>
                {sprint.parentItem}
              </button>
              <ChevronRight className="size-4" />
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                {sprint.sprintLabel}
              </Badge>
            </div>

            <Input defaultValue={sprint.title} className="h-auto border-0 px-0 text-4xl leading-tight font-semibold tracking-tight shadow-none focus-visible:ring-0" />

            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Button key={action.label} type="button" variant="outline" className="gap-2 rounded-md" onClick={() => toast.success(`${action.label} is ready for backend wiring.`)}>
                    <Icon data-icon="inline-start" />
                    {action.label}
                  </Button>
                );
              })}
            </div>

            <section className="space-y-3">
              <h3 className="text-[15px] font-semibold text-foreground">Description</h3>
              <Textarea
                defaultValue={sprint.description}
                rows={5}
                className="min-h-[156px] rounded-md border border-border/80 bg-muted/10 px-4 py-3 text-base leading-7 shadow-none"
              />
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-semibold text-foreground">Child Issues</h3>
                <Button type="button" variant="outline" size="icon" onClick={() => toast.success("Add child issue flow will connect here.")}>
                  <Plus />
                </Button>
              </div>

              <div className="overflow-hidden rounded-md border border-border/80 bg-card">
                {plannedIssues.map((issue) => (
                  <div key={issue.id} className="grid grid-cols-[120px_minmax(0,1fr)_36px_168px] items-center gap-3 border-b border-border/70 px-3 py-3 last:border-b-0">
                    <label className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <input
                        type="checkbox"
                        checked={issue.checked}
                        className="size-4 rounded-sm border-border"
                        onChange={(event) => {
                          setPlannedIssues((current) =>
                            current.map((item) => (item.id === issue.id ? { ...item, checked: event.target.checked } : item)),
                          );
                          toast.success(`${issue.id} marked ${event.target.checked ? "selected" : "unselected"}.`);
                        }}
                      />
                      {issue.id}
                    </label>
                    <button
                      type="button"
                      className="truncate text-left text-sm text-foreground transition-colors hover:text-primary"
                      onClick={() => toast.success(`Open ${issue.id} detail page next.`)}
                    >
                      {issue.title}
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => toast.success(`Assignment helper for ${issue.id} will open here.`)}
                    >
                      <Plus className="size-4" />
                    </button>
                    <DetailSelect
                      value={issue.status}
                      options={["To Do", "In Progress", "Review", "Done"]}
                      accent="primary"
                      onChange={(value) => {
                        setPlannedIssues((current) => current.map((item) => (item.id === issue.id ? { ...item, status: value } : item)));
                        toast.success(`${issue.id} moved to ${value}.`);
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-[15px] font-semibold text-foreground">Activity</h3>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {activityTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                        activeTab === tab
                          ? "border-primary/20 bg-primary/8 text-primary"
                          : "border-border/80 bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-muted-foreground">Newest First</div>
                  <MorphingNotePopover
                    triggerLabel="Add Note"
                    title="Add Note"
                    onSubmit={(note) => toast.success(`Saved note: ${note.slice(0, 40)}${note.length > 40 ? "..." : ""}`)}
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-md border border-border/80 bg-muted/20 p-3">
                {activityContent.map((entry) => (
                  <div key={`${entry.author}-${entry.time}-${entry.note}`} className="rounded-md border border-border/70 bg-background px-3 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-foreground">
                        {entry.author}
                        <span className="font-normal text-muted-foreground"> · {entry.role}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{entry.time}</div>
                    </div>
                    <p className="pt-2 text-sm leading-6 text-muted-foreground">{entry.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <aside className="bg-card/70">
          <div className="divide-y divide-border/80 px-5">
            <MetaRow label="Sprint Owner">
              <PersonRow name={sprint.owner} subtitle={`${roleLabel} owner`} onClear={() => toast.success("Owner replacement flow will connect here.")} />
            </MetaRow>

            <MetaRow label="Reporter">
              <PersonRow name={sprint.reporter} subtitle="Sprint reporter" onClear={() => toast.success("Reporter replacement flow will connect here.")} />
            </MetaRow>

            <MetaRow label="Sprint Type">
              <DetailSelect
                value={sprint.sprintType}
                options={["Delivery sprint", "Stabilization sprint", "Release sprint", "UAT sprint"]}
                onChange={(value) => toast.success(`Sprint type updated to ${value}.`)}
              />
            </MetaRow>

            <MetaRow label="Priority">
              <DetailSelect value={sprint.priority} options={["Critical", "High", "Medium", "Low"]} onChange={(value) => toast.success(`Priority updated to ${value}.`)} />
            </MetaRow>

            <MetaRow label="Sprint">
              <button
                type="button"
                className="w-full rounded-md bg-muted/70 px-3 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => toast.success(`${sprint.sprintLabel} is the active sprint.`)}
              >
                {sprint.sprintLabel} <span className="pl-2 text-emerald-600">(Active)</span>
              </button>
            </MetaRow>

            <MetaRow label="Tag">
              <Input defaultValue={sprint.tagLabel} onFocus={() => toast.success("Tag editing is available here.")} />
            </MetaRow>

            <MetaRow label="Due Date">
              <Input defaultValue={sprint.dueDate} onFocus={() => toast.success("Due date editing is available here.")} />
            </MetaRow>

            <MetaRow label="Estimated Time">
              <Input defaultValue={sprint.estimatedTime} onFocus={() => toast.success("Estimated time editing is available here.")} />
            </MetaRow>

            <MetaRow label="Time Tracking">
              <button
                type="button"
                className="w-full space-y-2 rounded-md bg-muted/40 p-3 text-left transition-colors hover:bg-muted/60"
                onClick={() => toast.success("Time tracking details will expand here later.")}
              >
                <div className="text-sm text-muted-foreground">{sprint.timeTrackingHint}</div>
                <div className="text-sm font-medium text-foreground">Logged Time</div>
                <div className="h-3 rounded-full bg-muted">
                  <div className="h-3 w-[18%] rounded-full bg-primary" />
                </div>
                <div className="text-sm text-foreground">{sprint.loggedTime}</div>
              </button>
            </MetaRow>
          </div>

          <div className="border-t border-border/80 px-5 py-4 text-sm text-muted-foreground">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="font-medium text-foreground">Created by</div>
                <div>{sprint.createdBy}</div>
                <div>{sprint.createdAt}</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Last Modified by</div>
                <div>{sprint.modifiedBy}</div>
                <div>{sprint.modifiedAt}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

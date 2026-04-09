import {
  Activity,
  AlertTriangle,
  CalendarDays,
  ChevronRight,
  Clock,
  Flame,
  MoveUpRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { useWorkspace, type WorkspaceId } from "@/components/workspace/workspace-context";
import {
  SectionHeading,
} from "@/components/workspace/workspace-ui";
import { getToneClasses, type Tone } from "@/components/workspace/workspace-theme";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type DashboardContent = {
  eyebrow: { label: string; tone: Tone };
  statusBadge: { label: string; tone: Tone };
  contextLine: string;
  leaderStats: { label: string; value: string }[];
  decisionQueue: string[];
  metrics: { label: string; value: string; tone: Tone }[];
  focusCards: { title: string; value: string; detail: string; tone: Tone; badge: string }[];
  projects: {
    project: string;
    client: string;
    coordinator: string;
    lead: string;
    sprint: string;
    openItems: string;
    blocked: string;
    health: string;
  }[];
  pulseCards: { title: string; value: string; label: string; detail: string; tone: Tone }[];
  risks: string[];
  activity: string[];
  meetings: { title: string; time: string; attendees: string; detail: string }[];
};

const dashboardContent: Record<WorkspaceId, DashboardContent> = {
  "collab-workspace": {
    eyebrow: { label: "Client delivery dashboard", tone: "blue" },
    statusBadge: { label: "3 meetings today", tone: "green" },
    contextLine: "14 live projects, 11 blockers, 5 approvals waiting, and 3 meetings scheduled today.",
    leaderStats: [
      { label: "Last sync", value: "09:12 AM" },
      { label: "Projects watched", value: "14" },
      { label: "Escalations open", value: "3" },
    ],
    decisionQueue: [
      "Approve revised QA staffing for Northstar Health.",
      "Confirm Meridian UAT review slot before 6:00 PM.",
      "Check Atlas client sign-off progress before the planning call.",
    ],
    metrics: [
      { label: "Active clients", value: "09", tone: "sky" },
      { label: "Live projects", value: "14", tone: "blue" },
      { label: "Open blockers", value: "11", tone: "amber" },
      { label: "Meetings today", value: "03", tone: "green" },
    ],
    focusCards: [
      {
        title: "Approvals due",
        value: "05",
        detail: "Release, access, and stakeholder approvals waiting this week.",
        tone: "sky",
        badge: "Live",
      },
      {
        title: "Projects on track",
        value: "08",
        detail: "Healthy delivery streams moving without executive intervention.",
        tone: "green",
        badge: "Live",
      },
      {
        title: "Client reviews due",
        value: "04",
        detail: "Scheduled review windows that need readiness confirmation.",
        tone: "blue",
        badge: "Live",
      },
    ],
    projects: [
      {
        project: "Northstar Client Portal",
        client: "Northstar Health",
        coordinator: "Devika S.",
        lead: "Kabir A.",
        sprint: "Sprint 11",
        openItems: "38",
        blocked: "4",
        health: "Needs QA focus",
      },
      {
        project: "Atlas Commerce Refresh",
        client: "Atlas Retail",
        coordinator: "Riya P.",
        lead: "Arjun M.",
        sprint: "Sprint 18",
        openItems: "24",
        blocked: "1",
        health: "On track",
      },
      {
        project: "Meridian CRM Rollout",
        client: "Meridian Advisory",
        coordinator: "Aman T.",
        lead: "Nivedita R.",
        sprint: "Sprint 24",
        openItems: "31",
        blocked: "3",
        health: "At risk",
      },
      {
        project: "Helix Support Console",
        client: "Helix Systems",
        coordinator: "Pooja K.",
        lead: "Samar V.",
        sprint: "Sprint 07",
        openItems: "16",
        blocked: "0",
        health: "On track",
      },
    ],
    pulseCards: [
      {
        title: "Northstar Sprint 11",
        value: "14",
        label: "QA items pending",
        detail: "Regression on settings and auth handoff before Friday's demo.",
        tone: "sky",
      },
      {
        title: "Atlas Sprint 18",
        value: "07",
        label: "Stories closing today",
        detail: "Checkout polish and analytics wrap-up are lined up for review.",
        tone: "green",
      },
      {
        title: "Meridian Sprint 24",
        value: "03",
        label: "Executive approvals needed",
        detail: "Migration sign-off, permissions review, and client readiness call.",
        tone: "amber",
      },
    ],
    risks: [
      "Meridian data import validations are still incomplete.",
      "Northstar regression coverage is below current sprint demand.",
      "Helix access and attachment visibility need final review.",
    ],
    activity: [
      "Coordinator updated Atlas launch checklist 18 minutes ago.",
      "QA reopened 3 issues on Northstar after regression testing.",
      "Project manager adjusted Meridian sprint scope after review.",
    ],
    meetings: [
      {
        title: "CEO delivery review",
        time: "10:30 AM",
        attendees: "CEO, PMs, Coordinators",
        detail: "Portfolio status, QA load, staffing shifts, and release confidence.",
      },
      {
        title: "Northstar bug triage",
        time: "12:15 PM",
        attendees: "Lead, QA, Backend",
        detail: "Review 14 pending defects before the stakeholder demo.",
      },
      {
        title: "Atlas sprint planning",
        time: "4:00 PM",
        attendees: "PM, Coordinator, Lead",
        detail: "Story estimates, dependency callouts, and scope lock for Sprint 19.",
      },
    ],
  },
  "delivery-ops": {
    eyebrow: { label: "Delivery operations board", tone: "sky" },
    statusBadge: { label: "2 escalations active", tone: "amber" },
    contextLine: "8 sprint streams active, 19 carry-over items, 6 lead interventions, and 2 escalations requiring action.",
    leaderStats: [
      { label: "Last sync", value: "09:31 AM" },
      { label: "Teams tracked", value: "06" },
      { label: "Ops escalations", value: "2" },
    ],
    decisionQueue: [
      "Lock Meridian validation ownership before the 1:00 PM sync.",
      "Approve Northstar QA rebalance for tomorrow's regression cycle.",
      "Decide whether Atlas hardening scope stays in Sprint 19.",
    ],
    metrics: [
      { label: "Teams active", value: "06", tone: "sky" },
      { label: "Sprints in motion", value: "08", tone: "blue" },
      { label: "Carry-over items", value: "19", tone: "amber" },
      { label: "QA reviews today", value: "11", tone: "green" },
    ],
    focusCards: [
      {
        title: "Blocked handoffs",
        value: "07",
        detail: "Dependencies between backend, QA, and coordinator workflows need daily follow-up.",
        tone: "amber",
        badge: "Ops",
      },
      {
        title: "Recovering streams",
        value: "03",
        detail: "Projects moved back into acceptable rhythm after staffing or bug-triage changes.",
        tone: "green",
        badge: "Ops",
      },
      {
        title: "Lead interventions",
        value: "06",
        detail: "Team leads are currently carrying cross-project escalation load.",
        tone: "blue",
        badge: "Ops",
      },
    ],
    projects: [
      {
        project: "Meridian Data Stabilization",
        client: "Meridian Advisory",
        coordinator: "Aman T.",
        lead: "Nivedita R.",
        sprint: "Sprint 24",
        openItems: "42",
        blocked: "6",
        health: "At risk",
      },
      {
        project: "Atlas Checkout Hardening",
        client: "Atlas Retail",
        coordinator: "Riya P.",
        lead: "Arjun M.",
        sprint: "Sprint 19",
        openItems: "29",
        blocked: "2",
        health: "Needs QA focus",
      },
      {
        project: "Northstar QA Recovery",
        client: "Northstar Health",
        coordinator: "Devika S.",
        lead: "Kabir A.",
        sprint: "Sprint 12",
        openItems: "34",
        blocked: "5",
        health: "Needs QA focus",
      },
    ],
    pulseCards: [
      {
        title: "Meridian Sprint 24",
        value: "09",
        label: "Carry-over stories",
        detail: "Import validations and permissions cleanup are pushing items into the next cycle.",
        tone: "amber",
      },
      {
        title: "Atlas Sprint 19",
        value: "05",
        label: "Critical fixes in review",
        detail: "Checkout hardening is moving, but QA sign-off is still concentrated on one queue.",
        tone: "sky",
      },
      {
        title: "Northstar Sprint 12",
        value: "04",
        label: "Lead interventions",
        detail: "Team lead is covering cross-functional blockers to protect stakeholder readiness.",
        tone: "blue",
      },
    ],
    risks: [
      "Meridian handoff between QA and dev still lacks validated acceptance criteria.",
      "Northstar defect verification is concentrated on one QA resource.",
      "Atlas dependency on analytics tagging may delay sprint closure.",
    ],
    activity: [
      "Operations reassigned 2 engineers to Meridian stabilization 11 minutes ago.",
      "QA owner for Northstar updated triage labels after morning review.",
      "Project manager reopened Atlas scope discussion after lead feedback.",
    ],
    meetings: [
      {
        title: "Operations standup",
        time: "10:00 AM",
        attendees: "PMs, Coordinators, Leads",
        detail: "Delivery blockers, staffing shifts, and QA recovery decisions.",
      },
      {
        title: "Meridian dependency sync",
        time: "1:00 PM",
        attendees: "Lead, Backend, QA",
        detail: "Review data validation ownership and close unresolved blockers.",
      },
      {
        title: "Northstar QA catch-up",
        time: "5:00 PM",
        attendees: "Coordinator, QA, Team lead",
        detail: "Rebalance testing coverage before tomorrow's review window.",
      },
    ],
  },
  "executive-reviews": {
    eyebrow: { label: "Executive review deck", tone: "blue" },
    statusBadge: { label: "6 approvals pending", tone: "amber" },
    contextLine: "6 approvals pending, 2 governance holds, 5 review windows in scope, and 2 stakeholder meetings today.",
    leaderStats: [
      { label: "Last sync", value: "08:54 AM" },
      { label: "Reviews in scope", value: "05" },
      { label: "Executive approvals", value: "6" },
    ],
    decisionQueue: [
      "Approve the Northstar stakeholder summary before noon.",
      "Confirm Atlas sign-off ownership before the 3:00 PM call.",
      "Close Helix governance checklist before board review prep.",
    ],
    metrics: [
      { label: "Review windows", value: "05", tone: "sky" },
      { label: "Approvals waiting", value: "06", tone: "amber" },
      { label: "Client summaries", value: "11", tone: "blue" },
      { label: "Meetings today", value: "02", tone: "green" },
    ],
    focusCards: [
      {
        title: "Board items",
        value: "03",
        detail: "Projects that need decision-ready summaries for leadership review.",
        tone: "blue",
        badge: "Review",
      },
      {
        title: "Policy sign-offs",
        value: "04",
        detail: "Governance and access items that must be closed before release.",
        tone: "amber",
        badge: "Review",
      },
      {
        title: "Client approvals",
        value: "05",
        detail: "Upcoming stakeholder checkpoints that need clean review material.",
        tone: "green",
        badge: "Review",
      },
    ],
    projects: [
      {
        project: "Northstar Stakeholder Review",
        client: "Northstar Health",
        coordinator: "Devika S.",
        lead: "Kabir A.",
        sprint: "Review 02",
        openItems: "12",
        blocked: "1",
        health: "On track",
      },
      {
        project: "Atlas Release Sign-off",
        client: "Atlas Retail",
        coordinator: "Riya P.",
        lead: "Arjun M.",
        sprint: "Review 01",
        openItems: "15",
        blocked: "2",
        health: "Needs QA focus",
      },
      {
        project: "Helix Governance Cleanup",
        client: "Helix Systems",
        coordinator: "Pooja K.",
        lead: "Samar V.",
        sprint: "Review 03",
        openItems: "09",
        blocked: "3",
        health: "At risk",
      },
    ],
    pulseCards: [
      {
        title: "Northstar review pack",
        value: "05",
        label: "Slides pending",
        detail: "Delivery summary and QA narrative still need final polish.",
        tone: "blue",
      },
      {
        title: "Atlas sign-off",
        value: "02",
        label: "Approvals waiting",
        detail: "Stakeholder review and release confirmation are both still open.",
        tone: "amber",
      },
      {
        title: "Helix governance",
        value: "03",
        label: "Control items open",
        detail: "File permissions and audit visibility require leadership closure.",
        tone: "teal",
      },
    ],
    risks: [
      "Atlas sign-off could slip if QA evidence is not attached before review.",
      "Helix governance cleanup still lacks final access-rule confirmation.",
      "Northstar summary deck needs tighter executive wording before circulation.",
    ],
    activity: [
      "Executive coordinator updated the Northstar review note pack 26 minutes ago.",
      "Atlas sign-off request was resent to two client approvers.",
      "Helix governance checklist was reopened after attachment-access feedback.",
    ],
    meetings: [
      {
        title: "Leadership review prep",
        time: "11:00 AM",
        attendees: "CEO, PM, Coordinator",
        detail: "Tighten summary material for stakeholder discussions and open approvals.",
      },
      {
        title: "Atlas sign-off call",
        time: "3:00 PM",
        attendees: "PM, Client stakeholders, QA",
        detail: "Confirm release readiness and decision ownership for the next milestone.",
      },
    ],
  },
};

function getHealthClasses(health: string) {
  if (health === "On track") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (health === "Needs QA focus") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-amber-200 bg-amber-50 text-amber-700";
}

function getHealthDot(health: string) {
  if (health === "On track") return "bg-emerald-500";
  if (health === "Needs QA focus") return "bg-sky-500";
  return "bg-amber-500";
}

function getToneGradient(tone: Tone) {
  if (tone === "green") return "from-emerald-500/10 to-emerald-500/0";
  if (tone === "teal") return "from-teal-500/10 to-teal-500/0";
  if (tone === "amber") return "from-amber-500/10 to-amber-500/0";
  if (tone === "blue") return "from-blue-500/10 to-blue-500/0";
  return "from-sky-500/10 to-sky-500/0";
}

function getToneAccent(tone: Tone) {
  if (tone === "green") return "bg-emerald-500";
  if (tone === "teal") return "bg-teal-500";
  if (tone === "amber") return "bg-amber-500";
  if (tone === "blue") return "bg-blue-500";
  return "bg-sky-500";
}

function getToneIcon(tone: Tone) {
  if (tone === "green") return TrendingUp;
  if (tone === "amber") return AlertTriangle;
  if (tone === "blue") return Target;
  if (tone === "teal") return Sparkles;
  return Zap;
}

const metricIcons = [Users, Flame, AlertTriangle, CalendarDays];

export function DashboardPage() {
  const { activeWorkspace } = useWorkspace();
  const content = dashboardContent[activeWorkspace.id];

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      {/* ── Main column ── */}
      <section className="flex min-w-0 flex-col gap-5">

        {/* ── Hero section ── */}
        <section className="relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          {/* Background gradient decoration */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-emerald-500/[0.03]" />
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-blue-400/[0.04] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-emerald-400/[0.04] blur-3xl" />

          <div className="relative p-5 pb-0">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_320px]">
              <div className="flex min-w-0 flex-col gap-4">
                {/* Eyebrow badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className={cn("text-sm font-medium shadow-sm", getToneClasses(content.eyebrow.tone))}>
                    <Sparkles className="mr-1 size-3" />
                    {content.eyebrow.label}
                  </Badge>
                  <Badge variant="outline" className={cn("shadow-sm", getToneClasses(content.statusBadge.tone))}>
                    {content.statusBadge.label}
                  </Badge>
                </div>

                {/* Operating view card */}
                <div className="rounded-lg border border-border/60 bg-gradient-to-r from-background to-muted/30 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Activity className="size-4 text-blue-600" />
                    Current operating view
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.contextLine}</p>
                </div>

                {/* Leader stats */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {content.leaderStats.map((item, i) => (
                    <div
                      key={item.label}
                      className="group relative overflow-hidden rounded-lg border border-border/60 bg-background p-4 transition-all duration-200 hover:border-border hover:shadow-sm"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          {i === 0 && <Clock className="size-3" />}
                          {i === 1 && <Target className="size-3" />}
                          {i === 2 && <AlertTriangle className="size-3" />}
                          {item.label}
                        </div>
                        <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision queue sidebar */}
              <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-gradient-to-b from-slate-50/90 to-slate-50/40 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 ring-2 ring-background shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 font-semibold">
                      {activeWorkspace.footerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <span className="text-sm font-semibold">{activeWorkspace.footerName}</span>
                    <span className="text-xs text-muted-foreground">{activeWorkspace.footerRole}</span>
                  </div>
                </div>
                <Separator className="opacity-60" />
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    <Zap className="size-3 text-amber-500" />
                    Decision queue
                  </div>
                  {content.decisionQueue.map((item, i) => (
                    <div
                      key={item}
                      className="group flex items-start gap-2.5 rounded-lg border border-border/60 bg-background/80 p-3 text-sm leading-relaxed text-muted-foreground transition-all duration-200 hover:border-border hover:bg-background hover:shadow-sm"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[10px] font-bold text-blue-600">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Metrics row ── */}
          <div className="relative px-5 py-5">
            <div className="grid gap-3 lg:grid-cols-4">
              {content.metrics.map((item, i) => {
                const Icon = metricIcons[i % metricIcons.length];
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border border-border/50 p-4 transition-all duration-200 hover:shadow-md",
                      "bg-gradient-to-br",
                      getToneGradient(item.tone)
                    )}
                  >
                    <div className={cn("absolute left-0 top-0 h-full w-[3px] rounded-l-xl", getToneAccent(item.tone))} />
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{item.label}</span>
                        <span className="text-3xl font-bold tracking-tight text-foreground">{item.value}</span>
                      </div>
                      <div className={cn("rounded-lg border p-2.5 shadow-sm transition-transform duration-200 group-hover:scale-105", getToneClasses(item.tone))}>
                        <Icon className="size-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Focus cards ── */}
          <div className="px-5 pb-5">
            <div className="grid gap-3 lg:grid-cols-3">
              {content.focusCards.map((item) => {
                const Icon = getToneIcon(item.tone);
                return (
                  <div
                    key={item.title}
                    className="group relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-200 hover:border-border/80 hover:shadow-md"
                  >
                    <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40", getToneGradient(item.tone))} />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className={cn("flex size-7 items-center justify-center rounded-md", getToneClasses(item.tone))}>
                          <Icon className="size-3.5" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{item.title}</span>
                      </div>
                      <span className={cn("inline-flex rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm", getToneClasses(item.tone))}>
                        {item.badge}
                      </span>
                    </div>
                    <div className="relative text-[2.25rem] font-bold tracking-tight text-foreground">{item.value}</div>
                    <p className="relative text-[13px] leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                className="shadow-sm"
                onClick={() => toast.success("Project creation flow will open from this primary action.")}
              >
                <MoveUpRight data-icon="inline-start" />
                Create Project
              </Button>
              <Button variant="outline" className="shadow-sm">
                <Target data-icon="inline-start" />
                Plan Sprint
              </Button>
              <Button variant="outline" className="shadow-sm">
                <CalendarDays data-icon="inline-start" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </section>

        {/* ── Active portfolio table ── */}
        <section className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <div className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20 p-5">
            <SectionHeading
              title="Active portfolio"
              description="Real client project data for leadership review and delivery follow-through."
            />
          </div>

          <div className="p-1">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[26%] font-semibold">Project</TableHead>
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold">Coordinator</TableHead>
                  <TableHead className="font-semibold">Lead</TableHead>
                  <TableHead className="font-semibold">Sprint</TableHead>
                  <TableHead className="font-semibold">Open</TableHead>
                  <TableHead className="font-semibold">Blocked</TableHead>
                  <TableHead className="font-semibold">Health</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.projects.map((project) => (
                  <TableRow key={project.project} className="group transition-colors duration-150">
                    <TableCell className="font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <span className={cn("inline-block size-2 rounded-full", getHealthDot(project.health))} />
                        {project.project}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.client}</TableCell>
                    <TableCell className="text-muted-foreground">{project.coordinator}</TableCell>
                    <TableCell className="text-muted-foreground">{project.lead}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-xs font-medium text-foreground">
                        {project.sprint}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium tabular-nums">{project.openItems}</TableCell>
                    <TableCell>
                      <span className={cn("font-medium tabular-nums", Number(project.blocked) > 0 ? "text-amber-600" : "text-muted-foreground")}>
                        {project.blocked}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={cn("inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium shadow-sm", getHealthClasses(project.health))}>
                        {project.health}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* ── Delivery pulse ── */}
        <section className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <Tabs defaultValue="pulse" className="flex flex-col">
            <div className="flex flex-col gap-3 border-b border-border/40 bg-gradient-to-r from-background to-muted/20 p-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                title="Delivery pulse"
                description="Focused data points for sprint pressure, risks, and current coordination activity."
              />
              <TabsList className="shadow-sm">
                <TabsTrigger value="pulse">
                  <Zap className="mr-1.5 size-3" />
                  Sprint pulse
                </TabsTrigger>
                <TabsTrigger value="risks">
                  <AlertTriangle className="mr-1.5 size-3" />
                  Risk queue
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <Activity className="mr-1.5 size-3" />
                  Activity
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-5">
              <TabsContent value="pulse" className="mt-0 grid gap-3 lg:grid-cols-3">
                {content.pulseCards.map((sprint) => (
                  <div
                    key={sprint.title}
                    className={cn(
                      "group relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-xl border border-border/50 p-5 transition-all duration-200 hover:shadow-md",
                      "bg-gradient-to-br",
                      getToneGradient(sprint.tone)
                    )}
                  >
                    <div className={cn("absolute left-0 top-0 h-full w-[3px] rounded-l-xl", getToneAccent(sprint.tone))} />
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold text-foreground">{sprint.title}</span>
                      <span className={cn("inline-flex rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm", getToneClasses(sprint.tone))}>
                        {sprint.label}
                      </span>
                    </div>
                    <div className="text-[2.25rem] font-bold tracking-tight text-foreground">{sprint.value}</div>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{sprint.detail}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="risks" className="mt-0 grid gap-3 lg:grid-cols-3">
                {content.risks.map((item) => (
                  <div
                    key={item}
                    className="group flex items-start gap-3 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 to-amber-50/30 p-4 text-sm leading-relaxed text-amber-900/80 transition-all duration-200 hover:border-amber-300 hover:shadow-sm"
                  >
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="activity" className="mt-0 grid gap-3 lg:grid-cols-3">
                {content.activity.map((item) => (
                  <div
                    key={item}
                    className="group flex items-start gap-3 rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/20 p-4 text-sm leading-relaxed text-muted-foreground transition-all duration-200 hover:border-border hover:shadow-sm"
                  >
                    <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </section>

      {/* ── Sidebar ── */}
      <aside className="flex min-w-0 flex-col gap-5">
        {/* Meetings card */}
        <Card className="overflow-hidden rounded-xl border-border/60 shadow-sm">
          <CardHeader className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="size-4 text-blue-600" />
              Today's meetings
            </CardTitle>
            <CardDescription>Operational meetings tied to live project execution.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pt-4">
            {content.meetings.map((meeting) => (
              <div
                key={meeting.title}
                className="group relative overflow-hidden rounded-xl border border-sky-200/60 bg-gradient-to-br from-sky-50/60 to-sky-50/20 p-4 transition-all duration-200 hover:border-sky-300 hover:shadow-sm"
              >
                <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-sky-400" />
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{meeting.title}</span>
                  <Badge variant="outline" className="border-sky-200 bg-sky-50 text-[10px] font-bold text-sky-700 shadow-sm">
                    {meeting.time}
                  </Badge>
                </div>
                <div className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="size-3" />
                  {meeting.attendees}
                </div>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{meeting.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick stats summary */}
        <Card className="overflow-hidden rounded-xl border-border/60 shadow-sm">
          <CardHeader className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-600" />
              At a glance
            </CardTitle>
            <CardDescription>Quick view of delivery health across all streams.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5 pt-4">
            {content.focusCards.map((item) => {
              const Icon = getToneIcon(item.tone);
              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/10 px-3.5 py-3 transition-all duration-200 hover:bg-muted/20"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={cn("flex size-7 items-center justify-center rounded-md shadow-sm", getToneClasses(item.tone))}>
                      <Icon className="size-3.5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                  </div>
                  <span className="text-lg font-bold tabular-nums text-foreground">{item.value}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

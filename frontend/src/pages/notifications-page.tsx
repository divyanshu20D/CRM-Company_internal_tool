import {
  BellRing,
  CheckCheck,
  CircleAlert,
  Clock,
  Mail,
  MailCheck,
} from "lucide-react"

import {
  useWorkspace,
  type WorkspaceId,
} from "@/components/workspace/workspace-context"
import {
  MetricGrid,
  SectionHeading,
  StackedNoteCard,
  type MetricItem,
} from "@/components/workspace/workspace-ui"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type NotificationsContent = {
  summary: MetricItem[]
  rows: {
    title: string
    type: string
    channel: string
    owner: string
    time: string
    status: string
  }[]
  channels: string[]
  followUps: string[]
}

const contentByWorkspace: Record<WorkspaceId, NotificationsContent> = {
  "collab-workspace": {
    summary: [
      { label: "Unread alerts", value: "12", icon: BellRing, tone: "blue" },
      { label: "Needs approval", value: "05", icon: CircleAlert, tone: "sky" },
      { label: "Email sent", value: "28", icon: MailCheck, tone: "green" },
      { label: "Resolved today", value: "09", icon: CheckCheck, tone: "teal" },
    ],
    rows: [
      {
        title: "Northstar QA queue crossed threshold",
        type: "Escalation",
        channel: "In-app + email",
        owner: "Kabir A.",
        time: "12 min ago",
        status: "Open",
      },
      {
        title: "Atlas sprint planning agenda updated",
        type: "Meeting",
        channel: "In-app",
        owner: "Riya P.",
        time: "34 min ago",
        status: "Seen",
      },
      {
        title: "Meridian approval reminder sent",
        type: "Workflow",
        channel: "Email",
        owner: "Aman T.",
        time: "1 hr ago",
        status: "Pending",
      },
      {
        title: "Helix release checklist marked ready",
        type: "Delivery",
        channel: "In-app + email",
        owner: "Pooja K.",
        time: "2 hr ago",
        status: "Seen",
      },
    ],
    channels: [
      "In-app notifications keep project activity visible inside the workspace.",
      "Email notifications cover approvals, reminders, and meeting changes.",
    ],
    followUps: [
      "Approve the revised QA staffing plan for Northstar Health.",
      "Confirm Meridian UAT review slot before 6:00 PM.",
      "Check whether Atlas sign-off mail reached client stakeholders.",
    ],
  },
  "delivery-ops": {
    summary: [
      { label: "Unread alerts", value: "17", icon: BellRing, tone: "blue" },
      { label: "Escalations", value: "06", icon: CircleAlert, tone: "amber" },
      { label: "Team mail sent", value: "19", icon: MailCheck, tone: "green" },
      { label: "Resolved today", value: "11", icon: CheckCheck, tone: "teal" },
    ],
    rows: [
      {
        title: "Meridian blocker age exceeded ops threshold",
        type: "Escalation",
        channel: "In-app + email",
        owner: "Nivedita R.",
        time: "7 min ago",
        status: "Open",
      },
      {
        title: "Northstar QA shift reassignment confirmed",
        type: "Staffing",
        channel: "Email",
        owner: "Devika S.",
        time: "23 min ago",
        status: "Seen",
      },
      {
        title: "Atlas dependency sync moved to 3:30 PM",
        type: "Meeting",
        channel: "In-app",
        owner: "Riya P.",
        time: "41 min ago",
        status: "Pending",
      },
      {
        title: "Delivery dashboard exported for daily review",
        type: "Ops",
        channel: "Email",
        owner: "Neha Verma",
        time: "1 hr ago",
        status: "Seen",
      },
    ],
    channels: [
      "In-app alerts surface blockers and queue spikes for fast coordination.",
      "Email updates are used for staffing, escalation summaries, and schedule changes.",
    ],
    followUps: [
      "Confirm Meridian test ownership before the 1:00 PM sync.",
      "Approve Northstar QA rebalance for tomorrow's regression plan.",
      "Review Atlas hardening sprint to prevent carry-over growth.",
    ],
  },
  "executive-reviews": {
    summary: [
      { label: "Unread alerts", value: "09", icon: BellRing, tone: "blue" },
      { label: "Approvals due", value: "06", icon: CircleAlert, tone: "amber" },
      { label: "Review mails", value: "14", icon: MailCheck, tone: "green" },
      { label: "Closed today", value: "04", icon: CheckCheck, tone: "teal" },
    ],
    rows: [
      {
        title: "Atlas release sign-off still missing QA evidence",
        type: "Approval",
        channel: "In-app + email",
        owner: "Arjun M.",
        time: "18 min ago",
        status: "Open",
      },
      {
        title: "Northstar review deck moved to final approval",
        type: "Review",
        channel: "In-app",
        owner: "Devika S.",
        time: "39 min ago",
        status: "Seen",
      },
      {
        title: "Helix permissions checklist reopened",
        type: "Governance",
        channel: "Email",
        owner: "Pooja K.",
        time: "52 min ago",
        status: "Pending",
      },
    ],
    channels: [
      "In-app notifications keep review movement visible for leadership.",
      "Email is used for approvals, stakeholder reminders, and sign-off circulation.",
    ],
    followUps: [
      "Approve the Northstar stakeholder summary before noon.",
      "Check whether Atlas client-side approvers received the updated review note.",
      "Close Helix file-access checklist before the next governance checkpoint.",
    ],
  },
}

function getStatusDot(status: string) {
  if (status === "Open") return "bg-sky-500 shadow-sky-500/30"
  if (status === "Pending") return "bg-amber-500 shadow-amber-500/30"
  return "bg-emerald-500 shadow-emerald-500/30"
}

function getStatusClasses(status: string) {
  if (status === "Open") return "border-sky-200 bg-sky-50 text-sky-700"
  if (status === "Pending") return "border-amber-200 bg-amber-50 text-amber-700"
  return "border-emerald-200 bg-emerald-50 text-emerald-700"
}

function getTypeClasses(type: string) {
  if (type === "Escalation") return "border-red-200 bg-red-50 text-red-700"
  if (type === "Meeting") return "border-blue-200 bg-blue-50 text-blue-700"
  if (type === "Workflow" || type === "Approval")
    return "border-amber-200 bg-amber-50 text-amber-700"
  if (type === "Governance") return "border-teal-200 bg-teal-50 text-teal-700"
  return "border-slate-200 bg-slate-50 text-slate-700"
}

export function NotificationsPage() {
  const { activeWorkspace } = useWorkspace()
  const content = contentByWorkspace[activeWorkspace.id]

  return (
    <div className="flex flex-col gap-5">
      <MetricGrid items={content.summary} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_360px]">
        <section className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <div className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20 p-5">
            <SectionHeading
              title="Notification stream"
              description="All delivery, governance, workflow, and meeting alerts in one executive queue."
            />
          </div>

          <div className="p-1">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[38%] font-semibold">
                    Notification
                  </TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Channel</TableHead>
                  <TableHead className="font-semibold">Owner</TableHead>
                  <TableHead className="font-semibold">Time</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.rows.map((item) => (
                  <TableRow
                    key={item.title}
                    className="group transition-colors duration-150"
                  >
                    <TableCell className="font-semibold text-foreground">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "inline-block size-2 shrink-0 rounded-full shadow-sm",
                            getStatusDot(item.status)
                          )}
                        />
                        {item.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex rounded-md border px-2 py-0.5 text-xs font-medium",
                          getTypeClasses(item.type)
                        )}
                      >
                        {item.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.channel}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.owner}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-3 opacity-50" />
                        {item.time}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shadow-sm",
                          getStatusClasses(item.status)
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <aside className="flex flex-col gap-5">
          <StackedNoteCard
            title="Delivery channels"
            description="Current v1 notification behavior aligned to your product plan."
            icon={Mail}
            items={content.channels.map((copy, index) => ({
              copy,
              tone: index === 0 ? "blue" : "green",
            }))}
          />

          <StackedNoteCard
            title="Follow-up queue"
            description="Items likely to need CEO or project manager action."
            icon={CircleAlert}
            numbered
            items={content.followUps.map((copy) => ({ copy }))}
          />
        </aside>
      </div>
    </div>
  )
}

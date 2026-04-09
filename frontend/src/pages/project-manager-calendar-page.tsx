import { CalendarDays } from "lucide-react";

import { WeeklyCalendarView, StackedNoteCard } from "@/components/workspace/workspace-ui";

const dayLabels = ["Mon, Apr 6", "Tue, Apr 7", "Wed, Apr 8"];

const calendarEvents = [
  {
    id: "pm-northstar-review",
    day: "Mon, Apr 6",
    time: "4:30 PM",
    title: "Northstar QA review",
    meta: "Northstar Client Portal",
    detail: "Close regression blockers and align on stakeholder review readiness.",
    tone: "blue" as const,
  },
  {
    id: "pm-atlas-signoff",
    day: "Mon, Apr 6",
    time: "3:00 PM",
    title: "Atlas sign-off prep",
    meta: "Atlas Commerce Refresh",
    detail: "Review release-candidate evidence and confirm sign-off path.",
    tone: "teal" as const,
  },
  {
    id: "pm-meridian-sync",
    day: "Mon, Apr 6",
    time: "1:00 PM",
    title: "Meridian dependency sync",
    meta: "Meridian CRM Rollout",
    detail: "Resolve validation ownership and unblock UAT planning.",
    tone: "amber" as const,
  },
  {
    id: "pm-atlas-planning",
    day: "Tue, Apr 7",
    time: "11:30 AM",
    title: "Sprint 19 planning",
    meta: "Atlas Commerce Refresh",
    detail: "Finalize scope, velocity, and assignment balance for the next sprint cycle.",
    tone: "green" as const,
  },
];

export function ProjectManagerCalendarPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <WeeklyCalendarView events={calendarEvents} dayLabels={dayLabels} />

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="Calendar usage"
          description="The PM should be able to see execution-critical time blocks at a glance."
          icon={CalendarDays}
          items={[
            { copy: "Sprint planning, review, and standups should be visually separate from stakeholder meetings." },
            { copy: "Google Calendar and Google Meet integrations should drive this view later." },
            { copy: "Milestones and approval deadlines should also appear here, not only meetings." },
          ]}
        />
      </aside>
    </div>
  );
}

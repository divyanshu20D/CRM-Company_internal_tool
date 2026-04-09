import { CalendarDays, Clock3, Link2, UsersRound } from "lucide-react";

import { useWorkspace, type WorkspaceId } from "@/components/workspace/workspace-context";
import { MetricGrid, StackedNoteCard, WeeklyCalendarView, type MetricItem } from "@/components/workspace/workspace-ui";

type MeetingsContent = {
  summary: MetricItem[];
  rows: {
    title: string;
    time: string;
    duration: string;
    room: string;
    attendees: string;
    project: string;
    note: string;
  }[];
  nextUp: string[];
};

const dayLabels = ["Mon, Apr 6", "Tue, Apr 7", "Wed, Apr 8"];

const contentByWorkspace: Record<WorkspaceId, MeetingsContent> = {
  "collab-workspace": {
    summary: [
      { label: "Meetings today", value: "03", icon: CalendarDays, tone: "blue" },
      { label: "Google Meet linked", value: "09", icon: Link2, tone: "sky" },
      { label: "Hours scheduled", value: "06", icon: Clock3, tone: "green" },
      { label: "Active attendees", value: "21", icon: UsersRound, tone: "teal" },
    ],
    rows: [
      { title: "CEO delivery review", time: "10:30 AM", duration: "45 min", room: "Google Meet", attendees: "CEO, PMs, Coordinators", project: "Portfolio-wide", note: "Portfolio status, QA load, staffing shifts, and release confidence." },
      { title: "Northstar bug triage", time: "12:15 PM", duration: "30 min", room: "Google Meet", attendees: "Lead, QA, Backend", project: "Northstar Client Portal", note: "Review 14 pending defects before tomorrow's stakeholder rehearsal." },
      { title: "Atlas sprint planning", time: "4:00 PM", duration: "60 min", room: "Google Meet", attendees: "PM, Coordinator, Lead", project: "Atlas Commerce Refresh", note: "Story estimates, dependency review, and sprint lock for Sprint 19." },
    ],
    nextUp: [
      "CEO delivery review: portfolio status, QA load, staffing shifts, and release confidence.",
      "Northstar bug triage: review 14 pending defects before tomorrow's stakeholder rehearsal.",
      "Atlas sprint planning: story estimates, dependency review, and sprint lock for Sprint 19.",
    ],
  },
  "delivery-ops": {
    summary: [
      { label: "Meetings today", value: "04", icon: CalendarDays, tone: "sky" },
      { label: "Meet links live", value: "07", icon: Link2, tone: "blue" },
      { label: "Hours booked", value: "07", icon: Clock3, tone: "green" },
      { label: "Attendees active", value: "26", icon: UsersRound, tone: "teal" },
    ],
    rows: [
      { title: "Operations standup", time: "10:00 AM", duration: "30 min", room: "Google Meet", attendees: "PMs, Coordinators, Leads", project: "Cross-portfolio", note: "Delivery blockers, staffing shifts, and QA recovery decisions." },
      { title: "Meridian dependency sync", time: "1:00 PM", duration: "45 min", room: "Google Meet", attendees: "Lead, Backend, QA", project: "Meridian Data Stabilization", note: "Review validation ownership and close unresolved blockers." },
      { title: "Atlas hardening checkpoint", time: "3:30 PM", duration: "30 min", room: "Google Meet", attendees: "PM, QA, Frontend", project: "Atlas Checkout Hardening", note: "Tighten release readiness and confirm test coverage on payments flow." },
    ],
    nextUp: [
      "Operations standup: staffing shifts and carry-over control.",
      "Meridian dependency sync: unblock validation work before end-of-day.",
      "Atlas hardening checkpoint: decide whether Friday release remains on plan.",
    ],
  },
  "executive-reviews": {
    summary: [
      { label: "Meetings today", value: "02", icon: CalendarDays, tone: "blue" },
      { label: "Meet links live", value: "05", icon: Link2, tone: "sky" },
      { label: "Hours booked", value: "03", icon: Clock3, tone: "green" },
      { label: "Stakeholders", value: "12", icon: UsersRound, tone: "teal" },
    ],
    rows: [
      { title: "Leadership review prep", time: "11:00 AM", duration: "45 min", room: "Google Meet", attendees: "CEO, PM, Coordinator", project: "Executive Reviews", note: "Tighten summary material for stakeholder discussions and approvals." },
      { title: "Atlas sign-off call", time: "3:00 PM", duration: "60 min", room: "Google Meet", attendees: "PM, Client stakeholders, QA", project: "Atlas Release Sign-off", note: "Confirm release readiness and approval ownership for the next milestone." },
    ],
    nextUp: [
      "Leadership review prep: finalize summaries and approval sequencing.",
      "Atlas sign-off call: make sure QA evidence and release notes are clean.",
    ],
  },
};

export function MeetingsPage() {
  const { activeWorkspace } = useWorkspace();
  const content = contentByWorkspace[activeWorkspace.id];
  const calendarEvents = content.rows.map((meeting, index) => ({
    id: `${activeWorkspace.id}-meeting-${index}`,
    day: meeting.time === "10:30 AM" || meeting.time === "12:15 PM" || meeting.time === "4:00 PM" || meeting.time === "1:00 PM" || meeting.time === "3:30 PM" || meeting.time === "3:00 PM" || meeting.time === "11:00 AM"
      ? "Mon, Apr 6"
      : "Tue, Apr 7",
    time: meeting.time,
    title: meeting.title,
    meta: `${meeting.project} · ${meeting.room}`,
    detail: meeting.note,
    tone: meeting.project.toLowerCase().includes("atlas")
      ? ("green" as const)
      : meeting.project.toLowerCase().includes("meridian")
        ? ("amber" as const)
        : meeting.project.toLowerCase().includes("executive")
          ? ("teal" as const)
          : ("blue" as const),
  }));

  return (
    <div className="flex flex-col gap-5">
      <MetricGrid items={content.summary} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_380px]">
        <WeeklyCalendarView events={calendarEvents} dayLabels={dayLabels} startHour={9} endHour={19} />

        <aside className="flex flex-col gap-5">
          <StackedNoteCard
            title="Next up"
            description="Meeting notes and action context for the next executive review."
            icon={CalendarDays}
            items={content.nextUp.map((copy) => ({ copy }))}
          />
        </aside>
      </div>
    </div>
  );
}

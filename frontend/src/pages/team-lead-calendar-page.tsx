import { tlCalendarItems } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard } from "@/components/team-lead/tl-ui";
import { WeeklyCalendarView } from "@/components/workspace/workspace-ui";

const dayLabels = ["Tue, Apr 7", "Wed, Apr 8"];

const calendarEvents = tlCalendarItems.map((item, index) => ({
  id: `tl-calendar-${index}`,
  day: item.date === "Apr 7" ? "Tue, Apr 7" : "Wed, Apr 8",
  time: item.time,
  title: item.title,
  meta: `${item.project} · ${item.lane}`,
  detail: item.lane === "Standup" ? "Quick execution alignment and work sequencing." : "Delivery-critical checkpoint with dependencies in focus.",
  tone: item.lane === "QA handoff" ? ("teal" as const) : item.lane === "Blocker review" ? ("amber" as const) : ("blue" as const),
}));

export function TeamLeadCalendarPage() {
  return (
    <TeamLeadSectionCard
      title="Execution calendar"
      description="These are the meetings and handoff windows that structure the team lead's day-to-day operating rhythm."
    >
      <WeeklyCalendarView events={calendarEvents} dayLabels={dayLabels} />
    </TeamLeadSectionCard>
  );
}

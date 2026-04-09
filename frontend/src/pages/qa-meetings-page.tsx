import { qaMeetings } from "@/components/qa/qa-data";
import { QaSectionCard } from "@/components/qa/qa-ui";
import { WeeklyCalendarView } from "@/components/workspace/workspace-ui";

const dayLabels = ["Tue, Apr 7"];

const calendarEvents = qaMeetings.map((meeting, index) => ({
  id: `qa-meeting-${index}`,
  day: "Tue, Apr 7",
  time: meeting.time.split(", ")[1] ?? meeting.time,
  title: meeting.title,
  meta: meeting.project,
  detail: meeting.agenda,
  tone: meeting.project.includes("Atlas") ? ("green" as const) : meeting.project.includes("Meridian") ? ("amber" as const) : ("blue" as const),
}));

export function QaMeetingsPage() {
  return (
    <QaSectionCard
      title="QA meetings"
      description="Only meetings that influence validation flow, retests, or sign-off decisions are shown here."
    >
      <WeeklyCalendarView events={calendarEvents} dayLabels={dayLabels} startHour={9} endHour={19} />
    </QaSectionCard>
  );
}

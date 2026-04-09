import { developerMeetings } from "@/components/developer/dev-data";
import { DeveloperSectionCard } from "@/components/developer/dev-ui";
import { WeeklyCalendarView } from "@/components/workspace/workspace-ui";

const dayLabels = ["Tue, Apr 7"];

const calendarEvents = developerMeetings.map((meeting, index) => ({
  id: `dev-meeting-${index}`,
  day: "Tue, Apr 7",
  time: meeting.time.split(", ")[1] ?? meeting.time,
  title: meeting.title,
  meta: meeting.project,
  detail: meeting.agenda,
  tone: meeting.title.toLowerCase().includes("handoff") ? ("teal" as const) : ("blue" as const),
}));

export function DeveloperMeetingsPage() {
  return (
    <DeveloperSectionCard
      title="My meetings"
      description="The developer only needs meetings that affect active delivery work, not the entire project calendar."
    >
      <WeeklyCalendarView events={calendarEvents} dayLabels={dayLabels} startHour={9} endHour={19} />
    </DeveloperSectionCard>
  );
}

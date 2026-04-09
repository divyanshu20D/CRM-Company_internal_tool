import { useParams } from "react-router-dom";

import { SectionHeading } from "@/components/workspace/workspace-ui";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectManagerMeetingsPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);

  return (
    <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
      <SectionHeading
        title="Project meetings"
        description="Meetings, Google Meet sessions, and working agendas connected to the project."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Meeting</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Attendees</TableHead>
            <TableHead>Agenda</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.meetings.map((meeting) => (
            <TableRow key={meeting.title}>
              <TableCell className="font-medium text-foreground">{meeting.title}</TableCell>
              <TableCell>{meeting.time}</TableCell>
              <TableCell>{meeting.attendees}</TableCell>
              <TableCell>{meeting.agenda}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

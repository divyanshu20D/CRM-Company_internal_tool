import { useParams } from "react-router-dom";

import { getTlProject } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadProjectMeetingsPage() {
  const { projectId } = useParams();
  const project = getTlProject(projectId);

  return (
    <TeamLeadSectionCard
      title="Project meetings"
      description="This is the meeting list for the selected project so the Team Lead can keep developers, PM, and QA aligned on execution."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Meeting</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Attendees</TableHead>
            <TableHead>Agenda</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.meetings.map((meeting) => (
            <TableRow key={`${project.id}-${meeting.title}`}>
              <TableCell className="font-medium text-foreground">{meeting.title}</TableCell>
              <TableCell>
                <TeamLeadStatusBadge value={meeting.type} />
              </TableCell>
              <TableCell>{meeting.time}</TableCell>
              <TableCell>{meeting.attendees}</TableCell>
              <TableCell>{meeting.agenda}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TeamLeadSectionCard>
  );
}

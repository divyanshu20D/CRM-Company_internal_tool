import { Link } from "react-router-dom";

import { tlMeetings } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadMeetingsPage() {
  return (
    <TeamLeadSectionCard
      title="Team-led meetings"
      description="This is the meeting layer the team lead owns directly for standups, blocker syncs, QA handoffs, and internal delivery coordination."
      action={
        <Button asChild size="sm">
          <Link to="/team-lead/meetings/new">Schedule Meeting</Link>
        </Button>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Meeting</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Attendees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tlMeetings.map((meeting) => (
            <TableRow key={`${meeting.project}-${meeting.title}`}>
              <TableCell className="font-medium text-foreground">{meeting.title}</TableCell>
              <TableCell>{meeting.project}</TableCell>
              <TableCell>
                <TeamLeadStatusBadge value={meeting.type} />
              </TableCell>
              <TableCell>{meeting.time}</TableCell>
              <TableCell>{meeting.attendees}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TeamLeadSectionCard>
  );
}

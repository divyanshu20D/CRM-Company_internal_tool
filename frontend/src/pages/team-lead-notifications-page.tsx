import { tlNotifications } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadNotificationsPage() {
  return (
    <TeamLeadSectionCard
      title="Delivery notifications"
      description="Notifications are grouped around the work a team lead actually acts on: blockers, engineering moves, review changes, and QA acceptance."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Notification</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tlNotifications.map((notification) => (
            <TableRow key={`${notification.title}-${notification.time}`}>
              <TableCell className="font-medium text-foreground">{notification.title}</TableCell>
              <TableCell>{notification.type}</TableCell>
              <TableCell>{notification.owner}</TableCell>
              <TableCell>{notification.time}</TableCell>
              <TableCell>
                <TeamLeadStatusBadge value={notification.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TeamLeadSectionCard>
  );
}

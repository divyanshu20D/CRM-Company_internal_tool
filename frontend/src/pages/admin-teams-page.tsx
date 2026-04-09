import { adminTeams } from "@/components/admin/admin-data";
import { AdminSectionCard } from "@/components/admin/admin-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminTeamsPage() {
  return (
    <AdminSectionCard
      title="Team structure"
      description="This view groups employees into the delivery pods and operating teams the platform needs to understand."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team</TableHead>
            <TableHead>Lead</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Current focus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminTeams.map((team) => (
            <TableRow key={team.name}>
              <TableCell className="font-medium text-foreground">{team.name}</TableCell>
              <TableCell>{team.lead}</TableCell>
              <TableCell>{team.members}</TableCell>
              <TableCell>{team.focus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

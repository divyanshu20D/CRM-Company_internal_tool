import { useParams } from "react-router-dom";

import { getTlProject } from "@/components/team-lead/tl-data";
import { TeamLeadSectionCard, TeamLeadStatusBadge } from "@/components/team-lead/tl-ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TeamLeadTeamPage() {
  const { projectId } = useParams();
  const project = getTlProject(projectId);

  return (
    <TeamLeadSectionCard
      title="Team allocation"
      description="The team lead should be able to scan role, stream, and workload quickly before reassigning or pulling in support."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Load</TableHead>
            <TableHead>Current stream</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.team.map((member) => (
            <TableRow key={`${member.name}-${member.role}`}>
              <TableCell className="font-medium text-foreground">{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.load}</TableCell>
              <TableCell>{member.stream}</TableCell>
              <TableCell>
                <TeamLeadStatusBadge value={member.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TeamLeadSectionCard>
  );
}

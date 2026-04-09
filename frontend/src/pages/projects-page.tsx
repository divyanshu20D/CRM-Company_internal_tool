import { FolderKanban, ShieldCheck, UsersRound } from "lucide-react";

import { useWorkspace, type WorkspaceId } from "@/components/workspace/workspace-context";
import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ProjectsContent = {
  rows: {
    name: string;
    coordinator: string;
    lead: string;
    qa: string;
    sprint: string;
    stage: string;
  }[];
  structureNotes: {
    title: string;
    copy: string;
    icon: typeof ShieldCheck;
  }[];
};

const contentByWorkspace: Record<WorkspaceId, ProjectsContent> = {
  "collab-workspace": {
    rows: [
      { name: "Northstar Client Portal", coordinator: "Devika S.", lead: "Kabir A.", qa: "Ritika J.", sprint: "Sprint 11", stage: "QA pressure" },
      { name: "Atlas Commerce Refresh", coordinator: "Riya P.", lead: "Arjun M.", qa: "Vaibhav D.", sprint: "Sprint 18", stage: "Final polish" },
      { name: "Meridian CRM Rollout", coordinator: "Aman T.", lead: "Nivedita R.", qa: "Puneet G.", sprint: "Sprint 24", stage: "Approvals pending" },
      { name: "Helix Support Console", coordinator: "Pooja K.", lead: "Samar V.", qa: "Niharika B.", sprint: "Sprint 07", stage: "Release ready" },
    ],
    structureNotes: [
      { title: "Leadership scope", copy: "CEO oversees all projects and governance decisions.", icon: ShieldCheck },
      { title: "Delivery management", copy: "Project managers coordinate project coordinators, timelines, and major approvals.", icon: UsersRound },
      { title: "Execution layer", copy: "Team leads, developers, and QA operate inside project-assigned scopes.", icon: FolderKanban },
    ],
  },
  "delivery-ops": {
    rows: [
      { name: "Meridian Data Stabilization", coordinator: "Aman T.", lead: "Nivedita R.", qa: "Puneet G.", sprint: "Sprint 24", stage: "Approvals pending" },
      { name: "Atlas Checkout Hardening", coordinator: "Riya P.", lead: "Arjun M.", qa: "Vaibhav D.", sprint: "Sprint 19", stage: "QA pressure" },
      { name: "Northstar QA Recovery", coordinator: "Devika S.", lead: "Kabir A.", qa: "Ritika J.", sprint: "Sprint 12", stage: "QA pressure" },
    ],
    structureNotes: [
      { title: "Operations command", copy: "PMs and coordinators run frequent interventions to keep work flowing.", icon: ShieldCheck },
      { title: "Lead ownership", copy: "Team leads coordinate daily blocker removal and execution tradeoffs.", icon: UsersRound },
      { title: "Recovery squads", copy: "Developers and QA operate in tighter, faster coordination loops.", icon: FolderKanban },
    ],
  },
  "executive-reviews": {
    rows: [
      { name: "Northstar Stakeholder Review", coordinator: "Devika S.", lead: "Kabir A.", qa: "Ritika J.", sprint: "Review 02", stage: "Final polish" },
      { name: "Atlas Release Sign-off", coordinator: "Riya P.", lead: "Arjun M.", qa: "Vaibhav D.", sprint: "Review 01", stage: "Approvals pending" },
      { name: "Helix Governance Cleanup", coordinator: "Pooja K.", lead: "Samar V.", qa: "Niharika B.", sprint: "Review 03", stage: "QA pressure" },
    ],
    structureNotes: [
      { title: "Executive visibility", copy: "Leadership sees the projects that are approaching review or sign-off decisions.", icon: ShieldCheck },
      { title: "Coordinator ownership", copy: "Coordinators prepare meetings, packs, summaries, and follow-up material.", icon: UsersRound },
      { title: "Closure workflow", copy: "Leads and QA focus on proof, cleanup, and release-readiness evidence.", icon: FolderKanban },
    ],
  },
};

function getStageClasses(stage: string) {
  if (stage === "Release ready") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (stage === "QA pressure") return "border-sky-200 bg-sky-50 text-sky-700";
  if (stage === "Final polish") return "border-blue-200 bg-blue-50 text-blue-700";
  return "border-teal-200 bg-teal-50 text-teal-700";
}

export function ProjectsPage() {
  const { activeWorkspace } = useWorkspace();
  const content = contentByWorkspace[activeWorkspace.id];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_340px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Project directory"
          description="Working view of the projects currently active under the executive workspace."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[28%]">Project</TableHead>
              <TableHead>Coordinator</TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>QA</TableHead>
              <TableHead>Sprint</TableHead>
              <TableHead>Stage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.rows.map((project) => (
              <TableRow key={project.name}>
                <TableCell className="font-medium text-foreground">{project.name}</TableCell>
                <TableCell>{project.coordinator}</TableCell>
                <TableCell>{project.lead}</TableCell>
                <TableCell>{project.qa}</TableCell>
                <TableCell>{project.sprint}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStageClasses(project.stage)}>
                    {project.stage}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <aside className="flex flex-col gap-4">
        <StackedNoteCard
          title="Operating structure"
          description="Current project tree reflected in the product design."
          items={content.structureNotes.map((item) => ({
            title: item.title,
            copy: item.copy,
            icon: item.icon,
          }))}
        />
      </aside>
    </div>
  );
}

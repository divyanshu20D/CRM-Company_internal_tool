import { KeyRound, ShieldCheck, Telescope } from "lucide-react";

import { useWorkspace, type WorkspaceId } from "@/components/workspace/workspace-context";
import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type GovernanceContent = {
  rows: {
    title: string;
    owner: string;
    detail: string;
    state: string;
  }[];
  posture: {
    title: string;
    copy: string;
    icon: typeof ShieldCheck;
  }[];
};

const contentByWorkspace: Record<WorkspaceId, GovernanceContent> = {
  "collab-workspace": {
    rows: [
      { title: "Roles & permissions", owner: "Security admin", detail: "Define CEO, PM, coordinator, lead, developer, and QA access boundaries.", state: "Active" },
      { title: "Audit controls", owner: "Platform admin", detail: "Track role changes, meeting creation, exports, and attachment access.", state: "Monitoring" },
      { title: "Tenant isolation", owner: "Backend team", detail: "Keep client organizations fully separated across projects and files.", state: "Locked" },
      { title: "Meeting access rules", owner: "Ops admin", detail: "Limit visibility for sensitive executive and client review calls.", state: "Review" },
    ],
    posture: [
      { title: "Authentication boundary", copy: "WorkOS handles authentication, while authorization stays inside the app.", icon: KeyRound },
      { title: "Tenant isolation", copy: "Every tenant remains fully isolated with role-based access boundaries.", icon: ShieldCheck },
      { title: "Audit visibility", copy: "Meeting actions, file access, role changes, and exports should be audit logged.", icon: Telescope },
    ],
  },
  "delivery-ops": {
    rows: [
      { title: "Escalation rights", owner: "Operations admin", detail: "Limit who can escalate staffing or sprint-risk issues to executive level.", state: "Active" },
      { title: "Delivery exports", owner: "Ops admin", detail: "Audit who exports sprint summaries, staffing lists, and exception reports.", state: "Monitoring" },
      { title: "Client isolation", owner: "Backend team", detail: "Prevent operations users from crossing tenant boundaries during recovery work.", state: "Locked" },
    ],
    posture: [
      { title: "Operational permissions", copy: "Only assigned managers should change recovery plans, staffing, or sprint schedules.", icon: KeyRound },
      { title: "Audit coverage", copy: "Every escalation and staffing action should be traceable in audit history.", icon: Telescope },
      { title: "Workspace boundaries", copy: "Operations views still respect the same tenant and project isolation rules.", icon: ShieldCheck },
    ],
  },
  "executive-reviews": {
    rows: [
      { title: "Review permissions", owner: "Security admin", detail: "Only selected leadership and project owners should see sign-off meetings and notes.", state: "Active" },
      { title: "Evidence access", owner: "Governance admin", detail: "Track access to QA evidence, release packs, and stakeholder notes.", state: "Monitoring" },
      { title: "Tenant boundaries", owner: "Backend team", detail: "Review packs and client approvals must never cross organization lines.", state: "Locked" },
    ],
    posture: [
      { title: "Approval security", copy: "Leadership actions around approvals and sign-off should be fully audit logged.", icon: KeyRound },
      { title: "Sensitive visibility", copy: "Stakeholder meetings and notes may need tighter access than general project data.", icon: Telescope },
      { title: "Tenant trust", copy: "Client review material must stay isolated even during executive cross-project analysis.", icon: ShieldCheck },
    ],
  },
};

function getStateClasses(state: string) {
  if (state === "Locked") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (state === "Monitoring") return "border-blue-200 bg-blue-50 text-blue-700";
  if (state === "Active") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-teal-200 bg-teal-50 text-teal-700";
}

export function GovernancePage() {
  const { activeWorkspace } = useWorkspace();
  const content = contentByWorkspace[activeWorkspace.id];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Governance controls"
          description="Security, access, audit, and tenant-control surfaces that protect sensitive client work."
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[24%]">Control</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.rows.map((item) => (
              <TableRow key={item.title}>
                <TableCell className="font-medium text-foreground">{item.title}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.detail}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStateClasses(item.state)}>
                    {item.state}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <aside className="flex flex-col gap-4">
        <StackedNoteCard
          title="Security posture"
          description="Controls already expected in the product direction you outlined."
          items={content.posture.map((item) => ({
            title: item.title,
            copy: item.copy,
            icon: item.icon,
          }))}
        />
      </aside>
    </div>
  );
}

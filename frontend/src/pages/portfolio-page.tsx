import { Activity, AlertTriangle, BriefcaseBusiness, Eye, FolderGit2, UsersRound } from "lucide-react";

import { useWorkspace, type WorkspaceId } from "@/components/workspace/workspace-context";
import { MetricGrid, SectionHeading, StackedNoteCard, type MetricItem } from "@/components/workspace/workspace-ui";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type PortfolioContent = {
  summary: MetricItem[];
  rows: {
    name: string;
    projects: string;
    risk: string;
    qa: string;
    note: string;
  }[];
  watchlist: string[];
};

const contentByWorkspace: Record<WorkspaceId, PortfolioContent> = {
  "collab-workspace": {
    summary: [
      { label: "Portfolios", value: "03", icon: BriefcaseBusiness, tone: "blue" },
      { label: "Active projects", value: "12", icon: FolderGit2, tone: "sky" },
      { label: "At-risk streams", value: "03", icon: Activity, tone: "teal" },
      { label: "Client reviews", value: "04", icon: UsersRound, tone: "green" },
    ],
    rows: [
      { name: "Healthcare", projects: "4", risk: "2", qa: "High", note: "Northstar and Meridian require executive attention." },
      { name: "Retail", projects: "3", risk: "0", qa: "Stable", note: "Atlas is moving on schedule with healthy QA throughput." },
      { name: "SaaS", projects: "5", risk: "1", qa: "Medium", note: "Helix release is healthy, but access review remains open." },
    ],
    watchlist: [
      "Healthcare needs QA balancing before the Northstar demo cycle.",
      "SaaS portfolio requires attachment-access review before Helix release.",
      "Retail is stable and can operate without executive intervention this week.",
    ],
  },
  "delivery-ops": {
    summary: [
      { label: "Streams tracked", value: "03", icon: BriefcaseBusiness, tone: "blue" },
      { label: "Projects active", value: "08", icon: FolderGit2, tone: "sky" },
      { label: "Pressure zones", value: "02", icon: Activity, tone: "amber" },
      { label: "Teams in review", value: "06", icon: UsersRound, tone: "green" },
    ],
    rows: [
      { name: "Recovery", projects: "3", risk: "2", qa: "High", note: "Northstar and Meridian are operating in recovery mode." },
      { name: "Hardening", projects: "2", risk: "1", qa: "Medium", note: "Atlas hardening is stable but still sensitive to QA delays." },
      { name: "Steady delivery", projects: "3", risk: "0", qa: "Stable", note: "Lower-touch projects continue without leadership intervention." },
    ],
    watchlist: [
      "Recovery stream needs additional QA bandwidth for two cycles.",
      "Hardening work should remain tightly scoped to avoid new blockers.",
      "Steady delivery projects can be monitored through notifications only.",
    ],
  },
  "executive-reviews": {
    summary: [
      { label: "Review groups", value: "03", icon: BriefcaseBusiness, tone: "blue" },
      { label: "Items in review", value: "07", icon: FolderGit2, tone: "sky" },
      { label: "Governance holds", value: "02", icon: Activity, tone: "amber" },
      { label: "Stakeholder calls", value: "04", icon: UsersRound, tone: "green" },
    ],
    rows: [
      { name: "Client sign-off", projects: "3", risk: "1", qa: "Medium", note: "Atlas needs the closest attention this week." },
      { name: "Governance closeout", projects: "2", risk: "2", qa: "Stable", note: "Helix has the highest governance pressure." },
      { name: "Executive summaries", projects: "2", risk: "0", qa: "Stable", note: "Northstar review material is nearly ready for leadership circulation." },
    ],
    watchlist: [
      "Client sign-off items should stay tightly tracked until approvals close.",
      "Governance closeout work needs final rule confirmation and audit visibility.",
      "Executive summaries can move once review decks are polished.",
    ],
  },
};

function getQaClasses(qa: string) {
  if (qa === "Stable") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (qa === "High") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-blue-200 bg-blue-50 text-blue-700";
}

export function PortfolioPage() {
  const { activeWorkspace } = useWorkspace();
  const content = contentByWorkspace[activeWorkspace.id];

  return (
    <div className="flex flex-col gap-5">
      <MetricGrid items={content.summary} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_360px]">
        <section className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <div className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20 p-5">
            <SectionHeading
              title="Portfolio map"
              description="Executive grouping of client work by business vertical, delivery pressure, and QA demand."
            />
          </div>

          <div className="p-1">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Portfolio</TableHead>
                  <TableHead className="font-semibold">Projects</TableHead>
                  <TableHead className="font-semibold">Risk items</TableHead>
                  <TableHead className="font-semibold">QA demand</TableHead>
                  <TableHead className="font-semibold">Operating note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.rows.map((group) => (
                  <TableRow key={group.name} className="group transition-colors duration-150">
                    <TableCell className="font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="size-3.5 text-blue-500" />
                        {group.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium tabular-nums">{group.projects}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center gap-1 font-medium tabular-nums",
                        Number(group.risk) > 0 ? "text-amber-600" : "text-muted-foreground"
                      )}>
                        {Number(group.risk) > 0 && <AlertTriangle className="size-3" />}
                        {group.risk}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("shadow-sm", getQaClasses(group.qa))}>
                        {group.qa}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{group.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <aside className="flex flex-col gap-5">
          <StackedNoteCard
            title="Priority watchlist"
            description="Portfolios that need more leadership attention this week."
            icon={Eye}
            items={content.watchlist.map((copy) => ({ copy }))}
          />
        </aside>
      </div>
    </div>
  );
}

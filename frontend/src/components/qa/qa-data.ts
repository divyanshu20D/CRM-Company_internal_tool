export type QaQueueItem = {
  id: string;
  title: string;
  projectId: string;
  project: string;
  type: string;
  status: string;
  priority: string;
  owner: string;
  due: string;
  build: string;
  summary: string;
  checks: string[];
  blockers: string[];
  evidence: string[];
};

export type QaProject = {
  id: string;
  name: string;
  client: string;
  sprint: string;
  signoff: string;
  bugSheet: string;
  enhancementSheet: string;
};

export const qaProjects: QaProject[] = [
  {
    id: "northstar-client-portal",
    name: "Northstar Client Portal",
    client: "Northstar Health",
    sprint: "Sprint 12",
    signoff: "At risk",
    bugSheet: "https://docs.google.com/spreadsheets/d/northstar-bugs",
    enhancementSheet: "https://docs.google.com/spreadsheets/d/northstar-enhancements",
  },
  {
    id: "atlas-commerce-refresh",
    name: "Atlas Commerce Refresh",
    client: "Atlas Retail",
    sprint: "Sprint 19",
    signoff: "Near ready",
    bugSheet: "https://docs.google.com/spreadsheets/d/atlas-defects",
    enhancementSheet: "https://docs.google.com/spreadsheets/d/atlas-enhancements",
  },
  {
    id: "meridian-crm-rollout",
    name: "Meridian CRM Rollout",
    client: "Meridian Advisory",
    sprint: "Sprint 24",
    signoff: "Blocked",
    bugSheet: "https://docs.google.com/spreadsheets/d/meridian-defects",
    enhancementSheet: "https://docs.google.com/spreadsheets/d/meridian-enhancements",
  },
];

export const qaQueueItems: QaQueueItem[] = [
  {
    id: "NS-QA-219",
    title: "Billing filter retest after query optimization",
    projectId: "northstar-client-portal",
    project: "Northstar Client Portal",
    type: "Retest",
    status: "In progress",
    priority: "High",
    owner: "Ritika J.",
    due: "Today, 6:00 PM",
    build: "staging-northstar-241",
    summary: "Retest recent optimization to confirm counts, exports, and query speed all stay aligned.",
    checks: [
      "Filter counts match pre-optimization baseline.",
      "CSV export totals match the visible counts.",
      "Heavy filter combinations stay within the target response time.",
    ],
    blockers: [
      "Need fresh staging dataset before final count comparison.",
    ],
    evidence: [
      "Updated regression checklist",
      "CSV comparison sheet",
    ],
  },
  {
    id: "AT-QA-094",
    title: "Promo-code journey verification",
    projectId: "atlas-commerce-refresh",
    project: "Atlas Commerce Refresh",
    type: "Regression",
    status: "Ready for sign-off",
    priority: "Medium",
    owner: "Vaibhav D.",
    due: "Today, 4:30 PM",
    build: "atlas-rc-19.3",
    summary: "Verify add, remove, and refresh scenarios across supported devices before release candidate approval.",
    checks: [
      "Promo add/remove updates totals immediately.",
      "Refreshing the page does not leave stale state.",
      "Desktop and mobile flows remain consistent.",
    ],
    blockers: [],
    evidence: [
      "Cross-device screenshot pack",
      "Checkout QA results sheet",
    ],
  },
  {
    id: "MR-QA-301",
    title: "Import retry handling validation",
    projectId: "meridian-crm-rollout",
    project: "Meridian CRM Rollout",
    type: "Bug validation",
    status: "Blocked",
    priority: "High",
    owner: "Puneet G.",
    due: "Tomorrow, 12:00 PM",
    build: "meridian-staging-88",
    summary: "Validate that retry flow does not leave partial rows and that migration reruns stay idempotent.",
    checks: [
      "Retry path leaves no partial records behind.",
      "Validation failures surface clear error messaging.",
      "Re-running the import does not duplicate valid rows.",
    ],
    blockers: [
      "Backend validation rules are still changing.",
      "Migration dataset needs one clean rebuild before rerun testing.",
    ],
    evidence: [
      "Migration validation issue log",
      "Partial-row repro video",
    ],
  },
];

export function getQaItem(itemId?: string) {
  return qaQueueItems.find((item) => item.id === itemId) ?? qaQueueItems[0];
}

export const qaDashboardData = {
  metrics: [
    { label: "Active QA items", value: "03", tone: "blue" as const },
    { label: "Retests today", value: "02", tone: "sky" as const },
    { label: "Sign-off checks", value: "02", tone: "teal" as const },
    { label: "Blocked validations", value: "01", tone: "amber" as const },
  ],
  priorities: [
    "Close the Northstar billing retest before the QA review call.",
    "Prepare Atlas release candidate evidence so sign-off can close today.",
    "Push the Meridian retry blocker back to engineering if the validation rules shift again.",
  ],
  updates: [
    "Northstar staging still needs the refreshed dataset for final count checks.",
    "Atlas release candidate is nearly clean; only final evidence packaging remains.",
    "Meridian import validation is still blocked on backend rule confirmation.",
  ],
};

export const qaRetests = qaQueueItems.filter((item) => item.type === "Retest" || item.type === "Regression");

export const qaSignoffRows = [
  {
    project: "Northstar Client Portal",
    status: "At risk",
    owner: "Ritika J.",
    nextStep: "Finish billing and export retests before review freeze.",
  },
  {
    project: "Atlas Commerce Refresh",
    status: "Near ready",
    owner: "Vaibhav D.",
    nextStep: "Upload final evidence bundle and close the sign-off checklist.",
  },
  {
    project: "Meridian CRM Rollout",
    status: "Blocked",
    owner: "Puneet G.",
    nextStep: "Wait for validation-rule lock, then rerun migration pack.",
  },
];

export const qaMeetings = [
  {
    title: "Northstar QA review",
    time: "Today, 4:30 PM",
    project: "Northstar Client Portal",
    agenda: "Confirm regression blockers and review-freeze readiness.",
  },
  {
    title: "Atlas sign-off prep",
    time: "Today, 3:00 PM",
    project: "Atlas Commerce Refresh",
    agenda: "Decide if the release candidate is ready for client sign-off.",
  },
  {
    title: "Meridian dependency sync",
    time: "Today, 1:00 PM",
    project: "Meridian CRM Rollout",
    agenda: "Resolve backend validation ownership before rerun testing.",
  },
];

export const qaDiscussions = [
  {
    title: "Northstar export totals still need one clean baseline run",
    project: "Northstar Client Portal",
    updated: "21 min ago",
    summary: "The retest looks stable, but final count comparisons are waiting on the refreshed staging data.",
  },
  {
    title: "Atlas promo-code flow looks clean after last refresh pass",
    project: "Atlas Commerce Refresh",
    updated: "47 min ago",
    summary: "Only evidence packaging and sign-off notes are still open.",
  },
  {
    title: "Meridian retry validation is not stable enough to close",
    project: "Meridian CRM Rollout",
    updated: "14 min ago",
    summary: "QA needs backend rule lock before another serious rerun attempt.",
  },
];

export const qaFiles = [
  {
    name: "northstar-regression-checklist.xlsx",
    project: "Northstar Client Portal",
    type: "Sheet",
    owner: "Ritika J.",
    updated: "Today, 12:10 PM",
  },
  {
    name: "atlas-rc-signoff-evidence.zip",
    project: "Atlas Commerce Refresh",
    type: "Archive",
    owner: "Vaibhav D.",
    updated: "Today, 1:25 PM",
  },
  {
    name: "meridian-partial-row-repro.mov",
    project: "Meridian CRM Rollout",
    type: "Video",
    owner: "Puneet G.",
    updated: "Today, 11:05 AM",
  },
];

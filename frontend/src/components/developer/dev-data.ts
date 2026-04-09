export type DeveloperTask = {
  id: string;
  title: string;
  projectId: string;
  project: string;
  client: string;
  status: string;
  priority: string;
  type: string;
  due: string;
  estimate: string;
  branch: string;
  summary: string;
  acceptance: string[];
  dependencies: string[];
  notes: string[];
};

export type DeveloperProject = {
  id: string;
  name: string;
  client: string;
  sprint: string;
  role: string;
  releaseWindow: string;
};

export const developerProjects: DeveloperProject[] = [
  {
    id: "northstar-client-portal",
    name: "Northstar Client Portal",
    client: "Northstar Health",
    sprint: "Sprint 12",
    role: "Core developer",
    releaseWindow: "Apr 11 review freeze",
  },
  {
    id: "helix-patient-ops-console",
    name: "Helix Patient Ops Console",
    client: "Helix Care",
    sprint: "Sprint 8",
    role: "Feature developer",
    releaseWindow: "Apr 15 internal pilot",
  },
];

export const developerTasks: DeveloperTask[] = [
  {
    id: "NS-TL-14",
    title: "Fix clinician note sync after token rotation",
    projectId: "northstar-client-portal",
    project: "Northstar Client Portal",
    client: "Northstar Health",
    status: "In progress",
    priority: "High",
    type: "Bug",
    due: "Today, 5:00 PM",
    estimate: "5 pts",
    branch: "fix/ns-tl-14-token-sync",
    summary: "Note save requests stall after token rotation and leave the UI in a partial syncing state.",
    acceptance: [
      "Sync resumes after refresh without duplicate notes.",
      "The loading state clears correctly on retry.",
      "QA can validate the fix on staging with the rotated token flow.",
    ],
    dependencies: [
      "Need final fallback confirmation from Kabir before merging the safe path.",
      "Ritika needs the updated staging build before evening regression begins.",
    ],
    notes: [
      "Repro is most visible when token refresh happens within 20 seconds of opening note edit.",
      "Telemetry patch from Vaishali should be reviewed together with this change.",
    ],
  },
  {
    id: "NS-TL-23",
    title: "Package session-timeout telemetry patch for QA",
    projectId: "northstar-client-portal",
    project: "Northstar Client Portal",
    client: "Northstar Health",
    status: "Review",
    priority: "Medium",
    type: "Task",
    due: "Tomorrow, 11:00 AM",
    estimate: "2 pts",
    branch: "chore/ns-tl-23-session-telemetry",
    summary: "Add event traces so QA can confirm timeout behavior without needing engineering logs.",
    acceptance: [
      "Event trace appears on timeout and silent refresh failure.",
      "QA note template includes the event names to check.",
      "Review note explains how to verify the telemetry in staging.",
    ],
    dependencies: [
      "Need final event names from Kabir before QA handoff is complete.",
    ],
    notes: [
      "UI change is small; most value is in the added trace events and documentation.",
    ],
  },
  {
    id: "HX-TL-09",
    title: "Admission queue pagination",
    projectId: "helix-patient-ops-console",
    project: "Helix Patient Ops Console",
    client: "Helix Care",
    status: "In progress",
    priority: "High",
    type: "Story",
    due: "Tomorrow, 1:00 PM",
    estimate: "5 pts",
    branch: "feat/hx-tl-09-admission-pagination",
    summary: "Add paging and safe empty states so operators can navigate large admission lists without stale counts.",
    acceptance: [
      "Paging works across result sizes and filters.",
      "Counts stay accurate after filter change and refresh.",
      "Empty state message does not break the operator workflow.",
    ],
    dependencies: [
      "Need staging seed refresh so QA can validate against realistic list sizes.",
    ],
    notes: [
      "API returns stale totals in staging right now, so UI validation is partially blocked.",
    ],
  },
  {
    id: "HX-TL-13",
    title: "Admission export download state",
    projectId: "helix-patient-ops-console",
    project: "Helix Patient Ops Console",
    client: "Helix Care",
    status: "QA ready",
    priority: "Medium",
    type: "Task",
    due: "Today, 4:00 PM",
    estimate: "3 pts",
    branch: "feat/hx-tl-13-export-state",
    summary: "Show export progress, success, and failure states clearly so operators know whether a file is still generating.",
    acceptance: [
      "Progress state shows while the export is building.",
      "Completion and failure states both clear correctly.",
      "QA has a screen recording and sample file to verify behavior.",
    ],
    dependencies: [
      "Mitali needs the exported file and recording bundle in the handoff note.",
    ],
    notes: [
      "This one is functionally done; only the QA evidence package remains.",
    ],
  },
];

export function getDeveloperTask(taskId?: string) {
  return developerTasks.find((task) => task.id === taskId) ?? developerTasks[0];
}

export const developerDashboardData = {
  metrics: [
    { label: "Assigned tasks", value: "04", tone: "blue" as const },
    { label: "In progress", value: "02", tone: "sky" as const },
    { label: "QA ready", value: "01", tone: "teal" as const },
    { label: "Blockers", value: "02", tone: "amber" as const },
  ],
  priorities: [
    "Close the Northstar token-sync fix before today's build cutoff.",
    "Attach QA evidence for the Helix export state before the 5:00 PM handoff window.",
    "Keep pagination work moving, but do not waste time on staging-only API totals until seed refresh lands.",
  ],
  updates: [
    "Kabir still owes the final fallback decision for the token-sync fix.",
    "Mitali accepted the export-state handoff once the recording is uploaded.",
    "Helix staging data refresh is still pending, which affects pagination validation.",
  ],
};

export const developerSprintItems = [
  {
    lane: "Building",
    count: "02",
    items: [
      "Fix clinician note sync after token rotation",
      "Admission queue pagination",
    ],
  },
  {
    lane: "Review",
    count: "01",
    items: ["Package session-timeout telemetry patch for QA"],
  },
  {
    lane: "QA ready",
    count: "01",
    items: ["Admission export download state"],
  },
];

export const developerBlockers = [
  {
    title: "Northstar fallback approach is still not locked",
    project: "Northstar Client Portal",
    owner: "Kabir A.",
    impact: "Cannot safely finalize the token-sync fix branch.",
    nextStep: "Confirm hotfix-safe fallback in the 2:00 PM sync.",
  },
  {
    title: "Helix staging data refresh is pending",
    project: "Helix Patient Ops Console",
    owner: "Aditya N.",
    impact: "Pagination validation is partially blocked on stale list totals.",
    nextStep: "Wait for seed refresh, then rerun the filter and paging checks.",
  },
];

export const developerMeetings = [
  {
    title: "Northstar engineering sync",
    time: "Today, 2:00 PM",
    project: "Northstar Client Portal",
    agenda: "Finalize fallback path and decide whether the sync fix can merge today.",
  },
  {
    title: "Helix QA handoff window",
    time: "Today, 5:00 PM",
    project: "Helix Patient Ops Console",
    agenda: "Deliver export-state evidence package and align on pagination blockers.",
  },
];

export const developerDiscussions = [
  {
    title: "Auth fallback path for NS-TL-14",
    project: "Northstar Client Portal",
    updated: "17 min ago",
    summary: "Need a final call on the safest fallback behavior so the token-sync fix can be closed confidently.",
  },
  {
    title: "Staging list totals for HX-TL-09",
    project: "Helix Patient Ops Console",
    updated: "42 min ago",
    summary: "Pagination is moving, but validation remains noisy until the staging dataset is refreshed.",
  },
];

export const developerFiles = [
  {
    name: "northstar-token-sync-repro.mov",
    project: "Northstar Client Portal",
    type: "Video",
    owner: "Rohan P.",
    updated: "Today, 11:10 AM",
  },
  {
    name: "helix-export-state-evidence.zip",
    project: "Helix Patient Ops Console",
    type: "Archive",
    owner: "Rohan P.",
    updated: "Today, 12:40 PM",
  },
  {
    name: "northstar-session-telemetry-notes.md",
    project: "Northstar Client Portal",
    type: "Note",
    owner: "Rohan P.",
    updated: "Today, 9:30 AM",
  },
];

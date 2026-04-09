export type PmProject = {
  id: string
  name: string
  client: string
  coordinator: string
  techLead: string
  teamLead: string
  qaLead: string
  sprint: string
  status: string
  progress: string
  nextMeeting: string
  developers: string[]
  board: {
    backlog: string[]
    inProgress: string[]
    review: string[]
    done: string[]
  }
  backlog: {
    title: string
    estimate: string
    owner: string
    priority: string
  }[]
  sprints: {
    name: string
    dates: string
    goal: string
    status: string
    velocity: string
  }[]
  issues: {
    id: string
    title: string
    type: string
    status: string
    priority: string
    assignee: string
    updated: string
    description: string
    acceptance: string[]
  }[]
  team: {
    name: string
    role: string
    allocation: string
    currentFocus: string
  }[]
  qa: {
    suite: string
    owner: string
    status: string
    blockers: string
  }[]
  qaTrackers: {
    title: string
    type: string
    owner: string
    url: string
    description: string
  }[]
  risks: {
    title: string
    severity: string
    owner: string
    mitigation: string
    dueDate: string
  }[]
  dependencies: {
    title: string
    type: string
    owner: string
    status: string
    note: string
  }[]
  actionItems: {
    title: string
    owner: string
    dueDate: string
    source: string
    status: string
  }[]
  meetings: {
    title: string
    time: string
    attendees: string
    agenda: string
  }[]
  discussions: {
    title: string
    owner: string
    updated: string
    summary: string
  }[]
  files: {
    name: string
    type: string
    owner: string
    updated: string
  }[]
  timeline: {
    milestone: string
    owner: string
    dueDate: string
    status: string
  }[]
  reports: {
    title: string
    period: string
    signal: string
    note: string
  }[]
}

export const pmProjects: PmProject[] = [
  {
    id: "northstar-client-portal",
    name: "Propti",
    client: "Markus",
    coordinator: "Kalash Pachauri",
    techLead: "Divyanshu Srivastava",
    teamLead: "Divyanshu Srivastava",
    qaLead: "Pranav Thakur",
    sprint: "Sprint 12",
    status: "QA pressure",
    progress: "98%",
    nextMeeting: "Today, 4:30 PM",
    developers: [
      "Tushar Kumar",
      "Mayank Singh",
      "Abhinav Yadav",
      "Abhay Prakash",
    ],
    board: {
      backlog: [
        "Refine provider onboarding edge cases",
        "Finalize dashboard export permissions",
      ],
      inProgress: [
        "Fix clinician note sync latency",
        "Stabilize access-token refresh flow",
      ],
      review: [
        "QA retest for billing screen filters",
        "Validate provider setup forms",
      ],
      done: ["Audit log pagination cleanup", "New review note widgets"],
    },
    backlog: [
      {
        title: "Provider onboarding edge cases",
        estimate: "5 pts",
        owner: "Kabir A.",
        priority: "High",
      },
      {
        title: "Dashboard export permissions",
        estimate: "3 pts",
        owner: "Aashish K.",
        priority: "Medium",
      },
      {
        title: "Review escalation templates",
        estimate: "2 pts",
        owner: "Devika S.",
        priority: "Medium",
      },
    ],
    sprints: [
      {
        name: "Sprint 12",
        dates: "Apr 1 - Apr 12",
        goal: "QA stabilization and access cleanup",
        status: "Active",
        velocity: "31 pts",
      },
      {
        name: "Sprint 11",
        dates: "Mar 18 - Mar 30",
        goal: "Provider dashboard readiness",
        status: "Closed",
        velocity: "28 pts",
      },
    ],
    issues: [
      {
        id: "NS-214",
        title: "Clinician note sync stalls after token refresh",
        type: "Bug",
        status: "In progress",
        priority: "High",
        assignee: "Rohan P.",
        updated: "18 min ago",
        description:
          "Sync requests fail intermittently when the refresh token is rotated during note save.",
        acceptance: [
          "Sync succeeds after refresh",
          "No duplicate notes created",
          "QA reproduces fix on staging",
        ],
      },
      {
        id: "NS-219",
        title: "Billing filter retest after query optimization",
        type: "Task",
        status: "Review",
        priority: "Medium",
        assignee: "Ritika J.",
        updated: "42 min ago",
        description:
          "Validate that recent optimization does not change filter counts or exported totals.",
        acceptance: [
          "Filter counts match baseline",
          "Exports match UI values",
          "Performance under 2 seconds",
        ],
      },
      {
        id: "NS-227",
        title: "Provider setup form validation copy",
        type: "Story",
        status: "Backlog",
        priority: "Low",
        assignee: "Devika S.",
        updated: "2 hr ago",
        description:
          "Improve validation messaging for incomplete provider setup to reduce support load.",
        acceptance: [
          "Validation copy approved",
          "Error states match design",
          "Coordinator sign-off completed",
        ],
      },
    ],
    team: [
      {
        name: "Kabir A.",
        role: "Tech Lead",
        allocation: "90%",
        currentFocus: "Auth flow and release-risk review",
      },
      {
        name: "Aashish K.",
        role: "Team Lead",
        allocation: "85%",
        currentFocus: "Daily delivery coordination and backlog quality",
      },
      {
        name: "Rohan P.",
        role: "Developer",
        allocation: "100%",
        currentFocus: "Sync reliability fix",
      },
      {
        name: "Megha D.",
        role: "Developer",
        allocation: "80%",
        currentFocus: "Provider dashboard polish",
      },
      {
        name: "Ritika J.",
        role: "QA",
        allocation: "95%",
        currentFocus: "Regression and retest queue",
      },
    ],
    qa: [
      {
        suite: "Regression pack",
        owner: "Pranav Thakur",
        status: "At risk",
        blockers: "2 env issues",
      },
      {
        suite: "Access control retest",
        owner: "Pranav Thakur",
        status: "In progress",
        blockers: "Awaiting fix",
      },
      {
        suite: "Export validation",
        owner: "Abhay Prakash",
        status: "Ready",
        blockers: "0",
      },
    ],
    qaTrackers: [
      {
        title: "Northstar bug tracker",
        type: "Bug sheet",
        owner: "Pranav Thakur",
        url: "https://docs.google.com/spreadsheets/d/northstar-bugs",
        description:
          "QA team maintains all active bugs, severity, repro notes, and retest outcomes here.",
      },
      {
        title: "Northstar enhancements",
        type: "Enhancement sheet",
        owner: "Abhay Prakash",
        url: "https://docs.google.com/spreadsheets/d/northstar-enhancements",
        description:
          "Product and QA suggestions that are not part of the immediate sprint stay in this tracker.",
      },
    ],
    risks: [
      {
        title: "Regression queue may delay stakeholder review",
        severity: "High",
        owner: "Pranav Thakur",
        mitigation:
          "Prioritize auth and export regression coverage before review freeze.",
        dueDate: "Apr 9",
      },
      {
        title: "Access-control fix could spill into next sprint",
        severity: "Medium",
        owner: "Divyanshu Srivastava",
        mitigation:
          "Keep non-critical permission cleanup out of the current sprint scope.",
        dueDate: "Apr 10",
      },
    ],
    dependencies: [
      {
        title: "Client review environment access",
        type: "Client",
        owner: "Devika S.",
        status: "Waiting",
        note: "Need environment credentials before tomorrow's walkthrough.",
      },
      {
        title: "Auth refresh fallback review",
        type: "Engineering",
        owner: "Kabir A.",
        status: "In progress",
        note: "Decision needed on hotfix vs safer refactor path.",
      },
    ],
    actionItems: [
      {
        title: "Confirm review checklist before 4:30 PM QA call",
        owner: "Devika S.",
        dueDate: "Today",
        source: "Northstar QA review",
        status: "Open",
      },
      {
        title: "Close auth refresh retest after staging verification",
        owner: "Ritika J.",
        dueDate: "Apr 8",
        source: "Engineering sync",
        status: "Pending",
      },
    ],
    meetings: [
      {
        title: "Northstar QA review",
        time: "Today, 4:30 PM",
        attendees: "PM, Tech Lead, QA, Coordinator",
        agenda:
          "Close regression blockers and confirm tomorrow's client review readiness.",
      },
      {
        title: "Engineering sync",
        time: "Tomorrow, 11:00 AM",
        attendees: "Tech Lead, Team Lead, Developers",
        agenda: "Unblock sync flow and rebalance in-progress items.",
      },
    ],
    discussions: [
      {
        title: "Should export permissions ship in Sprint 12?",
        owner: "Devika S.",
        updated: "28 min ago",
        summary: "Need PM decision because QA bandwidth is already stretched.",
      },
      {
        title: "Auth refresh fallback behavior",
        owner: "Kabir A.",
        updated: "1 hr ago",
        summary:
          "Team deciding whether to hotfix fallback or hold for safer refactor.",
      },
    ],
    files: [
      {
        name: "Northstar review checklist.pdf",
        type: "PDF",
        owner: "Devika S.",
        updated: "Today, 9:10 AM",
      },
      {
        name: "Regression evidence sprint-12.zip",
        type: "Archive",
        owner: "Ritika J.",
        updated: "Today, 12:20 PM",
      },
      {
        name: "Access-control-notes.docx",
        type: "Doc",
        owner: "Kabir A.",
        updated: "Yesterday, 7:45 PM",
      },
    ],
    timeline: [
      {
        milestone: "Client demo freeze",
        owner: "Devika S.",
        dueDate: "Apr 8",
        status: "On track",
      },
      {
        milestone: "QA sign-off",
        owner: "Ritika J.",
        dueDate: "Apr 10",
        status: "Needs attention",
      },
      {
        milestone: "Stakeholder review",
        owner: "Kabir A.",
        dueDate: "Apr 11",
        status: "On track",
      },
    ],
    reports: [
      {
        title: "Sprint health report",
        period: "Current sprint",
        signal: "Amber",
        note: "QA queue and one auth bug are driving risk.",
      },
      {
        title: "Blocker age report",
        period: "Last 7 days",
        signal: "Amber",
        note: "2 blockers crossed the desired PM threshold.",
      },
    ],
  },
  {
    id: "atlas-commerce-refresh",
    name: "Atlas Commerce Refresh",
    client: "Atlas Retail",
    coordinator: "Riya P.",
    techLead: "Arjun M.",
    teamLead: "Sneha T.",
    qaLead: "Vaibhav D.",
    sprint: "Sprint 19",
    status: "Final polish",
    progress: "84%",
    nextMeeting: "Today, 3:00 PM",
    developers: ["Kunal S.", "Priya V.", "Harsh M."],
    board: {
      backlog: ["Checkout analytics follow-up", "Coupon edge-case validations"],
      inProgress: ["Finalize payment summary states"],
      review: ["Device-size QA sweep", "Promo-code journey verification"],
      done: ["Header navigation cleanup", "Cart persistence fix"],
    },
    backlog: [
      {
        title: "Checkout analytics follow-up",
        estimate: "3 pts",
        owner: "Arjun M.",
        priority: "Medium",
      },
      {
        title: "Coupon edge-case validations",
        estimate: "5 pts",
        owner: "Sneha T.",
        priority: "High",
      },
      {
        title: "Release note draft",
        estimate: "2 pts",
        owner: "Riya P.",
        priority: "Low",
      },
    ],
    sprints: [
      {
        name: "Sprint 19",
        dates: "Apr 2 - Apr 13",
        goal: "Finalize release candidate and QA coverage",
        status: "Active",
        velocity: "26 pts",
      },
      {
        name: "Sprint 18",
        dates: "Mar 20 - Apr 1",
        goal: "Checkout redesign stabilization",
        status: "Closed",
        velocity: "24 pts",
      },
    ],
    issues: [
      {
        id: "AT-88",
        title: "Payment summary state mismatch on refresh",
        type: "Bug",
        status: "In progress",
        priority: "High",
        assignee: "Kunal S.",
        updated: "14 min ago",
        description:
          "Summary card shows stale totals when page reload happens mid-checkout.",
        acceptance: [
          "Totals refresh correctly",
          "Cart persistence remains intact",
          "QA verifies desktop and mobile",
        ],
      },
      {
        id: "AT-94",
        title: "Promo-code journey verification",
        type: "Task",
        status: "Review",
        priority: "Medium",
        assignee: "Vaibhav D.",
        updated: "1 hr ago",
        description:
          "Validate promo application and removal flows across supported devices.",
        acceptance: [
          "Promo add/remove works",
          "Totals match backend",
          "No stale state after refresh",
        ],
      },
    ],
    team: [
      {
        name: "Arjun M.",
        role: "Tech Lead",
        allocation: "80%",
        currentFocus: "Checkout release sign-off",
      },
      {
        name: "Sneha T.",
        role: "Team Lead",
        allocation: "90%",
        currentFocus: "Final polish and backlog trim",
      },
      {
        name: "Kunal S.",
        role: "Developer",
        allocation: "100%",
        currentFocus: "Payment summary bug",
      },
      {
        name: "Priya V.",
        role: "Developer",
        allocation: "75%",
        currentFocus: "Promo and analytics follow-up",
      },
      {
        name: "Vaibhav D.",
        role: "QA",
        allocation: "85%",
        currentFocus: "Cross-device verification",
      },
    ],
    qa: [
      {
        suite: "Cross-device checkout",
        owner: "Vaibhav D.",
        status: "In progress",
        blockers: "1 staging issue",
      },
      {
        suite: "Promo-code flow",
        owner: "Vaibhav D.",
        status: "Review",
        blockers: "0",
      },
    ],
    qaTrackers: [
      {
        title: "Atlas defect log",
        type: "Bug sheet",
        owner: "Vaibhav D.",
        url: "https://docs.google.com/spreadsheets/d/atlas-defects",
        description:
          "All checkout defects and retest notes are tracked externally by QA.",
      },
      {
        title: "Atlas polish backlog",
        type: "Enhancement sheet",
        owner: "Riya P.",
        url: "https://docs.google.com/spreadsheets/d/atlas-enhancements",
        description:
          "Low-priority UI and flow enhancements are tracked outside the sprint board here.",
      },
    ],
    risks: [
      {
        title: "Checkout sign-off may slip if device sweep fails",
        severity: "Medium",
        owner: "Vaibhav D.",
        mitigation:
          "Complete cross-device QA before the sign-off prep meeting.",
        dueDate: "Apr 8",
      },
    ],
    dependencies: [
      {
        title: "Analytics tag verification from client team",
        type: "Client",
        owner: "Riya P.",
        status: "Waiting",
        note: "Atlas client team needs to confirm analytics mapping before release note finalization.",
      },
    ],
    actionItems: [
      {
        title: "Decide whether analytics follow-up stays in Sprint 19",
        owner: "Riya P.",
        dueDate: "Today",
        source: "Atlas sign-off prep",
        status: "Open",
      },
      {
        title: "Upload final device sweep evidence",
        owner: "Vaibhav D.",
        dueDate: "Apr 8",
        source: "QA retest",
        status: "Pending",
      },
    ],
    meetings: [
      {
        title: "Atlas sign-off prep",
        time: "Today, 3:00 PM",
        attendees: "PM, Tech Lead, QA",
        agenda: "Decide if release candidate can move to client sign-off.",
      },
    ],
    discussions: [
      {
        title: "Should analytics follow-up stay in current sprint?",
        owner: "Riya P.",
        updated: "46 min ago",
        summary:
          "PM deciding if it should remain in scope or move post-release.",
      },
    ],
    files: [
      {
        name: "Atlas-release-candidate-v3.pdf",
        type: "PDF",
        owner: "Riya P.",
        updated: "Today, 10:05 AM",
      },
      {
        name: "checkout-qa-results.xlsx",
        type: "Sheet",
        owner: "Vaibhav D.",
        updated: "Today, 1:00 PM",
      },
    ],
    timeline: [
      {
        milestone: "Release candidate freeze",
        owner: "Arjun M.",
        dueDate: "Apr 7",
        status: "On track",
      },
      {
        milestone: "Client sign-off",
        owner: "Riya P.",
        dueDate: "Apr 9",
        status: "On track",
      },
    ],
    reports: [
      {
        title: "Release readiness",
        period: "Current week",
        signal: "Green",
        note: "One defect remains under review, otherwise stable.",
      },
    ],
  },
  {
    id: "meridian-crm-rollout",
    name: "Meridian CRM Rollout",
    client: "Meridian Advisory",
    coordinator: "Aman T.",
    techLead: "Nivedita R.",
    teamLead: "Prashant L.",
    qaLead: "Puneet G.",
    sprint: "Sprint 24",
    status: "Approvals pending",
    progress: "69%",
    nextMeeting: "Today, 1:00 PM",
    developers: ["Anjali R.", "Parth C.", "Isha N."],
    board: {
      backlog: ["Migration checklist cleanup", "Role permission test cases"],
      inProgress: ["Data validation fixes", "Import retry handling"],
      review: ["UAT checklist review"],
      done: ["Field mapping confirmation"],
    },
    backlog: [
      {
        title: "Migration checklist cleanup",
        estimate: "3 pts",
        owner: "Aman T.",
        priority: "Medium",
      },
      {
        title: "Role permission test cases",
        estimate: "5 pts",
        owner: "Puneet G.",
        priority: "High",
      },
    ],
    sprints: [
      {
        name: "Sprint 24",
        dates: "Apr 1 - Apr 14",
        goal: "UAT readiness and migration quality",
        status: "Active",
        velocity: "22 pts",
      },
    ],
    issues: [
      {
        id: "MR-301",
        title: "Import retry handling leaves partial records",
        type: "Bug",
        status: "In progress",
        priority: "High",
        assignee: "Anjali R.",
        updated: "9 min ago",
        description:
          "Retry path can create partial rows when validation errors return late.",
        acceptance: [
          "No partial rows remain",
          "Retry path is idempotent",
          "QA verifies migration pack",
        ],
      },
      {
        id: "MR-309",
        title: "Role permission test matrix",
        type: "Task",
        status: "Backlog",
        priority: "High",
        assignee: "Puneet G.",
        updated: "1 hr ago",
        description:
          "Create expanded test coverage for PM, team lead, developer, and QA roles.",
        acceptance: [
          "Matrix reviewed by PM",
          "All critical roles covered",
          "Sign-off checklist updated",
        ],
      },
    ],
    team: [
      {
        name: "Nivedita R.",
        role: "Tech Lead",
        allocation: "95%",
        currentFocus: "Migration reliability and UAT blockers",
      },
      {
        name: "Prashant L.",
        role: "Team Lead",
        allocation: "85%",
        currentFocus: "Issue sequencing and dependency removal",
      },
      {
        name: "Anjali R.",
        role: "Developer",
        allocation: "100%",
        currentFocus: "Import retry fix",
      },
      {
        name: "Parth C.",
        role: "Developer",
        allocation: "90%",
        currentFocus: "Validation cleanup",
      },
      {
        name: "Puneet G.",
        role: "QA",
        allocation: "95%",
        currentFocus: "Role and migration test coverage",
      },
    ],
    qa: [
      {
        suite: "Migration regression",
        owner: "Puneet G.",
        status: "At risk",
        blockers: "2 open defects",
      },
      {
        suite: "Role permission matrix",
        owner: "Puneet G.",
        status: "Backlog",
        blockers: "Awaiting PM scope lock",
      },
    ],
    qaTrackers: [
      {
        title: "Meridian defect register",
        type: "Bug sheet",
        owner: "Puneet G.",
        url: "https://docs.google.com/spreadsheets/d/meridian-defects",
        description:
          "Migration issues, role bugs, and validation failures are maintained in this sheet.",
      },
      {
        title: "Meridian enhancement notes",
        type: "Enhancement sheet",
        owner: "Aman T.",
        url: "https://docs.google.com/spreadsheets/d/meridian-enhancements",
        description:
          "Post-UAT improvement requests and non-blocking changes are listed here.",
      },
    ],
    risks: [
      {
        title: "UAT approval could slip because role coverage is incomplete",
        severity: "High",
        owner: "Puneet G.",
        mitigation:
          "Lock role-test matrix scope and complete high-priority coverage first.",
        dueDate: "Apr 8",
      },
      {
        title: "Migration rehearsal at risk due to retry-handling bug",
        severity: "High",
        owner: "Nivedita R.",
        mitigation:
          "Escalate retry fix and hold low-priority cleanup until after validation closes.",
        dueDate: "Apr 10",
      },
    ],
    dependencies: [
      {
        title: "Validation rules confirmation from backend team",
        type: "Engineering",
        owner: "Nivedita R.",
        status: "Blocked",
        note: "Retry and validation fixes need backend decision before UAT can be finalized.",
      },
      {
        title: "Client UAT participant list",
        type: "Client",
        owner: "Aman T.",
        status: "Waiting",
        note: "Need final stakeholder names before access and schedule setup.",
      },
    ],
    actionItems: [
      {
        title: "Approve final UAT role matrix with QA",
        owner: "Aman T.",
        dueDate: "Today",
        source: "Meridian dependency sync",
        status: "Open",
      },
      {
        title: "Escalate retry-handling blocker if fix misses today's cutoff",
        owner: "Nivedita R.",
        dueDate: "Today",
        source: "Migration bug review",
        status: "Pending",
      },
    ],
    meetings: [
      {
        title: "Meridian dependency sync",
        time: "Today, 1:00 PM",
        attendees: "PM, Tech Lead, QA, Backend",
        agenda: "Resolve validation ownership and confirm UAT plan.",
      },
    ],
    discussions: [
      {
        title: "Can UAT start with limited role coverage?",
        owner: "Aman T.",
        updated: "33 min ago",
        summary: "Needs PM call because approvals depend on coverage depth.",
      },
    ],
    files: [
      {
        name: "Meridian-UAT-plan.docx",
        type: "Doc",
        owner: "Aman T.",
        updated: "Today, 8:45 AM",
      },
      {
        name: "migration-validation-issues.csv",
        type: "CSV",
        owner: "Puneet G.",
        updated: "Today, 11:15 AM",
      },
    ],
    timeline: [
      {
        milestone: "UAT plan approval",
        owner: "Aman T.",
        dueDate: "Apr 8",
        status: "Needs attention",
      },
      {
        milestone: "Migration rehearsal",
        owner: "Nivedita R.",
        dueDate: "Apr 10",
        status: "At risk",
      },
    ],
    reports: [
      {
        title: "UAT readiness",
        period: "Current week",
        signal: "Amber",
        note: "Approvals and validation defects remain open.",
      },
    ],
  },
]

export const pmProjectIds = pmProjects.map((project) => project.id)

export function getPmProject(projectId?: string) {
  return pmProjects.find((project) => project.id === projectId) ?? pmProjects[0]
}

export function getPmIssue(
  projectId: string | undefined,
  issueId: string | undefined
) {
  const project = getPmProject(projectId)
  return (
    project.issues.find((issue) => issue.id === issueId) ?? project.issues[0]
  )
}

export const pmDashboardData = {
  metrics: [
    { label: "Assigned projects", value: "03", tone: "blue" as const },
    { label: "Active blockers", value: "08", tone: "amber" as const },
    { label: "QA suites live", value: "07", tone: "sky" as const },
    { label: "Meetings today", value: "03", tone: "green" as const },
  ],
  actionQueue: [
    "Close Northstar QA escalation before today's review call.",
    "Decide if Atlas analytics follow-up remains in Sprint 19.",
    "Approve Meridian role-test scope before UAT planning.",
  ],
  portfolioRows: pmProjects.map((project) => ({
    project: project.name,
    client: project.client,
    sprint: project.sprint,
    techLead: project.techLead,
    qaLead: project.qaLead,
    status: project.status,
    progress: project.progress,
  })),
  meetings: pmProjects.flatMap((project) =>
    project.meetings.map((meeting) => ({
      project: project.name,
      title: meeting.title,
      time: meeting.time,
      attendees: meeting.attendees,
    }))
  ),
  qaAlerts: [
    "Northstar regression pack is still blocked by 2 environment issues.",
    "Meridian migration suite cannot close without retry-handling verification.",
    "Atlas cross-device checkout suite needs one more clean pass before sign-off.",
  ],
}

export const pmNotifications = [
  {
    title: "Northstar review moved to 4:30 PM",
    type: "Meeting",
    owner: "Devika S.",
    time: "11 min ago",
    status: "Open",
  },
  {
    title: "Meridian UAT plan still awaiting PM approval",
    type: "Approval",
    owner: "Aman T.",
    time: "31 min ago",
    status: "Pending",
  },
  {
    title: "Atlas QA sweep uploaded new evidence",
    type: "QA",
    owner: "Vaibhav D.",
    time: "58 min ago",
    status: "Seen",
  },
]

export const pmCalendarItems = [
  {
    title: "Northstar QA review",
    date: "Apr 6",
    time: "4:30 PM",
    project: "Northstar Client Portal",
  },
  {
    title: "Atlas sign-off prep",
    date: "Apr 6",
    time: "3:00 PM",
    project: "Atlas Commerce Refresh",
  },
  {
    title: "Meridian dependency sync",
    date: "Apr 6",
    time: "1:00 PM",
    project: "Meridian CRM Rollout",
  },
  {
    title: "Sprint 19 planning",
    date: "Apr 7",
    time: "11:30 AM",
    project: "Atlas Commerce Refresh",
  },
]

export const pmWorkloadRows = [
  {
    name: "Kabir A.",
    role: "Tech Lead",
    projects: "Northstar",
    allocation: "90%",
    status: "High load",
    note: "Covering auth risk and release review",
  },
  {
    name: "Ritika J.",
    role: "QA",
    projects: "Northstar",
    allocation: "95%",
    status: "High load",
    note: "Regression queue and retests are stacked",
  },
  {
    name: "Vaibhav D.",
    role: "QA",
    projects: "Atlas",
    allocation: "85%",
    status: "Balanced",
    note: "Cross-device validation nearing close",
  },
  {
    name: "Aman T.",
    role: "Associate PM",
    projects: "Meridian",
    allocation: "80%",
    status: "Balanced",
    note: "Focused on UAT prep and client coordination",
  },
  {
    name: "Nivedita R.",
    role: "Tech Lead",
    projects: "Meridian",
    allocation: "95%",
    status: "High load",
    note: "Migration blockers driving overload",
  },
  {
    name: "Priya V.",
    role: "Developer",
    projects: "Atlas",
    allocation: "75%",
    status: "Available",
    note: "Can absorb one more medium-size item",
  },
]

export const pmApprovals = [
  {
    item: "Northstar QA staffing adjustment",
    type: "Resource",
    owner: "Kalash Pachauri",
    project: "Northstar Client Portal",
    dueDate: "Today",
    status: "Pending",
  },
  {
    item: "Atlas release sign-off package",
    type: "Release",
    owner: "Riya P.",
    project: "Atlas Commerce Refresh",
    dueDate: "Apr 8",
    status: "In review",
  },
  {
    item: "Meridian UAT plan approval",
    type: "UAT",
    owner: "Aman T.",
    project: "Meridian CRM Rollout",
    dueDate: "Today",
    status: "Pending",
  },
  {
    item: "Meridian role-test scope lock",
    type: "QA",
    owner: "Puneet G.",
    project: "Meridian CRM Rollout",
    dueDate: "Apr 8",
    status: "Needs decision",
  },
]

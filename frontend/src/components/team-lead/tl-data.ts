export type TlTask = {
  id: string
  title: string
  priority: string
  status: string
  assignee: string
  eta: string
  qaState: string
}

export type TlBlocker = {
  title: string
  owner: string
  age: string
  impact: string
  nextStep: string
}

export type TlQaHandoff = {
  story: string
  developer: string
  qaOwner: string
  status: string
  evidence: string
  target: string
}

export type TlDiscussion = {
  title: string
  channel: string
  updated: string
  summary: string
}

export type TlMeeting = {
  title: string
  type: string
  time: string
  attendees: string
  agenda: string
}

export type TlTeamMember = {
  name: string
  role: string
  load: string
  stream: string
  status: string
}

export type TlProject = {
  id: string
  name: string
  client: string
  projectManager: string
  sprint: string
  status: string
  progress: string
  nextStandup: string
  releaseWindow: string
  focus: string
  board: {
    queued: string[]
    building: string[]
    review: string[]
    qaReady: string[]
    done: string[]
  }
  tasks: TlTask[]
  blockers: TlBlocker[]
  qaHandoffs: TlQaHandoff[]
  team: TlTeamMember[]
  meetings: TlMeeting[]
  discussions: TlDiscussion[]
}

export const tlProjects: TlProject[] = [
  {
    id: "northstar-client-portal",
    name: "Northstar Client Portal",
    client: "Northstar Health",
    projectManager: "Kalash Pachauri",
    sprint: "Sprint 12",
    status: "Tight QA handoff",
    progress: "78%",
    nextStandup: "Today, 10:30 AM",
    releaseWindow: "Apr 11 review freeze",
    focus:
      "Close the sync-flow fix, package evidence for QA, and keep provider dashboard polish moving without slipping the freeze.",
    board: {
      queued: [
        "Refine empty-state copy for provider setup",
        "Split export permission test notes",
      ],
      building: [
        "Fix clinician note sync after refresh token rotation",
        "Clean dashboard filter latency",
      ],
      review: [
        "Provider setup validation copy",
        "Export permission audit log notes",
      ],
      qaReady: [
        "Session timeout telemetry patch",
        "Review widget spacing pass",
      ],
      done: ["Audit log pagination cleanup", "Cross-role sidebar alignment"],
    },
    tasks: [
      {
        id: "NS-TL-14",
        title: "Fix clinician note sync after token rotation",
        priority: "High",
        status: "Building",
        assignee: "Rohan P.",
        eta: "Today, 5:00 PM",
        qaState: "Blocked until build closes",
      },
      {
        id: "NS-TL-18",
        title: "Prepare provider setup validation copy for review",
        priority: "Medium",
        status: "Review",
        assignee: "Megha D.",
        eta: "Today, 3:00 PM",
        qaState: "Ready after copy sign-off",
      },
      {
        id: "NS-TL-23",
        title: "Package session-timeout telemetry patch for QA",
        priority: "Medium",
        status: "QA ready",
        assignee: "Vaishali N.",
        eta: "Tomorrow, 11:00 AM",
        qaState: "Evidence upload pending",
      },
    ],
    blockers: [
      {
        title: "Refresh-token fix still needs final fallback decision",
        owner: "Kabir A.",
        age: "1.5 days",
        impact: "Holds two QA-ready stories behind one unstable auth path.",
        nextStep: "Finalize fallback approach in the 2:00 PM engineering sync.",
      },
      {
        title: "Review environment is missing the latest seed data",
        owner: "Devika S.",
        age: "6 hrs",
        impact: "QA cannot validate provider setup and export roles together.",
        nextStep: "Restore the review dataset before the evening QA window.",
      },
    ],
    qaHandoffs: [
      {
        story: "Session timeout telemetry patch",
        developer: "Vaishali N.",
        qaOwner: "Ritika J.",
        status: "Ready for QA",
        evidence: "Build notes + log capture",
        target: "Today, 6:30 PM",
      },
      {
        story: "Provider setup validation copy",
        developer: "Megha D.",
        qaOwner: "Ritika J.",
        status: "Awaiting review close",
        evidence: "Updated Figma copy checklist",
        target: "Tomorrow, 11:00 AM",
      },
    ],
    team: [
      {
        name: "Aashish K.",
        role: "Team Lead",
        load: "90%",
        stream: "Daily delivery sequencing",
        status: "Stable",
      },
      {
        name: "Kabir A.",
        role: "Tech Lead",
        load: "95%",
        stream: "Auth-risk decisions",
        status: "High load",
      },
      {
        name: "Rohan P.",
        role: "Developer",
        load: "100%",
        stream: "Sync reliability",
        status: "At capacity",
      },
      {
        name: "Megha D.",
        role: "Developer",
        load: "82%",
        stream: "Provider setup polish",
        status: "Balanced",
      },
      {
        name: "Vaishali N.",
        role: "Developer",
        load: "76%",
        stream: "Telemetry and evidence",
        status: "Balanced",
      },
      {
        name: "Ritika J.",
        role: "QA",
        load: "94%",
        stream: "Regression and handoffs",
        status: "High load",
      },
    ],
    meetings: [
      {
        title: "Northstar delivery standup",
        type: "Standup",
        time: "Today, 10:30 AM",
        attendees: "Team Lead, PM, Developers",
        agenda:
          "Confirm the auth-fix path, review task movement, and protect today's QA window.",
      },
      {
        title: "Northstar blocker sync",
        type: "Blocker review",
        time: "Today, 2:00 PM",
        attendees: "Team Lead, PM, Tech Lead, Developers",
        agenda:
          "Finalize the refresh fallback decision and re-sequence the remaining build items.",
      },
    ],
    discussions: [
      {
        title:
          "Should the refresh fallback ship as a hotfix or wait for refactor?",
        channel: "Engineering sync",
        updated: "22 min ago",
        summary:
          "Tech lead needs a narrow safe path so QA can start validation without another round of regression churn.",
      },
      {
        title: "Do we hold export permission polish for the next sprint?",
        channel: "Sprint thread",
        updated: "54 min ago",
        summary:
          "The current sprint should not absorb non-blocking polish if the QA window stays compressed.",
      },
    ],
  },
  {
    id: "helix-patient-ops-console",
    name: "Helix Patient Ops Console",
    client: "Helix Care",
    projectManager: "Kalash Pachauri",
    sprint: "Sprint 8",
    status: "Build flow stable",
    progress: "71%",
    nextStandup: "Today, 11:15 AM",
    releaseWindow: "Apr 15 internal pilot",
    focus:
      "Keep the admissions board flowing, reduce review churn, and hand two operator-facing stories to QA by tomorrow afternoon.",
    board: {
      queued: ["Operator filter copy cleanup", "Internal release note outline"],
      building: [
        "Admission queue pagination",
        "Patient handoff timeline state handling",
      ],
      review: ["Ops board badge color polish"],
      qaReady: ["Admission export download state", "Error toast consolidation"],
      done: ["Operator shift summary card", "Permission guard cleanup"],
    },
    tasks: [
      {
        id: "HX-TL-09",
        title: "Admission queue pagination",
        priority: "High",
        status: "Building",
        assignee: "Karan S.",
        eta: "Tomorrow, 1:00 PM",
        qaState: "Waiting on code review",
      },
      {
        id: "HX-TL-11",
        title: "Patient handoff timeline state handling",
        priority: "High",
        status: "Building",
        assignee: "Niharika V.",
        eta: "Today, 7:00 PM",
        qaState: "Tests need rerun",
      },
      {
        id: "HX-TL-13",
        title: "Admission export download state",
        priority: "Medium",
        status: "QA ready",
        assignee: "Irfan M.",
        eta: "Today, 4:00 PM",
        qaState: "Ready for regression pass",
      },
    ],
    blockers: [
      {
        title: "Staging API is still returning stale admission counts",
        owner: "Aditya N.",
        age: "9 hrs",
        impact: "Blocks QA validation for pagination and export states.",
        nextStep:
          "Refresh staging seed and rerun the dataset sync before 3:00 PM.",
      },
    ],
    qaHandoffs: [
      {
        story: "Admission export download state",
        developer: "Irfan M.",
        qaOwner: "Mitali R.",
        status: "Ready for QA",
        evidence: "Screen recording + exported file checks",
        target: "Today, 5:00 PM",
      },
      {
        story: "Ops board badge color polish",
        developer: "Niharika V.",
        qaOwner: "Mitali R.",
        status: "Queued",
        evidence: "PR screenshots",
        target: "Tomorrow, 12:00 PM",
      },
    ],
    team: [
      {
        name: "Aashish K.",
        role: "Team Lead",
        load: "86%",
        stream: "Scope sequencing",
        status: "Stable",
      },
      {
        name: "Aditya N.",
        role: "Tech Lead",
        load: "88%",
        stream: "API coordination",
        status: "Balanced",
      },
      {
        name: "Karan S.",
        role: "Developer",
        load: "100%",
        stream: "Admission queue",
        status: "At capacity",
      },
      {
        name: "Niharika V.",
        role: "Developer",
        load: "84%",
        stream: "Timeline and polish",
        status: "Balanced",
      },
      {
        name: "Irfan M.",
        role: "Developer",
        load: "72%",
        stream: "Export flow",
        status: "Available",
      },
      {
        name: "Mitali R.",
        role: "QA",
        load: "88%",
        stream: "Operator regression",
        status: "Balanced",
      },
    ],
    meetings: [
      {
        title: "Helix build standup",
        type: "Standup",
        time: "Today, 11:15 AM",
        attendees: "Team Lead, PM, Developers",
        agenda:
          "Review pagination progress, confirm review queue movement, and prepare the QA handoff bundle.",
      },
      {
        title: "Helix QA handoff sync",
        type: "QA handoff",
        time: "Today, 5:00 PM",
        attendees: "Team Lead, PM, Developers, QA",
        agenda:
          "Walk through export evidence and clarify what is still blocking pagination validation.",
      },
    ],
    discussions: [
      {
        title: "Do we cut filter-copy cleanup from Sprint 8?",
        channel: "Standup recap",
        updated: "35 min ago",
        summary:
          "The team can protect the pilot if polish items move out before the review queue thickens.",
      },
      {
        title: "Should API seed refresh be escalated today?",
        channel: "Blocker thread",
        updated: "11 min ago",
        summary:
          "If staging data is not refreshed by mid-afternoon, QA handoffs will slip into the next day.",
      },
    ],
  },
]

export function getTlProject(projectId?: string) {
  return tlProjects.find((project) => project.id === projectId) ?? tlProjects[0]
}

export const tlDashboardData = {
  metrics: [
    { label: "Active build items", value: "09", tone: "blue" as const },
    { label: "Open blockers", value: "03", tone: "amber" as const },
    { label: "QA handoffs", value: "04", tone: "teal" as const },
    { label: "Standups today", value: "02", tone: "green" as const },
  ],
  actionQueue: [
    "Close the refresh-token fallback decision before Northstar QA starts.",
    "Get Helix staging seed data refreshed before the afternoon regression window.",
    "Trim any non-essential polish items if code review spills past today.",
  ],
  teamSignals: [
    "Rohan is overloaded until the auth fix closes, so do not add side work today.",
    "Mitali can absorb one more QA-ready story once export validation begins.",
    "Irfan is the safest person to pull into overflow review support this evening.",
  ],
  projectRows: tlProjects.map((project) => ({
    id: project.id,
    project: project.name,
    client: project.client,
    sprint: project.sprint,
    status: project.status,
    progress: project.progress,
    nextStandup: project.nextStandup,
  })),
}

export const tlNotifications = [
  {
    title: "Northstar auth fallback thread needs team-lead decision",
    type: "Engineering",
    owner: "Kabir A.",
    time: "12 min ago",
    status: "Open",
  },
  {
    title: "Helix staging seed refresh still pending",
    type: "Blocker",
    owner: "Aditya N.",
    time: "24 min ago",
    status: "Escalate",
  },
  {
    title: "Mitali accepted the export QA handoff for Helix",
    type: "QA",
    owner: "Mitali R.",
    time: "39 min ago",
    status: "Seen",
  },
  {
    title: "Northstar provider setup copy moved into review",
    type: "Review",
    owner: "Megha D.",
    time: "1 hr ago",
    status: "Open",
  },
]

export const tlCalendarItems = [
  {
    title: "Northstar delivery standup",
    date: "Apr 7",
    time: "10:30 AM",
    project: "Northstar Client Portal",
    lane: "Standup",
  },
  {
    title: "Helix build standup",
    date: "Apr 7",
    time: "11:15 AM",
    project: "Helix Patient Ops Console",
    lane: "Standup",
  },
  {
    title: "Northstar engineering sync",
    date: "Apr 7",
    time: "2:00 PM",
    project: "Northstar Client Portal",
    lane: "Blocker review",
  },
  {
    title: "Helix QA handoff window",
    date: "Apr 7",
    time: "5:00 PM",
    project: "Helix Patient Ops Console",
    lane: "QA handoff",
  },
]

export const tlMeetings = tlProjects.flatMap((project) =>
  project.meetings.map((meeting) => ({
    project: project.name,
    projectId: project.id,
    projectManager: project.projectManager,
    ...meeting,
  }))
)

export const tlGlobalBlockers = tlProjects.flatMap((project) =>
  project.blockers.map((blocker) => ({
    project: project.name,
    ...blocker,
  }))
)

export const tlGlobalQaHandoffs = tlProjects.flatMap((project) =>
  project.qaHandoffs.map((handoff) => ({
    project: project.name,
    ...handoff,
  }))
)

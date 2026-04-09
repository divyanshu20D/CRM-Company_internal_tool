export type AdminEmployee = {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: string
  manager: string
  projects: string[]
  location: string
  joined: string
  capacity: string
  access: string
  phone: string
}

export const adminEmployees: AdminEmployee[] = [
  {
    id: "emp-raghav-khanna",
    name: "Raghav Khanna",
    email: "raghav@collabworkspace.com",
    role: "CEO",
    department: "Leadership",
    status: "Active",
    manager: "Board",
    projects: ["All portfolios"],
    location: "Delhi",
    joined: "Jan 12, 2024",
    capacity: "Executive",
    access: "Global",
    phone: "+91 98XXXXXX10",
  },
  {
    id: "emp-neha-verma",
    name: "Kalash Pachauri",
    email: "neha@collabworkspace.com",
    role: "Project Manager",
    department: "Delivery",
    status: "Active",
    manager: "Raghav Khanna",
    projects: [
      "Northstar Client Portal",
      "Atlas Commerce Refresh",
      "Meridian CRM Rollout",
    ],
    location: "Noida",
    joined: "Feb 02, 2024",
    capacity: "90%",
    access: "Portfolio",
    phone: "+91 98XXXXXX12",
  },
  {
    id: "emp-aashish-kumar",
    name: "Aashish Kumar",
    email: "aashish@collabworkspace.com",
    role: "Team Lead",
    department: "Engineering",
    status: "Active",
    manager: "Kalash Pachauri",
    projects: ["Northstar Client Portal", "Helix Patient Ops Console"],
    location: "Pune",
    joined: "Mar 10, 2024",
    capacity: "88%",
    access: "Assigned projects",
    phone: "+91 98XXXXXX14",
  },
  {
    id: "emp-rohan-patel",
    name: "Rohan Patel",
    email: "rohan@collabworkspace.com",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    manager: "Aashish Kumar",
    projects: ["Northstar Client Portal", "Helix Patient Ops Console"],
    location: "Ahmedabad",
    joined: "Apr 03, 2024",
    capacity: "100%",
    access: "Assigned tasks",
    phone: "+91 98XXXXXX18",
  },
  {
    id: "emp-ritika-joshi",
    name: "Ritika Joshi",
    email: "ritika@collabworkspace.com",
    role: "QA",
    department: "Quality",
    status: "Active",
    manager: "Kalash Pachauri",
    projects: ["Northstar Client Portal"],
    location: "Jaipur",
    joined: "Apr 22, 2024",
    capacity: "95%",
    access: "QA projects",
    phone: "+91 98XXXXXX22",
  },
  {
    id: "emp-devika-sen",
    name: "Devika Sen",
    email: "devika@collabworkspace.com",
    role: "Associate Project Coordinator",
    department: "Delivery",
    status: "Invited",
    manager: "Kalash Pachauri",
    projects: ["Northstar Client Portal"],
    location: "Remote",
    joined: "Pending",
    capacity: "75%",
    access: "Coordination scope",
    phone: "+91 98XXXXXX24",
  },
]

export function getAdminEmployee(employeeId?: string) {
  return (
    adminEmployees.find((employee) => employee.id === employeeId) ??
    adminEmployees[0]
  )
}

export const adminRoleRows = [
  {
    role: "CEO",
    scope: "Global",
    members: "1",
    permissions: "Portfolio visibility, approvals, governance, reporting",
  },
  {
    role: "Project Manager",
    scope: "Portfolio",
    members: "1",
    permissions: "Project creation, sprint planning, assignments, approvals",
  },
  {
    role: "Team Lead",
    scope: "Assigned projects",
    members: "1",
    permissions: "Execution, blockers, task sequencing, QA handoff",
  },
  {
    role: "Developer",
    scope: "Assigned tasks",
    members: "1",
    permissions: "Task execution, notes, files, blocker visibility",
  },
  {
    role: "QA",
    scope: "QA projects",
    members: "1",
    permissions: "Validation, retests, bug trackers, sign-off readiness",
  },
  {
    role: "Associate Project Coordinator",
    scope: "Assigned projects",
    members: "1 invited",
    permissions: "Meeting coordination, follow-ups, project notes",
  },
]

export const adminAssignmentRows = [
  {
    employee: "Kalash Pachauri",
    project: "Northstar Client Portal",
    role: "Project Manager",
    status: "Primary owner",
  },
  {
    employee: "Aashish Kumar",
    project: "Northstar Client Portal",
    role: "Team Lead",
    status: "Execution owner",
  },
  {
    employee: "Rohan Patel",
    project: "Northstar Client Portal",
    role: "Developer",
    status: "Assigned",
  },
  {
    employee: "Ritika Joshi",
    project: "Northstar Client Portal",
    role: "QA",
    status: "Assigned",
  },
  {
    employee: "Devika Sen",
    project: "Northstar Client Portal",
    role: "Associate Project Coordinator",
    status: "Invited",
  },
]

export const adminTeams = [
  {
    name: "Northstar Delivery Pod",
    lead: "Aashish Kumar",
    members: "6",
    focus: "Portal delivery, QA stabilization, stakeholder review prep",
  },
  {
    name: "Atlas Release Pod",
    lead: "Sneha T.",
    members: "5",
    focus: "Release candidate closeout and sign-off movement",
  },
  {
    name: "Meridian Rollout Pod",
    lead: "Prashant L.",
    members: "5",
    focus: "Migration quality, UAT readiness, and validation cleanup",
  },
]

export const adminDashboardData = {
  metrics: [
    { label: "Employees", value: "06", tone: "blue" as const },
    { label: "Active roles", value: "06", tone: "sky" as const },
    { label: "Pending invites", value: "01", tone: "teal" as const },
    { label: "Assigned teams", value: "03", tone: "green" as const },
  ],
  priorities: [
    "Finish Devika's onboarding so project coordination is not bottlenecked.",
    "Lock the final role-permission matrix before WorkOS auth wiring begins.",
    "Review over-allocation across QA and tech-lead roles before adding more projects.",
  ],
  updates: [
    "One employee invite is still pending acceptance.",
    "QA bandwidth is visibly tighter than engineering bandwidth in current assignments.",
    "All current roles now have dedicated front-end workspaces in the prototype.",
  ],
}

export const adminOrganizationSettings = [
  { label: "Organization name", value: "Collab Workspace" },
  { label: "Primary timezone", value: "Asia/Calcutta" },
  { label: "Working days", value: "Monday to Friday" },
  { label: "Default sprint cadence", value: "2 weeks" },
  { label: "Primary contact email", value: "ops@collabworkspace.com" },
  { label: "File storage region", value: "AWS ap-south-1" },
]

export const adminPermissionRows = [
  {
    action: "Create project",
    ceo: "Yes",
    admin: "Yes",
    pm: "Yes",
    teamLead: "No",
    developer: "No",
    qa: "No",
  },
  {
    action: "Create sprint",
    ceo: "Yes",
    admin: "Optional",
    pm: "Yes",
    teamLead: "No",
    developer: "No",
    qa: "No",
  },
  {
    action: "Invite employee",
    ceo: "Yes",
    admin: "Yes",
    pm: "No",
    teamLead: "No",
    developer: "No",
    qa: "No",
  },
  {
    action: "View all projects",
    ceo: "Yes",
    admin: "Yes",
    pm: "Assigned",
    teamLead: "Assigned",
    developer: "Assigned",
    qa: "Assigned",
  },
  {
    action: "Manage integrations",
    ceo: "Yes",
    admin: "Yes",
    pm: "No",
    teamLead: "No",
    developer: "No",
    qa: "No",
  },
  {
    action: "Access audit settings",
    ceo: "Yes",
    admin: "Yes",
    pm: "No",
    teamLead: "No",
    developer: "No",
    qa: "No",
  },
]

export const adminInvitationRows = [
  {
    name: "Devika Sen",
    email: "devika@collabworkspace.com",
    role: "Associate Project Coordinator",
    status: "Pending",
    sentOn: "Apr 8, 2026",
  },
  {
    name: "Mitali Rao",
    email: "mitali@collabworkspace.com",
    role: "QA",
    status: "Draft",
    sentOn: "Not sent",
  },
]

export const adminAuthSettings = [
  {
    label: "Auth provider",
    value: "WorkOS (planned)",
    status: "Configured in design",
  },
  {
    label: "Login mode",
    value: "Email + org-based access",
    status: "Ready for implementation",
  },
  {
    label: "MFA policy",
    value: "Required for admin and CEO roles",
    status: "Recommended",
  },
  { label: "Allowed domains", value: "collabworkspace.com", status: "Draft" },
  { label: "Session length", value: "8 hours", status: "Draft" },
]

export const adminIntegrationRows = [
  {
    integration: "Google Calendar",
    owner: "Admin",
    status: "Planned",
    scope: "Meeting scheduling and sync",
  },
  {
    integration: "Google Meet",
    owner: "Admin",
    status: "Planned",
    scope: "Meeting link generation",
  },
  {
    integration: "Gmail",
    owner: "Admin",
    status: "Planned",
    scope: "Email notifications and thread workflows",
  },
  {
    integration: "AWS S3",
    owner: "Admin",
    status: "Platform ready",
    scope: "Secure file storage",
  },
]

export const adminNotificationRows = [
  {
    event: "Task assigned",
    email: "On",
    inApp: "On",
    defaultRole: "Developer",
  },
  {
    event: "Sprint created",
    email: "On",
    inApp: "On",
    defaultRole: "Project Manager",
  },
  { event: "QA handoff ready", email: "On", inApp: "On", defaultRole: "QA" },
  {
    event: "Approval pending",
    email: "On",
    inApp: "On",
    defaultRole: "CEO / PM",
  },
  {
    event: "Meeting scheduled",
    email: "On",
    inApp: "On",
    defaultRole: "All attendees",
  },
]

export const adminSecurityRows = [
  { control: "Audit log retention", value: "180 days", status: "Recommended" },
  {
    control: "Private file access",
    value: "Signed URLs only",
    status: "Required",
  },
  { control: "Role change logging", value: "Enabled", status: "Required" },
  {
    control: "Export restriction",
    value: "Admin and CEO only",
    status: "Recommended",
  },
  {
    control: "IP/device review",
    value: "Planned for later phase",
    status: "Later",
  },
]

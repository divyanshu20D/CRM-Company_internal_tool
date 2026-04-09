import type { SprintDetailRecord } from "@/components/sprint/sprint-detail-types"

export const sprintDetails: SprintDetailRecord[] = [
  {
    id: "northstar-sprint-12",
    projectId: "northstar-client-portal",
    projectName: "Northstar Client Portal",
    projectLabel: "Propti",
    parentItem: "NS-214",
    parentItemType: "Execution track",
    title: "Sprint 12 - QA stabilization and review readiness",
    summary:
      "Protect the QA window, close auth-risk work, and get the sprint ready for stakeholder review without pulling in non-critical polish.",
    description:
      "This sprint is focused on stabilizing the remaining auth-risk path, packaging evidence for QA, and preserving the review freeze for stakeholder-facing work. Lower-priority polish should stay out unless the main QA pressure is cleared early.",
    status: "Active",
    owner: "Aashish Kumar",
    reporter: "Devika Sen",
    sprintType: "Delivery sprint",
    priority: "High",
    sprintLabel: "Sprint 12",
    tagLabel: "qa-recovery, stakeholder-review",
    dueDate: "18-Apr-2026",
    estimatedTime: "120 hours",
    loggedTime: "0d 18h 0m",
    timeTrackingHint:
      "Team members should log hours against active child issues and QA evidence work.",
    createdBy: "Devika Sen",
    createdAt: "08-Apr-2026, 01:13 PM",
    modifiedBy: "Aashish Kumar",
    modifiedAt: "08-Apr-2026, 03:16 PM",
    plannedIssues: [
      {
        id: "NS-214",
        title: "Fix clinician note sync after token rotation",
        assignee: "Rohan P.",
        status: "To Do",
      },
      {
        id: "NS-219",
        title: "QA regression retest after auth cleanup",
        assignee: "Ritika J.",
        status: "To Do",
      },
      {
        id: "NS-227",
        title: "Provider setup copy polish for review build",
        assignee: "Megha D.",
        status: "To Do",
      },
      {
        id: "NS-231",
        title: "Stakeholder review checklist and sign-off notes",
        assignee: "Kabir A.",
        status: "To Do",
      },
    ],
    checklist: [
      "Lock sprint scope before the next QA call.",
      "Confirm environment readiness for regression and retest.",
      "Package review notes before stakeholder-facing freeze.",
      "Keep optional enhancements out unless QA pressure drops.",
    ],
    activity: [
      {
        author: "Aashish Kumar",
        role: "Team Lead",
        time: "08-Apr-2026, 03:16 PM",
        note: "Adjusted the sprint goal to keep export polish out until auth fallback is fully stable.",
      },
      {
        author: "Devika Sen",
        role: "Coordinator",
        time: "08-Apr-2026, 02:42 PM",
        note: "Added stakeholder review checklist and aligned the due date with the client-facing review window.",
      },
      {
        author: "Ritika J.",
        role: "QA",
        time: "08-Apr-2026, 01:58 PM",
        note: "Marked regression coverage as a high-risk focus because the environment is still missing one seeded data pack.",
      },
    ],
  },
  {
    id: "helix-sprint-8",
    projectId: "helix-patient-ops-console",
    projectName: "Helix Patient Ops Console",
    projectLabel: "Helix Patient Ops",
    parentItem: "HX-TL-09",
    parentItemType: "Execution track",
    title: "Sprint 8 - Pilot readiness and QA handoff control",
    summary:
      "Drive the active build queue toward the internal pilot while keeping QA handoffs clean and not overloading the team with low-value polish.",
    description:
      "This sprint protects the operator-facing pilot by sequencing the queue carefully, closing the pagination and export work, and maintaining a tight handoff rhythm with QA. Non-blocking UI cleanup should only move if the core pilot path stays safe.",
    status: "Active",
    owner: "Aashish Kumar",
    reporter: "Kalash Pachauri",
    sprintType: "Delivery sprint",
    priority: "Medium",
    sprintLabel: "Sprint 8",
    tagLabel: "pilot-readiness, qa-handoff",
    dueDate: "15-Apr-2026",
    estimatedTime: "96 hours",
    loggedTime: "0d 12h 30m",
    timeTrackingHint:
      "Developers should log time for build completion and evidence packaging before QA handoff.",
    createdBy: "Kalash Pachauri",
    createdAt: "07-Apr-2026, 11:02 AM",
    modifiedBy: "Aashish Kumar",
    modifiedAt: "08-Apr-2026, 04:02 PM",
    plannedIssues: [
      {
        id: "HX-TL-09",
        title: "Admission queue pagination",
        assignee: "Karan S.",
        status: "To Do",
      },
      {
        id: "HX-TL-11",
        title: "Patient handoff timeline state handling",
        assignee: "Niharika V.",
        status: "To Do",
      },
      {
        id: "HX-TL-13",
        title: "Admission export download state",
        assignee: "Irfan M.",
        status: "To Do",
      },
      {
        id: "HX-TL-16",
        title: "QA evidence package for operator pilot",
        assignee: "Mitali R.",
        status: "To Do",
      },
    ],
    checklist: [
      "Finish pagination flow with safe seed-data validation.",
      "Close export-state evidence before the QA handoff window.",
      "Keep pilot-facing stories above visual cleanup work.",
      "Escalate stale staging data if it affects validation again.",
    ],
    activity: [
      {
        author: "Aashish Kumar",
        role: "Team Lead",
        time: "08-Apr-2026, 04:02 PM",
        note: "Shifted one low-priority cleanup item out so the team can protect the pilot readiness path.",
      },
      {
        author: "Mitali R.",
        role: "QA",
        time: "08-Apr-2026, 03:35 PM",
        note: "Added the export evidence requirement and marked pagination validation as partially blocked on staging seed refresh.",
      },
      {
        author: "Kalash Pachauri",
        role: "Project Manager",
        time: "08-Apr-2026, 12:40 PM",
        note: "Aligned the sprint due date with the internal pilot commitment and asked the team to avoid pulling in extra polish.",
      },
    ],
  },
  {
    id: "atlas-sprint-19",
    projectId: "atlas-commerce-refresh",
    projectName: "Atlas Commerce Refresh",
    projectLabel: "Atlas Retail",
    parentItem: "AT-88",
    parentItemType: "Release track",
    title: "Sprint 19 - Release candidate stabilization and sign-off prep",
    summary:
      "Finish the release-candidate path, keep checkout risk low, and protect the QA sign-off window without pulling extra analytics cleanup into scope.",
    description:
      "This sprint is focused on closing the last checkout-state defects, finishing the cross-device QA sweep, and preparing the release candidate for sign-off. Any polish or analytics follow-up should only move if the release path remains fully stable.",
    status: "Active",
    owner: "Riya P.",
    reporter: "Arjun M.",
    sprintType: "Release sprint",
    priority: "Medium",
    sprintLabel: "Sprint 19",
    tagLabel: "release-candidate, qa-signoff",
    dueDate: "13-Apr-2026",
    estimatedTime: "88 hours",
    loggedTime: "0d 14h 30m",
    timeTrackingHint:
      "Log time against checkout fixes, QA evidence work, and release-candidate validations.",
    createdBy: "Riya P.",
    createdAt: "06-Apr-2026, 10:20 AM",
    modifiedBy: "Arjun M.",
    modifiedAt: "08-Apr-2026, 02:18 PM",
    plannedIssues: [
      {
        id: "AT-88",
        title: "Payment summary state mismatch on refresh",
        assignee: "Kunal S.",
        status: "To Do",
      },
      {
        id: "AT-94",
        title: "Promo-code journey verification",
        assignee: "Vaibhav D.",
        status: "To Do",
      },
      {
        id: "AT-101",
        title: "Cross-device sign-off evidence package",
        assignee: "Vaibhav D.",
        status: "To Do",
      },
      {
        id: "AT-106",
        title: "Coupon edge-case validation notes",
        assignee: "Priya V.",
        status: "To Do",
      },
    ],
    checklist: [
      "Close checkout-state defects before the sign-off prep call.",
      "Finish cross-device QA evidence and attach the release bundle.",
      "Keep analytics follow-up out unless core release items are safe.",
      "Confirm promo and coupon edge cases before the final release review.",
    ],
    activity: [
      {
        author: "Riya P.",
        role: "Project Manager",
        time: "08-Apr-2026, 02:18 PM",
        note: "Trimmed analytics follow-up out of the main sprint focus so the release candidate can stay clean.",
      },
      {
        author: "Vaibhav D.",
        role: "QA",
        time: "08-Apr-2026, 01:44 PM",
        note: "Marked cross-device evidence as the highest QA priority before the client sign-off window.",
      },
      {
        author: "Arjun M.",
        role: "Tech Lead",
        time: "08-Apr-2026, 12:12 PM",
        note: "Requested one more validation pass on the payment summary state after the latest checkout fix.",
      },
    ],
  },
  {
    id: "meridian-sprint-24",
    projectId: "meridian-crm-rollout",
    projectName: "Meridian CRM Rollout",
    projectLabel: "Meridian Advisory",
    parentItem: "MR-301",
    parentItemType: "UAT track",
    title: "Sprint 24 - UAT readiness and migration-quality control",
    summary:
      "Protect UAT readiness, close migration retry defects, and lock the role-test scope before approvals begin to slip further.",
    description:
      "This sprint keeps the team focused on migration stability, retry-handling fixes, and UAT preparation. The scope should remain narrow until validation and role-test coverage are safely under control.",
    status: "Active",
    owner: "Aman T.",
    reporter: "Nivedita R.",
    sprintType: "UAT sprint",
    priority: "High",
    sprintLabel: "Sprint 24",
    tagLabel: "uat-readiness, migration-quality",
    dueDate: "14-Apr-2026",
    estimatedTime: "104 hours",
    loggedTime: "0d 16h 0m",
    timeTrackingHint:
      "Time should be logged against migration fixes, role validation work, and UAT preparation tasks.",
    createdBy: "Aman T.",
    createdAt: "05-Apr-2026, 09:10 AM",
    modifiedBy: "Nivedita R.",
    modifiedAt: "08-Apr-2026, 01:32 PM",
    plannedIssues: [
      {
        id: "MR-301",
        title: "Import retry handling leaves partial records",
        assignee: "Anjali R.",
        status: "To Do",
      },
      {
        id: "MR-309",
        title: "Role permission test matrix",
        assignee: "Puneet G.",
        status: "To Do",
      },
      {
        id: "MR-314",
        title: "Migration rehearsal checklist",
        assignee: "Parth C.",
        status: "To Do",
      },
      {
        id: "MR-320",
        title: "UAT participant access confirmation",
        assignee: "Aman T.",
        status: "To Do",
      },
    ],
    checklist: [
      "Close retry-handling defect before migration rehearsal starts.",
      "Lock role-test matrix scope with QA before the UAT plan is finalized.",
      "Escalate backend validation ownership if it blocks rehearsal timing again.",
      "Do not add post-UAT improvements until approval-risk items are cleared.",
    ],
    activity: [
      {
        author: "Aman T.",
        role: "Project Manager",
        time: "08-Apr-2026, 01:32 PM",
        note: "Moved UAT participant access confirmation into the sprint because the approval path depends on it.",
      },
      {
        author: "Puneet G.",
        role: "QA",
        time: "08-Apr-2026, 12:46 PM",
        note: "Raised the role-test matrix as a high-risk item until the PM scope lock is confirmed.",
      },
      {
        author: "Nivedita R.",
        role: "Tech Lead",
        time: "08-Apr-2026, 11:55 AM",
        note: "Flagged retry handling as the gating issue for safe migration rehearsal and UAT confidence.",
      },
    ],
  },
]

export function getSprintDetail(projectId?: string, sprintId?: string) {
  return (
    sprintDetails.find(
      (record) => record.projectId === projectId && record.id === sprintId
    ) ?? sprintDetails[0]
  )
}

export function getSprintDetailById(sprintId?: string) {
  return (
    sprintDetails.find((record) => record.id === sprintId) ?? sprintDetails[0]
  )
}

export function getSprintDetailsForProject(projectId?: string) {
  const filtered = sprintDetails.filter(
    (record) => record.projectId === projectId
  )
  return filtered.length > 0 ? filtered : sprintDetails
}

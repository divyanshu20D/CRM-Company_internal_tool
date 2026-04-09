import { createBrowserRouter, Navigate } from "react-router-dom";

import { AdminLayout } from "@/components/admin/admin-layout";
import { ProtectedRoleRoute, RoleLandingRedirect } from "@/app/route-guards";
import { DeveloperLayout } from "@/components/developer/developer-layout";
import { ProjectManagerLayout } from "@/components/project-manager/project-manager-layout";
import { QaLayout } from "@/components/qa/qa-layout";
import { TeamLeadLayout } from "@/components/team-lead/team-lead-layout";
import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { AdminAssignmentsPage } from "@/pages/admin-assignments-page";
import { AdminDashboardPage } from "@/pages/admin-dashboard-page";
import { AdminEmployeeProfilePage } from "@/pages/admin-employee-profile-page";
import { AdminEmployeesPage } from "@/pages/admin-employees-page";
import { AdminNewEmployeePage } from "@/pages/admin-new-employee-page";
import { AdminRolesPage } from "@/pages/admin-roles-page";
import { AdminSettingsAuthPage } from "@/pages/admin-settings-auth-page";
import { AdminSettingsIntegrationsPage } from "@/pages/admin-settings-integrations-page";
import { AdminSettingsInvitationsPage } from "@/pages/admin-settings-invitations-page";
import { AdminSettingsNotificationsPage } from "@/pages/admin-settings-notifications-page";
import { AdminSettingsOrganizationPage } from "@/pages/admin-settings-organization-page";
import { AdminSettingsPermissionsPage } from "@/pages/admin-settings-permissions-page";
import { AdminSettingsSecurityPage } from "@/pages/admin-settings-security-page";
import { AdminSettingsPage } from "@/pages/admin-settings-page";
import { AdminTeamsPage } from "@/pages/admin-teams-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { DeveloperBlockersPage } from "@/pages/developer-blockers-page";
import { DeveloperDashboardPage } from "@/pages/developer-dashboard-page";
import { DeveloperDiscussionsPage } from "@/pages/developer-discussions-page";
import { DeveloperFilesPage } from "@/pages/developer-files-page";
import { DeveloperMeetingsPage } from "@/pages/developer-meetings-page";
import { DeveloperNotificationsPage } from "@/pages/developer-notifications-page";
import { DeveloperSprintDetailPage } from "@/pages/developer-sprint-detail-page";
import { DeveloperSprintPage } from "@/pages/developer-sprint-page";
import { DeveloperTaskDetailPage } from "@/pages/developer-task-detail-page";
import { DeveloperTasksPage } from "@/pages/developer-tasks-page";
import { GovernancePage } from "@/pages/governance-page";
import { LoginPage } from "@/pages/login-page";
import { MeetingsPage } from "@/pages/meetings-page";
import { NotificationsPage } from "@/pages/notifications-page";
import { PortfolioPage } from "@/pages/portfolio-page";
import { ProjectManagerBacklogPage } from "@/pages/project-manager-backlog-page";
import { ProjectManagerBoardPage } from "@/pages/project-manager-board-page";
import { ProjectManagerCalendarPage } from "@/pages/project-manager-calendar-page";
import { ProjectManagerApprovalsPage } from "@/pages/project-manager-approvals-page";
import { ProjectManagerCreateProjectPage } from "@/pages/project-manager-create-project-page";
import { ProjectManagerCreateSprintPage } from "@/pages/project-manager-create-sprint-page";
import { ProjectManagerActionItemsPage } from "@/pages/project-manager-action-items-page";
import { ProjectManagerDashboardPage } from "@/pages/project-manager-dashboard-page";
import { ProjectManagerDependenciesPage } from "@/pages/project-manager-dependencies-page";
import { ProjectManagerDiscussionsPage } from "@/pages/project-manager-discussions-page";
import { ProjectManagerFilesPage } from "@/pages/project-manager-files-page";
import { ProjectManagerIssueDetailPage } from "@/pages/project-manager-issue-detail-page";
import { ProjectManagerIssuesPage } from "@/pages/project-manager-issues-page";
import { ProjectManagerMeetingsPage } from "@/pages/project-manager-meetings-page";
import { ProjectManagerNotificationsPage } from "@/pages/project-manager-notifications-page";
import { ProjectManagerProjectOverviewPage } from "@/pages/project-manager-project-overview-page";
import { ProjectManagerProjectsPage } from "@/pages/project-manager-projects-page";
import { ProjectManagerQaPage } from "@/pages/project-manager-qa-page";
import { ProjectManagerReportsPage } from "@/pages/project-manager-reports-page";
import { ProjectManagerRisksPage } from "@/pages/project-manager-risks-page";
import { ProjectManagerSprintDetailPage } from "@/pages/project-manager-sprint-detail-page";
import { ProjectManagerSprintsPage } from "@/pages/project-manager-sprints-page";
import { ProjectManagerTeamPage } from "@/pages/project-manager-team-page";
import { ProjectManagerTimelinePage } from "@/pages/project-manager-timeline-page";
import { ProjectManagerWorkloadPage } from "@/pages/project-manager-workload-page";
import { ProjectsPage } from "@/pages/projects-page";
import { QaBugsPage } from "@/pages/qa-bugs-page";
import { QaDashboardPage } from "@/pages/qa-dashboard-page";
import { QaDiscussionsPage } from "@/pages/qa-discussions-page";
import { QaEnhancementsPage } from "@/pages/qa-enhancements-page";
import { QaFilesPage } from "@/pages/qa-files-page";
import { QaMeetingsPage } from "@/pages/qa-meetings-page";
import { QaNotificationsPage } from "@/pages/qa-notifications-page";
import { QaQueuesPage } from "@/pages/qa-queues-page";
import { QaRetestsPage } from "@/pages/qa-retests-page";
import { QaSignoffPage } from "@/pages/qa-signoff-page";
import { QaTaskDetailPage } from "@/pages/qa-task-detail-page";
import { TeamLeadBlockersPage } from "@/pages/team-lead-blockers-page";
import { TeamLeadBoardPage } from "@/pages/team-lead-board-page";
import { TeamLeadCalendarPage } from "@/pages/team-lead-calendar-page";
import { TeamLeadCreateMeetingPage } from "@/pages/team-lead-create-meeting-page";
import { TeamLeadDashboardPage } from "@/pages/team-lead-dashboard-page";
import { TeamLeadMeetingsPage } from "@/pages/team-lead-meetings-page";
import { TeamLeadNotificationsPage } from "@/pages/team-lead-notifications-page";
import { TeamLeadProjectBlockersPage } from "@/pages/team-lead-project-blockers-page";
import { TeamLeadProjectDiscussionsPage } from "@/pages/team-lead-project-discussions-page";
import { TeamLeadProjectMeetingsPage } from "@/pages/team-lead-project-meetings-page";
import { TeamLeadProjectOverviewPage } from "@/pages/team-lead-project-overview-page";
import { TeamLeadProjectQaHandoffPage } from "@/pages/team-lead-project-qa-handoff-page";
import { TeamLeadProjectsPage } from "@/pages/team-lead-projects-page";
import { TeamLeadQaHandoffsPage } from "@/pages/team-lead-qa-handoffs-page";
import { TeamLeadSprintsPage } from "@/pages/team-lead-sprints-page";
import { TeamLeadSprintDetailPage } from "@/pages/team-lead-sprint-detail-page";
import { TeamLeadTasksPage } from "@/pages/team-lead-tasks-page";
import { TeamLeadTeamPage } from "@/pages/team-lead-team-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleLandingRedirect />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoleRoute allowedRoles={["ceo"]} />,
    children: [
      {
        path: "/ceo",
        element: <WorkspaceLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
          {
            path: "meetings",
            element: <MeetingsPage />,
          },
          {
            path: "portfolio",
            element: <PortfolioPage />,
          },
          {
            path: "projects",
            element: <ProjectsPage />,
          },
          {
            path: "governance",
            element: <GovernancePage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoleRoute allowedRoles={["project-manager"]} />,
    children: [
      {
        path: "/project-manager",
        element: <ProjectManagerLayout />,
        children: [
          {
            index: true,
            element: <ProjectManagerDashboardPage />,
          },
          {
            path: "projects",
            element: <ProjectManagerProjectsPage />,
          },
          {
            path: "projects/new",
            element: <ProjectManagerCreateProjectPage />,
          },
          {
            path: "notifications",
            element: <ProjectManagerNotificationsPage />,
          },
          {
            path: "calendar",
            element: <ProjectManagerCalendarPage />,
          },
          {
            path: "workload",
            element: <ProjectManagerWorkloadPage />,
          },
          {
            path: "approvals",
            element: <ProjectManagerApprovalsPage />,
          },
          {
            path: "projects/:projectId",
            element: <ProjectManagerProjectOverviewPage />,
          },
          {
            path: "projects/:projectId/board",
            element: <ProjectManagerBoardPage />,
          },
          {
            path: "projects/:projectId/backlog",
            element: <ProjectManagerBacklogPage />,
          },
          {
            path: "projects/:projectId/sprints",
            element: <ProjectManagerSprintsPage />,
          },
          {
            path: "projects/:projectId/sprints/new",
            element: <ProjectManagerCreateSprintPage />,
          },
          {
            path: "projects/:projectId/sprints/:sprintId",
            element: <ProjectManagerSprintDetailPage />,
          },
          {
            path: "projects/:projectId/issues",
            element: <ProjectManagerIssuesPage />,
          },
          {
            path: "projects/:projectId/issues/:issueId",
            element: <ProjectManagerIssueDetailPage />,
          },
          {
            path: "projects/:projectId/team",
            element: <ProjectManagerTeamPage />,
          },
          {
            path: "projects/:projectId/meetings",
            element: <ProjectManagerMeetingsPage />,
          },
          {
            path: "projects/:projectId/discussions",
            element: <ProjectManagerDiscussionsPage />,
          },
          {
            path: "projects/:projectId/qa",
            element: <ProjectManagerQaPage />,
          },
          {
            path: "projects/:projectId/risks",
            element: <ProjectManagerRisksPage />,
          },
          {
            path: "projects/:projectId/dependencies",
            element: <ProjectManagerDependenciesPage />,
          },
          {
            path: "projects/:projectId/files",
            element: <ProjectManagerFilesPage />,
          },
          {
            path: "projects/:projectId/action-items",
            element: <ProjectManagerActionItemsPage />,
          },
          {
            path: "projects/:projectId/timeline",
            element: <ProjectManagerTimelinePage />,
          },
          {
            path: "projects/:projectId/reports",
            element: <ProjectManagerReportsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoleRoute allowedRoles={["team-lead"]} />,
    children: [
      {
        path: "/team-lead",
        element: <TeamLeadLayout />,
        children: [
          {
            index: true,
            element: <TeamLeadDashboardPage />,
          },
          {
            path: "projects",
            element: <TeamLeadProjectsPage />,
          },
          {
            path: "notifications",
            element: <TeamLeadNotificationsPage />,
          },
          {
            path: "calendar",
            element: <TeamLeadCalendarPage />,
          },
          {
            path: "meetings",
            element: <TeamLeadMeetingsPage />,
          },
          {
            path: "meetings/new",
            element: <TeamLeadCreateMeetingPage />,
          },
          {
            path: "blockers",
            element: <TeamLeadBlockersPage />,
          },
          {
            path: "qa-handoffs",
            element: <TeamLeadQaHandoffsPage />,
          },
          {
            path: "projects/:projectId",
            element: <TeamLeadProjectOverviewPage />,
          },
          {
            path: "projects/:projectId/board",
            element: <TeamLeadBoardPage />,
          },
          {
            path: "projects/:projectId/sprints",
            element: <TeamLeadSprintsPage />,
          },
          {
            path: "projects/:projectId/meetings",
            element: <TeamLeadProjectMeetingsPage />,
          },
          {
            path: "projects/:projectId/sprints/:sprintId",
            element: <TeamLeadSprintDetailPage />,
          },
          {
            path: "projects/:projectId/tasks",
            element: <TeamLeadTasksPage />,
          },
          {
            path: "projects/:projectId/team",
            element: <TeamLeadTeamPage />,
          },
          {
            path: "projects/:projectId/blockers",
            element: <TeamLeadProjectBlockersPage />,
          },
          {
            path: "projects/:projectId/qa-handoff",
            element: <TeamLeadProjectQaHandoffPage />,
          },
          {
            path: "projects/:projectId/discussions",
            element: <TeamLeadProjectDiscussionsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoleRoute allowedRoles={["developer"]} />,
    children: [
      {
        path: "/developer",
        element: <DeveloperLayout />,
        children: [
          {
            index: true,
            element: <DeveloperDashboardPage />,
          },
          {
            path: "tasks",
            element: <DeveloperTasksPage />,
          },
          {
            path: "tasks/:taskId",
            element: <DeveloperTaskDetailPage />,
          },
          {
            path: "sprint",
            element: <DeveloperSprintPage />,
          },
          {
            path: "projects/:projectId/sprints/:sprintId",
            element: <DeveloperSprintDetailPage />,
          },
          {
            path: "blockers",
            element: <DeveloperBlockersPage />,
          },
          {
            path: "meetings",
            element: <DeveloperMeetingsPage />,
          },
          {
            path: "discussions",
            element: <DeveloperDiscussionsPage />,
          },
          {
            path: "files",
            element: <DeveloperFilesPage />,
          },
          {
            path: "notifications",
            element: <DeveloperNotificationsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoleRoute allowedRoles={["qa"]} />,
    children: [
      {
        path: "/qa",
        element: <QaLayout />,
        children: [
          {
            index: true,
            element: <QaDashboardPage />,
          },
          {
            path: "queues",
            element: <QaQueuesPage />,
          },
          {
            path: "tasks/:taskId",
            element: <QaTaskDetailPage />,
          },
          {
            path: "retests",
            element: <QaRetestsPage />,
          },
          {
            path: "signoff",
            element: <QaSignoffPage />,
          },
          {
            path: "bugs",
            element: <QaBugsPage />,
          },
          {
            path: "enhancements",
            element: <QaEnhancementsPage />,
          },
          {
            path: "meetings",
            element: <QaMeetingsPage />,
          },
          {
            path: "discussions",
            element: <QaDiscussionsPage />,
          },
          {
            path: "files",
            element: <QaFilesPage />,
          },
          {
            path: "notifications",
            element: <QaNotificationsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoleRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: "employees",
            element: <AdminEmployeesPage />,
          },
          {
            path: "employees/new",
            element: <AdminNewEmployeePage />,
          },
          {
            path: "employees/:employeeId",
            element: <AdminEmployeeProfilePage />,
          },
          {
            path: "roles",
            element: <AdminRolesPage />,
          },
          {
            path: "assignments",
            element: <AdminAssignmentsPage />,
          },
          {
            path: "teams",
            element: <AdminTeamsPage />,
          },
          {
            path: "settings",
            element: <AdminSettingsPage />,
          },
          {
            path: "settings/organization",
            element: <AdminSettingsOrganizationPage />,
          },
          {
            path: "settings/permissions",
            element: <AdminSettingsPermissionsPage />,
          },
          {
            path: "settings/invitations",
            element: <AdminSettingsInvitationsPage />,
          },
          {
            path: "settings/auth",
            element: <AdminSettingsAuthPage />,
          },
          {
            path: "settings/integrations",
            element: <AdminSettingsIntegrationsPage />,
          },
          {
            path: "settings/notifications",
            element: <AdminSettingsNotificationsPage />,
          },
          {
            path: "settings/security",
            element: <AdminSettingsSecurityPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

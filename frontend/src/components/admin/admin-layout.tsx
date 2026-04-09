import {
  ChevronRight,
  FolderKanban,
  KanbanSquare,
  Network,
  Settings2,
  ShieldCheck,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { adminEmployees, getAdminEmployee } from "@/components/admin/admin-data";

function getPageMeta(pathname: string, employeeName: string) {
  if (pathname === "/admin") {
    return {
      title: "Admin Workspace",
      subtitle: "Employee onboarding, assignments, roles, and organization structure across the platform",
    };
  }

  if (pathname === "/admin/employees") {
    return {
      title: "Employee Directory",
      subtitle: "Full employee list with roles, managers, access scope, and assignment visibility",
    };
  }

  if (pathname === "/admin/employees/new") {
    return {
      title: "Add Employee",
      subtitle: "Create a new employee record with role, reporting line, and initial access assignment",
    };
  }

  if (pathname === "/admin/roles") {
    return {
      title: "Role Matrix",
      subtitle: "Current product roles and the access scope each one carries in the platform",
    };
  }

  if (pathname === "/admin/assignments") {
    return {
      title: "Project Assignments",
      subtitle: "Who is assigned where, in what role, and with what current ownership level",
    };
  }

  if (pathname === "/admin/teams") {
    return {
      title: "Team Structure",
      subtitle: "Delivery pods, reporting lines, and operational grouping across projects",
    };
  }

  if (pathname === "/admin/settings") {
    return {
      title: "Admin Settings",
      subtitle: "Organization-wide settings for structure, permissions, auth, integrations, notifications, and security",
    };
  }

  if (pathname === "/admin/settings/organization") {
    return {
      title: "Organization Settings",
      subtitle: "Core organization defaults like timezone, cadence, working days, and platform identity",
    };
  }

  if (pathname === "/admin/settings/permissions") {
    return {
      title: "Permission Model",
      subtitle: "Role-based access rules that define what each workspace can create, view, and manage",
    };
  }

  if (pathname === "/admin/settings/invitations") {
    return {
      title: "Invitation Settings",
      subtitle: "Pending invites, invite defaults, and onboarding state across the organization",
    };
  }

  if (pathname === "/admin/settings/auth") {
    return {
      title: "Authentication Settings",
      subtitle: "WorkOS planning, MFA policy, session rules, and allowed domain controls",
    };
  }

  if (pathname === "/admin/settings/integrations") {
    return {
      title: "Integration Settings",
      subtitle: "Google and storage integrations, ownership, and current rollout status",
    };
  }

  if (pathname === "/admin/settings/notifications") {
    return {
      title: "Notification Settings",
      subtitle: "Default in-app and email behaviors for key workflow events across roles",
    };
  }

  if (pathname === "/admin/settings/security") {
    return {
      title: "Security Settings",
      subtitle: "Audit, file access, export, and session safety controls for the platform",
    };
  }

  if (pathname.includes("/employees/")) {
    return {
      title: employeeName,
      subtitle: "Employee profile with role, assignments, reporting line, and access context",
    };
  }

  return {
    title: "Admin Workspace",
    subtitle: "Employee onboarding, assignments, roles, and organization structure across the platform",
  };
}

export function AdminLayout() {
  const location = useLocation();
  const employeeId = location.pathname.startsWith("/admin/employees/") && location.pathname !== "/admin/employees/new"
    ? location.pathname.split("/").pop()
    : undefined;
  const selectedEmployee = getAdminEmployee(employeeId);
  const pageMeta = getPageMeta(location.pathname, selectedEmployee.name);
  const workspaceRoutes = [
    "/admin",
    "/admin/employees",
    "/admin/employees/new",
    "/admin/roles",
    "/admin/assignments",
    "/admin/teams",
    "/admin/settings",
    "/admin/settings/organization",
    "/admin/settings/permissions",
    "/admin/settings/invitations",
    "/admin/settings/auth",
    "/admin/settings/integrations",
    "/admin/settings/notifications",
    "/admin/settings/security",
  ];
  const isWorkspaceRoute = workspaceRoutes.includes(location.pathname);

  return (
    <SidebarProvider
      defaultOpen
      className="min-h-svh bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_28%),radial-gradient(circle_at_right,_rgba(16,185,129,0.07),_transparent_22%),var(--background)]"
    >
      <Sidebar collapsible="icon" variant="inset" className="border-r-0">
        <SidebarHeader className="gap-3 border-b border-sidebar-border/60 p-3">
          <SidebarMenuButton size="lg" className="h-auto rounded-xl border border-sidebar-border/60 bg-sidebar-accent/25 px-3 py-3 shadow-sm">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <UserCog className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm">
              <span className="truncate font-semibold">Admin Workspace</span>
              <span className="truncate text-xs text-muted-foreground">People and access shell</span>
            </div>
          </SidebarMenuButton>

          <SidebarInput placeholder="Search employees, teams, roles..." className="rounded-lg" />
        </SidebarHeader>

        <SidebarContent className="gap-0">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/admin"} tooltip="Overview">
                    <NavLink to="/admin">
                      <FolderKanban />
                      <span>Overview</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/admin/employees" || (location.pathname.startsWith("/admin/employees/") && location.pathname !== "/admin/employees/new")} tooltip="Employees">
                    <NavLink to="/admin/employees">
                      <Users />
                      <span>Employees</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-blue-100 px-1.5 text-[10px] font-bold text-blue-700">
                    {adminEmployees.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/admin/employees/new"} tooltip="Add Employee">
                    <NavLink to="/admin/employees/new">
                      <UserPlus />
                      <span>Add Employee</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/admin/roles"} tooltip="Roles">
                    <NavLink to="/admin/roles">
                      <ShieldCheck />
                      <span>Roles</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/admin/assignments"} tooltip="Assignments">
                    <NavLink to="/admin/assignments">
                      <KanbanSquare />
                      <span>Assignments</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/admin/teams"} tooltip="Teams">
                    <NavLink to="/admin/teams">
                      <Network />
                      <span>Teams</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <Collapsible defaultOpen={location.pathname.startsWith("/admin/settings")} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Settings" isActive={location.pathname.startsWith("/admin/settings")}>
                        <Settings2 />
                        <span>Settings</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === "/admin/settings"}>
                            <NavLink to="/admin/settings">Overview</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === "/admin/settings/organization"}>
                            <NavLink to="/admin/settings/organization">Organization</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === "/admin/settings/permissions"}>
                            <NavLink to="/admin/settings/permissions">Permissions</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === "/admin/settings/invitations"}>
                            <NavLink to="/admin/settings/invitations">Invitations</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === "/admin/settings/auth"}>
                            <NavLink to="/admin/settings/auth">Auth</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === "/admin/settings/integrations"}>
                            <NavLink to="/admin/settings/integrations">Integrations</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === "/admin/settings/notifications"}>
                            <NavLink to="/admin/settings/notifications">Notifications</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === "/admin/settings/security"}>
                            <NavLink to="/admin/settings/security">Security</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="opacity-50" />

          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Employee Profiles</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Employee directory">
                        <Users />
                        <span>Directory Tree</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {adminEmployees.map((employee) => (
                          <SidebarMenuSubItem key={employee.id}>
                            <SidebarMenuSubButton asChild isActive={location.pathname === `/admin/employees/${employee.id}`}>
                              <NavLink to={`/admin/employees/${employee.id}`}>{employee.name}</NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border/60 p-3">
          <div className="rounded-xl border border-sidebar-border/50 bg-gradient-to-r from-sidebar-accent/40 to-sidebar-accent/15 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="size-9 shrink-0 ring-2 ring-background shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-emerald-50 font-semibold text-blue-700">
                  DS
                </AvatarFallback>
              </Avatar>
              <div className="grid text-sm">
                <span className="font-semibold">Divyanshu Sharma</span>
                <span className="text-xs text-muted-foreground">Admin workspace owner</span>
              </div>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 bg-transparent">
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
          <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/95 px-4 py-3 shadow-sm">
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-semibold">{pageMeta.title}</span>
              <span className="truncate text-xs text-muted-foreground">{pageMeta.subtitle}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 shadow-sm">
                {isWorkspaceRoute ? "Admin workspace" : selectedEmployee.role}
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 shadow-sm">
                {isWorkspaceRoute ? "People and access view" : selectedEmployee.department}
              </Badge>
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                {isWorkspaceRoute ? "Owner: Admin" : selectedEmployee.status}
              </Badge>
            </div>
          </header>

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

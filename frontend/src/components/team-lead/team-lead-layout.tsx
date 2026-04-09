import {
  BellDot,
  CalendarClock,
  CalendarPlus2,
  ChevronRight,
  CircleDot,
  Columns3,
  Flag,
  FolderKanban,
  KanbanSquare,
  ListTodo,
  MessageSquareText,
  ShieldCheck,
  TriangleAlert,
  UsersRound,
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
import { getTlProject, tlGlobalBlockers, tlGlobalQaHandoffs, tlMeetings, tlProjects } from "@/components/team-lead/tl-data";

function getSelectedProjectId(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const projectsIndex = segments.findIndex((segment) => segment === "projects");

  if (projectsIndex >= 0 && segments[projectsIndex + 1]) {
    return segments[projectsIndex + 1];
  }

  return tlProjects[0].id;
}

function getPageMeta(pathname: string, projectName: string) {
  if (pathname === "/team-lead") {
    return {
      title: "Team Lead Workspace",
      subtitle: "Daily build execution across assignments, blockers, QA readiness, and review flow",
    };
  }

  if (pathname === "/team-lead/projects") {
    return {
      title: "Assigned Projects",
      subtitle: "All active delivery streams currently owned by the team lead",
    };
  }

  if (pathname === "/team-lead/notifications") {
    return {
      title: "Delivery Notifications",
      subtitle: "Engineering, review, blocker, and QA events that need action during the day",
    };
  }

  if (pathname === "/team-lead/calendar") {
    return {
      title: "Execution Calendar",
      subtitle: "Standups, blocker reviews, QA handoff windows, and release prep meetings",
    };
  }

  if (pathname === "/team-lead/meetings") {
    return {
      title: "Team Meetings",
      subtitle: "Internal project meetings owned by the team lead across developers, PM, and QA participants",
    };
  }

  if (pathname === "/team-lead/meetings/new") {
    return {
      title: "Schedule Meeting",
      subtitle: "Create a project meeting for developers, PM, QA, and delivery stakeholders on the assigned project",
    };
  }

  if (pathname === "/team-lead/blockers") {
    return {
      title: "Global Blockers",
      subtitle: "All open delivery blockers across the team lead's project portfolio",
    };
  }

  if (pathname === "/team-lead/qa-handoffs") {
    return {
      title: "Global QA Handoffs",
      subtitle: "Stories moving from build to QA and the evidence still needed for each one",
    };
  }

  if (pathname.includes("/board")) return { title: `${projectName} Board`, subtitle: "Execution board showing the live movement of build, review, and QA-ready work" };
  if (pathname.endsWith("/sprints")) {
    return {
      title: `${projectName} Sprints`,
      subtitle: "Sprint list for the selected project, with direct access to each sprint's full execution detail page",
    };
  }
  if (pathname.includes("/sprints/")) {
    return {
      title: `${projectName} Sprint Detail`,
      subtitle: "Full sprint detail view with linked work, execution notes, ownership, and activity history",
    };
  }
  if (pathname.includes("/meetings")) return { title: `${projectName} Meetings`, subtitle: "Project meetings, internal syncs, and delivery coordination owned by the team lead" };
  if (pathname.includes("/tasks")) return { title: `${projectName} Tasks`, subtitle: "Assigned stories, delivery ownership, ETA risk, and QA state per item" };
  if (pathname.includes("/team")) return { title: `${projectName} Team`, subtitle: "Developers, QA, support roles, and current bandwidth on this project" };
  if (pathname.includes("/blockers")) return { title: `${projectName} Blockers`, subtitle: "Active delivery blockers, owner context, and the next removal step" };
  if (pathname.includes("/qa-handoff")) return { title: `${projectName} QA Handoff`, subtitle: "Developer-to-QA handoff queue, evidence quality, and validation targets" };
  if (pathname.includes("/discussions")) return { title: `${projectName} Discussions`, subtitle: "Open delivery discussions, review threads, and scope decisions still in motion" };

  return {
    title: projectName,
    subtitle: "Project overview with current focus, build pressure, blocker coverage, and handoff readiness",
  };
}

export function TeamLeadLayout() {
  const location = useLocation();
  const workspaceRoutes = [
    "/team-lead",
    "/team-lead/projects",
    "/team-lead/notifications",
    "/team-lead/calendar",
    "/team-lead/meetings",
    "/team-lead/meetings/new",
    "/team-lead/blockers",
    "/team-lead/qa-handoffs",
  ];
  const isWorkspaceRoute = workspaceRoutes.includes(location.pathname);
  const selectedProject = getTlProject(getSelectedProjectId(location.pathname));
  const pageMeta = getPageMeta(location.pathname, selectedProject.name);
  const projectBase = `/team-lead/projects/${selectedProject.id}`;

  return (
    <SidebarProvider
      defaultOpen
      className="min-h-svh bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_28%),radial-gradient(circle_at_right,_rgba(16,185,129,0.07),_transparent_22%),var(--background)]"
    >
      <Sidebar collapsible="icon" variant="inset" className="border-r-0">
        <SidebarHeader className="gap-3 border-b border-sidebar-border/60 p-3">
          <SidebarMenuButton size="lg" className="h-auto rounded-xl border border-sidebar-border/60 bg-sidebar-accent/25 px-3 py-3 shadow-sm">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <KanbanSquare className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm">
              <span className="truncate font-semibold">Team Lead Workspace</span>
              <span className="truncate text-xs text-muted-foreground">Build execution shell</span>
            </div>
          </SidebarMenuButton>

          <SidebarInput placeholder="Search tasks, blockers, handoffs..." className="rounded-lg" />
        </SidebarHeader>

        <SidebarContent className="gap-0">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/team-lead"} tooltip="Overview">
                    <NavLink to="/team-lead">
                      <FolderKanban />
                      <span>Overview</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/team-lead/projects"} tooltip="Projects">
                    <NavLink to="/team-lead/projects">
                      <Flag />
                      <span>Projects</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/team-lead/blockers"} tooltip="Blockers">
                    <NavLink to="/team-lead/blockers">
                      <TriangleAlert />
                      <span>Blockers</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700">
                    {tlGlobalBlockers.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/team-lead/qa-handoffs"} tooltip="QA Handoffs">
                    <NavLink to="/team-lead/qa-handoffs">
                      <ShieldCheck />
                      <span>QA Handoffs</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-teal-100 px-1.5 text-[10px] font-bold text-teal-700">
                    {tlGlobalQaHandoffs.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/team-lead/notifications"} tooltip="Notifications">
                    <NavLink to="/team-lead/notifications">
                      <BellDot />
                      <span>Notifications</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/team-lead/calendar"} tooltip="Calendar">
                    <NavLink to="/team-lead/calendar">
                      <CalendarClock />
                      <span>Calendar</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/team-lead/meetings" || location.pathname === "/team-lead/meetings/new"} tooltip="Meetings">
                    <NavLink to="/team-lead/meetings">
                      <CalendarPlus2 />
                      <span>Meetings</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-emerald-100 px-1.5 text-[10px] font-bold text-emerald-700">
                    {tlMeetings.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="opacity-50" />

          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Selected Project</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={selectedProject.name}>
                        <FolderKanban />
                        <span>{selectedProject.name}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === projectBase}>
                            <NavLink to={projectBase}>Overview</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === `${projectBase}/board`}>
                            <NavLink to={`${projectBase}/board`}>
                              <Columns3 />
                              <span>Board</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === `${projectBase}/sprints`}>
                            <NavLink to={`${projectBase}/sprints`}>
                              <ListTodo />
                              <span>Sprints</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === `${projectBase}/tasks`}>
                            <NavLink to={`${projectBase}/tasks`}>
                              <CircleDot />
                              <span>Tasks</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === `${projectBase}/team`}>
                            <NavLink to={`${projectBase}/team`}>
                              <UsersRound />
                              <span>Team</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === `${projectBase}/blockers`}>
                            <NavLink to={`${projectBase}/blockers`}>
                              <TriangleAlert />
                              <span>Blockers</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === `${projectBase}/qa-handoff`}>
                            <NavLink to={`${projectBase}/qa-handoff`}>
                              <ShieldCheck />
                              <span>QA Handoff</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === `${projectBase}/meetings`}>
                            <NavLink to={`${projectBase}/meetings`}>
                              <CalendarClock />
                              <span>Meetings</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={location.pathname === `${projectBase}/discussions`}>
                            <NavLink to={`${projectBase}/discussions`}>
                              <MessageSquareText />
                              <span>Discussions</span>
                            </NavLink>
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
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Assigned Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tlProjects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton asChild isActive={selectedProject.id === project.id} tooltip={project.name}>
                      <NavLink to={`/team-lead/projects/${project.id}`}>
                        <CircleDot />
                        <span>{project.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border/60 p-3">
          <div className="rounded-xl border border-sidebar-border/50 bg-gradient-to-r from-sidebar-accent/40 to-sidebar-accent/15 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="size-9 shrink-0 ring-2 ring-background shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-emerald-50 font-semibold text-blue-700">
                  AK
                </AvatarFallback>
              </Avatar>
              <div className="grid text-sm">
                <span className="font-semibold">Aashish Kumar</span>
                <span className="text-xs text-muted-foreground">Team lead execution mode</span>
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
                {isWorkspaceRoute ? "Team lead workspace" : selectedProject.sprint}
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 shadow-sm">
                {isWorkspaceRoute ? "Execution view" : selectedProject.status}
              </Badge>
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                {isWorkspaceRoute ? "Owner: Team lead" : selectedProject.releaseWindow}
              </Badge>
            </div>
          </header>

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

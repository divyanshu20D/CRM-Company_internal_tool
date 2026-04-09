import {
  BellDot,
  CalendarClock,
  ChevronRight,
  CircleDot,
  FileText,
  FolderKanban,
  KanbanSquare,
  MessageSquareText,
  TriangleAlert,
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
import { getSprintDetailById } from "@/components/sprint/sprint-detail-data";
import { developerBlockers, developerProjects, developerTasks, getDeveloperTask } from "@/components/developer/dev-data";

function getSelectedDeveloperProjectId(pathname: string, fallbackProjectId: string) {
  const segments = pathname.split("/").filter(Boolean);
  const projectsIndex = segments.findIndex((segment) => segment === "projects");

  if (projectsIndex >= 0 && segments[projectsIndex + 1]) {
    return segments[projectsIndex + 1];
  }

  return fallbackProjectId;
}

function getPageMeta(pathname: string, taskTitle: string) {
  if (pathname === "/developer") {
    return {
      title: "Developer Workspace",
      subtitle: "Assigned work, sprint focus, blockers, and handoff readiness for the current build cycle",
    };
  }

  if (pathname === "/developer/tasks") {
    return {
      title: "My Tasks",
      subtitle: "Every assigned task that currently needs build, review, or QA evidence work",
    };
  }

  if (pathname === "/developer/sprint") {
    return {
      title: "Current Sprint",
      subtitle: "The sprint lanes that matter to the developer right now: building, review, and QA ready",
    };
  }

  if (pathname.includes("/sprints/")) {
    return {
      title: "Sprint Detail",
      subtitle: "Full sprint working surface showing description, linked work, activity, and execution metadata",
    };
  }

  if (pathname === "/developer/blockers") {
    return {
      title: "My Blockers",
      subtitle: "Issues that are actively slowing delivery and need escalation, clarification, or environment help",
    };
  }

  if (pathname === "/developer/notifications") {
    return {
      title: "Developer Notifications",
      subtitle: "Actionable updates tied to assigned tasks, blockers, review movement, and QA handoff timing",
    };
  }

  if (pathname === "/developer/meetings") {
    return {
      title: "My Meetings",
      subtitle: "Standups, engineering syncs, and QA handoff windows relevant to current assignments",
    };
  }

  if (pathname === "/developer/discussions") {
    return {
      title: "My Discussions",
      subtitle: "Open task threads and technical conversations that still affect build decisions",
    };
  }

  if (pathname === "/developer/files") {
    return {
      title: "Reference Files",
      subtitle: "Evidence bundles, repro captures, and working notes attached to current assignments",
    };
  }

  if (pathname.includes("/tasks/")) {
    return {
      title: taskTitle,
      subtitle: "Task detail with acceptance criteria, dependencies, notes, and current branch context",
    };
  }

  return {
    title: "Developer Workspace",
    subtitle: "Assigned work, sprint focus, blockers, and handoff readiness for the current build cycle",
  };
}

export function DeveloperLayout() {
  const location = useLocation();
  const taskId = location.pathname.startsWith("/developer/tasks/") ? location.pathname.split("/").pop() : undefined;
  const selectedTask = getDeveloperTask(taskId);
  const sprintId = location.pathname.includes("/sprints/") ? location.pathname.split("/").pop() : undefined;
  const selectedSprint = getSprintDetailById(sprintId);
  const selectedProjectId = getSelectedDeveloperProjectId(location.pathname, selectedTask.projectId);
  const pageMeta = getPageMeta(location.pathname, selectedTask.title);
  const workspaceRoutes = [
    "/developer",
    "/developer/tasks",
    "/developer/sprint",
    "/developer/blockers",
    "/developer/meetings",
    "/developer/discussions",
    "/developer/files",
    "/developer/notifications",
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
              <KanbanSquare className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm">
              <span className="truncate font-semibold">Developer Workspace</span>
              <span className="truncate text-xs text-muted-foreground">Assigned build shell</span>
            </div>
          </SidebarMenuButton>

          <SidebarInput placeholder="Search tasks, notes, files..." className="rounded-lg" />
        </SidebarHeader>

        <SidebarContent className="gap-0">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/developer"} tooltip="Overview">
                    <NavLink to="/developer">
                      <FolderKanban />
                      <span>Overview</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/developer/tasks" || location.pathname.startsWith("/developer/tasks/")} tooltip="My Tasks">
                    <NavLink to="/developer/tasks">
                      <CircleDot />
                      <span>My Tasks</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-blue-100 px-1.5 text-[10px] font-bold text-blue-700">
                    {developerTasks.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/developer/sprint"} tooltip="Current Sprint">
                    <NavLink to="/developer/sprint">
                      <KanbanSquare />
                      <span>Current Sprint</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/developer/blockers"} tooltip="Blockers">
                    <NavLink to="/developer/blockers">
                      <TriangleAlert />
                      <span>Blockers</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700">
                    {developerBlockers.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/developer/meetings"} tooltip="Meetings">
                    <NavLink to="/developer/meetings">
                      <CalendarClock />
                      <span>Meetings</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/developer/discussions"} tooltip="Discussions">
                    <NavLink to="/developer/discussions">
                      <MessageSquareText />
                      <span>Discussions</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/developer/files"} tooltip="Files">
                    <NavLink to="/developer/files">
                      <FileText />
                      <span>Files</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/developer/notifications"} tooltip="Notifications">
                    <NavLink to="/developer/notifications">
                      <BellDot />
                      <span>Notifications</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="opacity-50" />

          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Assigned Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {developerProjects.map((project) => (
                  <Collapsible key={project.id} defaultOpen={project.id === selectedProjectId} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={project.name}>
                          <FolderKanban />
                          <span>{project.name}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {developerTasks
                            .filter((task) => task.projectId === project.id)
                            .map((task) => (
                              <SidebarMenuSubItem key={task.id}>
                                <SidebarMenuSubButton asChild isActive={location.pathname === `/developer/tasks/${task.id}`}>
                                  <NavLink to={`/developer/tasks/${task.id}`}>{task.id}</NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border/60 p-3">
          <div className="rounded-xl border border-sidebar-border/50 bg-gradient-to-r from-sidebar-accent/40 to-sidebar-accent/15 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="size-9 shrink-0 ring-2 ring-background shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 font-semibold text-blue-700">
                  RP
                </AvatarFallback>
              </Avatar>
              <div className="grid text-sm">
                <span className="font-semibold">Rohan Patel</span>
                <span className="text-xs text-muted-foreground">Developer execution mode</span>
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
                {isWorkspaceRoute ? "Developer workspace" : location.pathname.includes("/sprints/") ? selectedSprint.sprintLabel : selectedTask.id}
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 shadow-sm">
                {isWorkspaceRoute ? "Assigned execution view" : location.pathname.includes("/sprints/") ? selectedSprint.status : selectedTask.status}
              </Badge>
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                {isWorkspaceRoute ? "Owner: Developer" : location.pathname.includes("/sprints/") ? selectedSprint.projectName : selectedTask.branch}
              </Badge>
            </div>
          </header>

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

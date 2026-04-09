import {
  BarChart3,
  BellDot,
  CalendarRange,
  ChevronRight,
  CircleDot,
  Columns3,
  Flag,
  FolderGit2,
  FolderKanban,
  Layers3,
  Link2,
  ListTodo,
  ListChecks,
  MessageSquareText,
  Paperclip,
  PlusSquare,
  Route,
  ShieldCheck,
  UsersRound,
} from "lucide-react"
import { NavLink, Outlet, useLocation } from "react-router-dom"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
} from "@/components/ui/sidebar"
import { getPmProject, pmProjects } from "@/components/project-manager/pm-data"

function getSelectedProjectId(pathname: string) {
  if (pathname === "/project-manager/projects/new") {
    return undefined
  }

  const segments = pathname.split("/").filter(Boolean)
  const projectsIndex = segments.findIndex((segment) => segment === "projects")

  if (projectsIndex >= 0 && segments[projectsIndex + 1]) {
    return segments[projectsIndex + 1]
  }

  return pmProjects[0].id
}

function getPageMeta(pathname: string, projectName: string) {
  if (pathname === "/project-manager") {
    return {
      title: "Project Manager Hub",
      subtitle:
        "Execution control across projects, teams, QA, meetings, and sprint delivery",
    }
  }

  if (pathname === "/project-manager/projects") {
    return {
      title: "Assigned Projects",
      subtitle:
        "Project directory for active work owned by the project manager",
    }
  }

  if (pathname === "/project-manager/projects/new") {
    return {
      title: "Create Project",
      subtitle:
        "Project setup for team ownership, sprint structure, QA alignment, and kickoff planning",
    }
  }

  if (pathname === "/project-manager/notifications") {
    return {
      title: "PM Notifications",
      subtitle: "Approvals, delivery alerts, QA updates, and meeting changes",
    }
  }

  if (pathname === "/project-manager/calendar") {
    return {
      title: "Project Calendar",
      subtitle:
        "Meetings, review windows, sprint checkpoints, and milestone dates",
    }
  }

  if (pathname === "/project-manager/workload") {
    return {
      title: "Workload & Capacity",
      subtitle:
        "Team allocation, overload risk, and delivery capacity across active projects",
    }
  }

  if (pathname === "/project-manager/approvals") {
    return {
      title: "Approval Queue",
      subtitle:
        "Pending PM approvals across staffing, QA, UAT, and release movement",
    }
  }

  if (pathname.includes("/board"))
    return {
      title: `${projectName} Board`,
      subtitle: "Kanban-style sprint execution and work movement",
    }
  if (pathname.includes("/backlog"))
    return {
      title: `${projectName} Backlog`,
      subtitle: "Prioritized work ready for planning and grooming",
    }
  if (pathname.includes("/sprints/new"))
    return {
      title: `${projectName} Create Sprint`,
      subtitle:
        "Sprint setup for dates, goal, velocity, and delivery expectations",
    }
  if (/\/sprints\/[^/]+$/.test(pathname))
    return {
      title: `${projectName} Sprint Detail`,
      subtitle:
        "Full sprint working surface with planned issues, ownership, activity, and execution metadata",
    }
  if (pathname.includes("/sprints"))
    return {
      title: `${projectName} Sprints`,
      subtitle: "Sprint cadence, velocity, goals, and active execution windows",
    }
  if (pathname.includes("/issues/"))
    return {
      title: `${projectName} Issue`,
      subtitle: "Issue detail with ownership, acceptance, and recent updates",
    }
  if (pathname.includes("/issues"))
    return {
      title: `${projectName} Issues`,
      subtitle: "All bugs, tasks, stories, blockers, and status flow",
    }
  if (pathname.includes("/team"))
    return {
      title: `${projectName} Team`,
      subtitle: "Tech lead, team lead, developers, QA, and current allocation",
    }
  if (pathname.includes("/meetings"))
    return {
      title: `${projectName} Meetings`,
      subtitle: "Project meetings, Google Meet flow, and agenda tracking",
    }
  if (pathname.includes("/discussions"))
    return {
      title: `${projectName} Discussions`,
      subtitle: "Project conversations, decisions, and follow-up threads",
    }
  if (pathname.includes("/qa"))
    return {
      title: `${projectName} QA`,
      subtitle: "Test coverage, QA owners, blockers, and sign-off readiness",
    }
  if (pathname.includes("/risks"))
    return {
      title: `${projectName} Risks`,
      subtitle:
        "Project risk register, severity, mitigations, and upcoming deadlines",
    }
  if (pathname.includes("/dependencies"))
    return {
      title: `${projectName} Dependencies`,
      subtitle: "Client and internal dependencies affecting delivery movement",
    }
  if (pathname.includes("/action-items"))
    return {
      title: `${projectName} Action Items`,
      subtitle:
        "Meeting follow-ups, owners, and due dates that still need execution",
    }
  if (pathname.includes("/files"))
    return {
      title: `${projectName} Files`,
      subtitle: "Project documents, evidence, and linked working material",
    }
  if (pathname.includes("/timeline"))
    return {
      title: `${projectName} Timeline`,
      subtitle: "Milestones, due dates, owners, and delivery sequencing",
    }
  if (pathname.includes("/reports"))
    return {
      title: `${projectName} Reports`,
      subtitle: "Sprint health, blocker age, readiness, and delivery summaries",
    }

  return {
    title: projectName,
    subtitle:
      "Project overview for execution, QA, meetings, team coordination, and active delivery",
  }
}

export function ProjectManagerLayout() {
  const location = useLocation()
  const isCreateProjectRoute =
    location.pathname === "/project-manager/projects/new"
  const isWorkspaceRoute = [
    "/project-manager",
    "/project-manager/projects",
    "/project-manager/projects/new",
    "/project-manager/notifications",
    "/project-manager/calendar",
    "/project-manager/workload",
    "/project-manager/approvals",
  ].includes(location.pathname)
  const selectedProject = getPmProject(getSelectedProjectId(location.pathname))
  const pageMeta = getPageMeta(location.pathname, selectedProject.name)
  const projectBase = `/project-manager/projects/${selectedProject.id}`

  return (
    <SidebarProvider
      defaultOpen
      className="min-h-svh bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_28%),radial-gradient(circle_at_right,_rgba(16,185,129,0.07),_transparent_22%),var(--background)]"
    >
      <Sidebar collapsible="icon" variant="inset" className="border-r-0">
        <SidebarHeader className="gap-3 border-b border-sidebar-border/60 p-3">
          <SidebarMenuButton
            size="lg"
            className="h-auto rounded-xl border border-sidebar-border/60 bg-sidebar-accent/25 px-3 py-3 shadow-sm"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <FolderKanban className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm">
              <span className="truncate font-semibold">
                Project Manager Hub
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Execution workspace
              </span>
            </div>
          </SidebarMenuButton>

          <SidebarInput
            placeholder="Search projects, issues, meetings..."
            className="rounded-lg"
          />
        </SidebarHeader>

        <SidebarContent className="gap-0">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] tracking-[0.1em] uppercase">
              Workspace
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/project-manager"}
                    tooltip="Overview"
                  >
                    <NavLink to="/project-manager">
                      <Layers3 />
                      <span>Overview</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/project-manager/projects"}
                    tooltip="Projects"
                  >
                    <NavLink to="/project-manager/projects">
                      <FolderGit2 />
                      <span>Projects</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === "/project-manager/projects/new"
                    }
                    tooltip="Create Project"
                  >
                    <NavLink to="/project-manager/projects/new">
                      <PlusSquare />
                      <span>Create Project</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === "/project-manager/notifications"
                    }
                    tooltip="Notifications"
                  >
                    <NavLink to="/project-manager/notifications">
                      <BellDot />
                      <span>Notifications</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-blue-100 px-1.5 text-[10px] font-bold text-blue-700">
                    9
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/project-manager/calendar"}
                    tooltip="Calendar"
                  >
                    <NavLink to="/project-manager/calendar">
                      <CalendarRange />
                      <span>Calendar</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/project-manager/workload"}
                    tooltip="Workload"
                  >
                    <NavLink to="/project-manager/workload">
                      <UsersRound />
                      <span>Workload</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === "/project-manager/approvals"
                    }
                    tooltip="Approvals"
                  >
                    <NavLink to="/project-manager/approvals">
                      <ListChecks />
                      <span>Approvals</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="opacity-50" />

          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] tracking-[0.1em] uppercase">
              Selected Project
            </SidebarGroupLabel>
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
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname === projectBase}
                          >
                            <NavLink to={projectBase}>Overview</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={
                              location.pathname === `${projectBase}/board`
                            }
                          >
                            <NavLink to={`${projectBase}/board`}>
                              <Columns3 />
                              <span>Board</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={
                              location.pathname === `${projectBase}/backlog`
                            }
                          >
                            <NavLink to={`${projectBase}/backlog`}>
                              <ListTodo />
                              <span>Backlog</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/sprints`
                            )}
                          >
                            <NavLink to={`${projectBase}/sprints`}>
                              <Flag />
                              <span>Sprints</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={
                              location.pathname === `${projectBase}/issues`
                            }
                          >
                            <NavLink to={`${projectBase}/issues`}>
                              <CircleDot />
                              <span>Issues</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/team`
                            )}
                          >
                            <NavLink to={`${projectBase}/team`}>
                              <UsersRound />
                              <span>Team</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/qa`
                            )}
                          >
                            <NavLink to={`${projectBase}/qa`}>
                              <ShieldCheck />
                              <span>QA</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/risks`
                            )}
                          >
                            <NavLink to={`${projectBase}/risks`}>
                              <Flag />
                              <span>Risks</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/dependencies`
                            )}
                          >
                            <NavLink to={`${projectBase}/dependencies`}>
                              <Link2 />
                              <span>Dependencies</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/meetings`
                            )}
                          >
                            <NavLink to={`${projectBase}/meetings`}>
                              <CalendarRange />
                              <span>Meetings</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/discussions`
                            )}
                          >
                            <NavLink to={`${projectBase}/discussions`}>
                              <MessageSquareText />
                              <span>Discussions</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/action-items`
                            )}
                          >
                            <NavLink to={`${projectBase}/action-items`}>
                              <ListChecks />
                              <span>Action Items</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/files`
                            )}
                          >
                            <NavLink to={`${projectBase}/files`}>
                              <Paperclip />
                              <span>Files</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/timeline`
                            )}
                          >
                            <NavLink to={`${projectBase}/timeline`}>
                              <Route />
                              <span>Timeline</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname.startsWith(
                              `${projectBase}/reports`
                            )}
                          >
                            <NavLink to={`${projectBase}/reports`}>
                              <BarChart3 />
                              <span>Reports</span>
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
            <SidebarGroupLabel className="text-[11px] tracking-[0.1em] uppercase">
              Assigned Projects
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {pmProjects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={selectedProject.id === project.id}
                      tooltip={project.name}
                    >
                      <NavLink to={`/project-manager/projects/${project.id}`}>
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
              <Avatar className="size-9 shrink-0 shadow-sm ring-2 ring-background">
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 font-semibold text-blue-700">
                  NV
                </AvatarFallback>
              </Avatar>
              <div className="grid text-sm">
                <span className="font-semibold">Kalash Pachauri</span>
                <span className="text-xs text-muted-foreground">
                  Project manager control mode
                </span>
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
              <span className="truncate text-xs text-muted-foreground">
                {pageMeta.subtitle}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
              >
                {isWorkspaceRoute ? "PM workspace" : selectedProject.sprint}
              </Badge>
              <Badge
                variant="outline"
                className="border-sky-200 bg-sky-50 text-sky-700 shadow-sm"
              >
                {isCreateProjectRoute
                  ? "New project setup"
                  : isWorkspaceRoute
                    ? "Cross-project view"
                    : selectedProject.status}
              </Badge>
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm"
              >
                {isWorkspaceRoute
                  ? "Owner: Project manager"
                  : `Next meeting: ${selectedProject.nextMeeting}`}
              </Badge>
            </div>
          </header>

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

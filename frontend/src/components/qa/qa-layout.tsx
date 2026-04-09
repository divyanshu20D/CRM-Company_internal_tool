import {
  BellDot,
  Bug,
  CalendarClock,
  ChevronRight,
  CircleDot,
  FileText,
  FolderKanban,
  KanbanSquare,
  Link2,
  MessageSquareText,
  ShieldCheck,
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
import { getQaItem, qaProjects, qaQueueItems, qaRetests, qaSignoffRows } from "@/components/qa/qa-data";

function getPageMeta(pathname: string, itemTitle: string) {
  if (pathname === "/qa") {
    return {
      title: "QA Workspace",
      subtitle: "Validation, retests, sign-off readiness, and external bug-tracker flow across active projects",
    };
  }

  if (pathname === "/qa/queues") {
    return {
      title: "Assigned QA Queue",
      subtitle: "Everything currently assigned for validation, regression, or bug verification",
    };
  }

  if (pathname === "/qa/retests") {
    return {
      title: "Retest Queue",
      subtitle: "Regression and retest work that still needs execution before the sprint can close cleanly",
    };
  }

  if (pathname === "/qa/signoff") {
    return {
      title: "Sign-off Readiness",
      subtitle: "A compact view of which projects are actually ready to close and which still need evidence or fixes",
    };
  }

  if (pathname === "/qa/bugs") {
    return {
      title: "Bug Sheets",
      subtitle: "External defect trackers maintained by QA for each assigned project",
    };
  }

  if (pathname === "/qa/enhancements") {
    return {
      title: "Enhancement Sheets",
      subtitle: "External enhancement trackers for ideas that sit outside the immediate validation queue",
    };
  }

  if (pathname === "/qa/meetings") {
    return {
      title: "QA Meetings",
      subtitle: "Review calls, sign-off prep, and dependency syncs relevant to current QA ownership",
    };
  }

  if (pathname === "/qa/discussions") {
    return {
      title: "QA Discussions",
      subtitle: "Open delivery threads affecting validation decisions, retests, or sign-off readiness",
    };
  }

  if (pathname === "/qa/files") {
    return {
      title: "QA Files",
      subtitle: "Evidence, checklists, recordings, and working material attached to current QA items",
    };
  }

  if (pathname === "/qa/notifications") {
    return {
      title: "QA Notifications",
      subtitle: "Actionable validation updates for blockers, build movement, retest readiness, and sign-off timing",
    };
  }

  if (pathname.includes("/tasks/")) {
    return {
      title: itemTitle,
      subtitle: "QA item detail with checks, blockers, evidence requirements, and build context",
    };
  }

  return {
    title: "QA Workspace",
    subtitle: "Validation, retests, sign-off readiness, and external bug-tracker flow across active projects",
  };
}

export function QaLayout() {
  const location = useLocation();
  const itemId = location.pathname.startsWith("/qa/tasks/") ? location.pathname.split("/").pop() : undefined;
  const selectedItem = getQaItem(itemId);
  const pageMeta = getPageMeta(location.pathname, selectedItem.title);
  const workspaceRoutes = [
    "/qa",
    "/qa/queues",
    "/qa/retests",
    "/qa/signoff",
    "/qa/bugs",
    "/qa/enhancements",
    "/qa/meetings",
    "/qa/discussions",
    "/qa/files",
    "/qa/notifications",
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
              <ShieldCheck className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm">
              <span className="truncate font-semibold">QA Workspace</span>
              <span className="truncate text-xs text-muted-foreground">Validation shell</span>
            </div>
          </SidebarMenuButton>

          <SidebarInput placeholder="Search QA items, sheets, evidence..." className="rounded-lg" />
        </SidebarHeader>

        <SidebarContent className="gap-0">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa"} tooltip="Overview">
                    <NavLink to="/qa">
                      <FolderKanban />
                      <span>Overview</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/queues" || location.pathname.startsWith("/qa/tasks/")} tooltip="Queues">
                    <NavLink to="/qa/queues">
                      <CircleDot />
                      <span>Queues</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-blue-100 px-1.5 text-[10px] font-bold text-blue-700">
                    {qaQueueItems.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/retests"} tooltip="Retests">
                    <NavLink to="/qa/retests">
                      <KanbanSquare />
                      <span>Retests</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-sky-100 px-1.5 text-[10px] font-bold text-sky-700">
                    {qaRetests.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/signoff"} tooltip="Sign-off">
                    <NavLink to="/qa/signoff">
                      <ShieldCheck />
                      <span>Sign-off</span>
                    </NavLink>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="rounded-full bg-teal-100 px-1.5 text-[10px] font-bold text-teal-700">
                    {qaSignoffRows.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/bugs"} tooltip="Bug Sheets">
                    <NavLink to="/qa/bugs">
                      <Bug />
                      <span>Bug Sheets</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/enhancements"} tooltip="Enhancements">
                    <NavLink to="/qa/enhancements">
                      <Link2 />
                      <span>Enhancements</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/meetings"} tooltip="Meetings">
                    <NavLink to="/qa/meetings">
                      <CalendarClock />
                      <span>Meetings</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/discussions"} tooltip="Discussions">
                    <NavLink to="/qa/discussions">
                      <MessageSquareText />
                      <span>Discussions</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/files"} tooltip="Files">
                    <NavLink to="/qa/files">
                      <FileText />
                      <span>Files</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === "/qa/notifications"} tooltip="Notifications">
                    <NavLink to="/qa/notifications">
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
                {qaProjects.map((project) => (
                  <Collapsible key={project.id} defaultOpen={project.id === selectedItem.projectId} className="group/collapsible">
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
                          {qaQueueItems
                            .filter((item) => item.projectId === project.id)
                            .map((item) => (
                              <SidebarMenuSubItem key={item.id}>
                                <SidebarMenuSubButton asChild isActive={location.pathname === `/qa/tasks/${item.id}`}>
                                  <NavLink to={`/qa/tasks/${item.id}`}>{item.id}</NavLink>
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
                <AvatarFallback className="bg-gradient-to-br from-teal-100 to-blue-50 font-semibold text-teal-700">
                  RJ
                </AvatarFallback>
              </Avatar>
              <div className="grid text-sm">
                <span className="font-semibold">Ritika Joshi</span>
                <span className="text-xs text-muted-foreground">QA validation mode</span>
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
                {isWorkspaceRoute ? "QA workspace" : selectedItem.id}
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 shadow-sm">
                {isWorkspaceRoute ? "Validation view" : selectedItem.status}
              </Badge>
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                {isWorkspaceRoute ? "Owner: QA" : selectedItem.build}
              </Badge>
            </div>
          </header>

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

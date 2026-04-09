import {
  BellDot,
  BriefcaseBusiness,
  Check,
  CalendarDays,
  ChevronRight,
  CircleDot,
  FolderKanban,
  GitBranch,
  Layers3,
  PanelLeft,
  PanelLeftClose,
  ShieldCheck,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { useWorkspace, WorkspaceProvider, workspaces, type WorkspaceShell } from "@/components/workspace/workspace-context";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/ceo": {
    title: "CEO Workspace",
    subtitle: "Executive overview for project health, meetings, and delivery control",
  },
  "/ceo/notifications": {
    title: "Notifications",
    subtitle: "Cross-project alerts, approvals, and operational updates",
  },
  "/ceo/meetings": {
    title: "Meetings",
    subtitle: "Calendar-linked delivery meetings and stakeholder schedules",
  },
  "/ceo/portfolio": {
    title: "Portfolio",
    subtitle: "High-level view of client portfolios, pressure, and progress",
  },
  "/ceo/projects": {
    title: "Projects",
    subtitle: "Project-level visibility for teams, blockers, and delivery rhythm",
  },
  "/ceo/governance": {
    title: "Governance",
    subtitle: "Roles, permissions, audit posture, and control surfaces",
  },
};

function WorkspaceSidebar({
  activeWorkspace,
  onWorkspaceChange,
}: {
  activeWorkspace: WorkspaceShell;
  onWorkspaceChange: (workspace: WorkspaceShell) => void;
}) {
  const location = useLocation();
  const { toggleSidebar, state } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="inset" className="border-r-0">
      <SidebarHeader className="gap-3 border-b border-sidebar-border/60 p-3">
        {/* Expanded: workspace switcher + toggle row */}
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
          {/* Workspace dropdown — hidden when collapsed */}
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-auto rounded-xl border border-sidebar-border/60 bg-gradient-to-r from-sidebar-accent/40 to-sidebar-accent/20 px-3 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                    <FolderKanban className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm">
                    <span className="truncate font-semibold">{activeWorkspace.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{activeWorkspace.description}</span>
                  </div>
                  <ChevronRight className="ml-auto size-4 opacity-40 transition-transform duration-200" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom">
                <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {workspaces.map((workspace) => (
                    <DropdownMenuItem
                      key={workspace.id}
                      onSelect={() => onWorkspaceChange(workspace)}
                      className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{workspace.name}</span>
                        <span className="text-xs text-muted-foreground">{workspace.description}</span>
                      </div>
                      {activeWorkspace.id === workspace.id ? (
                        <div className="flex size-5 items-center justify-center rounded-full bg-blue-100">
                          <Check className="size-3 text-blue-600" />
                        </div>
                      ) : null}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Toggle button — always visible, acts as expand trigger when collapsed */}
          <button
            onClick={toggleSidebar}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-sidebar-border/60 bg-background text-muted-foreground shadow-sm transition-all duration-200 hover:bg-sidebar-accent hover:text-foreground hover:shadow-md"
            aria-label="Toggle sidebar"
          >
            {state === "expanded" ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeft className="size-4" />
            )}
          </button>
        </div>

        {/* Search bar — hidden when collapsed */}
        <div className="group-data-[collapsible=icon]:hidden">
          <SidebarInput placeholder="Search projects, teams, meetings..." className="rounded-lg" />
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/ceo"} tooltip="Overview">
                  <NavLink to="/ceo">
                    <Layers3 />
                    <span>Overview</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/ceo/notifications"} tooltip="Notifications">
                  <NavLink to="/ceo/notifications">
                    <BellDot />
                    <span>Notifications</span>
                  </NavLink>
                </SidebarMenuButton>
                <SidebarMenuBadge className="rounded-full bg-blue-100 px-1.5 text-[10px] font-bold text-blue-700">
                  {activeWorkspace.notificationCount}
                </SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/ceo/meetings"} tooltip="Meetings">
                  <NavLink to="/ceo/meetings">
                    <CalendarDays />
                    <span>Meetings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="opacity-50" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.1em]">Delivery Tree</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Portfolio">
                      <BriefcaseBusiness />
                      <span>Portfolio</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={location.pathname === "/ceo/portfolio"}>
                          <NavLink to="/ceo/portfolio">Portfolio Overview</NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Projects">
                      <GitBranch />
                      <span>Projects</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={location.pathname === "/ceo/projects"}>
                          <NavLink to="/ceo/projects">Project Directory</NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {activeWorkspace.projectLinks.map((project) => (
                        <SidebarMenuSubItem key={project}>
                          <SidebarMenuSubButton>
                            <CircleDot className="text-sidebar-primary" />
                            <span>{project}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Governance">
                      <ShieldCheck />
                      <span>Governance</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={location.pathname === "/ceo/governance"}>
                          <NavLink to="/ceo/governance">Governance Center</NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60 p-3 group-data-[collapsible=icon]:p-2">
        <div className="rounded-xl border border-sidebar-border/50 bg-gradient-to-r from-sidebar-accent/40 to-sidebar-accent/15 p-3 shadow-sm group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:shadow-none">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <Avatar className="size-9 shrink-0 ring-2 ring-background shadow-sm group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:ring-1">
              <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 font-semibold text-blue-700">
                {activeWorkspace.footerInitials}
              </AvatarFallback>
            </Avatar>
            <div className="grid text-sm group-data-[collapsible=icon]:hidden">
              <span className="font-semibold">{activeWorkspace.footerName}</span>
              <span className="text-xs text-muted-foreground">{activeWorkspace.footerRole}</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function WorkspaceLayoutInner() {
  const location = useLocation();
  const current = pageMeta[location.pathname] ?? pageMeta["/ceo"];
  const { activeWorkspace, setActiveWorkspaceId } = useWorkspace();

  const handleWorkspaceChange = (workspace: WorkspaceShell) => {
    setActiveWorkspaceId(workspace.id);
    toast.success(`Switched to ${workspace.name}`);
  };

  return (
    <SidebarProvider
      defaultOpen
      className="min-h-svh bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_28%),radial-gradient(circle_at_right,_rgba(16,185,129,0.07),_transparent_22%),var(--background)]"
    >
      <WorkspaceSidebar activeWorkspace={activeWorkspace} onWorkspaceChange={handleWorkspaceChange} />
      <SidebarInset className="min-w-0 bg-transparent">
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
          <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/95 px-4 py-3 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold">{current.title}</span>
                <span className="truncate text-xs text-muted-foreground">{current.subtitle}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 shadow-sm">
                {activeWorkspace.name}
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 shadow-sm">
                {activeWorkspace.reviewBadge}
              </Badge>
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                {activeWorkspace.healthBadge}
              </Badge>
            </div>
          </header>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function WorkspaceLayout() {
  return (
    <WorkspaceProvider>
      <WorkspaceLayoutInner />
    </WorkspaceProvider>
  );
}

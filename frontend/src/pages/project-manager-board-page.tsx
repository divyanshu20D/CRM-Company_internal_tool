import { useState } from "react";
import { Filter, GripVertical, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { MemberAvatarStack } from "@/components/shared/member-avatar-stack";
import {
  type IssuePopoverPriority,
  type IssuePopoverStatus,
  type NewIssueDraft,
  MorphingIssuePopover,
} from "@/components/shared/morphing-issue-popover";
import { getSprintDetailsForProject } from "@/components/sprint/sprint-detail-data";
import { getPmProject } from "@/components/project-manager/pm-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type BoardTab = "Board" | "Issue List" | "Backlog" | "Completed Sprints" | "Notification Settings";
type GroupByOption = "none" | "assignee" | "priority";

type SprintBoardCard = {
  id: string;
  title: string;
  assignee: string;
  issueKey: string;
  estimate: string;
  status: IssuePopoverStatus;
  priority: IssuePopoverPriority;
  description?: string;
  issueType?: string;
};

const boardTabs: BoardTab[] = ["Board", "Issue List", "Backlog", "Completed Sprints", "Notification Settings"];
const statusOrder: IssuePopoverStatus[] = ["To Do", "In Progress", "In Review", "Ready for QA", "Done"];
const priorityOrder: Record<IssuePopoverPriority, number> = { High: 0, Medium: 1, Low: 2 };

const statusTone: Record<IssuePopoverStatus, string> = {
  "To Do": "bg-blue-500",
  "In Progress": "bg-amber-400",
  "In Review": "bg-rose-500",
  "Ready for QA": "bg-emerald-500",
  Done: "bg-slate-500",
};

const statusBadgeTone: Record<IssuePopoverStatus, string> = {
  "To Do": "border-blue-200 bg-blue-50 text-blue-700",
  "In Progress": "border-amber-200 bg-amber-50 text-amber-700",
  "In Review": "border-rose-200 bg-rose-50 text-rose-700",
  "Ready for QA": "border-emerald-200 bg-emerald-50 text-emerald-700",
  Done: "border-slate-200 bg-slate-50 text-slate-700",
};

const priorityTone: Record<IssuePopoverPriority, string> = {
  High: "border-rose-200 bg-rose-50 text-rose-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const notificationDefaults = {
  qa: true,
  blocker: true,
  review: true,
  dailyDigest: false,
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function toStatus(status: string): IssuePopoverStatus {
  const normalized = status.toLowerCase();
  if (normalized.includes("progress")) return "In Progress";
  if (normalized.includes("review")) return "In Review";
  if (normalized.includes("qa")) return "Ready for QA";
  if (normalized.includes("done") || normalized.includes("closed")) return "Done";
  return "To Do";
}

function toPriority(priority: string): IssuePopoverPriority {
  const normalized = priority.toLowerCase();
  if (normalized.includes("high")) return "High";
  if (normalized.includes("low")) return "Low";
  return "Medium";
}

function getIssuePrefix(issueKey: string) {
  const match = issueKey.match(/^(.*)-\d+$/);
  return match?.[1] ?? issueKey;
}

function getNextIssueKey(cards: SprintBoardCard[], prefix: string) {
  const maxNumber = cards.reduce((highest, card) => {
    const match = card.issueKey.match(/-(\d+)$/);
    const nextNumber = match ? Number(match[1]) : 0;
    return nextNumber > highest ? nextNumber : highest;
  }, 0);

  return `${prefix}-${maxNumber + 1}`;
}

function buildInitialCards(project: ReturnType<typeof getPmProject>) {
  const fallbackLead = project.teamLead || project.techLead;
  const explicitCards = project.issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    assignee: issue.assignee,
    issueKey: issue.id,
    estimate: issue.priority === "High" ? "5" : issue.priority === "Low" ? "2" : "3",
    status: toStatus(issue.status),
    priority: toPriority(issue.priority),
    description: issue.description,
    issueType: issue.type,
  }));

  const existingTitles = new Set(explicitCards.map((card) => card.title));
  const fallbackPeople = project.team.map((member) => member.name);
  const issuePrefix = getIssuePrefix(project.issues[0]?.id ?? `${project.id.slice(0, 2).toUpperCase()}-1`);

  const boardCards: SprintBoardCard[] = [
    ...project.board.backlog.map((title, index) => ({
      id: `${project.id}-todo-${index + 1}`,
      title,
      assignee: fallbackPeople[index % fallbackPeople.length] ?? fallbackLead,
      issueKey: `${issuePrefix}-${40 + index + 1}`,
      estimate: index % 2 === 0 ? "3" : "5",
      status: "To Do" as const,
      priority: "Medium" as const,
      issueType: "Task",
    })),
    ...project.board.inProgress.map((title, index) => ({
      id: `${project.id}-progress-${index + 1}`,
      title,
      assignee: fallbackPeople[(index + 1) % fallbackPeople.length] ?? fallbackLead,
      issueKey: `${issuePrefix}-${50 + index + 1}`,
      estimate: "5",
      status: "In Progress" as const,
      priority: "High" as const,
      issueType: "Story",
    })),
    ...project.board.review.map((title, index) => ({
      id: `${project.id}-review-${index + 1}`,
      title,
      assignee: fallbackPeople[(index + 2) % fallbackPeople.length] ?? fallbackLead,
      issueKey: `${issuePrefix}-${60 + index + 1}`,
      estimate: "3",
      status: "In Review" as const,
      priority: "Medium" as const,
      issueType: "Task",
    })),
    ...project.qa.map((suite, index) => ({
      id: `${project.id}-qa-${index + 1}`,
      title: suite.suite,
      assignee: suite.owner,
      issueKey: `${issuePrefix}-QA${index + 1}`,
      estimate: "2",
      status: "Ready for QA" as const,
      priority: suite.status.toLowerCase().includes("risk") ? ("High" as const) : ("Medium" as const),
      issueType: "QA",
    })),
    ...project.board.done.map((title, index) => ({
      id: `${project.id}-done-${index + 1}`,
      title,
      assignee: fallbackPeople[(index + 3) % fallbackPeople.length] ?? fallbackLead,
      issueKey: `${issuePrefix}-${70 + index + 1}`,
      estimate: "2",
      status: "Done" as const,
      priority: "Low" as const,
      issueType: "Task",
    })),
  ].filter((card) => !existingTitles.has(card.title));

  return [...explicitCards, ...boardCards];
}

export function ProjectManagerBoardPage() {
  const { projectId } = useParams();
  const project = getPmProject(projectId);
  const sprintOptions = getSprintDetailsForProject(project.id);
  const assignees = project.team.map((member) => member.name);
  const issuePrefix = getIssuePrefix(project.issues[0]?.id ?? `${project.id.slice(0, 2).toUpperCase()}-1`);

  const [activeTab, setActiveTab] = useState<BoardTab>("Board");
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [hoveredStatus, setHoveredStatus] = useState<IssuePopoverStatus | null>(null);
  const [cards, setCards] = useState<SprintBoardCard[]>(() => buildInitialCards(project));
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [groupBy, setGroupBy] = useState<GroupByOption>("none");
  const [selectedSprintId, setSelectedSprintId] = useState(sprintOptions[0]?.id ?? "");
  const [notificationSettings, setNotificationSettings] = useState(notificationDefaults);

  const selectedSprint = sprintOptions.find((sprint) => sprint.id === selectedSprintId) ?? sprintOptions[0];

  const filteredCards = cards
    .filter((card) => {
      const searchText = `${card.title} ${card.issueKey} ${card.assignee}`.toLowerCase();
      const matchesSearch = !searchQuery.trim() || searchText.includes(searchQuery.trim().toLowerCase());
      const matchesAssignee = assigneeFilter === "all" || card.assignee === assigneeFilter;
      const matchesPriority = priorityFilter === "all" || card.priority === priorityFilter;
      return matchesSearch && matchesAssignee && matchesPriority;
    })
    .sort((left, right) => {
      if (groupBy === "assignee") {
        return left.assignee.localeCompare(right.assignee) || left.title.localeCompare(right.title);
      }

      if (groupBy === "priority") {
        return priorityOrder[left.priority] - priorityOrder[right.priority] || left.title.localeCompare(right.title);
      }

      return left.title.localeCompare(right.title);
    });

  const moveCard = (cardId: string, nextStatus: IssuePopoverStatus) => {
    setCards((current) => {
      const currentCard = current.find((item) => item.id === cardId);
      if (!currentCard || currentCard.status === nextStatus) {
        return current;
      }

      toast.success(`${currentCard.issueKey} moved to ${nextStatus}.`);
      return current.map((card) => (card.id === cardId ? { ...card, status: nextStatus } : card));
    });
  };

  const deleteCard = (cardId: string) => {
    setCards((current) => {
      const currentCard = current.find((item) => item.id === cardId);
      if (!currentCard) {
        return current;
      }

      toast.success(`${currentCard.issueKey} removed from the board.`);
      return current.filter((card) => card.id !== cardId);
    });
  };

  const addIssue = (issue: NewIssueDraft) => {
    let createdIssueKey = "";

    setCards((current) => {
      const nextIssueKey = getNextIssueKey(current, issuePrefix);
      createdIssueKey = nextIssueKey;

      const nextCard: SprintBoardCard = {
        id: `${project.id}-${nextIssueKey.toLowerCase()}`,
        issueKey: nextIssueKey,
        title: issue.title,
        assignee: issue.assignee,
        status: issue.status,
        priority: issue.priority,
        estimate: issue.estimate || "3",
        description: issue.description,
        issueType: issue.issueType,
      };

      return [nextCard, ...current];
    });

    toast.success(`${createdIssueKey} created in ${issue.status}.`);
  };

  const renderBoard = () => (
    <div className="overflow-x-auto bg-muted/20 p-3">
      <div className="grid min-w-[1280px] grid-cols-5 gap-3">
        {statusOrder.map((status) => {
          const columnCards = filteredCards.filter((card) => card.status === status);
          const isActiveDropZone = hoveredStatus === status;

          return (
            <div
              key={status}
              className={cn(
                "flex min-h-[620px] flex-col rounded-md border border-border/80 bg-card/90",
                isActiveDropZone && "border-primary/40 bg-primary/5",
              )}
              onDragOver={(event) => {
                event.preventDefault();
                setHoveredStatus(status);
              }}
              onDragLeave={() => setHoveredStatus((current) => (current === status ? null : current))}
              onDrop={(event) => {
                event.preventDefault();
                if (draggedCardId) {
                  moveCard(draggedCardId, status);
                }
                setDraggedCardId(null);
                setHoveredStatus(null);
              }}
            >
              <div className="flex items-center justify-between border-b border-border/80 px-3 py-3">
                <div className="flex items-center gap-3">
                  <span className={cn("size-2.5 rounded-full", statusTone[status])} />
                  <span className="text-base font-semibold text-foreground">{status}</span>
                  <Badge variant="outline" className={statusBadgeTone[status]}>
                    {columnCards.length}
                  </Badge>
                </div>

                <MorphingIssuePopover assignees={assignees} defaultStatus={status} onSubmit={addIssue}>
                  <Button type="button" variant="ghost" size="icon-sm" className="rounded-md text-muted-foreground hover:text-foreground">
                    <Plus />
                  </Button>
                </MorphingIssuePopover>
              </div>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
                {columnCards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => setDraggedCardId(card.id)}
                    onDragEnd={() => {
                      setDraggedCardId(null);
                      setHoveredStatus(null);
                    }}
                    className={cn(
                      "rounded-md border border-border/80 bg-background px-3 py-3 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md",
                      draggedCardId === card.id && "opacity-70 ring-2 ring-primary/15",
                    )}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <button
                          type="button"
                          className="flex min-w-0 flex-1 flex-col gap-2 text-left"
                          onClick={() => toast.success(`${card.issueKey} is selected for PM issue-detail wiring.`)}
                        >
                          <div className="text-[15px] leading-7 text-foreground">{card.title}</div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className={priorityTone[card.priority]}>
                              {card.priority}
                            </Badge>
                            <Badge variant="outline" className="border-border/80 bg-background text-muted-foreground">
                              {card.issueType ?? "Task"}
                            </Badge>
                          </div>
                        </button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="shrink-0 rounded-md text-muted-foreground hover:bg-rose-50 hover:text-rose-700"
                          onClick={() => deleteCard(card.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-muted-foreground">
                        <GripVertical className="size-4" />
                        <div className="flex items-center gap-2">
                          <Avatar size="sm">
                            <AvatarFallback className="bg-violet-100 text-[10px] font-semibold text-violet-700">
                              {getInitials(card.assignee)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{card.issueKey}</span>
                          <div className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">{card.estimate}</div>
                        </div>
                      </div>

                      {groupBy !== "none" ? (
                        <div className="text-xs text-muted-foreground">
                          {groupBy === "assignee" ? `Assignee: ${card.assignee}` : `Priority: ${card.priority}`}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}

                {columnCards.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-border/80 bg-background/70 px-4 py-10 text-center text-sm text-muted-foreground">
                    Drop a sprint task here to move it into {status}.
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderIssueList = () => (
    <div className="px-4 py-4">
      <div className="overflow-hidden rounded-md border border-border/80 bg-background">
        <div className="grid grid-cols-[1.2fr_1.2fr_0.8fr_0.7fr_0.7fr] gap-4 border-b border-border/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span>Issue</span>
          <span>Assignee</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Estimate</span>
        </div>

        <div className="flex flex-col">
          {filteredCards.map((card) => (
            <button
              key={card.id}
              type="button"
              className="grid grid-cols-[1.2fr_1.2fr_0.8fr_0.7fr_0.7fr] gap-4 border-b border-border/80 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-muted/30"
              onClick={() => toast.success(`${card.issueKey} is ready for PM issue-detail wiring.`)}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{card.title}</p>
                <p className="text-xs text-muted-foreground">{card.issueKey}</p>
              </div>
              <span className="text-sm text-foreground">{card.assignee}</span>
              <Badge variant="outline" className={cn("justify-center", statusBadgeTone[card.status])}>
                {card.status}
              </Badge>
              <Badge variant="outline" className={cn("justify-center", priorityTone[card.priority])}>
                {card.priority}
              </Badge>
              <span className="text-sm text-muted-foreground">{card.estimate} pts</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBacklog = () => {
    const backlogCards = filteredCards.filter((card) => card.status === "To Do");

    return (
      <div className="grid gap-3 px-4 py-4">
        {backlogCards.map((card) => (
          <div key={card.id} className="rounded-md border border-border/80 bg-background px-4 py-3 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{card.title}</p>
                <p className="text-xs text-muted-foreground">
                  {card.issueKey} · {card.assignee}
                </p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => moveCard(card.id, "In Progress")}>
                Start work
              </Button>
            </div>
          </div>
        ))}

        {backlogCards.length === 0 ? (
          <div className="rounded-md border border-dashed border-border/80 bg-background px-4 py-8 text-center text-sm text-muted-foreground">
            No items are sitting in backlog after the current filters.
          </div>
        ) : null}
      </div>
    );
  };

  const renderCompletedSprints = () => (
    <div className="grid gap-3 px-4 py-4">
      {sprintOptions.map((sprint) => (
        <Link
          key={sprint.id}
          to={`/project-manager/projects/${project.id}/sprints/${sprint.id}`}
          className="rounded-md border border-border/80 bg-background px-4 py-4 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{sprint.sprintLabel}</p>
              <p className="text-sm text-muted-foreground">{sprint.summary}</p>
            </div>
            <Badge variant="outline" className={statusBadgeTone[sprint.status as IssuePopoverStatus] ?? "border-blue-200 bg-blue-50 text-blue-700"}>
              {sprint.status}
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="grid gap-3 px-4 py-4">
      {[
        { key: "qa", label: "QA movement alerts", description: "Notify the PM when a story enters QA-ready or comes back blocked." },
        { key: "blocker", label: "Escalation alerts", description: "Surface blockers that threaten sprint or review commitments." },
        { key: "review", label: "Review queue reminders", description: "Keep pending review items visible before they delay QA windows." },
        { key: "dailyDigest", label: "Evening PM digest", description: "Bundle board movement, approvals, and risk changes into one summary." },
      ].map((item) => {
        const value = notificationSettings[item.key as keyof typeof notificationSettings];

        return (
          <div key={item.key} className="flex items-center justify-between gap-4 rounded-md border border-border/80 bg-background px-4 py-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <Button
              type="button"
              variant={value ? "default" : "outline"}
              onClick={() =>
                setNotificationSettings((current) => ({
                  ...current,
                  [item.key]: !current[item.key as keyof typeof current],
                }))
              }
            >
              {value ? "Enabled" : "Disabled"}
            </Button>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="overflow-hidden rounded-md border border-border/80 bg-card shadow-sm">
      <div className="border-b border-border/80 bg-background px-4 py-3">
        <div className="flex flex-wrap items-center gap-5 text-sm">
          {boardTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "rounded-md px-3 py-2 font-medium transition-colors",
                activeTab === tab ? "bg-primary/8 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-border/80 bg-card/95 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" className="gap-2 rounded-md" onClick={() => setFiltersOpen((current) => !current)}>
              <Filter data-icon="inline-start" />
              {filtersOpen ? "Hide Filters" : "Filters"}
            </Button>

            <MemberAvatarStack members={project.team} />

            <div className="w-[230px]">
              <Select value={selectedSprintId} onValueChange={setSelectedSprintId}>
                <SelectTrigger className="h-10 w-full rounded-md border-border/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sprintOptions.map((sprint) => (
                      <SelectItem key={sprint.id} value={sprint.id}>
                        {sprint.sprintLabel} ({sprint.status})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <Sparkles className="size-4" />
              Ends by {selectedSprint?.dueDate ?? "18-Apr-2026"}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Group by:</span>
              <div className="w-[170px]">
                <Select value={groupBy} onValueChange={(value) => setGroupBy(value as GroupByOption)}>
                  <SelectTrigger className="h-10 w-full rounded-md border-border/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="assignee">Assignee</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <MorphingIssuePopover assignees={assignees} defaultStatus="To Do" onSubmit={addIssue}>
              <Button type="button" className="gap-2">
                <Plus data-icon="inline-start" />
                Create Issue
              </Button>
            </MorphingIssuePopover>
          </div>
        </div>

        {filtersOpen ? (
          <div className="mt-3 grid gap-3 rounded-md border border-border/80 bg-background px-3 py-3 md:grid-cols-[1.6fr_1fr_1fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by issue title, key, or assignee"
                className="h-10 rounded-md border-border/80 pl-9"
              />
            </div>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="h-10 w-full rounded-md border-border/80">
                <SelectValue placeholder="All assignees" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All assignees</SelectItem>
                  {assignees.map((assignee) => (
                    <SelectItem key={assignee} value={assignee}>
                      {assignee}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="h-10 w-full rounded-md border-border/80">
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setAssigneeFilter("all");
                setPriorityFilter("all");
                setGroupBy("none");
              }}
            >
              Clear
            </Button>
          </div>
        ) : null}
      </div>

      {activeTab === "Board" ? renderBoard() : null}
      {activeTab === "Issue List" ? renderIssueList() : null}
      {activeTab === "Backlog" ? renderBacklog() : null}
      {activeTab === "Completed Sprints" ? renderCompletedSprints() : null}
      {activeTab === "Notification Settings" ? renderNotificationSettings() : null}
    </section>
  );
}

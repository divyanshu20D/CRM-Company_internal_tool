"use client";

import { ArrowLeftIcon, Plus } from "lucide-react";
import { useState } from "react";

import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "@/components/core/morphing-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type IssuePopoverStatus = "To Do" | "In Progress" | "In Review" | "Ready for QA" | "Done";
export type IssuePopoverPriority = "Low" | "Medium" | "High";
export type IssuePopoverType = "Story" | "Task" | "Bug" | "Enhancement";

export type NewIssueDraft = {
  title: string;
  assignee: string;
  priority: IssuePopoverPriority;
  status: IssuePopoverStatus;
  estimate: string;
  description: string;
  issueType: IssuePopoverType;
};

type MorphingIssuePopoverProps = {
  assignees: string[];
  defaultStatus?: IssuePopoverStatus;
  defaultPriority?: IssuePopoverPriority;
  triggerClassName?: string;
  contentClassName?: string;
  title?: string;
  children: React.ReactNode;
  onSubmit?: (issue: NewIssueDraft) => void;
};

const issueTypes: IssuePopoverType[] = ["Story", "Task", "Bug", "Enhancement"];
const priorities: IssuePopoverPriority[] = ["Low", "Medium", "High"];
const statuses: IssuePopoverStatus[] = ["To Do", "In Progress", "In Review", "Ready for QA", "Done"];

export function MorphingIssuePopover({
  assignees,
  defaultStatus = "To Do",
  defaultPriority = "Medium",
  triggerClassName,
  contentClassName,
  title = "Create issue",
  children,
  onSubmit,
}: MorphingIssuePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<NewIssueDraft>({
    title: "",
    assignee: assignees[0] ?? "",
    priority: defaultPriority,
    status: defaultStatus,
    estimate: "3",
    description: "",
    issueType: "Story",
  });

  const closeMenu = () => {
    setDraft({
      title: "",
      assignee: assignees[0] ?? "",
      priority: defaultPriority,
      status: defaultStatus,
      estimate: "3",
      description: "",
      issueType: "Story",
    });
    setIsOpen(false);
  };

  return (
    <MorphingPopover
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.28,
      }}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <MorphingPopoverTrigger asChild className={cn(triggerClassName)}>
        {children}
      </MorphingPopoverTrigger>

      <MorphingPopoverContent
        align="end"
        className={cn("w-[420px] rounded-xl border border-border/80 bg-background p-0 shadow-xl", contentClassName)}
      >
        <form
          className="flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            if (!draft.title.trim()) {
              return;
            }

            onSubmit?.({
              ...draft,
              title: draft.title.trim(),
              description: draft.description.trim(),
            });
            closeMenu();
          }}
        >
          <div className="border-b border-border/80 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">Capture a new sprint issue and place it directly on the board.</p>
              </div>
              <Plus className="size-4 text-primary" />
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Issue title</label>
              <Input
                value={draft.title}
                onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                placeholder="Enter the issue title"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Issue type</label>
                <Select
                  value={draft.issueType}
                  onValueChange={(value) => setDraft((current) => ({ ...current, issueType: value as IssuePopoverType }))}
                >
                  <SelectTrigger className="w-full rounded-md border-border/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {issueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Assignee</label>
                <Select
                  value={draft.assignee}
                  onValueChange={(value) => setDraft((current) => ({ ...current, assignee: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border-border/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {assignees.map((assignee) => (
                        <SelectItem key={assignee} value={assignee}>
                          {assignee}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Priority</label>
                <Select
                  value={draft.priority}
                  onValueChange={(value) => setDraft((current) => ({ ...current, priority: value as IssuePopoverPriority }))}
                >
                  <SelectTrigger className="w-full rounded-md border-border/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Status</label>
                <Select
                  value={draft.status}
                  onValueChange={(value) => setDraft((current) => ({ ...current, status: value as IssuePopoverStatus }))}
                >
                  <SelectTrigger className="w-full rounded-md border-border/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Estimate</label>
                <Input
                  value={draft.estimate}
                  onChange={(event) => setDraft((current) => ({ ...current, estimate: event.target.value }))}
                  placeholder="3"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Description</label>
              <Textarea
                value={draft.description}
                onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                placeholder="Add the implementation note, blocker context, or QA expectation."
                className="min-h-28 rounded-md border-border/80"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border/80 px-2 py-3 pr-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              aria-label="Close issue popover"
              className="rounded-md bg-background hover:bg-accent"
            >
              <ArrowLeftIcon />
            </Button>

            <Button type="submit" disabled={!draft.title.trim()}>
              Create Issue
            </Button>
          </div>
        </form>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}

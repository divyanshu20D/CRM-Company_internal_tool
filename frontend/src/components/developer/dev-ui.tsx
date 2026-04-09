import type { PropsWithChildren, ReactNode } from "react";
import { ArrowRight, CircleDashed, Clock3, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/workspace/workspace-ui";
import { cn } from "@/lib/utils";

export function DeveloperSectionCard({
  title,
  description,
  action,
  children,
  className,
}: PropsWithChildren<{
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}>) {
  return (
    <section className={cn("rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3 pb-4">
        <SectionHeading title={title} description={description} />
        {action}
      </div>
      {children}
    </section>
  );
}

export function DeveloperStatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();

  if (normalized.includes("qa ready")) {
    return (
      <Badge variant="outline" className="border-teal-200 bg-teal-50 text-teal-700">
        {value}
      </Badge>
    );
  }

  if (normalized.includes("review")) {
    return (
      <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
        {value}
      </Badge>
    );
  }

  if (normalized.includes("blocked")) {
    return (
      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
        {value}
      </Badge>
    );
  }

  if (normalized.includes("in progress")) {
    return (
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
        {value}
      </Badge>
    );
  }

  return <Badge variant="secondary">{value}</Badge>;
}

export function DeveloperTaskCard({
  task,
}: {
  task: {
    id: string;
    title: string;
    project: string;
    status: string;
    due: string;
    priority: string;
  };
}) {
  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle className="text-base">{task.title}</CardTitle>
            <CardDescription>
              {task.id} · {task.project}
            </CardDescription>
          </div>
          <DeveloperStatusBadge value={task.status} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="grid gap-1">
            <span className="text-[11px] uppercase tracking-[0.12em]">Priority</span>
            <span className="font-medium text-foreground">{task.priority}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-[11px] uppercase tracking-[0.12em]">Due</span>
            <span className="font-medium text-foreground">{task.due}</span>
          </div>
        </div>
        <Button asChild size="sm">
          <Link to={`/developer/tasks/${task.id}`}>
            Open task
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function DeveloperSignalList({
  items,
  variant = "updates",
}: {
  items: string[];
  variant?: "updates" | "priority" | "blocked";
}) {
  const Icon = variant === "priority" ? Clock3 : variant === "blocked" ? TriangleAlert : CircleDashed;
  const iconClass =
    variant === "priority" ? "text-blue-600" : variant === "blocked" ? "text-amber-600" : "text-sky-600";

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/10 p-3 text-sm text-muted-foreground">
          <Icon className={cn("mt-0.5 size-4 shrink-0", iconClass)} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

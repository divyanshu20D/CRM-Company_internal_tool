import type { PropsWithChildren, ReactNode } from "react";
import { ArrowRight, CheckCircle2, CircleDashed, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/workspace/workspace-ui";
import { cn } from "@/lib/utils";

export function TeamLeadSectionCard({
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

export function TeamLeadStatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();

  if (normalized.includes("ready") || normalized.includes("stable")) {
    return (
      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
        {value}
      </Badge>
    );
  }

  if (normalized.includes("blocked") || normalized.includes("tight") || normalized.includes("escalate")) {
    return (
      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
        {value}
      </Badge>
    );
  }

  if (normalized.includes("review") || normalized.includes("open")) {
    return (
      <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
        {value}
      </Badge>
    );
  }

  if (normalized.includes("high load") || normalized.includes("capacity")) {
    return (
      <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700">
        {value}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
      {value}
    </Badge>
  );
}

export function TeamLeadProjectCard({
  project,
}: {
  project: {
    id: string;
    project: string;
    client: string;
    sprint: string;
    status: string;
    progress: string;
    nextStandup: string;
  };
}) {
  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle className="text-base">{project.project}</CardTitle>
            <CardDescription>{project.client}</CardDescription>
          </div>
          <TeamLeadStatusBadge value={project.status} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="grid gap-1">
            <span className="text-[11px] uppercase tracking-[0.12em]">Current sprint</span>
            <span className="font-medium text-foreground">{project.sprint}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-[11px] uppercase tracking-[0.12em]">Progress</span>
            <span className="font-medium text-foreground">{project.progress}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-[11px] uppercase tracking-[0.12em]">Next standup</span>
            <span className="font-medium text-foreground">{project.nextStandup}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link to={`/team-lead/projects/${project.id}`}>
              Open project
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to={`/team-lead/projects/${project.id}/board`}>View board</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to={`/team-lead/projects/${project.id}/sprints`}>View sprints</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function TeamLeadBoardColumn({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "blue" | "sky" | "teal" | "green" | "amber";
}) {
  const toneClasses =
    tone === "amber"
      ? "border-amber-200/70 bg-amber-50/60"
      : tone === "green"
        ? "border-emerald-200/70 bg-emerald-50/60"
        : tone === "teal"
          ? "border-teal-200/70 bg-teal-50/60"
          : tone === "sky"
            ? "border-sky-200/70 bg-sky-50/60"
            : "border-blue-200/70 bg-blue-50/60";

  return (
    <div className={cn("flex min-w-0 flex-col gap-3 rounded-xl border p-3", toneClasses)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <Badge variant="secondary">{items.length}</Badge>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-lg border border-background/90 bg-card/90 p-3 text-sm leading-6 text-foreground shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamLeadSignalList({
  items,
  variant = "warning",
}: {
  items: string[];
  variant?: "warning" | "success" | "progress";
}) {
  const Icon = variant === "success" ? CheckCircle2 : variant === "progress" ? CircleDashed : TriangleAlert;
  const iconClass =
    variant === "success" ? "text-emerald-600" : variant === "progress" ? "text-sky-600" : "text-amber-600";

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

import type { PropsWithChildren, ReactNode } from "react";
import { CircleCheckBig, CircleDashed, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/workspace/workspace-ui";
import { cn } from "@/lib/utils";

export function AdminSectionCard({
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

export function AdminStatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();

  if (normalized.includes("active") || normalized.includes("global") || normalized.includes("primary")) {
    return (
      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
        {value}
      </Badge>
    );
  }

  if (normalized.includes("invited") || normalized.includes("pending")) {
    return (
      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
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

export function AdminSignalList({
  items,
  variant = "updates",
}: {
  items: string[];
  variant?: "updates" | "priority" | "attention";
}) {
  const Icon = variant === "priority" ? CircleCheckBig : variant === "attention" ? TriangleAlert : CircleDashed;
  const iconClass =
    variant === "priority" ? "text-teal-600" : variant === "attention" ? "text-amber-600" : "text-sky-600";

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

export function AdminSettingList({
  rows,
}: {
  rows: Array<{ label: string; value: string; status?: string }>;
}) {
  return (
    <div className="grid gap-2.5">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/10 p-3">
          <div className="grid gap-0.5">
            <div className="text-sm font-medium text-foreground">{row.label}</div>
            <div className="text-sm text-muted-foreground">{row.value}</div>
          </div>
          {row.status ? <AdminStatusBadge value={row.status} /> : null}
        </div>
      ))}
    </div>
  );
}

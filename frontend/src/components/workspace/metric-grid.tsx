import { cn } from "@/lib/utils";
import { type Tone } from "@/components/workspace/workspace-theme";
import type { MetricItem } from "@/components/workspace/workspace-types";

function getToneRing(tone: Tone) {
  if (tone === "green") return "ring-emerald-200/60";
  if (tone === "teal") return "ring-teal-200/60";
  if (tone === "amber") return "ring-amber-200/60";
  if (tone === "blue") return "ring-blue-200/60";
  return "ring-sky-200/60";
}

function getToneGradientBg(tone: Tone) {
  if (tone === "green") return "from-emerald-500/[0.06] via-emerald-500/[0.02] to-transparent";
  if (tone === "teal") return "from-teal-500/[0.06] via-teal-500/[0.02] to-transparent";
  if (tone === "amber") return "from-amber-500/[0.06] via-amber-500/[0.02] to-transparent";
  if (tone === "blue") return "from-blue-500/[0.06] via-blue-500/[0.02] to-transparent";
  return "from-sky-500/[0.06] via-sky-500/[0.02] to-transparent";
}

function getToneIconBg(tone: Tone) {
  if (tone === "green") return "from-emerald-100 to-emerald-50 text-emerald-600 ring-emerald-200/50";
  if (tone === "teal") return "from-teal-100 to-teal-50 text-teal-600 ring-teal-200/50";
  if (tone === "amber") return "from-amber-100 to-amber-50 text-amber-600 ring-amber-200/50";
  if (tone === "blue") return "from-blue-100 to-blue-50 text-blue-600 ring-blue-200/50";
  return "from-sky-100 to-sky-50 text-sky-600 ring-sky-200/50";
}

function getToneBar(tone: Tone) {
  if (tone === "green") return "bg-emerald-500";
  if (tone === "teal") return "bg-teal-500";
  if (tone === "amber") return "bg-amber-500";
  if (tone === "blue") return "bg-blue-500";
  return "bg-sky-500";
}

function getToneValueColor(tone: Tone) {
  if (tone === "green") return "text-emerald-700";
  if (tone === "teal") return "text-teal-700";
  if (tone === "amber") return "text-amber-700";
  if (tone === "blue") return "text-blue-700";
  return "text-sky-700";
}

export function MetricGrid({
  items,
  className,
}: {
  items: MetricItem[];
  className?: string;
}) {
  return (
    <section className={cn("grid gap-3 lg:grid-cols-4", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "group relative overflow-hidden rounded-2xl bg-card px-4 py-3.5 ring-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
            getToneRing(item.tone)
          )}
        >
          <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", getToneGradientBg(item.tone))} />
          <div className={cn("pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-[0.04]", getToneBar(item.tone))} />

          <div className="relative flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{item.label}</span>
              <span className={cn("text-[1.75rem] font-extrabold leading-tight tracking-tight", getToneValueColor(item.tone))}>
                {item.value}
              </span>
            </div>

            {item.icon ? (
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ring-1 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md",
                  getToneIconBg(item.tone)
                )}
              >
                <item.icon className="size-[18px]" />
              </div>
            ) : null}
          </div>

          <div className={cn("absolute bottom-0 left-0 h-[3px] w-full opacity-40 transition-opacity duration-300 group-hover:opacity-80", getToneBar(item.tone))} />
        </div>
      ))}
    </section>
  );
}

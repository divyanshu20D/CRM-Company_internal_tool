import type { LucideIcon } from "lucide-react";

import { getToneClasses } from "@/components/workspace/workspace-theme";
import type { ListNoteItem } from "@/components/workspace/workspace-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StackedNoteCard({
  title,
  description,
  items,
  icon,
  numbered,
}: {
  title: string;
  description: string;
  items: ListNoteItem[];
  icon?: LucideIcon;
  numbered?: boolean;
}) {
  const Icon = icon;

  return (
    <Card className="overflow-hidden rounded-xl border-border/60 shadow-sm">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-background to-muted/20">
        <CardTitle className="flex items-center gap-2">
          {Icon ? <Icon className="size-4 text-blue-600" /> : null}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5 pt-4">
        {items.map((item, i) => (
          <div
            key={`${item.title ?? "note"}-${item.copy}`}
            className={cn(
              "rounded-lg border border-border/60 bg-muted/10 p-3.5 text-sm leading-relaxed text-muted-foreground transition-colors duration-150 hover:bg-muted/20",
              item.tone ? getToneClasses(item.tone) : ""
            )}
          >
            {numbered ? (
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[10px] font-bold text-blue-600">
                  {i + 1}
                </span>
                <span>{item.copy}</span>
              </div>
            ) : (
              <>
                {item.title || item.icon ? (
                  <div className="mb-1.5 flex items-center gap-2 font-medium text-foreground">
                    {item.icon ? <item.icon className="size-4 text-blue-600" /> : null}
                    {item.title}
                  </div>
                ) : null}
                {item.copy}
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

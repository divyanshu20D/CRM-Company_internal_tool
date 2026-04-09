"use client";

import { ArrowLeftIcon } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";

import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "@/components/core/morphing-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MorphingNotePopover({
  triggerLabel = "Add Note",
  submitLabel = "Submit",
  title,
  onSubmit,
  className,
  contentClassName,
}: {
  triggerLabel?: string;
  submitLabel?: string;
  title?: string;
  onSubmit?: (note: string) => void;
  className?: string;
  contentClassName?: string;
}) {
  const uniqueId = useId();
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setNote("");
    setIsOpen(false);
  };

  return (
    <MorphingPopover
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.3,
      }}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <MorphingPopoverTrigger
          className={cn(
          "flex h-9 items-center rounded-md border border-border/80 bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          className,
        )}
      >
        <motion.span layoutId={`popover-label-${uniqueId}`} className="text-sm">
          {triggerLabel}
        </motion.span>
      </MorphingPopoverTrigger>

      <MorphingPopoverContent
        align="end"
        className={cn("rounded-xl border border-border/80 bg-background p-0 shadow-xl", contentClassName)}
      >
        <div className="h-[220px] w-[372px]">
          <form
            className="flex h-full flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              if (!note.trim()) {
                return;
              }
              onSubmit?.(note);
              closeMenu();
            }}
          >
            <div className="flex-1">
              <textarea
                className="h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-hidden"
                autoFocus
                value={note}
                onChange={(event) => setNote(event.target.value)}
                aria-label={title ?? triggerLabel}
                placeholder="Write your note here..."
              />
            </div>

            <div className="flex items-center justify-between border-t border-border/80 px-2 py-3 pr-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                aria-label="Close note popover"
                className="rounded-md bg-background hover:bg-accent"
              >
                <ArrowLeftIcon />
              </Button>

              <Button type="submit" variant="outline" disabled={!note.trim()}>
                {submitLabel}
              </Button>
            </div>
          </form>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}

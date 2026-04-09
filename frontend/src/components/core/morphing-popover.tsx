"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { motion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

type MorphingPopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root> & {
  transition?: Transition;
};

const MorphingPopoverContext = React.createContext<{ transition?: Transition }>({});

export function MorphingPopover({
  children,
  transition,
  ...props
}: MorphingPopoverProps) {
  return (
    <MorphingPopoverContext.Provider value={{ transition }}>
      <PopoverPrimitive.Root data-slot="morphing-popover" {...props}>
        {children}
      </PopoverPrimitive.Root>
    </MorphingPopoverContext.Provider>
  );
}

export function MorphingPopoverTrigger({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="morphing-popover-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

export function MorphingPopoverContent({
  className,
  align = "start",
  sideOffset = 10,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const { transition } = React.useContext(MorphingPopoverContext);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="morphing-popover-content"
        asChild
        align={align}
        sideOffset={sideOffset}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 4 }}
          transition={transition ?? { type: "spring", bounce: 0.06, duration: 0.28 }}
          className={cn("outline-none", className)}
        >
          {children}
        </motion.div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

"use client";

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type MemberAvatarStackProps = {
  members: Array<{
    name: string;
  }>;
  maxVisible?: number;
  className?: string;
};

const avatarPalettes = [
  {
    base: "bg-sky-100 text-sky-700",
    hover: "group-hover:bg-sky-200 group-hover:text-sky-800 group-hover:ring-sky-200",
  },
  {
    base: "bg-emerald-100 text-emerald-700",
    hover: "group-hover:bg-emerald-200 group-hover:text-emerald-800 group-hover:ring-emerald-200",
  },
  {
    base: "bg-violet-100 text-violet-700",
    hover: "group-hover:bg-violet-200 group-hover:text-violet-800 group-hover:ring-violet-200",
  },
  {
    base: "bg-amber-100 text-amber-700",
    hover: "group-hover:bg-amber-200 group-hover:text-amber-800 group-hover:ring-amber-200",
  },
  {
    base: "bg-rose-100 text-rose-700",
    hover: "group-hover:bg-rose-200 group-hover:text-rose-800 group-hover:ring-rose-200",
  },
  {
    base: "bg-cyan-100 text-cyan-700",
    hover: "group-hover:bg-cyan-200 group-hover:text-cyan-800 group-hover:ring-cyan-200",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getPaletteIndex(name: string) {
  return Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0) % avatarPalettes.length;
}

export function MemberAvatarStack({
  members,
  maxVisible = 4,
  className,
}: MemberAvatarStackProps) {
  const visibleMembers = members.slice(0, maxVisible);

  return (
    <AvatarGroup className={cn("isolate gap-0", className)}>
      {visibleMembers.map((member) => {
        const palette = avatarPalettes[getPaletteIndex(member.name)];

        return (
        <Tooltip key={member.name}>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={member.name}
              className="group relative z-0 inline-flex rounded-full transition-all duration-200 ease-out hover:z-30 hover:-translate-y-1 focus-visible:z-30 focus-visible:-translate-y-1 focus-visible:outline-none"
            >
              <Avatar className={cn("isolate bg-background ring-2 ring-background transition-all duration-200 ease-out group-hover:scale-[1.04] group-hover:shadow-[0_10px_24px_rgba(14,116,144,0.18)] group-hover:after:opacity-0", palette.hover)}>
                <AvatarFallback className={cn("font-semibold transition-colors duration-200", palette.base, palette.hover)}>
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="rounded-md border border-sky-400/35 bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-sky-50 shadow-[0_10px_24px_rgba(8,47,73,0.28)]"
          >
            {member.name}
          </TooltipContent>
        </Tooltip>
      )})}
    </AvatarGroup>
  );
}

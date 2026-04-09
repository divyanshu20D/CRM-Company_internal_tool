import type { LucideIcon } from "lucide-react";

import type { Tone } from "@/components/workspace/workspace-theme";

export type MetricItem = {
  label: string;
  value: string;
  tone: Tone;
  icon?: LucideIcon;
};

export type ListNoteItem = {
  title?: string;
  copy: string;
  tone?: Tone;
  icon?: LucideIcon;
};

export type CalendarEventItem = {
  id: string;
  title: string;
  day: string;
  time: string;
  endTime?: string;
  meta?: string;
  detail?: string;
  tone?: Tone;
};

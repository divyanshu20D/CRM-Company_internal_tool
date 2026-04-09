export type Tone = "blue" | "sky" | "green" | "teal" | "amber";

export function getToneClasses(tone: Tone) {
  if (tone === "green") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (tone === "teal") return "border-teal-200 bg-teal-50 text-teal-700";
  if (tone === "amber") return "border-amber-200 bg-amber-50 text-amber-700";
  if (tone === "blue") return "border-blue-200 bg-blue-50 text-blue-700";

  return "border-sky-200 bg-sky-50 text-sky-700";
}

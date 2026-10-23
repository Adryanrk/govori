import { stepsFor, type Day, type Step } from "@/content/days";
import { dueItemIds, type Progress } from "./progress";

/** A short review of earlier items, added before a lesson day when enough is due. */
export function warmupStep(p: Progress): Step | null {
  const due = dueItemIds(p);
  if (due.length < 3) return null;
  return {
    id: "warmup",
    title: "Warm-up review",
    detail: `${Math.min(8, due.length)} things you learned earlier`,
    minutes: 2,
    tier: 10,
    type: "quiz",
    items: due.slice(0, 12),
    count: Math.min(8, due.length),
    intro: "A few things from earlier days, before anything new. This is what makes them stick.",
  };
}

/** The steps a lesson will run: a warm-up when reviews are due, then the day's plan. */
export function planFor(day: Day, p: Progress, onlyId: string | null = null): Step[] {
  if (onlyId) {
    const one = day.steps.find((s) => s.id === onlyId);
    if (one) return [one];
  }
  const steps = stepsFor(day, p.minutes);
  const warm = day.check ? null : warmupStep(p);
  return warm ? [warm, ...steps] : steps;
}

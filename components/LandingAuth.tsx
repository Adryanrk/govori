"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { useAccount } from "@/lib/account";
import { currentDay, load } from "@/lib/progress";
import { Icon } from "./ui";

/** "Log in" in the landing nav, hidden once you are signed in. */
export function NavLogin() {
  const { enabled, session, ready } = useAccount();
  if (!enabled || !ready || session) return null;
  return <Link href="/account">Log in</Link>;
}

/**
 * The main call to action. New visitors see "Start Day 1"; anyone with
 * progress sees "Continue · Day N", which goes straight to Today.
 */
export function StartButton({ className, style, arrow = false }: { className: string; style?: CSSProperties; arrow?: boolean }) {
  const [next, setNext] = useState<number | null>(null);

  useEffect(() => {
    const p = load();
    if (Object.keys(p.completedDays).length > 0 || p.activeDates.length > 0) setNext(currentDay(p));
  }, []);

  return (
    <Link href="/today" className={className} style={style}>
      {next ? `Continue · Day ${next}` : "Start Day 1"}
      {arrow && <Icon name="arrow" />}
    </Link>
  );
}

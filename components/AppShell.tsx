"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon, Logo, Ru } from "./ui";
import { SpeakButton } from "./SpeakButton";

const NAV = [
  { href: "/today", label: "Today", icon: <Icon name="sun" /> },
  { href: "/alphabet", label: "Alphabet", icon: <span aria-hidden="true" lang="ru" style={{ width: 18, textAlign: "center", fontFamily: "var(--f-display)", fontSize: 13 }}>Ж</span> },
  { href: "/review", label: "Review", icon: <Icon name="review" /> },
];

export function AppShell({ children, reviewCount = 0 }: { children: ReactNode; reviewCount?: number }) {
  const path = usePathname();
  return (
    <div className="app">
      <aside className="sidebar">
        <Logo />
        <nav aria-label="App" className="side-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>
              {n.icon}
              {n.label}
              {n.href === "/review" && reviewCount > 0 && <span className="count">{reviewCount}</span>}
            </Link>
          ))}
        </nav>
        <div className="wotd">
          <span className="small-mono muted">Word of the day</span>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 22 }}>
              <Ru text="приве́т" className="display" />
            </span>
            <SpeakButton text="приве́т" light label="Play" />
          </span>
          <span style={{ fontSize: 14 }} className="muted">
            pree-VYET · hi
          </span>
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}

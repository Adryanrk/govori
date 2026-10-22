"use client";

import { useEffect, useState } from "react";
import type { WeekDot } from "@/lib/progress";

const R = 110;
const C = 140;
const CIRC = 2 * Math.PI * R;

function pos(i: number) {
  const a = ((-90 + (i * 360) / 7) * Math.PI) / 180;
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
}

/**
 * The weekly "orbit": seven dots, Monday at the top. Active days light up,
 * the arc grows to today, and the red stress mark lands on today's dot.
 */
export function WeekOrbit({ dots, streak, animate = true }: { dots: WeekDot[]; streak: number; animate?: boolean }) {
  const [drawn, setDrawn] = useState(!animate);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setDrawn(true), 50);
    return () => clearTimeout(t);
  }, [animate]);

  const todayIndex = Math.max(0, dots.findIndex((d) => d.isToday));
  const anyActive = dots.some((d) => d.active);
  const arcLen = anyActive ? (todayIndex / 7) * CIRC : 0;
  const today = pos(todayIndex);
  const activeCount = dots.filter((d) => d.active).length;

  return (
    <div className="week-orbit">
      <svg
        role="img"
        aria-label={`This week: ${activeCount} of 7 days active. Streak ${streak} days.`}
        viewBox="0 0 280 280"
        width="100%"
        height="100%"
        style={{ display: "block", overflow: "visible" }}
      >
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(160,176,240,0.22)" strokeWidth="2" />
        <circle
          className="orbit-arc"
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke="#7C98FF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={drawn ? CIRC - arcLen : CIRC}
          transform={`rotate(-90 ${C} ${C})`}
        />
        {dots.map((d, i) => {
          const p = pos(i);
          const isToday = d.isToday && d.active;
          return (
            <g key={i}>
              {isToday && <circle className="orbit-pulse" cx={p.x} cy={p.y} r={11} fill="none" stroke="#FF6B70" strokeWidth="2" />}
              <circle
                className={`orbit-dot${d.active ? " lit" : ""}`}
                style={d.active ? { animationDelay: isToday ? "1.15s" : `${0.2 + i * 0.08}s` } : undefined}
                cx={p.x}
                cy={p.y}
                r={isToday ? 11 : d.active ? 8 : 6}
                fill={isToday ? "#CC2B33" : d.active ? "#7C98FF" : "#0B1330"}
                stroke={d.active ? "none" : "rgba(160,176,240,0.45)"}
                strokeWidth="2"
              />
              <text
                x={C + (R + 26) * Math.cos(((-90 + (i * 360) / 7) * Math.PI) / 180)}
                y={C + (R + 26) * Math.sin(((-90 + (i * 360) / 7) * Math.PI) / 180) + 4}
                textAnchor="middle"
                fontSize="11"
                fill={d.isToday ? "#FFFFFF" : "#A9B4DA"}
                style={{ fontFamily: "var(--f-mono)" }}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {dots[todayIndex]?.active && (
        <span aria-hidden="true" className="tick" style={{ left: `${(today.x / 280) * 100}%`, top: `${(today.y / 280) * 100}%` }} />
      )}
      <div className="center">
        <b>{streak}</b>
        <span style={{ fontSize: 15, color: "var(--night-text)" }}>day streak</span>
      </div>
    </div>
  );
}

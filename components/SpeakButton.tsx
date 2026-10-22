"use client";

import { useEffect, useState } from "react";
import { canSpeak, speak } from "@/lib/speak";
import { Icon } from "./ui";

/** A small "listen" button. Renders nothing if the browser has no voice. */
export function SpeakButton({ text, light = false, label = "Listen" }: { text: string; light?: boolean; label?: string }) {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(canSpeak()), []);
  if (!ok) return null;
  return (
    <span
      role="button"
      tabIndex={0}
      className={`speak${light ? " light" : ""}`}
      aria-label={`${label}: ${text.replace(/́/g, "")}`}
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          speak(text);
        }
      }}
    >
      <Icon name="sound" size={16} />
      {label.toUpperCase()}
    </span>
  );
}

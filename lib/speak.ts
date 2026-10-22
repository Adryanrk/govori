"use client";

// Placeholder audio using the browser's built-in Russian voice.
// Later this is swapped for pre-recorded / high-quality TTS files.

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  // Stress marks are for the reader; the voice doesn't need them.
  const u = new SpeechSynthesisUtterance(text.replace(/́/g, ""));
  u.lang = "ru-RU";
  u.rate = 0.85;
  const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("ru"));
  if (voice) u.voice = voice;
  synth.speak(u);
}

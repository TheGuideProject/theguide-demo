"use client";

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function isTTSAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(
  text: string,
  opts: { lang?: string; rate?: number; pitch?: number; onEnd?: () => void; onStart?: () => void } = {}
): boolean {
  if (!isTTSAvailable()) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang ?? "it-IT";
  u.rate = opts.rate ?? 0.96;
  u.pitch = opts.pitch ?? 1.02;
  u.volume = 1;
  const voices = synth.getVoices();
  const italianVoice =
    voices.find((v) => v.lang === "it-IT" && /it|ital|elsa|alice|luca/i.test(v.name)) ||
    voices.find((v) => v.lang.startsWith("it"));
  if (italianVoice) u.voice = italianVoice;
  if (opts.onEnd) u.onend = opts.onEnd;
  if (opts.onStart) u.onstart = opts.onStart;
  u.onerror = () => {
    currentUtterance = null;
    opts.onEnd?.();
  };
  currentUtterance = u;
  synth.speak(u);
  return true;
}

export function stopSpeaking() {
  if (!isTTSAvailable()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

export function isSpeaking(): boolean {
  if (!isTTSAvailable()) return false;
  return window.speechSynthesis.speaking;
}

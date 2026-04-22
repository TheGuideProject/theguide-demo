"use client";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "../PhoneChrome";

type Msg = { from: "ai" | "user"; text: string };

const SCRIPT: { ai: string[]; replies: string[]; response: string; nextAi?: string[] }[] = [
  {
    ai: [
      "Ciao Jacopo! Sono Iris 👋 Preparo i prossimi giorni a Firenze su misura per te.",
      "Prima cosa — che tipo di viaggiatore sei?"
    ],
    replies: ["Curioso ma odio le file 🙅", "Foodie 🍝", "Famiglia con bimbi 👨‍👩‍👧", "Arte & storia 🎨"],
    response: "Curioso ma odio le file. Mi piacciono i posti dove vanno i locali."
  },
  {
    ai: ["Perfetto. Quanto tempo vuoi dedicare ai musei ogni giorno?"],
    replies: ["Poco — 1h", "Il giusto — 2-3h", "Tanto — 4h+", "Zero musei"],
    response: "Il giusto — 2-3h"
  },
  {
    ai: ["Ottimo. Qual è il tuo budget tipo per pranzo/cena?"],
    replies: ["€15–25 · Trattoria", "€30–50 · Ristorante", "€60+ · Fine dining", "Mix"],
    response: "Mix — dipende dalla giornata"
  },
  {
    ai: [
      "Ho abbastanza per iniziare 🎯",
      "Ti ho preparato 3 giorni a Firenze: Arte 40%, Food 35%, luoghi off-the-beaten 25%. Pronto a partire?"
    ],
    replies: ["Vediamo l'itinerario", "Modifica qualcosa", "Apri la mappa"],
    response: ""
  }
];

export function ChatScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step >= SCRIPT.length) return;
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMsgs((prev) => [
        ...prev,
        ...SCRIPT[step].ai.map((text) => ({ from: "ai" as const, text }))
      ]);
    }, 700);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [msgs, typing]);

  const pick = (reply: string) => {
    const curr = SCRIPT[step];
    const userText = reply || curr.response;
    setMsgs((prev) => [...prev, { from: "user", text: userText }]);
    if (step + 1 >= SCRIPT.length) {
      setTimeout(onDone, 500);
      return;
    }
    setTimeout(() => setStep((s) => s + 1), 350);
  };

  const progressPct = Math.min(100, ((step + 1) / SCRIPT.length) * 100);
  const currentReplies = step < SCRIPT.length ? SCRIPT[step].replies : [];

  return (
    <>
      <StatusBar />
      <div className="s-chat">
        <div className="chat-top">
          <div className="avatar">I</div>
          <div>
            <div className="ai-name">Iris</div>
            <div className="ai-status">la tua guida AI</div>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>
            Passo {Math.min(step + 1, SCRIPT.length)}/{SCRIPT.length}
          </div>
        </div>
        <div className="progress">
          <span style={{ width: `${progressPct}%` }} />
        </div>
        <div className="messages" ref={scrollRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.from}`}>
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="bubble ai typing" aria-label="Iris sta scrivendo">
              <span /> <span /> <span />
            </div>
          )}
        </div>
        <div className="quick-replies">
          {currentReplies.map((r) => (
            <button key={r} className="chip" onClick={() => pick(r)}>
              {r}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

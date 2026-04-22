"use client";
import { useEffect, useState } from "react";
import { StatusBar } from "../PhoneChrome";

interface Props {
  onQR: () => void;
  onTopUp: () => void;
  onPartners: () => void;
  onPass: () => void;
  onReceipt: () => void;
}

const TXNS = [
  { icon: "🍝", title: "Trattoria Mario", sub: "Firenze · oggi 13:24", amount: "−€35,00", cb: "+€1,75", tone: "out" as const },
  { icon: "🏛", title: "Uffizi · skip-the-line", sub: "Partner · ieri 14:30", amount: "−€26,00", cb: "", tone: "out" as const },
  { icon: "🍷", title: "Enoteca Pitti", sub: "ieri 19:45", amount: "−€42,00", cb: "+€2,10", tone: "out" as const },
  { icon: "＋", title: "Ricarica · Apple Pay", sub: "15 apr · 08:12", amount: "+€150,00", cb: "", tone: "in" as const },
  { icon: "🎁", title: "Cashback weekend", sub: "partner network", amount: "+€8,75", cb: "", tone: "reward" as const }
];

export function WalletScreen({ onQR, onTopUp, onPartners, onPass, onReceipt }: Props) {
  const [amt, setAmt] = useState(0);

  useEffect(() => {
    const target = 124.5;
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setAmt(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const euros = Math.floor(amt);
  const cents = Math.floor((amt - euros) * 100).toString().padStart(2, "0");

  return (
    <>
      <StatusBar />
      <div className="s-wallet">
        <div className="wallet-card">
          <div className="wc-shimmer" />
          <div className="wc-top">
            <div className="wc-brand">
              <div className="wc-logo">TG</div>
              <div>
                <div className="wc-name">TravelPass</div>
                <div className="wc-tier">Gold · valido in 412 partner</div>
              </div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M3 12c4-4 10-4 14 0" opacity=".4" />
              <path d="M6 14c3-3 7-3 10 0" opacity=".6" />
              <path d="M9 16c2-2 4-2 6 0" />
              <circle cx="12" cy="18" r="1" fill="currentColor" />
            </svg>
          </div>
          <div className="wc-label">Saldo disponibile</div>
          <div className="wc-amount">
            <span className="big">{euros}</span>
            <span className="small">,{cents}</span>
            <span className="cur">€</span>
          </div>
          <div className="wc-foot">
            <div className="wc-chip" />
            <div className="wc-num">•••• 4821</div>
            <div className="wc-exp">11/28</div>
          </div>
          <div className="wc-cashback">
            ↑ <b>+€8,75</b>
            <span>cashback questa settimana</span>
          </div>
        </div>

        <div className="wallet-actions">
          <button className="w-action" onClick={onQR}>
            <div className="ico">📷</div>
            Paga QR
          </button>
          <button className="w-action" onClick={onTopUp}>
            <div className="ico">＋</div>
            Ricarica
          </button>
          <button className="w-action" onClick={onPass}>
            <div className="ico">🎟</div>
            Pass
          </button>
          <button className="w-action" onClick={onPartners}>
            <div className="ico">◉</div>
            Partner
          </button>
        </div>

        <div className="w-section-title">Ultime transazioni</div>
        {TXNS.map((t, i) => (
          <button
            key={i}
            className={`txn tone-${t.tone}`}
            onClick={onReceipt}
            style={{ background: "transparent", border: "none", width: "100%", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}
          >
            <div className={`icon tone-${t.tone}`}>{t.icon}</div>
            <div className="mid">
              <div className="t">{t.title}</div>
              <div className="s">{t.sub}</div>
            </div>
            <div className="right">
              <div className={`amt ${t.tone}`}>{t.amount}</div>
              {t.cb && <div className="cb">{t.cb} cashback</div>}
            </div>
          </button>
        ))}

        <div style={{ height: 16 }} />
      </div>
    </>
  );
}

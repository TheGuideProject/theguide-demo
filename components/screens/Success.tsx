"use client";
import { useEffect, useState } from "react";
import { StatusBar } from "../PhoneChrome";

export function SuccessScreen({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <StatusBar />
      <div className={`s-succ ${mounted ? "in" : ""}`}>
        <div className="succ-confetti" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`conf c${i % 4}`} style={{ left: `${(i * 7) % 100}%`, animationDelay: `${i * 0.04}s` }} />
          ))}
        </div>
        <div className="succ-body">
          <div className="succ-hero">
            <div className="succ-check">
              <svg viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="24" fill="none" stroke="#3F8A6A" strokeWidth="3" className="succ-ring" />
                <path d="M14 27l8 8 16-18" fill="none" stroke="#3F8A6A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="succ-tick" />
              </svg>
            </div>
            <div className="succ-title">Pagamento riuscito</div>
            <div className="succ-sub">Oggi · 13:24 · ricevuta firmata digitalmente</div>
          </div>

          <div className="succ-card rich">
            <div className="succ-brand">
              <div className="succ-logo">🍝</div>
              <div>
                <div style={{ fontWeight: 800 }}>Trattoria Mario</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Via Rosina 2r, Firenze · P.IVA 0142*** </div>
              </div>
            </div>
            <div className="succ-row">
              <span className="k">Importo lordo</span>
              <span>€38,89</span>
            </div>
            <div className="succ-row">
              <span className="k">Sconto partner −10%</span>
              <span className="ok">−€3,89</span>
            </div>
            <div className="succ-row">
              <span className="k">Metodo</span>
              <span>TravelPass · NFC</span>
            </div>
            <div className="succ-row">
              <span className="k">Commissione</span>
              <span className="ok">€0,00</span>
            </div>
            <div className="succ-divider" />
            <div className="succ-row total">
              <span>Totale addebitato</span>
              <span>€35,00</span>
            </div>
            <div className="succ-qr">
              <div className="qr-mini" />
              <div>
                <div style={{ fontWeight: 700, fontSize: 12 }}>Ricevuta #TG-2026-04819</div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>Scansiona per verificare on-chain</div>
              </div>
            </div>
          </div>

          <div className="succ-cb">
            <div style={{ fontSize: 18 }}>✨</div>
            <div>
              <b>+ €1,75 di cashback TravelPass</b> — Spendibile nei 412 partner del network.
            </div>
          </div>

          <div className="succ-cta">
            <button className="btn btn-ghost btn-full">📄 PDF</button>
            <button className="btn btn-dark btn-full" onClick={onClose}>
              Torna al wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

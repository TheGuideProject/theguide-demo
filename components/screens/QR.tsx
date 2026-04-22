"use client";
import { useState } from "react";
import { StatusBar } from "../PhoneChrome";

export function QRScreen({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [slide, setSlide] = useState(0);

  const handleSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(100, (x / rect.width) * 100);
    setSlide(pct);
    if (pct > 75) {
      setTimeout(onSuccess, 250);
    }
  };

  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-qr">
        <div className="qr-cam">
          <div className="qr-top">
            <button className="ar-badge" onClick={onClose}>
              ✕ Chiudi
            </button>
            <button className="ar-badge">💡 Luce</button>
          </div>

          <div className="qr-frame">
            <span className="c tl" />
            <span className="c tr" />
            <span className="c bl" />
            <span className="c br" />
            <div className="qr-pattern" />
          </div>

          <div className="qr-detected">
            <div className="sq">🍝</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800 }}>Trattoria Mario</div>
              <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>
                Partner verificato · −10%
              </div>
            </div>
            <div className="ok">✓</div>
          </div>
        </div>

        <div className="qr-bottom">
          <div className="qr-amount">
            <div className="n">€ 35,00</div>
            <div className="l">Saldo disponibile €124,50</div>
          </div>
          <div className="qr-slide" onClick={handleSlide}>
            <div
              className="knob"
              style={{ transform: `translateX(${Math.min(slide * 2, 200)}px)` }}
            >
              ›
            </div>
            <div className="txt">Fai scorrere per pagare</div>
          </div>
        </div>
      </div>
    </>
  );
}

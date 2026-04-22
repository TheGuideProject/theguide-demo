"use client";
import { useState } from "react";
import { StatusBar } from "../PhoneChrome";

export function ConvertScreen({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [amount, setAmount] = useState("500");
  const rate = 0.9204;
  const eur = (parseFloat(amount || "0") * rate).toFixed(2);
  const savings = (parseFloat(amount || "0") * 0.037).toFixed(2);

  return (
    <>
      <StatusBar />
      <div className="s-conv">
        <div className="ph-head">
          <button className="icon-btn" onClick={onClose}>‹</button>
          <h4>Ricarica TravelPass</h4>
        </div>

        <div className="conv-body">
          <div className="conv-flip">
            <div className="conv-row">
              <div className="lb">
                <span>Paghi · Bilanciato da Apple Pay</span>
              </div>
              <div className="conv-amount">
                <input
                  className="num"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                  inputMode="decimal"
                />
                <span className="conv-curr">🇺🇸 USD ▾</span>
              </div>
            </div>
            <button className="conv-swap" aria-label="Scambia valute">⇅</button>
            <div className="conv-row to">
              <div className="lb">
                <span>Ricevi</span>
                <span className="ok">Zero fee ✓</span>
              </div>
              <div className="conv-amount">
                <span className="num">€{eur}</span>
                <span className="conv-curr">◉ TravelPass</span>
              </div>
            </div>
          </div>

          <div className="rate-box">
            <span>Tasso mid-market · aggiornato</span>
            <b>1 USD = 0,9204 €</b>
          </div>

          <div className="callout">
            <div className="ico" style={{ background: "var(--ok)" }}>✓</div>
            <div>
              <b>Stai risparmiando ${savings}</b>
              vs cambio bancomat in aeroporto (−3,7% di margine tipico).
            </div>
          </div>
        </div>

        <div className="chk-cta">
          <button className="btn btn-primary btn-full" onClick={onSuccess}>
            Conferma ricarica · ${amount}
          </button>
        </div>
      </div>
    </>
  );
}

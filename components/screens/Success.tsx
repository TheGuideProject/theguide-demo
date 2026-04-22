"use client";
import { StatusBar } from "../PhoneChrome";

export function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <>
      <StatusBar />
      <div className="s-succ">
        <div className="succ-body">
          <div className="succ-hero">
            <div className="succ-check">✓</div>
            <div className="succ-title">Pagamento riuscito</div>
            <div className="succ-sub">Oggi · 13:24 · ricevuta salvata</div>
          </div>

          <div className="succ-card">
            <div className="succ-row">
              <span className="k">Importo lordo</span>
              <span>€38,89</span>
            </div>
            <div className="succ-row">
              <span className="k">Sconto partner −10%</span>
              <span className="ok">−€3,89</span>
            </div>
            <div className="succ-row">
              <span className="k">Partner</span>
              <span>Trattoria Mario</span>
            </div>
            <div className="succ-row">
              <span className="k">Commissione</span>
              <span className="ok">€0,00</span>
            </div>
            <div className="succ-row">
              <span>Totale addebitato</span>
              <span>€35,00</span>
            </div>
          </div>

          <div className="succ-cb">
            <div style={{ fontSize: 18 }}>✨</div>
            <div>
              <b>+ €1,75 di cashback TravelPass</b> — Spendibile nei 412 partner del network.
            </div>
          </div>

          <div className="succ-cta">
            <button className="btn btn-ghost btn-full">Ricevuta PDF</button>
            <button className="btn btn-dark btn-full" onClick={onClose}>
              Torna al wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

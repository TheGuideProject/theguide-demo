"use client";
import { useEffect, useState } from "react";
import { StatusBar } from "../PhoneChrome";

export function CheckoutScreen({
  onClose,
  onSuccess
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<"tp" | "card" | "apple">("tp");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!processing) return;
    const t = setTimeout(onSuccess, 1400);
    return () => clearTimeout(t);
  }, [processing, onSuccess]);

  return (
    <>
      <StatusBar />
      <div className="s-checkout">
        <div className="ph-head">
          <button className="icon-btn" onClick={onClose}>‹</button>
          <h4>Checkout</h4>
          <span style={{ fontSize: 11, color: "var(--ok)", fontWeight: 700 }}>Sicuro 🔒</span>
        </div>
        <div className="chk-body">
          <div className="chk-card premium">
            <div className="chk-preview">
              <div className="chk-thumb" />
              <div>
                <div className="chk-title">Uffizi · skip-the-line</div>
                <div className="chk-when">Ven 25 apr · 14:30 · 2 persone</div>
              </div>
            </div>
            <div className="chk-divider" />
            <div className="chk-line">
              <span>Biglietto adulto × 2</span>
              <span>€52,00</span>
            </div>
            <div className="chk-line">
              <span>Audio-guida Iris (IT) · 2 persone</span>
              <span>€8,00</span>
            </div>
            <div className="chk-line ok">
              <span>Sconto TheGuide −10%</span>
              <span>−€6,00</span>
            </div>
            <div className="chk-divider" />
            <div className="chk-line total">
              <span>Totale</span>
              <span>€54,00</span>
            </div>
          </div>

          <div>
            <div className="chk-section-label">Metodo di pagamento</div>
            <div className="chk-pay">
              <button className={method === "tp" ? "active" : ""} onClick={() => setMethod("tp")}>
                <div className="ico">◉</div>
                <b>TravelPass</b>
                <span className="ss">Saldo €124,50</span>
                {method === "tp" && <span className="check">✓</span>}
              </button>
              <button className={method === "card" ? "active" : ""} onClick={() => setMethod("card")}>
                <div className="ico">💳</div>
                <b>Visa · 4821</b>
                <span className="ss">Scad. 11/28</span>
                {method === "card" && <span className="check">✓</span>}
              </button>
              <button className={method === "apple" ? "active" : ""} onClick={() => setMethod("apple")}>
                <div className="ico">&#63743;</div>
                <b>Apple Pay</b>
                <span className="ss">Face ID</span>
                {method === "apple" && <span className="check">✓</span>}
              </button>
            </div>
          </div>

          <div className="callout rich">
            <div className="ico">✨</div>
            <div>
              <b>Iris: guadagni €2,70 di cashback</b>
              Pagando con TravelPass accumuli il 5% in premi, spendibili in tutti i 412 partner del network.
            </div>
          </div>
        </div>
        <div className="chk-cta">
          {!processing ? (
            <button className="btn btn-primary btn-full" onClick={() => setProcessing(true)}>
              {method === "apple" ? "Conferma con Face ID · €54,00" : `Conferma acquisto · €54,00`}
            </button>
          ) : (
            <button className="btn btn-primary btn-full processing" disabled>
              <span className="pay-spinner" />
              {method === "apple" ? "Face ID in corso…" : "Verifica in corso…"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { StatusBar } from "../PhoneChrome";

export function CheckoutScreen({
  onClose,
  onSuccess
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<"tp" | "card">("tp");

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
          <div className="chk-card">
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#EBD9B8,#C65D3A)"
                }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>Uffizi · skip-the-line</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                  Venerdì 25 apr · 14:30
                </div>
              </div>
            </div>
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
            <div className="chk-line total">
              <span>Totale</span>
              <span>€54,00</span>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: ".1em",
                marginBottom: 8
              }}
            >
              Metodo di pagamento
            </div>
            <div className="chk-pay">
              <button
                className={method === "tp" ? "active" : ""}
                onClick={() => setMethod("tp")}
              >
                <div className="ico">◉</div>
                <b>TravelPass</b>
                <span className="ss">Saldo €124,50</span>
              </button>
              <button
                className={method === "card" ? "active" : ""}
                onClick={() => setMethod("card")}
              >
                <div className="ico">💳</div>
                <b>Visa · 4821</b>
                <span className="ss">Scad. 11/28</span>
              </button>
            </div>
          </div>

          <div className="callout">
            <div className="ico">✨</div>
            <div>
              <b>Iris: guadagni €2,70 di cashback</b>
              Pagando con TravelPass accumuli il 5% in premi, spendibili in tutti i 412 partner del network.
            </div>
          </div>
        </div>
        <div className="chk-cta">
          <button className="btn btn-primary btn-full" onClick={onSuccess}>
            Conferma acquisto · €54,00
          </button>
        </div>
      </div>
    </>
  );
}

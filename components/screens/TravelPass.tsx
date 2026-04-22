"use client";
import { useState } from "react";
import { StatusBar } from "../PhoneChrome";

const PASSES = [
  { id: "24", dur: "24h", title: "City Pass 24h", price: "€24,90", features: "Musei skip-the-line · trasporto · 10-20% sconti" },
  { id: "48", dur: "48h", title: "City Pass 48h", price: "€39,00", features: "Più gettonato · include 2 partner food" },
  { id: "72", dur: "72h", title: "City Pass 72h", price: "€55,00", features: "3 giorni · AR full · cashback 5%" },
  { id: "5", dur: "5 gg", title: "Explore 5 giorni", price: "€89,00", features: "Uffizi · Accademia · Pitti · cashback" },
  { id: "7", dur: "7 gg", title: "Discover 7 giorni", price: "€119,00", features: "Tutto incluso · Iris Pro · priority" }
];

export function TravelPassScreen({ onClose, onCheckout }: { onClose: () => void; onCheckout: () => void }) {
  const [sel, setSel] = useState("48");

  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-pass">
        <div className="pass-hero">
          <button
            className="icon-btn"
            style={{ background: "rgba(255,255,255,.14)", color: "#fff" }}
            onClick={onClose}
          >
            ‹
          </button>
          <div style={{ marginTop: 12 }}>
            <div className="tag">TravelPass Store</div>
            <h3>Un pass. Tutta l&apos;Italia.</h3>
            <div className="sub">
              Salta le file. Spostati gratis. Risparmia ovunque. Il pass digitale che
              sostituisce Roma Pass, Firenze Card e ticket TPL.
            </div>
          </div>
        </div>

        <div className="pass-list">
          {PASSES.map((p) => (
            <button
              key={p.id}
              className={`pass-card ${sel === p.id ? "active" : ""}`}
              onClick={() => setSel(p.id)}
            >
              <div className="duration">{p.dur}</div>
              <div className="info">
                <div className="t">{p.title}</div>
                <div className="s">{p.features}</div>
              </div>
              <div className="price">{p.price}</div>
            </button>
          ))}
        </div>

        <div className="pass-cta">
          <button className="btn btn-primary btn-full" onClick={onCheckout}>
            Acquista · {PASSES.find((p) => p.id === sel)?.price}
          </button>
        </div>
      </div>
    </>
  );
}

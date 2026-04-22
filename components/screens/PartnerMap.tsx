"use client";
import { useState } from "react";
import { StatusBar } from "../PhoneChrome";

const PARTNERS = [
  { icon: "🍝", name: "Trattoria Mario", cat: "Food · Oltrarno", dist: "120m", discount: "−10%", class: "" },
  { icon: "🏛", name: "Museo Stibbert", cat: "Cultura · skip-the-line", dist: "2,1km", discount: "−15%", class: "sage" },
  { icon: "🛍", name: "Scuola del Cuoio", cat: "Artigianato · Santa Croce", dist: "480m", discount: "5% cash", class: "dark" },
  { icon: "🥩", name: "Regina Bistecca", cat: "Food · Duomo", dist: "180m", discount: "−8%", class: "" },
  { icon: "🍷", name: "Enoteca Pitti", cat: "Vino · Oltrarno", dist: "620m", discount: "−12%", class: "" }
];

export function PartnerMapScreen({ onQR, onCheckout }: { onQR: () => void; onCheckout: () => void }) {
  const [cat, setCat] = useState("all");

  return (
    <>
      <StatusBar />
      <div className="s-pmap">
        <div className="pmap-top">
          <div className="pmap-stats">
            <h4>Partner a Firenze</h4>
            <div style={{ fontSize: 13 }}>
              <b>412</b> attivi
            </div>
          </div>
          <div className="pmap-cats">
            {[
              ["all", "◉ Tutti"],
              ["food", "🍝 Food"],
              ["muse", "🏛 Musei"],
              ["shop", "🛍 Shopping"],
              ["trans", "🚕 Transport"]
            ].map(([k, l]) => (
              <button
                key={k}
                className={`chip ${cat === k ? "accent" : ""}`}
                onClick={() => setCat(k)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="pmap-body">
          <div
            className="map-real"
            style={{ backgroundImage: `url("https://staticmap.openstreetmap.de/staticmap.php?center=43.7696,11.2558&zoom=15&size=400x500&maptype=mapnik")` }}
          />
          <div className="map-overlay" />
          <div className="map-attrib">© OpenStreetMap</div>
          <div className="pp" style={{ top: "30%", left: "40%" }}>🍝</div>
          <div className="pp sage" style={{ top: "42%", left: "62%" }}>🏛</div>
          <div className="pp dark" style={{ top: "56%", left: "36%" }}>🛍</div>
          <div className="pp" style={{ top: "60%", left: "68%" }}>🍷</div>
          <div className="pp" style={{ top: "34%", left: "72%" }}>🥩</div>
          <div className="pp sage" style={{ top: "48%", left: "28%" }}>🎨</div>
          <div className="pp" style={{ top: "66%", left: "50%" }}>☕</div>
          <div className="pp dark" style={{ top: "22%", left: "48%" }}>🧳</div>

          <div className="pmap-list">
            <div className="sheet-grab" />
            {PARTNERS.slice(0, 4).map((p, idx) => (
              <button
                key={p.name}
                onClick={idx === 0 ? onQR : onCheckout}
                className="p-item"
                style={{ background: "transparent", border: "none", width: "100%", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}
              >
                <div className={`p-sq ${p.class}`}>{p.icon}</div>
                <div className="p-info">
                  <div className="p-title">{p.name}</div>
                  <div className="p-sub">
                    {p.cat} · ⭐ 4,{6 + (idx % 3)}
                  </div>
                </div>
                <div className="p-meta">
                  {p.dist}
                  <br />
                  <b>{p.discount}</b>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

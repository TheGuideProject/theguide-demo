"use client";
import { useState } from "react";
import { StatusBar } from "../PhoneChrome";

const TILES = [
  { emo: "🐚", state: "found" as const },
  { emo: "🦢", state: "found" as const },
  { emo: "🌹", state: "found" as const },
  { emo: "🎯", state: "empty" as const },
  { emo: "❓", state: "empty" as const },
  { emo: "🔒", state: "locked" as const }
];

export function KidsScreen({ onClose }: { onClose: () => void }) {
  const [stars, setStars] = useState(12);

  return (
    <>
      <StatusBar />
      <div className="s-kids">
        <div className="kids-top">
          <button
            className="icon-btn"
            style={{ background: "rgba(255,255,255,.5)" }}
            onClick={onClose}
          >
            ‹
          </button>
          <div className="kids-fox">🦊</div>
          <div style={{ flex: 1 }}>
            <div className="title">Caccia al tesoro</div>
            <div className="sub">Galleria degli Uffizi</div>
          </div>
          <div className="kids-stars">⭐ {stars}</div>
        </div>

        <div className="kids-quest">
          <div className="lvl">Livello 3 · Sala Botticelli</div>
          <h3>Trova le 6 creature mitologiche!</h3>
          <div className="sub">
            Inquadra con la fotocamera quando pensi di averla trovata. Ogni scoperta = 1 stella ⭐
          </div>
          <div className="kids-grid">
            {TILES.map((t, i) => (
              <button
                key={i}
                className={`kids-tile ${t.state}`}
                onClick={() => {
                  if (t.state === "empty") setStars((s) => s + 1);
                }}
              >
                {t.emo}
              </button>
            ))}
          </div>
          <button className="kids-cta">📷 Cerca con la fotocamera</button>
        </div>

        <div style={{ padding: "16px 18px 30px", textAlign: "center" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#6A4C25",
              letterSpacing: ".1em",
              textTransform: "uppercase"
            }}
          >
            Scoperte recenti
          </div>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: 10,
              justifyContent: "center"
            }}
          >
            {["🐚", "🦢", "🌹"].map((e) => (
              <div
                key={e}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 22,
                  boxShadow: "0 4px 10px rgba(0,0,0,.08)"
                }}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

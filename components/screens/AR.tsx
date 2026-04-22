"use client";
import { useState } from "react";
import { StatusBar } from "../PhoneChrome";

export function ARScreen({ onClose }: { onClose: () => void }) {
  const [era, setEra] = useState(62);
  const labels = ["Oggi", "100 d.C.", "27 a.C."];
  const activeIndex = era < 33 ? 0 : era < 80 ? 1 : 2;

  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-ar">
        <div className="ar-bg" />
        <div className="ruins" />

        <div className="ar-top">
          <div className="ar-badge">
            <span className="live" />
            LIVE 3D
          </div>
          <button className="ar-badge" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="ar-scan">
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
        </div>

        <div className="ar-bottom">
          <div className="ar-title">Foro Romano</div>
          <div className="ar-sub">Guarda com&apos;era nell&apos;anno 100 d.C.</div>
          <div className="ar-slider">
            <div className="slider-row">
              {labels.map((l, i) => (
                <span key={l} className={activeIndex === i ? "active" : ""}>
                  {l}
                </span>
              ))}
            </div>
            <div
              className="slider-bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setEra(Math.round((x / rect.width) * 100));
              }}
            >
              <div className="slider-fill" style={{ width: `${era}%` }} />
              <div className="knob" style={{ left: `${era}%` }} />
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                fontSize: 10,
                opacity: 0.85
              }}
            >
              <span>🔇 Muta</span>
              <span>·</span>
              <span style={{ color: "var(--accent-2)" }}>🎙 Iris racconta</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

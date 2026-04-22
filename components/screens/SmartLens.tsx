"use client";
import { useEffect, useState } from "react";
import { StatusBar } from "../PhoneChrome";
import { MONUMENTS, MENU_ITEMS } from "../../lib/facts";
import { speak, stopSpeaking } from "../../lib/tts";

const ORDER = ["david", "duomo", "uffizi"] as const;

export function SmartLensMonument({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [scanning, setScanning] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const monument = MONUMENTS[ORDER[idx]];

  useEffect(() => {
    setScanning(true);
    const t = setTimeout(() => setScanning(false), 1100);
    return () => clearTimeout(t);
  }, [idx]);

  useEffect(() => () => stopSpeaking(), []);

  const handleSpeak = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const ok = speak(monument.tts, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false)
    });
    if (!ok) setSpeaking(false);
  };

  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-smartlens">
        <div
          className="sl-photo"
          style={{ backgroundImage: `url(${monument.photo})` }}
        />
        <div className="sl-gradient" />

        <div className="ar-top">
          <div className="ar-badge">
            <span className="live" />◉ Smart Lens
          </div>
          <button className="ar-badge" onClick={onClose}>
            ✕
          </button>
        </div>

        {scanning && (
          <>
            <div className="sl-detect">
              <span className="c tl" />
              <span className="c tr" />
              <span className="c bl" />
              <span className="c br" />
            </div>
            <div className="sl-scanline" />
            <div className="sl-scan-label">Analisi in corso…</div>
          </>
        )}

        {!scanning && (
          <>
            <div className="sl-probe" style={{ top: "32%", left: "42%" }}>
              <span />
              <b>Testa · proporzioni idealizzate</b>
            </div>
            <div className="sl-probe" style={{ top: "58%", left: "30%" }}>
              <span />
              <b>Fionda · simbolo del duello con Golia</b>
            </div>
          </>
        )}

        <div className="sl-info-card">
          <div className="tag">{monument.tagline}</div>
          <div className="title">{monument.name}</div>
          <div className="meta">
            {monument.artist ? `${monument.artist} · ` : ""}
            {monument.year} · {monument.place}
          </div>

          <div className="sl-bullets">
            {monument.bullets.map((b) => (
              <div key={b.lbl} className="sl-bullet">
                <div className="ico">{b.ico}</div>
                <div>
                  <div className="l">{b.lbl}</div>
                  <div className="v">{b.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sl-more">
            {monument.more.slice(0, 2).map((m, i) => (
              <div key={i} className="sl-more-row">
                <span className="n">{i + 1}</span>
                <span>{m}</span>
              </div>
            ))}
          </div>

          <div className="mini-actions">
            <button className={speaking ? "speaking" : ""} onClick={handleSpeak}>
              {speaking ? "⏹ Stop" : "🔊 Ascolta"}
            </button>
            <button onClick={() => setIdx((i) => (i + 1) % ORDER.length)}>↻ Altra</button>
            <button className="primary">📚 Scopri</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function SmartLensMenu({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(0);
  const [speaking, setSpeaking] = useState<number | null>(null);
  const item = MENU_ITEMS[selected];

  useEffect(() => () => stopSpeaking(), []);

  const handleSpeak = (i: number) => {
    if (speaking === i) {
      stopSpeaking();
      setSpeaking(null);
      return;
    }
    const ok = speak(MENU_ITEMS[i].tts, {
      onStart: () => setSpeaking(i),
      onEnd: () => setSpeaking(null)
    });
    if (!ok) setSpeaking(null);
  };

  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-smartlens">
        <div className="sl-menu-bg" />
        <div className="sl-gradient" />

        <div className="ar-top">
          <div className="ar-badge">🌐 IT → EN · live</div>
          <button className="ar-badge" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sl-menu-items">
          {MENU_ITEMS.map((m, i) => (
            <button
              key={m.it}
              className={`sl-menu-item ${i === selected ? "active" : ""}`}
              onClick={() => setSelected(i)}
            >
              <div className="sl-menu-top">
                <div className="it">{m.it}</div>
                <div className="price">{m.price}</div>
              </div>
              <b>{m.en}</b>
              <div className="allergen">⚠ {m.allergen}</div>
            </button>
          ))}
        </div>

        <div className="sl-info-card">
          <div className="tag">✨ Iris traduce</div>
          <div className="title">{item.it}</div>
          <div className="meta">{item.en}</div>
          <div className="body">{item.desc}</div>
          <div className="mini-actions">
            <button className={speaking === selected ? "speaking" : ""} onClick={() => handleSpeak(selected)}>
              {speaking === selected ? "⏹ Stop" : "🔊 Pronuncia"}
            </button>
            <button>🌶 Allergie</button>
            <button className="primary">🍝 Prenota</button>
          </div>
        </div>
      </div>
    </>
  );
}

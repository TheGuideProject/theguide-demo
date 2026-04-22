"use client";
import { useEffect, useState } from "react";
import { StatusBar } from "../PhoneChrome";
import { AR_FORUM } from "../../lib/facts";
import { speak, stopSpeaking } from "../../lib/tts";

export function ARScreen({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const era = AR_FORUM[idx];

  useEffect(() => () => stopSpeaking(), []);

  const handleSpeak = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const ok = speak(era.tts, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false)
    });
    if (!ok) setSpeaking(false);
  };

  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-ar">
        <div
          className="ar-photo"
          style={{ backgroundImage: `url(${era.photo})` }}
          key={era.id}
        />
        <div className="ar-gradient" />

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

        <div className="ar-crosshair">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#C65D3A" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M50 6 L50 22 M50 78 L50 94 M6 50 L22 50 M78 50 L94 50" stroke="#fff" strokeWidth="1" />
          </svg>
          <span className="ar-pin-label">Tempio di Saturno · 42m</span>
        </div>

        <div className="ar-bottom">
          <div className="ar-title">Foro Romano · {era.label}</div>
          <div className="ar-sub">{era.caption}</div>
          <div className="ar-slider">
            <div className="slider-row">
              {AR_FORUM.map((e, i) => (
                <button
                  key={e.id}
                  className={`era-tab ${i === idx ? "active" : ""}`}
                  onClick={() => setIdx(i)}
                >
                  {e.year}
                </button>
              ))}
            </div>
            <div className="ar-years">
              <span>2026</span>
              <div className="ar-years-bar">
                <span className="fill" style={{ width: `${(idx / (AR_FORUM.length - 1)) * 100}%` }} />
              </div>
              <span>27 a.C.</span>
            </div>
            <div className="ar-cta-row">
              <button className={`ar-action ${speaking ? "speaking" : ""}`} onClick={handleSpeak}>
                {speaking ? "⏹ Stop" : "🎙 Iris racconta"}
              </button>
              <button className="ar-action">📸 Salva</button>
              <button className="ar-action">🗺 Indicazioni</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

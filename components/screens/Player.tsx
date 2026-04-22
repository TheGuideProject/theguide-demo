"use client";
import { useEffect, useState } from "react";
import { StatusBar } from "../PhoneChrome";

export function PlayerScreen({ onClose, onIris }: { onClose: () => void; onIris: () => void }) {
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(9); // bars out of 24

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setPosition((p) => (p < 24 ? p + 1 : p));
    }, 1400);
    return () => clearInterval(t);
  }, [playing]);

  const bars = Array.from({ length: 24 }).map((_, i) => {
    const h = 6 + ((i * 37) % 28);
    return { h, played: i < position };
  });

  const total = 360;
  const current = Math.floor((position / 24) * total);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-player">
        <div className="player-hero">
          <div className="player-art">🌊</div>
          <div className="player-top">
            <button className="icon-btn" onClick={onClose}>
              ‹
            </button>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Sala Botticelli</div>
            <button className="icon-btn">⋯</button>
          </div>
          <div className="player-hmeta">
            <div className="player-tag">Audio-guida · Iris</div>
            <div className="player-title">Nascita di Venere</div>
            <div className="player-sub">Sandro Botticelli · 1485 ca.</div>
          </div>
        </div>

        <div className="player-body">
          <div className="waveform">
            {bars.map((b, i) => (
              <span
                key={i}
                className={b.played ? "p" : ""}
                style={{ height: b.h }}
              />
            ))}
          </div>
          <div className="player-times">
            <span>{fmt(current)}</span>
            <span>−{fmt(total - current)}</span>
          </div>
          <div className="player-ctrls">
            <button className="ctrl">«</button>
            <button
              className="ctrl play"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pausa" : "Play"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button className="ctrl">»</button>
          </div>
          <div className="player-transcript">
            ...la Venere si erge su una conchiglia, portata dalla brezza di <b>Zefiro</b> e Clori.
            Osserva l&apos;incarnato luminoso, la posa della <b>Venere Pudica</b>, e il mantello
            ricamato con primule e centaurea...
          </div>
        </div>

        <button className="iris-fab" onClick={onIris}>
          ✨ Chiedi a Iris
        </button>
      </div>
    </>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "../PhoneChrome";
import { speak, stopSpeaking, isTTSAvailable } from "../../lib/tts";

const NARRATION = `La Nascita di Venere di Sandro Botticelli, dipinta intorno al 1485. La Venere si erge su una conchiglia, portata a riva dalla brezza di Zefiro e Clori. Osserva l'incarnato luminoso, la posa della Venere Pudica, e il mantello ricamato con primule e centaurea che l'Ora di primavera porge per coprirla. Questo capolavoro, oggi nella Sala 10-14 degli Uffizi, fu commissionato dalla famiglia Medici e rappresenta la rinascita della bellezza classica nel pieno Rinascimento fiorentino.`;

export function PlayerScreen({ onClose, onIris }: { onClose: () => void; onIris: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [ttsSupported, setTtsSupported] = useState(true);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const totalMsRef = useRef<number>(30000);

  useEffect(() => {
    setTtsSupported(isTTSAvailable());
    return () => {
      stopSpeaking();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(1, elapsed / totalMsRef.current);
      setPosition(Math.floor(pct * 24));
      if (pct < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const handlePlayPause = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }
    // Start TTS
    startRef.current = performance.now();
    totalMsRef.current = Math.max(15000, NARRATION.length * 60);
    setPlaying(true);
    speak(NARRATION, {
      lang: "it-IT",
      rate: 0.95,
      pitch: 1.05,
      onEnd: () => {
        setPlaying(false);
        setPosition(24);
      }
    });
  };

  const bars = Array.from({ length: 24 }).map((_, i) => {
    const h = 6 + ((i * 37) % 28);
    return { h, played: i < position };
  });

  const total = Math.floor(totalMsRef.current / 1000);
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
            <div className="player-tag">
              Audio-guida · Iris {playing && <span className="player-live">● live</span>}
            </div>
            <div className="player-title">Nascita di Venere</div>
            <div className="player-sub">Sandro Botticelli · 1485 ca.</div>
          </div>
        </div>

        <div className="player-body">
          <div className={`waveform ${playing ? "anim" : ""}`}>
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
            <span>−{fmt(Math.max(0, total - current))}</span>
          </div>
          <div className="player-ctrls">
            <button className="ctrl">«</button>
            <button
              className="ctrl play"
              onClick={handlePlayPause}
              aria-label={playing ? "Pausa" : "Play"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button className="ctrl">»</button>
          </div>
          {!ttsSupported && (
            <div className="player-warn">
              ⚠ Il tuo browser non supporta la sintesi vocale. La riproduzione è simulata.
            </div>
          )}
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

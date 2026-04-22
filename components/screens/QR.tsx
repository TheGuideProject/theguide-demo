"use client";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "../PhoneChrome";

export function QRScreen({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [slide, setSlide] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paying, setPaying] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const pct = (x / rect.width) * 100;
      setSlide(pct);
      if (pct > 85) {
        setDragging(false);
        setPaying(true);
        setTimeout(onSuccess, 900);
      }
    };
    const stop = () => {
      setDragging(false);
      setSlide((p) => (p > 85 ? 100 : 0));
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging, onSuccess]);

  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-qr">
        <div className="qr-cam">
          <div className="qr-top">
            <button className="ar-badge" onClick={onClose}>
              ✕ Chiudi
            </button>
            <button className="ar-badge">💡 Luce</button>
          </div>

          <div className="qr-frame">
            <span className="c tl" />
            <span className="c tr" />
            <span className="c bl" />
            <span className="c br" />
            <div className="qr-pattern" />
            <div className="qr-scanline" />
          </div>

          <div className="qr-detected">
            <div className="sq">🍝</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800 }}>Trattoria Mario</div>
              <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>
                Partner verificato · −10%
              </div>
            </div>
            <div className="ok">✓</div>
          </div>
        </div>

        <div className="qr-bottom">
          <div className="qr-amount">
            <div className="n">€ 35,00</div>
            <div className="l">Saldo disponibile €124,50 · cashback +€1,75</div>
          </div>
          {!paying ? (
            <div
              className="qr-slide"
              ref={trackRef}
              onMouseDown={() => setDragging(true)}
              onTouchStart={() => setDragging(true)}
            >
              <div className="knob" style={{ transform: `translateX(${Math.min(slide * 2.3, 230)}px)` }}>
                ›
              </div>
              <div className="txt" style={{ opacity: 1 - slide / 60 }}>
                Fai scorrere per pagare
              </div>
              <div className="fill" style={{ width: `${Math.min(slide, 100)}%` }} />
            </div>
          ) : (
            <div className="qr-paying">
              <span className="spin" />
              NFC in corso… addebito €35,00
            </div>
          )}
        </div>
      </div>
    </>
  );
}

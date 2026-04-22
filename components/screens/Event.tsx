"use client";
import { StatusBar } from "../PhoneChrome";

export function EventScreen({ onClose }: { onClose: () => void }) {
  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-event">
        <div className="event-notif">
          <div className="head">
            <div className="mico">♪</div>
            <div className="mid">
              <div className="t">Happening adesso</div>
              <div className="s">Iris · Live Radar</div>
            </div>
            <div className="ago">ora</div>
          </div>
          <h4>Concerto spontaneo di archi · Piazza della Signoria</h4>
          <div className="body">
            Quartetto del Conservatorio Cherubini · inizia tra 8 minuti. Sei a 4 minuti a
            piedi. Durata stimata: 30 min. <b>Gratuito.</b>
          </div>
          <div className="cta">
            <button className="ghost" onClick={onClose}>
              Non grazie
            </button>
            <button className="dark">Portami lì →</button>
          </div>
        </div>

        <div className="event-walk">
          <div className="label">In cammino</div>
          <div className="dest">Piazza della Signoria</div>
          <div className="meta">📍 320m · 4 min a piedi</div>
          <div className="nav-card">
            <b>↱ Gira a destra in Via Calzaiuoli</b>
            <br />
            Tra 80 metri · Iris ti guida
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { StatusBar } from "../PhoneChrome";

const AVATARS = [
  { i: "J", bg: "linear-gradient(135deg,#C65D3A,#E8A77A)" },
  { i: "L", bg: "linear-gradient(135deg,#A7C0A8,#5F7A67)" },
  { i: "M", bg: "linear-gradient(135deg,#7C95C0,#465C84)" },
  { i: "A", bg: "linear-gradient(135deg,#D4B572,#9A7A2E)" }
];

export function GroupScreen({ onClose }: { onClose: () => void }) {
  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-group">
        <div className="gr-hero">
          <button className="icon-btn back" onClick={onClose}>
            ‹
          </button>
          <h3>Viaggio a Firenze</h3>
          <div className="sub">Gio 24 — Sab 26 apr · 4 persone</div>
          <div className="gr-avatars">
            {AVATARS.map((a, i) => (
              <div key={i} className="av" style={{ background: a.bg }}>
                {a.i}
              </div>
            ))}
          </div>
        </div>

        <div className="gr-body">
          <div>
            <div className="gr-section-title">Votazione aperta · 2 min</div>
            <div className="poll-card">
              <h4>Cena stasera — scegliamo?</h4>
              <div className="poll-option lead">
                <div className="poll-row">
                  <span>🍝 Trattoria Mario</span>
                  <span className="votes">3 voti · 75%</span>
                </div>
                <div className="poll-bar">
                  <span style={{ width: "75%" }} />
                </div>
              </div>
              <div className="poll-option">
                <div className="poll-row">
                  <span>🍷 Enoteca Pitti</span>
                  <span className="votes">1 voto · 25%</span>
                </div>
                <div className="poll-bar">
                  <span style={{ width: "25%" }} />
                </div>
              </div>
              <div className="poll-option">
                <div className="poll-row">
                  <span>🥩 Regina Bistecca</span>
                  <span className="votes">0 voti</span>
                </div>
                <div className="poll-bar">
                  <span style={{ width: "0%" }} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="gr-section-title">Spese condivise · TravelPass</div>
            <div className="split-card">
              <h5>Oggi · giovedì 24 apr</h5>
              <div className="split-row">
                <span>Cena Trattoria Mario</span>
                <span>€140,00</span>
              </div>
              <div className="split-row">
                <span>Biglietti Uffizi × 4</span>
                <span>€104,00</span>
              </div>
              <div className="split-row">
                <span>Taxi Pitti → hotel</span>
                <span>€18,00</span>
              </div>
              <div className="split-row total">
                <span>Totale oggi</span>
                <span>€262,00</span>
              </div>
              <div className="split-pp">Dividi equamente · €65,50 a testa →</div>
            </div>
          </div>

          <div style={{ height: 20 }} />
        </div>
      </div>
    </>
  );
}

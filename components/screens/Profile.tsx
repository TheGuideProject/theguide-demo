"use client";
import { StatusBar } from "../PhoneChrome";

export function ProfileScreen({ onKids, onA11y, onGroup }: { onKids: () => void; onA11y: () => void; onGroup: () => void }) {
  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-profile">
        <div className="pr-hero">
          <div className="pr-avatar">J</div>
          <div className="pr-name">Jacopo Quaresima</div>
          <div className="pr-level">Esploratore · Livello 4</div>
          <div className="pr-xp">
            <div className="pr-xp-bar">
              <span style={{ width: "68%" }} />
            </div>
            <div className="pr-xp-lbl">
              <span>680 XP</span>
              <span>1.000 XP · Livello 5</span>
            </div>
          </div>
        </div>

        <div className="pr-stats">
          <div className="pr-stat">
            <div className="n">14</div>
            <div className="l">Città</div>
          </div>
          <div className="pr-stat">
            <div className="n">127</div>
            <div className="l">Monumenti</div>
          </div>
          <div className="pr-stat">
            <div className="n">38</div>
            <div className="l">Partner</div>
          </div>
        </div>

        <div className="pr-section">
          <h5>
            Badge collezionati <a href="#">Vedi tutti</a>
          </h5>
          <div className="badges-grid">
            <div className="bdg earned">🏛</div>
            <div className="bdg earned">🍝</div>
            <div className="bdg earned">🎨</div>
            <div className="bdg earned">🌇</div>
            <div className="bdg earned">🍷</div>
            <div className="bdg earned">⛪</div>
            <div className="bdg locked">🚤</div>
            <div className="bdg locked">🎭</div>
          </div>
        </div>

        <div className="pr-section">
          <h5>
            Ultimi viaggi <a href="#">Cronologia</a>
          </h5>
          <div className="trip-row">
            <div className="trip-thumb" />
            <div className="trip-info">
              <div className="trip-title">Firenze · 3 giorni</div>
              <div className="trip-sub">in corso · 24-26 apr</div>
            </div>
            <div className="trip-xp">+240 XP</div>
          </div>
          <div className="trip-row">
            <div className="trip-thumb s" />
            <div className="trip-info">
              <div className="trip-title">Roma</div>
              <div className="trip-sub">marzo 2026 · 4 giorni</div>
            </div>
          </div>
          <div className="trip-row">
            <div className="trip-thumb d" />
            <div className="trip-info">
              <div className="trip-title">Genova</div>
              <div className="trip-sub">feb 2026 · weekend</div>
            </div>
          </div>
        </div>

        <div className="pr-section">
          <h5>Modalità</h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <button className="w-action" onClick={onKids}>
              <div className="ico">🦊</div>
              Kids
            </button>
            <button className="w-action" onClick={onGroup}>
              <div className="ico">👥</div>
              Gruppo
            </button>
            <button className="w-action" onClick={onA11y}>
              <div className="ico">♿</div>
              A11Y
            </button>
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>
    </>
  );
}

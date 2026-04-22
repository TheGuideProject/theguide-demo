"use client";
import { StatusBar } from "../PhoneChrome";

export function SmartLensMonument({ onClose }: { onClose: () => void }) {
  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-smartlens">
        <div className="sl-cam" />
        <div className="sl-david" />

        <div className="ar-top">
          <div className="ar-badge">◉ Smart Lens</div>
          <button className="ar-badge" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sl-detect">
          <span className="c tl" />
          <span className="c tr" />
          <span className="c bl" />
          <span className="c br" />
        </div>

        <div className="sl-info-card">
          <div className="tag">◉ Riconosciuto · 99%</div>
          <div className="title">David · Michelangelo</div>
          <div className="meta">1501-1504 · Galleria dell&apos;Accademia · a 120m</div>
          <div className="body">
            Sei in realtà davanti a una copia del 1873. L&apos;originale è all&apos;Accademia.
            Vuoi che ti ci porti?
          </div>
          <div className="mini-actions">
            <button>🎧 Ascolta</button>
            <button>🗺 Portami</button>
            <button className="primary">📚 Scopri</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function SmartLensMenu({ onClose }: { onClose: () => void }) {
  return (
    <>
      <StatusBar variant="dark" />
      <div className="s-smartlens">
        <div className="sl-cam menu" />

        <div className="ar-top">
          <div className="ar-badge">🌐 IT → EN</div>
          <button className="ar-badge" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sl-menu-items">
          <div className="sl-menu-item">
            <div className="it">Pappa al pomodoro</div>
            <b>Tuscan tomato-bread soup</b>
          </div>
          <div className="sl-menu-item">
            <div className="it">Pappardelle al cinghiale</div>
            <b>Wide pasta · wild boar ragù</b>
          </div>
          <div className="sl-menu-item">
            <div className="it">Lampredotto</div>
            <b>Florentine tripe sandwich</b>
          </div>
        </div>

        <div className="sl-info-card">
          <div className="tag">✨ Iris dice</div>
          <div className="title">Tre piatti tipici toscani</div>
          <div className="body">
            Tutti e tre disponibili a <b>Trattoria Mario</b> (partner, −10%) a 120m.
          </div>
          <div className="mini-actions">
            <button>🔊 Pronuncia</button>
            <button>🌶 Allergie</button>
            <button className="primary">🍝 Prenota</button>
          </div>
        </div>
      </div>
    </>
  );
}

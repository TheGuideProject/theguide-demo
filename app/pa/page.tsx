"use client";

import { useState } from "react";
import "./pa.css";

// ==============================
// DATA
// ==============================

const NAV_PRIMARY = [
  { ico: "◉", label: "Panoramica", active: true },
  { ico: "◎", label: "Flussi turistici" },
  { ico: "◆", label: "Attrattori" },
  { ico: "◇", label: "Eventi" },
  { ico: "○", label: "Strutture ricettive" }
];
const NAV_SECONDARY = [
  { ico: "⌂", label: "Imposta di soggiorno" },
  { ico: "⌘", label: "Sostenibilità" },
  { ico: "⚑", label: "Segnalazioni" },
  { ico: "⚙", label: "Impostazioni" }
];

const ORIGINS = [
  { country: "Italia", flag: "🇮🇹", pct: 38, tone: "accent" as const },
  { country: "Stati Uniti", flag: "🇺🇸", pct: 14, tone: "primary" as const },
  { country: "Germania", flag: "🇩🇪", pct: 11, tone: "primary" as const },
  { country: "Regno Unito", flag: "🇬🇧", pct: 9, tone: "primary" as const },
  { country: "Francia", flag: "🇫🇷", pct: 7, tone: "primary" as const },
  { country: "Giappone", flag: "🇯🇵", pct: 6, tone: "sage" as const },
  { country: "Altri", flag: "🌍", pct: 15, tone: "neutral" as const }
];

// 7 days × 24 hours, weighted density 0..1
const DAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
// peak patterns: lunch 12-14, afternoon 16-18, weekend heavier
const HEATGRID: number[][] = DAYS.map((_, d) => {
  const weekend = d >= 5;
  return Array.from({ length: 24 }, (_, h) => {
    if (h < 7) return 0.02 + Math.random() * 0.04;
    if (h < 9) return 0.15 + Math.random() * 0.12;
    if (h < 11) return 0.4 + Math.random() * 0.12;
    if (h < 14) return (weekend ? 0.85 : 0.72) + Math.random() * 0.1;
    if (h < 16) return 0.55 + Math.random() * 0.12;
    if (h < 19) return (weekend ? 0.78 : 0.65) + Math.random() * 0.12;
    if (h < 22) return 0.5 + Math.random() * 0.15;
    return 0.15 + Math.random() * 0.1;
  });
});

function heatColor(v: number) {
  // green → yellow → orange → red scale
  if (v < 0.15) return "#E9E1D0";
  if (v < 0.3) return "#D3E1D5";
  if (v < 0.45) return "#CCD28F";
  if (v < 0.6) return "#E0C56E";
  if (v < 0.75) return "#D69751";
  if (v < 0.88) return "#C97146";
  return "#B9452E";
}

const POIS = [
  {
    name: "Galleria degli Uffizi",
    loc: "Piazza della Signoria",
    visitors: "18.420",
    dwell: "2h 12min",
    sat: 4.7,
    saturation: 94,
    alert: "danger"
  },
  {
    name: "Cattedrale Santa Maria del Fiore",
    loc: "Piazza del Duomo",
    visitors: "24.110",
    dwell: "1h 08min",
    sat: 4.8,
    saturation: 98,
    alert: "danger"
  },
  {
    name: "Ponte Vecchio",
    loc: "Lungarno",
    visitors: "31.250",
    dwell: "28min",
    sat: 4.5,
    saturation: 82,
    alert: "warn"
  },
  {
    name: "Palazzo Pitti",
    loc: "Oltrarno",
    visitors: "9.640",
    dwell: "1h 52min",
    sat: 4.6,
    saturation: 61,
    alert: "ok"
  },
  {
    name: "Piazzale Michelangelo",
    loc: "San Niccolò",
    visitors: "12.880",
    dwell: "42min",
    sat: 4.7,
    saturation: 54,
    alert: "ok"
  },
  {
    name: "Basilica di Santa Croce",
    loc: "Santa Croce",
    visitors: "6.920",
    dwell: "1h 24min",
    sat: 4.5,
    saturation: 48,
    alert: "ok"
  }
] as const;

const EVENTS = [
  {
    month: "Mag",
    day: "03",
    name: "La Notte Bianca",
    venue: "Centro storico",
    expected: "38.000",
    status: "crowd-control" as const
  },
  {
    month: "Giu",
    day: "24",
    name: "Calcio Storico Fiorentino",
    venue: "Piazza Santa Croce",
    expected: "22.500",
    status: "planned" as const
  },
  {
    month: "Mag",
    day: "14",
    name: "Mostra \"Rinascimento Digitale\"",
    venue: "Galleria degli Uffizi",
    expected: "9.400",
    status: "active" as const
  },
  {
    month: "Apr",
    day: "28",
    name: "Mercato Centrale · Festa dei Sapori",
    venue: "San Lorenzo",
    expected: "14.200",
    status: "active" as const
  }
];

const ALERTS = [
  {
    sev: "danger" as const,
    ico: "⚠",
    t: "Ponte Vecchio: affluenza oltre soglia alle 16:30 — 412 persone/min",
    meta: "Zona Lungarno · raccomandato rerouting",
    time: "16:34"
  },
  {
    sev: "ok" as const,
    ico: "✓",
    t: "Evento Uffizi \"Rinascimento Digitale\" completato senza criticità",
    meta: "8.240 visitatori effettivi · 0 segnalazioni",
    time: "15:02"
  },
  {
    sev: "info" as const,
    ico: "ℹ",
    t: "Nuova struttura registrata: B&B Santo Spirito",
    meta: "CIR attivato automaticamente · 4 posti letto",
    time: "13:18"
  },
  {
    sev: "warn" as const,
    ico: "!",
    t: "18 strutture ricettive senza CIR attivo rilevate dal controllo notturno",
    meta: "Oltrarno (7) · Santa Croce (6) · San Frediano (5)",
    time: "08:05"
  }
];

// Simplified Firenze zones for the heatmap SVG
const ZONES = [
  { id: "duomo", label: "Duomo", x: 340, y: 120, color: "#B9452E", level: 0.95 },
  { id: "signoria", label: "Signoria · Uffizi", x: 330, y: 200, color: "#C97146", level: 0.88 },
  { id: "ponte", label: "Ponte Vecchio", x: 275, y: 235, color: "#D69751", level: 0.82 },
  { id: "santacroce", label: "Santa Croce", x: 455, y: 205, color: "#D69751", level: 0.7 },
  { id: "sanlorenzo", label: "San Lorenzo", x: 280, y: 100, color: "#C97146", level: 0.75 },
  { id: "oltrarno", label: "Oltrarno", x: 230, y: 310, color: "#E0C56E", level: 0.55 },
  { id: "sanfrediano", label: "San Frediano", x: 120, y: 300, color: "#CCD28F", level: 0.4 },
  { id: "campo", label: "Campo di Marte", x: 550, y: 130, color: "#D3E1D5", level: 0.25 },
  { id: "rifredi", label: "Rifredi", x: 120, y: 80, color: "#B8D4BE", level: 0.18 },
  { id: "gavinana", label: "Gavinana", x: 500, y: 330, color: "#CFE2D3", level: 0.22 }
];

// ==============================
// COMPONENT
// ==============================

export default function PAPage() {
  const [taxAuto, setTaxAuto] = useState(true);

  return (
    <div className="pa-root">
      {/* ========================== SIDEBAR ========================== */}
      <aside className="pa-sidebar">
        <div className="pa-brand">
          <div className="pa-logo-mark">TG</div>
          <div className="pa-brand-text">
            <div className="n">TheGuide</div>
            <div className="sub">PA · Comuni</div>
          </div>
        </div>

        <div className="pa-entity">
          <div className="pa-entity-label">Ente attivo</div>
          <div className="pa-entity-name">Comune di Firenze</div>
          <div className="pa-entity-region">Regione Toscana · ISTAT 048017</div>
        </div>

        <nav className="pa-nav">
          <div className="pa-nav-title">Monitoraggio</div>
          {NAV_PRIMARY.map((n) => (
            <button key={n.label} className={`pa-nav-item${n.active ? " active" : ""}`}>
              <span className="ico" aria-hidden>{n.ico}</span>
              <span>{n.label}</span>
            </button>
          ))}
          <div className="pa-nav-title">Governance</div>
          {NAV_SECONDARY.map((n) => (
            <button key={n.label} className="pa-nav-item">
              <span className="ico" aria-hidden>{n.ico}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <div className="pa-sidebar-foot">
          <b>Dati aggiornati</b>
          22 apr 2026 · 17:04
          <br />
          Fonti: Istat, Regione Toscana, TheGuide Live, Questura.
        </div>
      </aside>

      {/* ========================== MAIN ========================== */}
      <div className="pa-main">
        {/* ---------- Top bar ---------- */}
        <header className="pa-topbar">
          <div className="pa-title">
            <div className="pa-crumb">Comune di Firenze</div>
            <h1 className="pa-h1">Dashboard Turismo · Panoramica</h1>
          </div>
          <div className="pa-topbar-actions">
            <div className="pa-range">
              <span className="cal" aria-hidden>▦</span>
              <span>Ultimi 7 giorni</span>
              <span className="caret" aria-hidden>▼</span>
            </div>
            <button className="pa-btn pa-btn-ghost" type="button">⟲ Aggiorna</button>
            <button className="pa-btn pa-btn-primary" type="button">⇩ Esporta PDF</button>
            <div className="pa-avatar" aria-label="Utente">MV</div>
          </div>
        </header>

        {/* ---------- Content ---------- */}
        <main className="pa-content">
          {/* ===== KPIs ===== */}
          <section>
            <div className="pa-section-label">
              Indicatori chiave
              <span className="sub">Confronto vs settimana precedente</span>
            </div>
            <div className="pa-kpi-grid">
              <div className="pa-card pa-kpi">
                <div className="pa-kpi-top">
                  <span>Visitatori attivi</span>
                  <span className="live-dot" aria-label="Live" />
                </div>
                <div className="pa-kpi-value">
                  24.318
                  <small>oggi</small>
                </div>
                <div className="pa-kpi-unit">conteggio live in città</div>
                <div className="pa-kpi-foot">
                  <span className="pa-trend up">▲ 8,2%</span>
                  <span>vs sett. scorsa</span>
                </div>
              </div>

              <div className="pa-card pa-kpi">
                <div className="pa-kpi-top">
                  <span>Spesa media turista</span>
                </div>
                <div className="pa-kpi-value">
                  €142<small>/giorno</small>
                </div>
                <div className="pa-kpi-unit">spesa registrata via TravelPass</div>
                <div className="pa-kpi-foot">
                  <span className="pa-trend up">▲ €11</span>
                  <span>trend positivo</span>
                </div>
              </div>

              <div className="pa-card pa-kpi">
                <div className="pa-kpi-top">
                  <span>Permanenza media</span>
                </div>
                <div className="pa-kpi-value">
                  2,4<small>notti</small>
                </div>
                <div className="pa-kpi-unit">media pernottamenti registrati</div>
                <div className="pa-kpi-foot">
                  <span className="pa-trend flat">≈ stabile</span>
                  <span>rispetto 2,4 nt. sett. -1</span>
                </div>
              </div>

              <div className="pa-card pa-kpi kpi-green">
                <div className="pa-kpi-top">
                  <span>Indice sostenibilità</span>
                </div>
                <div className="pa-kpi-value">
                  74<small>/100</small>
                </div>
                <div className="pa-kpi-unit">modello TheGuide Green Index</div>
                <div className="pa-kpi-foot">
                  <span className="pa-trend up">▲ 3 pt</span>
                  <span>trend positivo</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Heatmap + Origin ===== */}
          <section>
            <div className="pa-grid-2">
              {/* --- Heatmap map --- */}
              <div className="pa-card pa-map-card">
                <div className="pa-map-head">
                  <div className="pa-card-title">
                    <div>
                      <h3>Mappa dei flussi · Firenze</h3>
                      <div className="sub">Densità visitatori per quartiere, ultime 24h</div>
                    </div>
                    <span className="pa-tag">Live</span>
                  </div>
                </div>
                <div className="pa-map-body">
                  <svg viewBox="0 0 620 400" className="pa-map-svg" role="img" aria-label="Mappa di Firenze con densità visitatori">
                    {/* Subtle grid background */}
                    <defs>
                      <pattern id="paGrid" width="22" height="22" patternUnits="userSpaceOnUse">
                        <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#D8CFBD" strokeWidth="0.5" />
                      </pattern>
                      <radialGradient id="hotGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#B9452E" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#B9452E" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#B9452E" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="warmGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#D69751" stopOpacity="0.75" />
                        <stop offset="70%" stopColor="#D69751" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#D69751" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="coolGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#6F9A87" stopOpacity="0.55" />
                        <stop offset="70%" stopColor="#6F9A87" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#6F9A87" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <rect width="620" height="400" fill="#EFE8DB" />
                    <rect width="620" height="400" fill="url(#paGrid)" />

                    {/* Arno river */}
                    <path
                      d="M -20 260 Q 120 230, 240 250 T 440 260 Q 540 265, 640 250"
                      stroke="#A8C4BB"
                      strokeWidth="18"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <path
                      d="M -20 260 Q 120 230, 240 250 T 440 260 Q 540 265, 640 250"
                      stroke="#92B3AB"
                      strokeWidth="1.2"
                      fill="none"
                    />

                    {/* Walls / outline */}
                    <path
                      d="M 60 80 Q 280 40, 520 70 Q 580 140, 570 260 Q 540 340, 420 370 Q 260 380, 120 350 Q 50 280, 60 80 Z"
                      fill="#F6F0E3"
                      stroke="#CABE9E"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />

                    {/* Heat glows */}
                    {ZONES.map((z) => {
                      const grad = z.level > 0.7 ? "url(#hotGlow)" : z.level > 0.45 ? "url(#warmGlow)" : "url(#coolGlow)";
                      const r = 40 + z.level * 50;
                      return <circle key={`g-${z.id}`} cx={z.x} cy={z.y} r={r} fill={grad} />;
                    })}

                    {/* Zone dots */}
                    {ZONES.map((z) => (
                      <g key={z.id}>
                        <circle cx={z.x} cy={z.y} r={6} fill={z.color} stroke="#fff" strokeWidth="1.5" />
                        <text
                          x={z.x}
                          y={z.y - 12}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="700"
                          fill="#1F1B16"
                          style={{ paintOrder: "stroke", stroke: "#F6F0E3", strokeWidth: 3, strokeLinejoin: "round" }}
                        >
                          {z.label}
                        </text>
                      </g>
                    ))}

                    {/* North arrow */}
                    <g transform="translate(572 50)">
                      <circle r="14" fill="#fff" stroke="#CABE9E" />
                      <path d="M 0 -8 L 4 6 L 0 3 L -4 6 Z" fill="#2F4858" />
                      <text y="18" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4A4239">N</text>
                    </g>

                    {/* Scale */}
                    <g transform="translate(30 370)">
                      <line x1="0" y1="0" x2="60" y2="0" stroke="#4A4239" strokeWidth="1.2" />
                      <line x1="0" y1="-3" x2="0" y2="3" stroke="#4A4239" strokeWidth="1.2" />
                      <line x1="60" y1="-3" x2="60" y2="3" stroke="#4A4239" strokeWidth="1.2" />
                      <text x="30" y="-6" textAnchor="middle" fontSize="9" fontWeight="600" fill="#4A4239">500 m</text>
                    </g>
                  </svg>
                  <div className="pa-map-legend">
                    <span>Bassa</span>
                    <div className="bar" />
                    <span>Alta affluenza</span>
                  </div>
                </div>
              </div>

              {/* --- Origin bars --- */}
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Paese di origine</h3>
                    <div className="sub">Top 7 · visitatori registrati questa settimana</div>
                  </div>
                  <span className="pa-tag neutral">24.318 tot.</span>
                </div>
                <div className="pa-bars">
                  {ORIGINS.map((o) => {
                    const width = Math.max(4, (o.pct / 38) * 100);
                    const toneCls =
                      o.tone === "accent"
                        ? "accent"
                        : o.tone === "sage"
                          ? "sage"
                          : o.tone === "neutral"
                            ? "neutral"
                            : "";
                    return (
                      <div key={o.country} className="pa-bar-row">
                        <div className="pa-bar-label">
                          <span className="flag" aria-hidden>{o.flag}</span>
                          {o.country}
                        </div>
                        <div className="pa-bar-track">
                          <div className={`pa-bar-fill ${toneCls}`} style={{ width: `${width}%` }} />
                        </div>
                        <div className="pa-bar-value">{o.pct}%</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 14, fontSize: 11, color: "var(--pa-muted)", display: "flex", justifyContent: "space-between" }}>
                  <span>Lingue supportate in-app: 18</span>
                  <span style={{ color: "var(--pa-ink-blue)", fontWeight: 600 }}>Dettaglio paesi →</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Heatgrid + Leaderboard ===== */}
          <section>
            <div className="pa-grid-2">
              {/* --- Peak-hour heatgrid --- */}
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Concentrazione oraria · 7×24</h3>
                    <div className="sub">Media storica visitatori per giorno e ora</div>
                  </div>
                  <span className="pa-tag danger">Rischio sab 11–13</span>
                </div>
                <div className="pa-heatgrid">
                  <div className="pa-heat-rowlabels">
                    <span>&nbsp;</span>
                    {DAYS.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className="pa-heat-cells">
                    <div className="pa-heat-hours">
                      {Array.from({ length: 24 }).map((_, h) => (
                        <span key={h}>{h % 3 === 0 ? h : ""}</span>
                      ))}
                    </div>
                    {HEATGRID.map((row, di) => (
                      <div key={di} className="pa-heat-grid-row">
                        {row.map((v, hi) => (
                          <div
                            key={hi}
                            className="pa-heat-cell"
                            style={{ background: heatColor(v) }}
                            title={`${DAYS[di]} ${hi}:00 · ${Math.round(v * 100)}%`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pa-heat-legend">
                  <span>Bassa</span>
                  <span className="swatch" style={{ background: heatColor(0.2) }} />
                  <span className="swatch" style={{ background: heatColor(0.4) }} />
                  <span className="swatch" style={{ background: heatColor(0.6) }} />
                  <span className="swatch" style={{ background: heatColor(0.8) }} />
                  <span className="swatch" style={{ background: heatColor(0.95) }} />
                  <span>Alta</span>
                </div>
              </div>

              {/* --- Leaderboard --- */}
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Attrattori principali</h3>
                    <div className="sub">Ranking settimanale per visitatori · saturazione</div>
                  </div>
                  <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">Vedi tutti →</button>
                </div>
                <div className="pa-lb">
                  <div className="pa-lb-head">
                    <div>#</div>
                    <div>Attrattore</div>
                    <div>Visitatori</div>
                    <div className="hide-sm">Dwell</div>
                    <div>Saturazione</div>
                    <div className="hide-sm">Rating</div>
                  </div>
                  {POIS.map((p, i) => {
                    const satCls = p.saturation > 90 ? "danger" : p.saturation > 75 ? "warn" : "";
                    return (
                      <div key={p.name} className="pa-lb-row">
                        <div className="pa-lb-rank">{String(i + 1).padStart(2, "0")}</div>
                        <div className="pa-lb-name">
                          {p.name}
                          <div className="loc">{p.loc}</div>
                        </div>
                        <div className="pa-lb-num">{p.visitors}</div>
                        <div className="pa-lb-num hide-sm">{p.dwell}</div>
                        <div>
                          <div className="pa-lb-num" style={{ fontSize: 11 }}>
                            {p.saturation}%
                            {p.alert === "danger" && <span style={{ marginLeft: 6, color: "var(--pa-danger)" }}>⚠</span>}
                          </div>
                          <div className="pa-sat-bar">
                            <div className={`pa-sat-fill ${satCls}`} style={{ width: `${p.saturation}%` }} />
                          </div>
                        </div>
                        <div className="pa-lb-sat hide-sm">
                          <span className="star">★</span>
                          {p.sat.toFixed(1)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ===== Events + Sustainability + Tax ===== */}
          <section>
            <div className="pa-grid-3">
              {/* --- Events --- */}
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Eventi in programma</h3>
                    <div className="sub">Prossimi 60 giorni</div>
                  </div>
                  <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">+ Nuovo</button>
                </div>
                <div className="pa-event-list">
                  {EVENTS.map((e) => {
                    const statusTag =
                      e.status === "crowd-control" ? (
                        <span className="pa-tag warn">Crowd control</span>
                      ) : e.status === "active" ? (
                        <span className="pa-tag sage">In corso</span>
                      ) : (
                        <span className="pa-tag">Programmato</span>
                      );
                    return (
                      <div key={e.name} className="pa-event">
                        <div className="pa-event-date">
                          <div className="m">{e.month}</div>
                          <div className="d">{e.day}</div>
                        </div>
                        <div className="pa-event-body">
                          <div className="n">{e.name}</div>
                          <div className="s">
                            <span>📍 {e.venue}</span>
                            <span>·</span>
                            <span>attesi <b>{e.expected}</b></span>
                          </div>
                        </div>
                        <div className="pa-event-cta">
                          {statusTag}
                          <button className="pa-btn pa-btn-sm" type="button">Gestisci</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* --- Sustainability --- */}
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Sostenibilità & conformità</h3>
                    <div className="sub">Indicatori ambientali e regolatori</div>
                  </div>
                  <span className="pa-tag sage">+3 pt</span>
                </div>
                <div className="pa-sust-metrics">
                  <div className="pa-sust-metric">
                    <div className="lbl">CO₂ / visitatore</div>
                    <div className="val">2,8<small>kg</small></div>
                    <div className="chg up">↓ 12% vs 2025</div>
                  </div>
                  <div className="pa-sust-metric">
                    <div className="lbl">Short-let regolari</div>
                    <div className="val">87<small>%</small></div>
                    <div className="chg up">↑ 4 pt CIR</div>
                  </div>
                  <div className="pa-sust-metric">
                    <div className="lbl">Rating partner</div>
                    <div className="val">4,6<small>★</small></div>
                    <div className="chg up">↑ 0,2</div>
                  </div>
                </div>
                <div className="pa-alert-bar">
                  <span className="ico" aria-hidden>!</span>
                  <span>
                    <b>18 strutture ricettive senza CIR attivo</b> — verifica necessaria entro 30 giorni (D.Lgs. 33/2017, art. 13-quater).
                  </span>
                  <button className="link" type="button">Verifica →</button>
                </div>
              </div>

              {/* --- Tax / Revenue --- */}
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Imposta di soggiorno</h3>
                    <div className="sub">Incasso corrente · aprile 2026</div>
                  </div>
                  <span className="pa-tag">mensile</span>
                </div>
                <div className="pa-tax-hero">
                  <div className="lbl">Incasso netto mese</div>
                  <div className="val">€418.240<small>·{" "}+6%</small></div>
                  <div className="ch">↑ €23.640 vs aprile 2025 · riscossione al 94%</div>
                </div>
                <div className="pa-stack" aria-hidden>
                  <span className="s1" style={{ width: "54%" }} />
                  <span className="s2" style={{ width: "25%" }} />
                  <span className="s3" style={{ width: "21%" }} />
                </div>
                <div className="pa-tax-split">
                  <div className="pa-split-row">
                    <div className="pa-split-lbl">
                      <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--pa-ink-blue)", marginRight: 6 }} />
                      Hotel & Resort
                    </div>
                    <div className="pa-split-pct">54%</div>
                    <div className="pa-split-amt">€226K</div>
                  </div>
                  <div className="pa-split-row">
                    <div className="pa-split-lbl">
                      <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--pa-accent)", marginRight: 6 }} />
                      Short-let / AirBnB
                    </div>
                    <div className="pa-split-pct">25%</div>
                    <div className="pa-split-amt">€105K</div>
                  </div>
                  <div className="pa-split-row">
                    <div className="pa-split-lbl">
                      <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--pa-sage)", marginRight: 6 }} />
                      B&B & Case vacanza
                    </div>
                    <div className="pa-split-pct">21%</div>
                    <div className="pa-split-amt">€87K</div>
                  </div>
                </div>
                <div className="pa-toggle" style={{ marginTop: 12 }}>
                  <div className="pa-toggle-label">
                    <div className="t">Riscossione automatica</div>
                    <div className="s">Prelievo in tempo reale da TravelPass</div>
                  </div>
                  <button
                    className={`pa-switch${taxAuto ? "" : " off"}`}
                    aria-pressed={taxAuto}
                    onClick={() => setTaxAuto((v) => !v)}
                    type="button"
                  >
                    <span className="sr-only">Toggle</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Alerts feed ===== */}
          <section>
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Feed segnalazioni · live</h3>
                  <div className="sub">Flussi, eventi, conformità · ultime 24h</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="pa-tag sage">4 attive</span>
                  <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">Archivio →</button>
                </div>
              </div>
              <div className="pa-alerts">
                {ALERTS.map((a, i) => (
                  <div key={i} className={`pa-alert ${a.sev}`}>
                    <div className="pa-alert-ico">{a.ico}</div>
                    <div className="pa-alert-body">
                      <div className="t">{a.t}</div>
                      <div className="s">{a.meta}</div>
                    </div>
                    <div className="pa-alert-time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== Footer ===== */}
          <footer className="pa-footer">
            <div>
              © 2026 TheGuide Srl · Dashboard PA v1.2 · Piano operativo turismo 2026–2028
            </div>
            <div className="links">
              <a href="#">Manuale operatore</a>
              <a href="#">Privacy & GDPR</a>
              <a href="#">Supporto ente</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

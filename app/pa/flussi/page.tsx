"use client";

import { useState } from "react";

// ==============================
// DATA
// ==============================

const ZONES = [
  { id: "duomo", label: "Duomo", x: 340, y: 120, level: 0.95 },
  { id: "signoria", label: "Signoria · Uffizi", x: 330, y: 200, level: 0.88 },
  { id: "ponte", label: "Ponte Vecchio", x: 275, y: 235, level: 0.82 },
  { id: "santacroce", label: "Santa Croce", x: 455, y: 205, level: 0.7 },
  { id: "sanlorenzo", label: "San Lorenzo", x: 280, y: 100, level: 0.75 },
  { id: "oltrarno", label: "Oltrarno", x: 230, y: 310, level: 0.55 },
  { id: "sanfrediano", label: "San Frediano", x: 120, y: 300, level: 0.4 },
  { id: "campo", label: "Campo di Marte", x: 550, y: 130, level: 0.25 },
  { id: "rifredi", label: "Rifredi", x: 120, y: 80, level: 0.18 },
  { id: "gavinana", label: "Gavinana", x: 500, y: 330, level: 0.22 },
  { id: "novoli", label: "Novoli", x: 60, y: 150, level: 0.15 },
  { id: "galluzzo", label: "Galluzzo", x: 300, y: 370, level: 0.12 }
];

function levelColor(v: number) {
  if (v < 0.25) return "#B8D4BE";
  if (v < 0.45) return "#CCD28F";
  if (v < 0.6) return "#E0C56E";
  if (v < 0.75) return "#D69751";
  if (v < 0.88) return "#C97146";
  return "#B9452E";
}

const OD_PAIRS = [
  { a: "S.M. Novella (stazione)", b: "Duomo", pct: 18 },
  { a: "Duomo", b: "Ponte Vecchio", pct: 14 },
  { a: "Ponte Vecchio", b: "Palazzo Pitti", pct: 11 },
  { a: "Uffizi", b: "Ponte Vecchio", pct: 10 },
  { a: "Duomo", b: "Uffizi", pct: 9 },
  { a: "San Lorenzo", b: "Duomo", pct: 8 },
  { a: "Piazzale Michelangelo", b: "Ponte Vecchio", pct: 7 },
  { a: "Santa Croce", b: "Duomo", pct: 6 },
  { a: "Oltrarno", b: "Uffizi", pct: 5 },
  { a: "Campo di Marte", b: "Duomo", pct: 4 }
];

// 72h risk level pattern
const HOURS_72 = Array.from({ length: 72 }, (_, i) => {
  const hourOfDay = i % 24;
  const dayOffset = Math.floor(i / 24);
  const weekend = dayOffset === 2; // third day is Saturday
  if (hourOfDay < 7 || hourOfDay > 22) return { h: i, level: "low" as const };
  if (hourOfDay >= 11 && hourOfDay <= 14) return { h: i, level: weekend ? "crit" : "high" as "crit" | "high" };
  if (hourOfDay >= 16 && hourOfDay <= 19) return { h: i, level: weekend ? "crit" : "high" as "crit" | "high" };
  if (hourOfDay >= 9) return { h: i, level: "med" as const };
  return { h: i, level: "low" as const };
});

const BOTTLENECKS = [
  { sev: "crit" as const, ico: "⚠", zone: "Ponte Vecchio", time: "16:30 — ora", density: "412 p/min", dur: "Proiettata 45 min", note: "Saturazione +28% sopra soglia · raccomandato rerouting via Santa Trinita" },
  { sev: "crit" as const, ico: "⚠", zone: "Piazza del Duomo", time: "oggi 17:00", density: "820 p/min", dur: "Proiettata 90 min", note: "Flusso incrociato con evento vicino Baptistery · unità consigliate: 4" },
  { sev: "warn" as const, ico: "!", zone: "Uffizi (coda ingresso)", time: "domani 10:15", density: "coda 520m", dur: "Proiettata 60 min", note: "Previsti 2 gruppi cruise simultanei · attivare timed-entry rinforzato" },
  { sev: "warn" as const, ico: "!", zone: "Piazzale Michelangelo", time: "sab 20:00", density: "tramonto peak", dur: "Proiettata 30 min", note: "Tradizionale affluenza per sunset · aumentare staff pulizia" }
];

const ARRIVALS = [
  { ico: "⛴", n: "MSC Poesia — 2.180 pax", m: "Tender da Livorno · 85% turisti in centro", t: "arrivo 09:20" },
  { ico: "⛴", n: "Norwegian Epic — 3.400 pax", m: "Tender da Livorno · destinazioni miste", t: "arrivo 10:40" },
  { ico: "🚌", n: "Tour Asia Pacific · 14 bus", m: "Approx 560 pax · Uffizi + Duomo", t: "arrivo 11:00" },
  { ico: "🚌", n: "Intercity EDU — 8 bus scolastici", m: "Approx 380 studenti · Galleria Accademia", t: "arrivo 11:20" },
  { ico: "🚅", n: "FR 9532 Roma–Firenze", m: "Approx 240 turisti · dist. uniforme", t: "arrivo 11:58" }
];

// ==============================
// COMPONENT
// ==============================

export default function FlussiPage() {
  const [scrub, setScrub] = useState(14);

  return (
    <>
      <header className="pa-topbar">
        <div className="pa-title">
          <div className="pa-crumb">Comune di Firenze · Monitoraggio</div>
          <h1 className="pa-h1">Flussi turistici · Firenze</h1>
        </div>
        <div className="pa-topbar-actions">
          <div className="pa-range">
            <span className="cal" aria-hidden>▦</span>
            <span>22 apr — 24 apr 2026</span>
            <span className="caret" aria-hidden>▼</span>
          </div>
          <button className="pa-btn pa-btn-ghost" type="button">⟲ Aggiorna</button>
          <button className="pa-btn pa-btn-primary" type="button">⇩ Esporta</button>
          <div className="pa-avatar" aria-label="Utente">MV</div>
        </div>
      </header>

      <main className="pa-content">
        {/* KPIs */}
        <section>
          <div className="pa-section-label">
            Indicatori live
            <span className="sub">Aggiornamento ogni 90 secondi · TheGuide Live</span>
          </div>
          <div className="pa-kpi-grid">
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top">
                <span>Visitatori oggi</span>
                <span className="live-dot" aria-label="Live" />
              </div>
              <div className="pa-kpi-value">28.420<small>·{" "}YTD</small></div>
              <div className="pa-kpi-unit">conteggio aggregato ingresso città</div>
              <div className="pa-kpi-foot">
                <span className="pa-trend up">▲ 12%</span>
                <span>vs media stag.</span>
              </div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Picco registrato</span></div>
              <div className="pa-kpi-value">14:30<small>oggi</small></div>
              <div className="pa-kpi-unit">1.920 visitatori / 15 min in centro</div>
              <div className="pa-kpi-foot">
                <span className="pa-trend flat">≈ in linea</span>
                <span>atteso 14:00–15:00</span>
              </div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Densità centro storico</span></div>
              <div className="pa-kpi-value">92<small>/ha</small></div>
              <div className="pa-kpi-unit">pedoni per ettaro nella ZTL UNESCO</div>
              <div className="pa-kpi-foot">
                <span className="pa-trend down">▲ 8</span>
                <span>soglia 100/ha</span>
              </div>
            </div>
            <div className="pa-card pa-kpi kpi-green">
              <div className="pa-kpi-top"><span>Crowding index</span></div>
              <div className="pa-kpi-value">0,68<small>/1</small></div>
              <div className="pa-kpi-unit">TheGuide Crowding Index aggregato</div>
              <div className="pa-kpi-foot">
                <span className="pa-trend up">▼ 0,04</span>
                <span>mobilità ok</span>
              </div>
            </div>
          </div>
        </section>

        {/* Big heatmap + OD */}
        <section>
          <div className="pa-grid-2-1">
            <div className="pa-card pa-map-card">
              <div className="pa-map-head">
                <div className="pa-card-title">
                  <div>
                    <h3>Choropleth per quartieri · Firenze</h3>
                    <div className="sub">Saturazione aggregata — ora corrente · 22 apr 2026 · 17:04</div>
                  </div>
                  <span className="pa-tag danger">Duomo · 95%</span>
                </div>
              </div>
              <div className="pa-map-body">
                <svg viewBox="0 0 620 420" className="pa-map-svg" role="img" aria-label="Mappa choropleth Firenze">
                  <defs>
                    <pattern id="paGridF" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#D8CFBD" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="620" height="420" fill="#EFE8DB" />
                  <rect width="620" height="420" fill="url(#paGridF)" />
                  {/* district polygons (simplified) */}
                  {ZONES.map((z) => {
                    const r = 50 + z.level * 40;
                    return (
                      <g key={z.id}>
                        <circle cx={z.x} cy={z.y} r={r} fill={levelColor(z.level)} opacity={0.45} />
                        <circle cx={z.x} cy={z.y} r={r * 0.6} fill={levelColor(z.level)} opacity={0.6} />
                      </g>
                    );
                  })}
                  {/* Arno */}
                  <path d="M -20 270 Q 120 240, 240 260 T 440 270 Q 540 275, 640 260" stroke="#92B3AB" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.75" />
                  {/* walls */}
                  <path d="M 50 80 Q 280 30, 540 70 Q 600 150, 580 270 Q 540 360, 420 390 Q 260 400, 110 360 Q 40 280, 50 80 Z" fill="none" stroke="#CABE9E" strokeWidth="1.3" strokeDasharray="4 3" />
                  {/* points */}
                  {ZONES.map((z) => (
                    <g key={`p-${z.id}`}>
                      <circle cx={z.x} cy={z.y} r={5} fill={levelColor(z.level)} stroke="#fff" strokeWidth="1.5" />
                      <text x={z.x} y={z.y - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1F1B16" style={{ paintOrder: "stroke", stroke: "#F6F0E3", strokeWidth: 3, strokeLinejoin: "round" }}>
                        {z.label}
                      </text>
                      <text x={z.x} y={z.y + 14} textAnchor="middle" fontSize="9" fontWeight="700" fill="#4A4239" style={{ paintOrder: "stroke", stroke: "#F6F0E3", strokeWidth: 3, strokeLinejoin: "round" }}>
                        {Math.round(z.level * 100)}%
                      </text>
                    </g>
                  ))}
                  {/* compass */}
                  <g transform="translate(580 50)">
                    <circle r="14" fill="#fff" stroke="#CABE9E" />
                    <path d="M 0 -8 L 4 6 L 0 3 L -4 6 Z" fill="#2F4858" />
                    <text y="18" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4A4239">N</text>
                  </g>
                  <g transform="translate(30 390)">
                    <line x1="0" y1="0" x2="80" y2="0" stroke="#4A4239" strokeWidth="1.2" />
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="#4A4239" strokeWidth="1.2" />
                    <line x1="80" y1="-3" x2="80" y2="3" stroke="#4A4239" strokeWidth="1.2" />
                    <text x="40" y="-6" textAnchor="middle" fontSize="9" fontWeight="600" fill="#4A4239">750 m</text>
                  </g>
                </svg>
                <div className="pa-map-legend">
                  <span>&lt; 25% saturazione</span>
                  <div className="bar" />
                  <span>&gt; 90% critica</span>
                </div>
              </div>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Matrice Origin-Destination</h3>
                  <div className="sub">Top 10 flussi pedonali · 24h</div>
                </div>
                <span className="pa-tag neutral">OD live</span>
              </div>
              <div className="pa-od">
                {OD_PAIRS.map((p, i) => (
                  <div key={i} className="pa-od-row">
                    <div className="pa-od-rank">{String(i + 1).padStart(2, "0")}</div>
                    <div className="pa-od-pair">
                      <span>{p.a}</span>
                      <span className="arr">→</span>
                      <span>{p.b}</span>
                    </div>
                    <div className="pa-od-bar">
                      <div className="pa-od-fill" style={{ width: `${(p.pct / 18) * 100}%` }} />
                    </div>
                    <div className="pa-od-pct">{p.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 24h flow animation */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>Time-lapse 24h · simulazione flussi</h3>
                <div className="sub">Scrubber per esplorare movimento pedonale nelle 24 ore</div>
              </div>
              <span className="pa-tag">simulazione</span>
            </div>
            <svg viewBox="0 0 620 240" className="pa-map-svg" style={{ height: 240 }} role="img" aria-label="Flow animation">
              <rect width="620" height="240" fill="#EFE8DB" />
              <path d="M -10 130 Q 140 110, 260 130 T 460 130 Q 540 130, 640 120" stroke="#92B3AB" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.7" />
              {/* flow particles: simulate 5 arcs */}
              {[
                { x1: 120, y1: 80, x2: 320, y2: 110 },
                { x1: 320, y1: 110, x2: 460, y2: 130 },
                { x1: 460, y1: 130, x2: 540, y2: 90 },
                { x1: 320, y1: 110, x2: 220, y2: 170 },
                { x1: 260, y1: 60, x2: 380, y2: 110 }
              ].map((arc, i) => {
                const mid = (scrub % 24) / 24;
                const cx = arc.x1 + (arc.x2 - arc.x1) * mid;
                const cy = arc.y1 + (arc.y2 - arc.y1) * mid - Math.sin(mid * Math.PI) * 20;
                return (
                  <g key={i}>
                    <path d={`M ${arc.x1} ${arc.y1} Q ${(arc.x1 + arc.x2) / 2} ${Math.min(arc.y1, arc.y2) - 30}, ${arc.x2} ${arc.y2}`} fill="none" stroke="#C6704A" strokeWidth="1.5" strokeDasharray="3 4" opacity=".55" />
                    <circle cx={arc.x1} cy={arc.y1} r="7" fill="#2F4858" stroke="#fff" strokeWidth="1.5" />
                    <circle cx={arc.x2} cy={arc.y2} r="7" fill="#C6704A" stroke="#fff" strokeWidth="1.5" />
                    <circle cx={cx} cy={cy} r="4" fill="#fff" stroke="#C6704A" strokeWidth="2" />
                  </g>
                );
              })}
              {/* POI labels */}
              {[
                { x: 120, y: 80, t: "S.M.N." },
                { x: 320, y: 110, t: "Duomo" },
                { x: 460, y: 130, t: "S. Croce" },
                { x: 540, y: 90, t: "Campo" },
                { x: 220, y: 170, t: "Oltrarno" },
                { x: 260, y: 60, t: "S. Lorenzo" },
                { x: 380, y: 110, t: "Uffizi" }
              ].map((p) => (
                <text key={p.t} x={p.x} y={p.y - 12} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1F1B16" style={{ paintOrder: "stroke", stroke: "#F6F0E3", strokeWidth: 3, strokeLinejoin: "round" }}>
                  {p.t}
                </text>
              ))}
            </svg>
            <div className="pa-scrub">
              <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button" onClick={() => setScrub((s) => Math.max(0, s - 1))}>◀</button>
              <input type="range" min={0} max={23} value={scrub} onChange={(e) => setScrub(parseInt(e.target.value, 10))} />
              <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button" onClick={() => setScrub((s) => Math.min(23, s + 1))}>▶</button>
              <div className="t">{String(scrub).padStart(2, "0")}:00</div>
            </div>
          </div>
        </section>

        {/* Crowd risk 72h + bottlenecks */}
        <section>
          <div className="pa-grid-2-1">
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Crowd-risk timeline · 72 ore</h3>
                  <div className="sub">Previsione basata su TheGuide Crowding Index · picchi evidenziati</div>
                </div>
                <div className="pa-legend" style={{ margin: 0 }}>
                  <span><span className="pa-legend-swatch" style={{ background: "#9BC3AB" }} />basso</span>
                  <span><span className="pa-legend-swatch" style={{ background: "#E0C56E" }} />medio</span>
                  <span><span className="pa-legend-swatch" style={{ background: "#D69751" }} />alto</span>
                  <span><span className="pa-legend-swatch" style={{ background: "var(--pa-danger)" }} />critico</span>
                </div>
              </div>
              <div className="pa-timeline">
                {HOURS_72.map((b, i) => (
                  <div key={i} className={`pa-timeline-bar ${b.level}`} title={`+${i}h · ${b.level}`} />
                ))}
              </div>
              <div className="pa-timeline-labels">
                <span>oggi 17:00</span>
                <span>domani 17:00</span>
                <span>sab 17:00</span>
              </div>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Bottleneck attivi</h3>
                  <div className="sub">4 zone · live</div>
                </div>
                <span className="pa-tag danger">2 critici</span>
              </div>
              <div className="pa-feed">
                {BOTTLENECKS.map((b, i) => (
                  <div key={i} className={`pa-bottleneck ${b.sev}`}>
                    <div className="sev">{b.ico}</div>
                    <div className="body">
                      <div className="t">{b.zone} · {b.density}</div>
                      <div className="m">{b.note}</div>
                    </div>
                    <div className="meta">
                      <b>{b.time}</b>
                      {b.dur}
                      <div style={{ marginTop: 6 }}>
                        <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">Dispiega unità</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Arrivals feed */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>Arrivi gruppi in ingresso</h3>
                <div className="sub">Crociere · bus turistici · treni — finestra 2h</div>
              </div>
              <span className="pa-tag sage">+5 in arrivo</span>
            </div>
            <div className="pa-feed">
              {ARRIVALS.map((a, i) => (
                <div key={i} className="pa-feed-row">
                  <div className="pa-feed-icon" aria-hidden>{a.ico}</div>
                  <div className="pa-feed-body">
                    <div className="n">{a.n}</div>
                    <div className="m">{a.m}</div>
                  </div>
                  <div className="pa-feed-time">{a.t}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="pa-footer">
          <div>© 2026 TheGuide Srl · Flussi turistici · Previsioni TheGuide Live v3.2</div>
          <div className="links">
            <a href="#">Metodologia</a>
            <a href="#">Soglie configurabili</a>
            <a href="#">API flussi</a>
          </div>
        </footer>
      </main>
    </>
  );
}

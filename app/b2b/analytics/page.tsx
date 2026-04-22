"use client";

import { Fragment, useState } from "react";

/* =============================================================================
   TheGuide · B2B · Analytics avanzate
   ============================================================================= */

const IcoSearch = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IcoBell = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IcoDownload = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Generate 90 days of revenue data
function buildRev(): number[] {
  const out: number[] = [];
  let base = 620;
  for (let i = 0; i < 90; i++) {
    const dow = i % 7;
    const weekendBoost = dow === 5 || dow === 6 ? 300 : 0;
    const trend = i * 3;
    const noise = Math.sin(i * 1.7) * 110;
    out.push(Math.round(base + weekendBoost + trend + noise + (i > 70 ? 150 : 0)));
  }
  return out;
}
const rev90 = buildRev();

// 7 day moving avg
function movingAvg(data: number[], window: number): Array<number | null> {
  return data.map((_, i) => {
    if (i < window - 1) return null;
    const slice = data.slice(i - window + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

function RevenueChart() {
  const data = rev90;
  const avg = movingAvg(data, 7);
  const W = 760;
  const H = 240;
  const padL = 56;
  const padR = 12;
  const padT = 14;
  const padB = 28;
  const min = 0;
  const max = Math.ceil(Math.max(...data) / 200) * 200;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const stepX = chartW / (data.length - 1);
  const yToPx = (v: number) => padT + chartH - ((v - min) / (max - min)) * chartH;
  const xToPx = (i: number) => padL + i * stepX;

  const linePath = data
    .map((v, i) => `${i === 0 ? "M" : "L"}${xToPx(i).toFixed(1)} ${yToPx(v).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${padL + chartW} ${padT + chartH} L${padL} ${padT + chartH} Z`;
  const avgPath = avg
    .map((v, i) =>
      v == null ? "" : `${i === 0 || avg[i - 1] == null ? "M" : "L"}${xToPx(i).toFixed(1)} ${yToPx(v).toFixed(1)}`
    )
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Ricavi 90 giorni">
      <defs>
        <linearGradient id="b2bARG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C6704A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C6704A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((f, idx) => {
        const v = Math.round(min + (max - min) * (1 - f));
        const y = padT + chartH * f;
        return (
          <g key={idx}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#F0EADD" strokeDasharray={idx === 4 ? "0" : "3 4"} />
            <text x={padL - 8} y={y + 3} fontSize="9" textAnchor="end" fill="#948778" fontWeight="600">
              € {v.toLocaleString("it-IT")}
            </text>
          </g>
        );
      })}
      <path d={areaPath} fill="url(#b2bARG)" />
      <path d={linePath} fill="none" stroke="#C6704A" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" opacity="0.55" />
      <path d={avgPath} fill="none" stroke="#1F1B16" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {[0, 14, 29, 44, 59, 74, 89].map((i) => (
        <text key={i} x={xToPx(i)} y={H - 8} fontSize="9" textAnchor="middle" fill="#948778" fontWeight="600">
          {i === 89 ? "oggi" : `d-${89 - i}`}
        </text>
      ))}
    </svg>
  );
}

// Heatmap: 7 days x 14 hours (11..24)
function buildHeat(): number[][] {
  const out: number[][] = [];
  for (let d = 0; d < 7; d++) {
    const row: number[] = [];
    for (let h = 11; h < 25; h++) {
      const lunch = h >= 12 && h <= 14 ? 1 : 0;
      const dinner = h >= 19 && h <= 22 ? 1.2 : 0;
      const weekend = d === 5 || d === 6 ? 0.4 : 0;
      const sunday = d === 6 && h >= 11 && h <= 15 ? 0.4 : 0;
      const jitter = (((d * 7 + h) * 2654435761) % 100) / 100 * 0.12;
      const score = Math.min(1, Math.max(0, (lunch + dinner + weekend + sunday) * 0.5 + jitter));
      row.push(Math.round(score * 100));
    }
    out.push(row);
  }
  return out;
}
const heat = buildHeat();

function Heatmap() {
  const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
  const hours = Array.from({ length: 14 }, (_, i) => 11 + i);
  return (
    <div className="b2b-heat">
      <div className="b2b-heat-corner" />
      {hours.map((h) => (
        <div key={`hh-${h}`} className="b2b-heat-hhead">
          {h}
        </div>
      ))}
      {days.map((d, di) => (
        <Fragment key={`d-${di}`}>
          <div className="b2b-heat-dhead">{d}</div>
          {heat[di].map((v, hi) => {
            const o = (v / 100).toFixed(2);
            return (
              <div
                key={`c-${di}-${hi}`}
                className="b2b-heat-cell"
                style={{
                  background: `rgba(198, 112, 74, ${o})`,
                  color: v > 55 ? "#fff" : "#5A5048",
                }}
                title={`${d} ${hours[hi]}:00 · ${v}`}
              >
                {v >= 60 ? v : ""}
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

// Top dishes bar chart
const topDishes = [
  { name: "Bistecca alla fiorentina", pct: 19, value: "€ 11.408" },
  { name: "Pappardelle al cinghiale", pct: 12, value: "€ 7.208" },
  { name: "Ribollita", pct: 9, value: "€ 5.408" },
  { name: "Tagliata + Chianti", pct: 8, value: "€ 4.812" },
  { name: "Peposo alla fornacina", pct: 7, value: "€ 4.210" },
  { name: "Menu degustazione 4p", pct: 6, value: "€ 3.608" },
  { name: "Crostini toscani", pct: 5, value: "€ 3.012" },
  { name: "Panzanella primavera", pct: 5, value: "€ 2.988" },
  { name: "Tiramisù della casa", pct: 4, value: "€ 2.408" },
  { name: "Cantucci e vin santo", pct: 3, value: "€ 1.808" },
];

function TopDishes() {
  return (
    <div>
      {topDishes.map((d, i) => (
        <div key={i} className="b2b-bar-row">
          <span className="b2b-bar-lbl">
            <b>{i + 1}</b> {d.name}
          </span>
          <div className="b2b-bar-track">
            <span style={{ width: `${(d.pct / 20) * 100}%` }} />
          </div>
          <span className="b2b-bar-pct">{d.pct}%</span>
          <span className="b2b-bar-val">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

// Funnel
const funnel = [
  { label: "Scoperte in app", value: 4218, color: "#C6704A" },
  { label: "Click POI", value: 1640, color: "#D68861" },
  { label: "Prenotazioni", value: 312, color: "#6F9A87" },
  { label: "Paganti", value: 278, color: "#5E8875" },
  { label: "Recensioni", value: 94, color: "#1F1B16" },
];

function Funnel() {
  const max = funnel[0].value;
  return (
    <div className="b2b-funnel">
      {funnel.map((f, i) => {
        const w = (f.value / max) * 100;
        const prev = i > 0 ? funnel[i - 1].value : f.value;
        const conv = i > 0 ? ((f.value / prev) * 100).toFixed(1) : null;
        return (
          <div key={i} className="b2b-funnel-row">
            <div
              className="b2b-funnel-bar"
              style={{ width: `${w}%`, background: f.color }}
            >
              <span>
                <b>{f.value.toLocaleString("it-IT")}</b> {f.label}
              </span>
            </div>
            {conv && <span className="b2b-funnel-conv">{conv}% conv.</span>}
          </div>
        );
      })}
    </div>
  );
}

// Cohort retention grid 6×6
const cohortLabels = ["Nov 2025", "Dic 2025", "Gen 2026", "Feb 2026", "Mar 2026", "Apr 2026"];
const cohortData: number[][] = [
  [100, 32, 24, 19, 16, 14],
  [100, 28, 22, 18, 15, -1],
  [100, 36, 27, 21, -1, -1],
  [100, 34, 25, -1, -1, -1],
  [100, 31, -1, -1, -1, -1],
  [100, -1, -1, -1, -1, -1],
];

function Cohort() {
  return (
    <div className="b2b-cohort">
      <div className="b2b-cohort-head-row">
        <div className="b2b-cohort-lbl">Cohort</div>
        {cohortLabels.map((l, i) => (
          <div key={i} className="b2b-cohort-m">
            M{i}
          </div>
        ))}
      </div>
      {cohortData.map((row, i) => (
        <div key={i} className="b2b-cohort-row">
          <div className="b2b-cohort-lbl">{cohortLabels[i]}</div>
          {row.map((v, j) => {
            if (v === -1) return <div key={j} className="b2b-cohort-cell empty" />;
            const alpha = v / 100;
            return (
              <div
                key={j}
                className="b2b-cohort-cell"
                style={{
                  background: `rgba(111, 154, 135, ${alpha})`,
                  color: v > 50 ? "#fff" : "#1F1B16",
                }}
              >
                {v}%
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Geographic insight — source countries
const geoCountries = [
  { flag: "🇩🇪", name: "Germania", pct: 24, value: "72" },
  { flag: "🇺🇸", name: "Stati Uniti", pct: 19, value: "58" },
  { flag: "🇯🇵", name: "Giappone", pct: 14, value: "42" },
  { flag: "🇫🇷", name: "Francia", pct: 11, value: "33" },
  { flag: "🇬🇧", name: "Regno Unito", pct: 9, value: "27" },
  { flag: "🇮🇹", name: "Italia", pct: 8, value: "24" },
];

function MiniMap() {
  // Simple stylized representation of Firenze
  return (
    <svg viewBox="0 0 200 140" role="img" aria-label="Firenze centro">
      <rect width="200" height="140" fill="#F6F0E7" />
      <path d="M 10 70 Q 50 30, 100 50 T 190 45" stroke="#6F9A87" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 10 105 L 190 95" stroke="#6F9A87" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 40 20 L 60 130 M 110 15 L 115 130 M 160 25 L 155 130" stroke="#E6DFD2" strokeWidth="1" fill="none" />
      {/* River Arno */}
      <path d="M 0 90 Q 50 85, 100 95 T 200 92" stroke="#A7C0DE" strokeWidth="5" fill="none" opacity="0.5" />
      {/* Trattoria Mario */}
      <circle cx="95" cy="62" r="6" fill="#C6704A" />
      <circle cx="95" cy="62" r="12" fill="#C6704A" opacity="0.25" />
      <text x="105" y="60" fontSize="9" fontWeight="700" fill="#1F1B16">Trattoria Mario</text>
      {/* Other partner dots */}
      <circle cx="45" cy="50" r="2.5" fill="#6F9A87" />
      <circle cx="140" cy="45" r="2.5" fill="#6F9A87" />
      <circle cx="160" cy="80" r="2.5" fill="#6F9A87" />
      <circle cx="65" cy="100" r="2.5" fill="#6F9A87" />
      <circle cx="120" cy="110" r="2.5" fill="#6F9A87" />
    </svg>
  );
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<"30" | "90" | "12m">("90");
  return (
    <>
      <header className="b2b-header">
        <div className="b2b-header-title">
          <span className="b2b-h-eyebrow">Partner</span>
          <span className="b2b-h-name">Trattoria Mario · Firenze</span>
        </div>
        <span className="b2b-pill">
          <span className="b2b-dot" />
          Dati aggiornati · 2 min fa
        </span>
        <div className="b2b-header-spacer" />
        <button className="b2b-icon-btn" aria-label="Cerca" type="button">
          {IcoSearch}
        </button>
        <button className="b2b-icon-btn" aria-label="Notifiche" type="button">
          {IcoBell}
          <span className="b2b-badge-num">3</span>
        </button>
        <div className="b2b-avatar" aria-label="Mario Rossi">
          MR
        </div>
      </header>

      <div className="b2b-content">
        <div className="b2b-page-head">
          <div>
            <h1>Analytics avanzate</h1>
            <div className="b2b-sub">
              Panoramica commerciale completa · dati da POS, TheGuide, Google, Apple Pay, TravelPass.
            </div>
          </div>
          <div className="b2b-page-actions">
            <div className="b2b-tabs" role="tablist">
              <button
                className={`b2b-tab ${range === "30" ? "active" : ""}`}
                onClick={() => setRange("30")}
                type="button"
              >
                30 giorni
              </button>
              <button
                className={`b2b-tab ${range === "90" ? "active" : ""}`}
                onClick={() => setRange("90")}
                type="button"
              >
                90 giorni
              </button>
              <button
                className={`b2b-tab ${range === "12m" ? "active" : ""}`}
                onClick={() => setRange("12m")}
                type="button"
              >
                12 mesi
              </button>
            </div>
            <button className="b2b-btn" type="button">
              {IcoDownload} Esporta CSV
            </button>
          </div>
        </div>

        {/* KPIs */}
        <section className="b2b-kpi-grid">
          <article className="b2b-kpi k-warm">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Ricavo MTD</span>
            </div>
            <div className="b2b-kpi-value">€ 38.420</div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▲ 22%</span>
              <span>vs aprile '25</span>
            </div>
          </article>
          <article className="b2b-kpi k-sage">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">AOV</span>
            </div>
            <div className="b2b-kpi-value">
              € 42,80
            </div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▲ € 3,20</span>
              <span>scontrino medio</span>
            </div>
          </article>
          <article className="b2b-kpi k-sand">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Tavolo medio</span>
            </div>
            <div className="b2b-kpi-value">
              2,3<span className="b2b-kpi-unit">h</span>
            </div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▼ 14 min</span>
              <span>più efficiente</span>
            </div>
          </article>
          <article className="b2b-kpi k-ink">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Retention</span>
            </div>
            <div className="b2b-kpi-value">
              23<span className="b2b-kpi-unit">%</span>
            </div>
            <div className="b2b-kpi-foot">
              <span>ritorna entro 90g</span>
            </div>
          </article>
        </section>

        {/* Revenue chart */}
        <section className="b2b-card">
          <div className="b2b-card-head">
            <div>
              <h3>Ricavi · ultimi 90 giorni</h3>
              <div className="b2b-sub">
                Totale € 84.280 · media € 936/giorno · 7-day moving average evidenziato
              </div>
            </div>
            <div className="b2b-card-head-actions">
              <div className="b2b-tabs">
                <button className="b2b-tab active" type="button">Ricavo</button>
                <button className="b2b-tab" type="button">Coperti</button>
                <button className="b2b-tab" type="button">AOV</button>
              </div>
            </div>
          </div>
          <div className="b2b-chart-wrap">
            <RevenueChart />
          </div>
          <div className="b2b-chart-legend" style={{ marginTop: 6 }}>
            <span>
              <span className="b2b-legend-dot" style={{ background: "#C6704A" }} />
              Ricavo giornaliero
            </span>
            <span>
              <span className="b2b-legend-dot" style={{ background: "#1F1B16" }} />
              7-day MA
            </span>
          </div>
        </section>

        {/* Heatmap + top dishes */}
        <section className="b2b-chart-grid">
          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Heatmap domanda</h3>
                <div className="b2b-sub">Intensità per ora · giorni · ultimi 90g</div>
              </div>
            </div>
            <Heatmap />
            <div className="b2b-chart-legend" style={{ marginTop: 10 }}>
              <span>Bassa</span>
              <span className="b2b-heat-legend">
                <span style={{ background: "rgba(198,112,74,0.15)" }} />
                <span style={{ background: "rgba(198,112,74,0.4)" }} />
                <span style={{ background: "rgba(198,112,74,0.65)" }} />
                <span style={{ background: "rgba(198,112,74,0.9)" }} />
              </span>
              <span>Alta</span>
            </div>
          </div>

          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Top 10 piatti</h3>
                <div className="b2b-sub">% del ricavo totale · 90 giorni</div>
              </div>
            </div>
            <TopDishes />
          </div>
        </section>

        {/* Funnel + cohort */}
        <section className="b2b-chart-grid">
          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Funnel acquisizione</h3>
                <div className="b2b-sub">
                  Da scoperta app a recensione · tasso overall 2,2%
                </div>
              </div>
            </div>
            <Funnel />
          </div>

          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Retention cohort</h3>
                <div className="b2b-sub">% clienti nuovi che ritornano mese per mese</div>
              </div>
            </div>
            <Cohort />
          </div>
        </section>

        {/* Geographic */}
        <section className="b2b-card">
          <div className="b2b-card-head">
            <div>
              <h3>Da dove arrivano</h3>
              <div className="b2b-sub">
                Mappa di Firenze centro · distribuzione per nazione
              </div>
            </div>
          </div>
          <div className="b2b-geo-grid">
            <div className="b2b-geo-map">
              <MiniMap />
              <div className="b2b-geo-map-cap">Posizione del locale</div>
            </div>
            <div>
              {geoCountries.map((c) => (
                <div key={c.name} className="b2b-geo-row">
                  <span className="b2b-geo-flag">{c.flag}</span>
                  <span className="b2b-geo-name">{c.name}</span>
                  <div className="b2b-bar-track">
                    <span style={{ width: `${c.pct * 3}%`, background: "#C6704A" }} />
                  </div>
                  <span className="b2b-geo-pct">{c.pct}%</span>
                  <span className="b2b-geo-val">{c.value}</span>
                </div>
              ))}
              <div className="b2b-lang-note" style={{ marginTop: 14 }}>
                Dati da TheGuide app · 312 prenotazioni uniche negli ultimi 30 giorni.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

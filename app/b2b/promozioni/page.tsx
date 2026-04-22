"use client";

import { useState } from "react";

/* =============================================================================
   TheGuide · B2B · Promozioni
   ============================================================================= */

type PromoStatus = "attiva" | "scheduled" | "expired";
type PromoType = "% off" | "Menu deg." | "Pairing" | "Bundle";
type PromoChannel = "TheGuide" | "Partner QR" | "Iris recommendation";

type Promo = {
  id: string;
  title: string;
  type: PromoType;
  channel: PromoChannel;
  expires: string;
  redemptions: number;
  roi: string;
  status: PromoStatus;
  active: boolean;
  emoji: string;
  revenue: string;
};

const initial: Promo[] = [
  {
    id: "p1",
    title: "-10% menu degustazione · lun-gio",
    type: "% off",
    channel: "TheGuide",
    expires: "30 giu 2026",
    redemptions: 87,
    roi: "4,8×",
    status: "attiva",
    active: true,
    emoji: "10",
    revenue: "€ 3.280",
  },
  {
    id: "p2",
    title: "Aperitivo + antipasto a € 12",
    type: "Bundle",
    channel: "TheGuide",
    expires: "15 mag 2026",
    redemptions: 124,
    roi: "3,9×",
    status: "attiva",
    active: true,
    emoji: "€12",
    revenue: "€ 1.984",
  },
  {
    id: "p3",
    title: "Bistecca + Chianti DOCG pairing",
    type: "Pairing",
    channel: "Iris recommendation",
    expires: "31 lug 2026",
    redemptions: 41,
    roi: "6,2×",
    status: "attiva",
    active: true,
    emoji: "⚘",
    revenue: "€ 2.870",
  },
  {
    id: "p4",
    title: "Menu famiglia · under 10 gratis",
    type: "Bundle",
    channel: "TheGuide",
    expires: "30 set 2026",
    redemptions: 18,
    roi: "2,1×",
    status: "attiva",
    active: false,
    emoji: "Fa",
    revenue: "€ 720",
  },
  {
    id: "p5",
    title: "Sunday brunch · 2 calici Chianti",
    type: "Pairing",
    channel: "Iris recommendation",
    expires: "15 mag 2026",
    redemptions: 0,
    roi: "—",
    status: "scheduled",
    active: false,
    emoji: "Br",
    revenue: "—",
  },
  {
    id: "p6",
    title: "Tavolo vista Duomo · supplemento",
    type: "% off",
    channel: "Partner QR",
    expires: "31 dic 2026",
    redemptions: 52,
    roi: "5,1×",
    status: "attiva",
    active: true,
    emoji: "♦",
    revenue: "€ 1.040",
  },
  {
    id: "p7",
    title: "Happy hour 18:00 – 19:00",
    type: "% off",
    channel: "Partner QR",
    expires: "15 mag 2026",
    redemptions: 96,
    roi: "3,2×",
    status: "attiva",
    active: true,
    emoji: "18",
    revenue: "€ 1.248",
  },
  {
    id: "p8",
    title: "Degustazione primavera · 4 portate",
    type: "Menu deg.",
    channel: "TheGuide",
    expires: "20 apr 2026",
    redemptions: 31,
    roi: "4,6×",
    status: "expired",
    active: false,
    emoji: "4P",
    revenue: "€ 1.488",
  },
];

const redemptionSeries = [
  3, 4, 3, 5, 6, 9, 11, 4, 5, 6, 6, 7, 10, 14,
  5, 6, 7, 8, 8, 10, 13, 6, 7, 8, 9, 10, 12, 14, 13, 15,
];

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
const IcoPlus = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IcoSpark = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2 13.5 8.5 20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
  </svg>
);

function PromoLineChart({ data }: { data: number[] }) {
  const W = 640;
  const H = 180;
  const padL = 36;
  const padR = 12;
  const padT = 10;
  const padB = 24;

  const min = 0;
  const max = Math.max(...data, 20);
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const stepX = chartW / (data.length - 1);

  const yToPx = (v: number) => padT + chartH - ((v - min) / (max - min)) * chartH;
  const xToPx = (i: number) => padL + i * stepX;

  const points = data.map((v, i) => [xToPx(i), yToPx(v)] as const);
  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${padL + chartW} ${padT + chartH} L${padL} ${padT + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Redemptions 30 giorni">
      <defs>
        <linearGradient id="b2bPromoGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6F9A87" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6F9A87" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.33, 0.66, 1].map((f, idx) => {
        const v = Math.round(min + (max - min) * (1 - f));
        const y = padT + chartH * f;
        return (
          <g key={idx}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#F0EADD" strokeDasharray={idx === 3 ? "0" : "3 4"} />
            <text x={padL - 6} y={y + 3} fontSize="9" textAnchor="end" fill="#948778" fontWeight="600">
              {v}
            </text>
          </g>
        );
      })}
      <path d={areaPath} fill="url(#b2bPromoGrad)" />
      <path d={linePath} fill="none" stroke="#6F9A87" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {points.filter((_, i) => i % 5 === 0 || i === points.length - 1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="#6F9A87" strokeWidth="1.8" />
      ))}
      {[0, 10, 20, 29].map((i) => (
        <text key={i} x={xToPx(i)} y={H - 6} fontSize="9" textAnchor="middle" fill="#948778" fontWeight="600">
          {i === 29 ? "oggi" : `d-${29 - i}`}
        </text>
      ))}
    </svg>
  );
}

function AudienceBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="b2b-aud-row">
      <span className="b2b-aud-lbl">{label}</span>
      <div className="b2b-aud-bar">
        <span style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="b2b-aud-val">{value}%</span>
    </div>
  );
}

export default function PromozioniPage() {
  const [promos, setPromos] = useState<Promo[]>(initial);
  const toggle = (id: string) =>
    setPromos((p) => p.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));

  return (
    <>
      <header className="b2b-header">
        <div className="b2b-header-title">
          <span className="b2b-h-eyebrow">Partner</span>
          <span className="b2b-h-name">Trattoria Mario · Firenze</span>
        </div>
        <span className="b2b-pill">
          <span className="b2b-dot" />
          {promos.filter((p) => p.active).length} promo live
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
            <h1>Promozioni attive</h1>
            <div className="b2b-sub">
              Settimana 17 · redemptions +22% vs precedente · canali attivi: TheGuide, Iris, QR
            </div>
          </div>
          <div className="b2b-page-actions">
            <button className="b2b-btn" type="button">
              Libreria template
            </button>
            <button className="b2b-btn b2b-btn-primary" type="button">
              {IcoPlus} Nuova promo
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <section className="b2b-kpi-grid">
          <article className="b2b-kpi k-warm">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Promo attive</span>
            </div>
            <div className="b2b-kpi-value">4</div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▲ +1</span>
              <span>vs settimana scorsa</span>
            </div>
          </article>
          <article className="b2b-kpi k-sage">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Redemptions · settimana</span>
            </div>
            <div className="b2b-kpi-value">128</div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▲ 22%</span>
              <span>vs precedente</span>
            </div>
          </article>
          <article className="b2b-kpi k-sand">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Revenue uplift</span>
            </div>
            <div className="b2b-kpi-value">€ 1.240</div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▲ 18%</span>
              <span>incremento netto</span>
            </div>
          </article>
          <article className="b2b-kpi k-ink">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">ROI medio</span>
            </div>
            <div className="b2b-kpi-value">
              4,2<span className="b2b-kpi-unit">×</span>
            </div>
            <div className="b2b-kpi-foot">
              <span>ricavi / costo promo</span>
            </div>
          </article>
        </section>

        {/* Chart + audience */}
        <section className="b2b-chart-grid">
          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Redemptions · ultimi 30 giorni</h3>
                <div className="b2b-sub">228 totali · 7,6 al giorno · trend +34% MoM</div>
              </div>
              <div className="b2b-card-head-actions">
                <div className="b2b-tabs">
                  <button className="b2b-tab active" type="button">30g</button>
                  <button className="b2b-tab" type="button">90g</button>
                  <button className="b2b-tab" type="button">12m</button>
                </div>
              </div>
            </div>
            <div className="b2b-chart-wrap">
              <PromoLineChart data={redemptionSeries} />
            </div>
            <div className="b2b-chart-legend" style={{ marginTop: 6 }}>
              <span>
                <span className="b2b-legend-dot" style={{ background: "#6F9A87" }} />
                Redemptions giornaliere
              </span>
              <span>
                <span className="b2b-legend-dot" style={{ background: "#F0EADD" }} />
                Griglia
              </span>
            </div>
          </div>

          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Audience</h3>
                <div className="b2b-sub">Dove funzionano meglio le promo</div>
              </div>
            </div>
            <AudienceBar label="Turisti DE" value={78} color="#C6704A" />
            <AudienceBar label="Turisti JP" value={71} color="#E8A77A" />
            <AudienceBar label="Turisti US" value={62} color="#6F9A87" />
            <AudienceBar label="Turisti FR" value={54} color="#C88A2E" />
            <AudienceBar label="Turisti IT" value={38} color="#2A241E" />
            <div className="b2b-lang-note" style={{ marginTop: 10 }}>
              Conversion rate su redemptions per canale di origine.
            </div>
          </div>
        </section>

        {/* Promo table */}
        <section className="b2b-card">
          <div className="b2b-card-head">
            <div>
              <h3>Gestione promozioni</h3>
              <div className="b2b-sub">{promos.length} totali · {promos.filter((p) => p.active).length} attive · 1 scheduled · 1 scaduta</div>
            </div>
            <div className="b2b-card-head-actions">
              <div className="b2b-tabs">
                <button className="b2b-tab active" type="button">Tutte</button>
                <button className="b2b-tab" type="button">Attive</button>
                <button className="b2b-tab" type="button">Scheduled</button>
                <button className="b2b-tab" type="button">Scadute</button>
              </div>
            </div>
          </div>
          <div className="b2b-table-wrap">
            <table className="b2b-table">
              <thead>
                <tr>
                  <th>Promo</th>
                  <th>Tipo</th>
                  <th>Canale</th>
                  <th>Scadenza</th>
                  <th>Redempt.</th>
                  <th>Revenue</th>
                  <th>ROI</th>
                  <th>Stato</th>
                  <th>Attiva</th>
                </tr>
              </thead>
              <tbody>
                {promos.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="b2b-client">
                        <div className="b2b-offer-ico" aria-hidden>
                          {p.emoji}
                        </div>
                        <div style={{ fontWeight: 700 }}>{p.title}</div>
                      </div>
                    </td>
                    <td>
                      <span className="b2b-chip chip-ink">{p.type}</span>
                    </td>
                    <td>
                      <span className={`b2b-method ${p.channel === "TheGuide" ? "tp" : ""}`}>{p.channel}</span>
                    </td>
                    <td style={{ color: "var(--b2b-ink-2)", fontSize: 12 }}>{p.expires}</td>
                    <td style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{p.redemptions}</td>
                    <td className="b2b-td-amt">{p.revenue}</td>
                    <td style={{ fontWeight: 700 }}>{p.roi}</td>
                    <td>
                      <span
                        className={`b2b-status2 ${
                          p.status === "attiva" ? "st-ok" : p.status === "scheduled" ? "st-warn" : "st-bad"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`b2b-toggle ${p.active ? "on" : ""}`}
                        onClick={() => toggle(p.id)}
                        type="button"
                        aria-label={`Toggle ${p.title}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Iris tips */}
        <section className="b2b-insight" aria-label="Suggerimento Iris">
          <div className="b2b-insight-ico" aria-hidden>
            {IcoSpark}
          </div>
          <div className="b2b-insight-main">
            <div className="b2b-insight-tag">Iris · Suggerimento</div>
            <div className="b2b-insight-title">
              Prova un Sunday brunch pairing con 2 calici di Chianti
            </div>
            <div className="b2b-insight-body">
              Analizzando le ricerche dei clienti TravelPass la domenica mattina, il 34% cerca "brunch
              Firenze centro". Con 2 calici inclusi avresti uno scontrino medio stimato di € 38 contro €
              28 del menu attuale. Iris può lanciare la promo con audience DE/US/JP preferenziale.
            </div>
            <div className="b2b-insight-foot">
              <button className="b2b-btn b2b-btn-primary" type="button">
                Crea promo Sunday brunch
              </button>
              <button className="b2b-btn b2b-btn-ghost" type="button">
                Non ora
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

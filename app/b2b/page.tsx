"use client";

import "./b2b.css";
import { useState } from "react";

/* =============================================================================
   TheGuide · B2B Partner Dashboard
   Desktop-style dashboard for partner businesses (Trattoria Mario, Firenze)
   ============================================================================= */

// -----------------------------------------------------------------------------
// Static placeholder data
// -----------------------------------------------------------------------------

type Kpi = {
  key: string;
  label: string;
  value: string;
  unit?: string;
  delta: string;
  deltaDir: "up" | "down";
  foot: string;
  tone: "warm" | "sage" | "sand" | "ink";
  icon: React.ReactNode;
};

type Booking = {
  time: string;
  initials: string;
  name: string;
  origin: string;
  flag: string;
  product: string;
  method: string;
  methodTone?: "tp" | "";
  amount: string;
  status: "Pagato" | "In attesa";
  tone: "ok" | "warn";
  av: "a1" | "a2" | "a3" | "a4";
};

type Offer = {
  id: string;
  title: string;
  detail: string;
  expires: string;
  redemptions: number;
  active: boolean;
  glyph: string;
};

type Review = {
  initials: string;
  name: string;
  when: string;
  rating: number;
  body: string;
  lang: string;
  av: "r1" | "r2" | "r3";
  aiReply?: string;
};

const KPIS_ICONS = {
  revenue: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  conv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

const kpis: Kpi[] = [
  {
    key: "revenue",
    label: "Incasso oggi",
    value: "€1.248",
    delta: "+18%",
    deltaDir: "up",
    foot: "vs ieri",
    tone: "warm",
    icon: KPIS_ICONS.revenue,
  },
  {
    key: "travelpass",
    label: "Clienti TravelPass",
    value: "42",
    delta: "+12%",
    deltaDir: "up",
    foot: "questa settimana",
    tone: "sage",
    icon: KPIS_ICONS.users,
  },
  {
    key: "conv",
    label: "Conversion rate",
    value: "7,4",
    unit: "%",
    delta: "+0,8pt",
    deltaDir: "up",
    foot: "visite → prenotazioni",
    tone: "sand",
    icon: KPIS_ICONS.conv,
  },
  {
    key: "rating",
    label: "Rating medio",
    value: "4,7",
    unit: "★",
    delta: "312 recensioni",
    deltaDir: "up",
    foot: "ultimi 90 giorni",
    tone: "ink",
    icon: KPIS_ICONS.star,
  },
];

// Last 30 days revenue (euro). Shape: slow build → weekend spikes → recent rise.
const revenueSeries: number[] = [
  620, 710, 680, 740, 820, 950, 1120, 680, 710, 790, 830, 880, 990, 1180,
  720, 760, 820, 870, 910, 1040, 1220, 780, 830, 870, 940, 990, 1080, 1200,
  1160, 1248,
];

const traffic: Array<{ label: string; value: number; color: string }> = [
  { label: "In-app discovery", value: 42, color: "#C6704A" },
  { label: "AR / SmartLens", value: 28, color: "#E8A77A" },
  { label: "Consigli di Iris", value: 18, color: "#6F9A87" },
  { label: "Mappa partner", value: 12, color: "#1F1B16" },
];

const bookings: Booking[] = [
  {
    time: "13:42",
    initials: "ML",
    name: "M. Laurent",
    origin: "Francia",
    flag: "FR",
    product: "Menu degustazione · 2",
    method: "TravelPass",
    methodTone: "tp",
    amount: "€ 96,00",
    status: "Pagato",
    tone: "ok",
    av: "a1",
  },
  {
    time: "13:18",
    initials: "HT",
    name: "H. Tanaka",
    origin: "Giappone",
    flag: "JP",
    product: "Tagliata + calice Chianti",
    method: "Apple Pay",
    amount: "€ 34,50",
    status: "Pagato",
    tone: "ok",
    av: "a2",
  },
  {
    time: "13:05",
    initials: "SW",
    name: "S. Weber",
    origin: "Germania",
    flag: "DE",
    product: "Aperitivo + antipasto",
    method: "TravelPass",
    methodTone: "tp",
    amount: "€ 24,00",
    status: "Pagato",
    tone: "ok",
    av: "a3",
  },
  {
    time: "12:48",
    initials: "RB",
    name: "R. Brown",
    origin: "Regno Unito",
    flag: "GB",
    product: "Pranzo famiglia · 4",
    method: "Visa ··4721",
    amount: "€ 148,20",
    status: "In attesa",
    tone: "warn",
    av: "a4",
  },
  {
    time: "12:30",
    initials: "AK",
    name: "A. Kowalski",
    origin: "Polonia",
    flag: "PL",
    product: "Bistecca alla fiorentina",
    method: "TravelPass",
    methodTone: "tp",
    amount: "€ 62,00",
    status: "Pagato",
    tone: "ok",
    av: "a1",
  },
  {
    time: "12:12",
    initials: "CS",
    name: "C. Silva",
    origin: "Brasile",
    flag: "BR",
    product: "Menu degustazione · 2",
    method: "TravelPass",
    methodTone: "tp",
    amount: "€ 96,00",
    status: "Pagato",
    tone: "ok",
    av: "a2",
  },
  {
    time: "11:54",
    initials: "NP",
    name: "N. Park",
    origin: "Corea del Sud",
    flag: "KR",
    product: "Antipasto toscano",
    method: "Google Pay",
    amount: "€ 18,00",
    status: "Pagato",
    tone: "ok",
    av: "a3",
  },
  {
    time: "11:36",
    initials: "ER",
    name: "E. Rodriguez",
    origin: "Spagna",
    flag: "ES",
    product: "Pasta + vino · 3",
    method: "Visa ··9014",
    amount: "€ 84,00",
    status: "In attesa",
    tone: "warn",
    av: "a4",
  },
];

const initialOffers: Offer[] = [
  {
    id: "deg",
    title: "-10% sul menu degustazione",
    detail: "Valido per clienti TravelPass · lun-gio",
    expires: "30 giu 2026",
    redemptions: 87,
    active: true,
    glyph: "10",
  },
  {
    id: "apr",
    title: "Aperitivo + antipasto a € 12",
    detail: "Dalle 18:00 alle 20:00 · tutti i clienti",
    expires: "15 mag 2026",
    redemptions: 124,
    active: true,
    glyph: "€12",
  },
  {
    id: "biste",
    title: "Bistecca + Chianti DOCG abbinato",
    detail: "Suggerito in chat da Iris · coperto 2",
    expires: "31 lug 2026",
    redemptions: 41,
    active: true,
    glyph: "⭢",
  },
  {
    id: "kids",
    title: "Menu famiglia · bambini gratis",
    detail: "Under 10 gratis con 2 adulti",
    expires: "30 set 2026",
    redemptions: 18,
    active: false,
    glyph: "Fa",
  },
];

const reviews: Review[] = [
  {
    initials: "ML",
    name: "M. Laurent",
    when: "Oggi · 14:02",
    rating: 5,
    lang: "FR → IT",
    av: "r1",
    body:
      "Expérience exceptionnelle ! La ribollita était divine et le personnel très attentif. Le pairing de vin suggéré par Iris était parfait.",
    aiReply:
      "Grazie Marie! Ci fa molto piacere che il pairing con il Chianti Riserva ti sia piaciuto — ti aspettiamo presto per la nostra nuova degustazione di primavera. Salutoni da Mario e tutto il team.",
  },
  {
    initials: "HT",
    name: "H. Tanaka",
    when: "Ieri · 21:14",
    rating: 5,
    lang: "EN",
    av: "r2",
    body:
      "Best Florentine steak we had in Italy. Staff spoke great English, and the Smart Lens menu translation made ordering easy for our whole family.",
  },
  {
    initials: "SW",
    name: "S. Weber",
    when: "2 giorni fa",
    rating: 4,
    lang: "DE → IT",
    av: "r3",
    body:
      "Sehr gute Küche und ehrliche Preise. Nur die Wartezeit am Samstagabend war lang — vielleicht eine zweite Reservierungsrunde?",
  },
];

// -----------------------------------------------------------------------------
// Small inline SVG icon helpers
// -----------------------------------------------------------------------------

const IcoDash = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);
const IcoBookings = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IcoOffers = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IcoAnalytics = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IcoReviews = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const IcoPayout = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);
const IcoMenu = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);
const IcoSettings = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IcoBell = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IcoSearch = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IcoDownload = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IcoSpark = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2 13.5 8.5 20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
  </svg>
);
const IcoPlus = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Flag helper — turn ISO country code into flag emoji
function flag(cc: string): string {
  const base = 0x1f1e6;
  return String.fromCodePoint(...cc.toUpperCase().split("").map((c) => base + (c.charCodeAt(0) - 65)));
}

// -----------------------------------------------------------------------------
// Chart: Revenue line (SVG)
// -----------------------------------------------------------------------------
function RevenueChart({ data }: { data: number[] }) {
  const W = 720;
  const H = 220;
  const padL = 48;
  const padR = 16;
  const padT = 14;
  const padB = 28;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const yMin = Math.floor(min / 200) * 200;
  const yMax = Math.ceil(max / 200) * 200;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const stepX = chartW / (data.length - 1);

  const yToPx = (v: number) =>
    padT + chartH - ((v - yMin) / (yMax - yMin)) * chartH;
  const xToPx = (i: number) => padL + i * stepX;

  const points = data.map((v, i) => [xToPx(i), yToPx(v)] as const);
  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${padL + chartW} ${padT + chartH} L${padL} ${padT + chartH} Z`;

  // 4 y-axis ticks
  const yTicks = [0, 0.33, 0.66, 1].map((f) => {
    const v = Math.round(yMin + (yMax - yMin) * f);
    return { v, y: padT + chartH - f * chartH };
  });

  // X-axis labels: show every 5th day starting at d-29
  const xLabels: Array<{ i: number; lbl: string }> = [];
  for (let i = 0; i < data.length; i += 5) {
    xLabels.push({ i, lbl: `${i + 1}` });
  }
  xLabels.push({ i: data.length - 1, lbl: "oggi" });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Incassi ultimi 30 giorni">
      <defs>
        <linearGradient id="b2bRevGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C6704A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#C6704A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* y-axis gridlines + labels */}
      {yTicks.map((t, idx) => (
        <g key={`yt-${idx}`}>
          <line
            x1={padL}
            x2={W - padR}
            y1={t.y}
            y2={t.y}
            stroke="#F0EADD"
            strokeDasharray={idx === 0 ? "0" : "3 4"}
            strokeWidth="1"
          />
          <text
            x={padL - 8}
            y={t.y + 4}
            fontSize="10"
            fontWeight="600"
            textAnchor="end"
            fill="#948778"
          >
            € {t.v.toLocaleString("it-IT")}
          </text>
        </g>
      ))}

      {/* x-axis labels */}
      {xLabels.map((l, idx) => (
        <text
          key={`xl-${idx}`}
          x={xToPx(l.i)}
          y={H - 10}
          fontSize="10"
          fontWeight="600"
          textAnchor="middle"
          fill="#948778"
        >
          {l.lbl === "oggi" ? l.lbl : `d-${data.length - l.i - 1}`}
        </text>
      ))}

      {/* area */}
      <path d={areaPath} fill="url(#b2bRevGrad)" />

      {/* line */}
      <path d={linePath} fill="none" stroke="#C6704A" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />

      {/* end dot */}
      <circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r="4.5"
        fill="#fff"
        stroke="#C6704A"
        strokeWidth="2.5"
      />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Chart: Traffic-source donut (SVG)
// -----------------------------------------------------------------------------
function TrafficDonut({
  data,
}: {
  data: Array<{ label: string; value: number; color: string }>;
}) {
  const cx = 50;
  const cy = 50;
  const r = 38;
  const stroke = 14;
  const circ = 2 * Math.PI * r;

  let offset = 0;
  const segs = data.map((d) => {
    const frac = d.value / 100;
    const seg = {
      ...d,
      dash: `${frac * circ} ${circ}`,
      offset: -offset * circ,
    };
    offset += frac;
    return seg;
  });

  return (
    <svg viewBox="0 0 100 100">
      {/* bg ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0EADD" strokeWidth={stroke} />
      {segs.map((s, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={stroke}
          strokeDasharray={s.dash}
          strokeDashoffset={s.offset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Stars helper
// -----------------------------------------------------------------------------
function Stars({ n }: { n: number }) {
  return (
    <span className="b2b-stars" aria-label={`${n} stelle su 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= n ? "" : "empty"}>★</span>
      ))}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------
export default function B2BDashboardPage() {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [activeNav, setActiveNav] = useState<string>("dash");

  const toggleOffer = (id: string) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));
  };

  const navItems: Array<{ id: string; label: string; icon: React.ReactNode; badge?: number }> = [
    { id: "dash", label: "Panoramica", icon: IcoDash },
    { id: "bookings", label: "Prenotazioni", icon: IcoBookings, badge: 2 },
    { id: "menu", label: "Menu & Offerte", icon: IcoMenu },
    { id: "offers", label: "Promozioni", icon: IcoOffers },
    { id: "analytics", label: "Analytics", icon: IcoAnalytics },
    { id: "reviews", label: "Recensioni", icon: IcoReviews },
    { id: "payouts", label: "Pagamenti", icon: IcoPayout },
    { id: "settings", label: "Impostazioni", icon: IcoSettings },
  ];

  return (
    <div className="b2b-root">
      <div className="b2b-shell">
        {/* ------------------------------------------------------------------- */}
        {/* SIDEBAR                                                              */}
        {/* ------------------------------------------------------------------- */}
        <aside className="b2b-sidebar">
          <div className="b2b-side-brand">
            <div className="b2b-logo">TG</div>
            <div className="b2b-brand-txt">
              <span className="b2b-brand-main">TheGuide</span>
              <span className="b2b-brand-sub">Partner</span>
            </div>
          </div>

          <div className="b2b-side-section">Principale</div>
          {navItems.slice(0, 4).map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setActiveNav(n.id)}
              className={`b2b-nav-item ${activeNav === n.id ? "active" : ""}`}
            >
              <span className="b2b-nav-ico">{n.icon}</span>
              <span>{n.label}</span>
              {n.badge ? <span className="b2b-nav-badge">{n.badge}</span> : null}
            </button>
          ))}

          <div className="b2b-side-section">Gestione</div>
          {navItems.slice(4).map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setActiveNav(n.id)}
              className={`b2b-nav-item ${activeNav === n.id ? "active" : ""}`}
            >
              <span className="b2b-nav-ico">{n.icon}</span>
              <span>{n.label}</span>
              {n.badge ? <span className="b2b-nav-badge">{n.badge}</span> : null}
            </button>
          ))}

          <div className="b2b-side-foot">
            <div style={{ fontWeight: 700, color: "var(--b2b-ink)", fontSize: 12 }}>
              Piano Partner · Pro
            </div>
            <div>Rinnovo 31 ott 2026</div>
            <div style={{ color: "var(--b2b-accent)", fontWeight: 700, fontSize: 12 }}>
              Aggiungi un locale →
            </div>
          </div>
        </aside>

        {/* ------------------------------------------------------------------- */}
        {/* MAIN                                                                 */}
        {/* ------------------------------------------------------------------- */}
        <main className="b2b-main">
          {/* Header */}
          <header className="b2b-header">
            <div className="b2b-header-title">
              <span className="b2b-h-eyebrow">Partner</span>
              <span className="b2b-h-name">Trattoria Mario · Firenze</span>
            </div>
            <span className="b2b-pill">
              <span className="b2b-dot" />
              Live · Cassa aperta
            </span>
            <div className="b2b-header-spacer" />
            <button className="b2b-icon-btn" aria-label="Cerca" type="button">
              {IcoSearch}
            </button>
            <button className="b2b-icon-btn" aria-label="Notifiche" type="button">
              {IcoBell}
              <span className="b2b-badge-num">3</span>
            </button>
            <div className="b2b-avatar" aria-label="Mario Rossi">MR</div>
          </header>

          {/* Content */}
          <div className="b2b-content">
            {/* Page heading */}
            <div className="b2b-page-head">
              <div>
                <h1>Buongiorno, Mario</h1>
                <div className="b2b-sub">
                  Oggi · mercoledì 22 aprile · aggiornato pochi secondi fa
                </div>
              </div>
              <div className="b2b-page-actions">
                <div className="b2b-tabs" role="tablist" aria-label="Intervallo">
                  <button className="b2b-tab" type="button">Oggi</button>
                  <button className="b2b-tab active" type="button">7 giorni</button>
                  <button className="b2b-tab" type="button">30 giorni</button>
                  <button className="b2b-tab" type="button">90 giorni</button>
                </div>
                <button className="b2b-btn" type="button">
                  {IcoDownload} Esporta
                </button>
                <button className="b2b-btn b2b-btn-primary" type="button">
                  {IcoPlus} Nuova offerta
                </button>
              </div>
            </div>

            {/* KPI row */}
            <section className="b2b-kpi-grid" aria-label="Indicatori chiave">
              {kpis.map((k) => (
                <article key={k.key} className={`b2b-kpi k-${k.tone}`}>
                  <div className="b2b-kpi-top">
                    <span className="b2b-kpi-label">{k.label}</span>
                    <span className="b2b-kpi-ico">{k.icon}</span>
                  </div>
                  <div className="b2b-kpi-value">
                    {k.value}
                    {k.unit ? <span className="b2b-kpi-unit">{k.unit}</span> : null}
                  </div>
                  <div className="b2b-kpi-foot">
                    <span className={`b2b-delta ${k.deltaDir}`}>
                      {k.deltaDir === "up" ? "▲" : "▼"} {k.delta}
                    </span>
                    <span>{k.foot}</span>
                  </div>
                </article>
              ))}
            </section>

            {/* Charts row */}
            <section className="b2b-chart-grid">
              <div className="b2b-card">
                <div className="b2b-card-head">
                  <div>
                    <h3>Incassi · ultimi 30 giorni</h3>
                    <div className="b2b-sub">Totale € 27.840 · media € 928/giorno</div>
                  </div>
                  <div className="b2b-card-head-actions">
                    <div className="b2b-tabs">
                      <button className="b2b-tab active" type="button">Incasso</button>
                      <button className="b2b-tab" type="button">Coperti</button>
                      <button className="b2b-tab" type="button">Scontrino medio</button>
                    </div>
                  </div>
                </div>
                <div className="b2b-chart-wrap">
                  <RevenueChart data={revenueSeries} />
                </div>
                <div className="b2b-chart-legend">
                  <span><span className="b2b-legend-dot" style={{ background: "#C6704A" }} />Incasso giornaliero (€)</span>
                  <span><span className="b2b-legend-dot" style={{ background: "#F0EADD" }} />Griglia asse €</span>
                </div>
              </div>

              <div className="b2b-card">
                <div className="b2b-card-head">
                  <div>
                    <h3>Da dove arrivano i clienti</h3>
                    <div className="b2b-sub">Attribuzione TheGuide · 7 giorni</div>
                  </div>
                </div>
                <div className="b2b-traffic">
                  <div className="b2b-donut-wrap">
                    <TrafficDonut data={traffic} />
                    <div className="b2b-donut-center">
                      <b>298</b>
                      <span>visite</span>
                    </div>
                  </div>
                  <div className="b2b-traffic-list">
                    {traffic.map((t) => (
                      <div key={t.label} className="b2b-traffic-row">
                        <span
                          className="b2b-traffic-sw"
                          style={{ background: t.color }}
                          aria-hidden
                        />
                        <span className="b2b-traffic-lbl">{t.label}</span>
                        <span className="b2b-traffic-val">{t.value}%</span>
                        <span className="b2b-traffic-bar">
                          <span
                            style={{
                              width: `${t.value}%`,
                              background: t.color,
                            }}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Insight */}
            <section className="b2b-insight" aria-label="Suggerimento Iris">
              <div className="b2b-insight-ico" aria-hidden>
                {IcoSpark}
              </div>
              <div className="b2b-insight-main">
                <div className="b2b-insight-tag">Iris · Suggerimento</div>
                <div className="b2b-insight-title">
                  I clienti TravelPass spendono +23% quando suggerisci un vino in abbinamento
                </div>
                <div className="b2b-insight-body">
                  Analizzando gli ultimi 30 giorni, i coperti con wine pairing hanno uno scontrino
                  medio di € 48 contro € 39. Prova ad abilitare il nudge automatico: quando un
                  cliente ordina una portata principale, Iris proporrà in chat un calice DOCG in
                  abbinamento.
                </div>
                <div className="b2b-insight-foot">
                  <button type="button" className="b2b-btn b2b-btn-primary">
                    Abilita nudge wine pairing
                  </button>
                  <button type="button" className="b2b-btn b2b-btn-ghost">
                    Non ora
                  </button>
                </div>
              </div>
            </section>

            {/* Bookings table + Offers */}
            <section className="b2b-row-2">
              <div className="b2b-card">
                <div className="b2b-card-head">
                  <div>
                    <h3>Transazioni di oggi</h3>
                    <div className="b2b-sub">
                      8 prenotazioni · 6 pagate · 2 in attesa di conferma
                    </div>
                  </div>
                  <div className="b2b-card-head-actions">
                    <button type="button" className="b2b-btn b2b-btn-ghost b2b-btn-sm">
                      Vedi tutte
                    </button>
                  </div>
                </div>
                <div className="b2b-table-wrap">
                  <table className="b2b-table">
                    <thead>
                      <tr>
                        <th>Orario</th>
                        <th>Cliente</th>
                        <th>Prodotto</th>
                        <th>Metodo</th>
                        <th>Stato</th>
                        <th>Importo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, i) => (
                        <tr key={i}>
                          <td style={{ fontVariantNumeric: "tabular-nums", color: "var(--b2b-muted)", fontWeight: 600 }}>
                            {b.time}
                          </td>
                          <td>
                            <div className="b2b-client">
                              <div className={`b2b-client-av ${b.av}`}>{b.initials}</div>
                              <div className="b2b-client-meta">
                                <span className="b2b-client-name">{b.name}</span>
                                <span className="b2b-client-sub">
                                  <span aria-hidden>{flag(b.flag)}</span>
                                  {b.origin}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td style={{ color: "var(--b2b-ink-2)" }}>{b.product}</td>
                          <td>
                            <span className={`b2b-method ${b.methodTone || ""}`}>{b.method}</span>
                          </td>
                          <td>
                            <span className={`b2b-status ${b.tone}`}>{b.status}</span>
                          </td>
                          <td className="b2b-td-amt">{b.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="b2b-card">
                <div className="b2b-card-head">
                  <div>
                    <h3>Promozioni attive</h3>
                    <div className="b2b-sub">4 offerte · 270 riscatti questo mese</div>
                  </div>
                </div>
                {offers.map((o) => (
                  <div key={o.id} className="b2b-offer">
                    <div className="b2b-offer-ico" aria-hidden>{o.glyph}</div>
                    <div className="b2b-offer-main">
                      <div className="b2b-offer-title">{o.title}</div>
                      <div className="b2b-offer-sub">
                        <span>{o.detail}</span>
                        <span>· Scadenza {o.expires}</span>
                        <span>· {o.redemptions} riscatti</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`b2b-toggle ${o.active ? "on" : ""}`}
                      aria-pressed={o.active}
                      aria-label={`${o.active ? "Disattiva" : "Attiva"} offerta ${o.title}`}
                      onClick={() => toggleOffer(o.id)}
                    />
                  </div>
                ))}
                <button type="button" className="b2b-offer-add">
                  + Nuova offerta
                </button>
              </div>
            </section>

            {/* Reviews + Payout */}
            <section className="b2b-row-2">
              <div className="b2b-card">
                <div className="b2b-card-head">
                  <div>
                    <h3>Ultime recensioni</h3>
                    <div className="b2b-sub">4,7 medio · 12 nuove questa settimana</div>
                  </div>
                  <div className="b2b-card-head-actions">
                    <button type="button" className="b2b-btn b2b-btn-ghost b2b-btn-sm">
                      Vedi tutte
                    </button>
                  </div>
                </div>
                {reviews.map((r, i) => (
                  <div key={i} className="b2b-review">
                    <div className="b2b-review-head">
                      <div className={`b2b-review-av ${r.av}`}>{r.initials}</div>
                      <div className="b2b-review-who">
                        <b>{r.name}</b>
                        <span>
                          {r.when} · tradotto {r.lang}
                        </span>
                      </div>
                      <Stars n={r.rating} />
                    </div>
                    <div className="b2b-review-body">“{r.body}”</div>
                    {r.aiReply ? (
                      <div className="b2b-review-ai">
                        <div className="b2b-review-ai-tag">
                          <span className="b2b-spark">{IcoSpark}</span>
                          Iris · Risposta suggerita
                        </div>
                        <p>{r.aiReply}</p>
                        <div className="b2b-review-ai-actions">
                          <button type="button" className="b2b-btn b2b-btn-primary b2b-btn-sm">
                            Invia risposta
                          </button>
                          <button type="button" className="b2b-btn b2b-btn-sm">
                            Modifica
                          </button>
                          <button type="button" className="b2b-btn b2b-btn-ghost b2b-btn-sm">
                            Rigenera
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="b2b-review-ai-actions" style={{ display: "flex", gap: 6 }}>
                        <button type="button" className="b2b-btn b2b-btn-sm">
                          Rispondi
                        </button>
                        <button type="button" className="b2b-btn b2b-btn-ghost b2b-btn-sm">
                          Chiedi a Iris
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="b2b-payout">
                  <h3>Prossimo pagamento</h3>
                  <div className="b2b-payout-amt">€ 3.427,80</div>
                  <div className="b2b-payout-date">Accredito previsto venerdì 24 aprile 2026</div>
                  <div className="b2b-payout-meta">
                    <div>
                      <span>Ultimo accredito</span>
                      <b>€ 2.984,10 · 17 apr</b>
                    </div>
                    <div>
                      <span>IBAN di destinazione</span>
                      <b>IT** ···· ···· ···· ···· 4721</b>
                    </div>
                    <div>
                      <span>Commissioni TheGuide (2,4%)</span>
                      <b>€ 82,25</b>
                    </div>
                  </div>
                  <div className="b2b-payout-foot">
                    <button type="button" className="b2b-btn b2b-btn-primary">
                      {IcoDownload} Scarica fattura
                    </button>
                    <button type="button" className="b2b-btn">
                      Storico payout
                    </button>
                  </div>
                </div>

                <div className="b2b-card" style={{ padding: 16 }}>
                  <div className="b2b-card-head" style={{ marginBottom: 8 }}>
                    <div>
                      <h3 style={{ fontSize: 14 }}>Visibilità nella mappa partner</h3>
                      <div className="b2b-sub">Posizione · Firenze Centro</div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                      marginTop: 4,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--b2b-muted)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: ".08em",
                        }}
                      >
                        Rank categoria
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>#3</div>
                      <div style={{ fontSize: 11, color: "var(--b2b-ok)", fontWeight: 700 }}>
                        ▲ 2 posizioni
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--b2b-muted)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: ".08em",
                        }}
                      >
                        Impression settimana
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>4.812</div>
                      <div style={{ fontSize: 11, color: "var(--b2b-ok)", fontWeight: 700 }}>
                        ▲ 14%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer
              style={{
                fontSize: 11,
                color: "var(--b2b-muted)",
                textAlign: "center",
                padding: "6px 0 14px",
              }}
            >
              TheGuide · Partner Console · v2026.4 · Supporto partner 24/7 disponibile in chat.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

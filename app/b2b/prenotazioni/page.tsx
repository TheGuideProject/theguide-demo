"use client";

import { Fragment, useState } from "react";

/* =============================================================================
   TheGuide · B2B · Prenotazioni
   ============================================================================= */

type Status = "Confermata" | "Seduti" | "Completata" | "No-show";
type Source = "TheGuide" | "Google" | "Phone" | "Walk-in";

type Reservation = {
  id: string;
  date: string;
  time: string;
  day: number; // 0..6 (Mon..Sun)
  hour: number; // 9..23
  duration: number; // hours
  name: string;
  initials: string;
  av: "a1" | "a2" | "a3" | "a4";
  coperti: number;
  phone: string;
  note: string;
  source: Source;
  status: Status;
  flag: string;
};

const dayLabels = ["Lun 21", "Mar 22", "Mer 23", "Gio 24", "Ven 25", "Sab 26", "Dom 27"];

const reservations: Reservation[] = [
  {
    id: "r01",
    date: "Mer 23 apr",
    time: "12:30",
    day: 2,
    hour: 12,
    duration: 2,
    name: "M. Laurent",
    initials: "ML",
    av: "a1",
    coperti: 2,
    phone: "+33 6 48 22 94 13",
    note: "Tavolo vista Duomo · allergia lattosio",
    source: "TheGuide",
    status: "Seduti",
    flag: "FR",
  },
  {
    id: "r02",
    date: "Mer 23 apr",
    time: "13:00",
    day: 2,
    hour: 13,
    duration: 2,
    name: "H. Tanaka",
    initials: "HT",
    av: "a2",
    coperti: 4,
    phone: "+81 90 3344 7812",
    note: "Famiglia · 2 bambini · seggiolone",
    source: "TheGuide",
    status: "Confermata",
    flag: "JP",
  },
  {
    id: "r03",
    date: "Mer 23 apr",
    time: "13:15",
    day: 2,
    hour: 13,
    duration: 1,
    name: "S. Weber",
    initials: "SW",
    av: "a3",
    coperti: 2,
    phone: "+49 170 918 4411",
    note: "Pranzo veloce · menu business",
    source: "Google",
    status: "Confermata",
    flag: "DE",
  },
  {
    id: "r04",
    date: "Mer 23 apr",
    time: "19:30",
    day: 2,
    hour: 19,
    duration: 3,
    name: "R. Brown",
    initials: "RB",
    av: "a4",
    coperti: 6,
    phone: "+44 7911 223 344",
    note: "Anniversario di matrimonio · torta",
    source: "TheGuide",
    status: "Confermata",
    flag: "GB",
  },
  {
    id: "r05",
    date: "Mer 23 apr",
    time: "20:00",
    day: 2,
    hour: 20,
    duration: 2,
    name: "A. Kowalski",
    initials: "AK",
    av: "a1",
    coperti: 3,
    phone: "+48 601 223 817",
    note: "Preferenza tavolo interno",
    source: "TheGuide",
    status: "Confermata",
    flag: "PL",
  },
  {
    id: "r06",
    date: "Mer 23 apr",
    time: "20:15",
    day: 2,
    hour: 20,
    duration: 2,
    name: "C. Silva",
    initials: "CS",
    av: "a2",
    coperti: 2,
    phone: "+55 11 9 8821 4455",
    note: "Celiaci · pane senza glutine",
    source: "Phone",
    status: "Confermata",
    flag: "BR",
  },
  {
    id: "r07",
    date: "Mer 23 apr",
    time: "21:00",
    day: 2,
    hour: 21,
    duration: 2,
    name: "E. Rodriguez",
    initials: "ER",
    av: "a4",
    coperti: 4,
    phone: "+34 612 884 110",
    note: "Wine pairing richiesto",
    source: "TheGuide",
    status: "Confermata",
    flag: "ES",
  },
  {
    id: "r08",
    date: "Gio 24 apr",
    time: "12:45",
    day: 3,
    hour: 12,
    duration: 2,
    name: "N. Park",
    initials: "NP",
    av: "a3",
    coperti: 2,
    phone: "+82 10 3322 5501",
    note: "Primo compleanno a Firenze",
    source: "TheGuide",
    status: "Confermata",
    flag: "KR",
  },
  {
    id: "r09",
    date: "Gio 24 apr",
    time: "13:30",
    day: 3,
    hour: 13,
    duration: 2,
    name: "J. Müller",
    initials: "JM",
    av: "a3",
    coperti: 5,
    phone: "+49 152 991 7724",
    note: "Gruppo business · fattura",
    source: "Phone",
    status: "Confermata",
    flag: "DE",
  },
  {
    id: "r10",
    date: "Gio 24 apr",
    time: "20:30",
    day: 3,
    hour: 20,
    duration: 3,
    name: "F. Bianchi",
    initials: "FB",
    av: "a1",
    coperti: 4,
    phone: "+39 335 661 2290",
    note: "Menu degustazione · tavolo vista",
    source: "Walk-in",
    status: "Completata",
    flag: "IT",
  },
  {
    id: "r11",
    date: "Ven 25 apr",
    time: "13:00",
    day: 4,
    hour: 13,
    duration: 2,
    name: "T. Nguyen",
    initials: "TN",
    av: "a2",
    coperti: 2,
    phone: "+84 90 123 4455",
    note: "Prima volta in Italia",
    source: "TheGuide",
    status: "Confermata",
    flag: "VN",
  },
  {
    id: "r12",
    date: "Ven 25 apr",
    time: "21:30",
    day: 4,
    hour: 21,
    duration: 2,
    name: "L. Peterson",
    initials: "LP",
    av: "a4",
    coperti: 2,
    phone: "+1 415 992 7761",
    note: "Richiesta Chianti Classico Riserva",
    source: "TheGuide",
    status: "Confermata",
    flag: "US",
  },
  {
    id: "r13",
    date: "Sab 26 apr",
    time: "12:30",
    day: 5,
    hour: 12,
    duration: 2,
    name: "G. Dupont",
    initials: "GD",
    av: "a1",
    coperti: 3,
    phone: "+33 7 66 12 44 28",
    note: "",
    source: "Google",
    status: "Confermata",
    flag: "FR",
  },
  {
    id: "r14",
    date: "Sab 26 apr",
    time: "19:00",
    day: 5,
    hour: 19,
    duration: 3,
    name: "O. Rossi",
    initials: "OR",
    av: "a3",
    coperti: 8,
    phone: "+39 348 177 3321",
    note: "Addio al celibato · prosecco all'arrivo",
    source: "Phone",
    status: "Confermata",
    flag: "IT",
  },
  {
    id: "r15",
    date: "Sab 26 apr",
    time: "20:45",
    day: 5,
    hour: 20,
    duration: 2,
    name: "K. Jansen",
    initials: "KJ",
    av: "a2",
    coperti: 2,
    phone: "+31 6 51 22 88 41",
    note: "No pesce",
    source: "TheGuide",
    status: "No-show",
    flag: "NL",
  },
];

function flag(cc: string): string {
  const base = 0x1f1e6;
  return String.fromCodePoint(...cc.toUpperCase().split("").map((c) => base + (c.charCodeAt(0) - 65)));
}

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
const IcoCal = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const statusTone: Record<Status, string> = {
  Confermata: "ok",
  Seduti: "warn",
  Completata: "done",
  "No-show": "bad",
};

const sourceTone: Record<Source, string> = {
  TheGuide: "tp",
  Google: "",
  Phone: "",
  "Walk-in": "",
};

function Timeline() {
  const hours = Array.from({ length: 15 }, (_, i) => 9 + i); // 9..23
  return (
    <div className="b2b-timeline">
      <div className="b2b-timeline-grid">
        <div className="b2b-timeline-corner" />
        {dayLabels.map((d, i) => (
          <div key={i} className="b2b-timeline-day">
            {d}
          </div>
        ))}
        {hours.map((h) => (
          <Fragment key={`h-${h}`}>
            <div className="b2b-timeline-hour">
              {h}:00
            </div>
            {dayLabels.map((_, d) => (
              <div
                key={`c-${h}-${d}`}
                className={`b2b-timeline-cell ${h >= 12 && h <= 14 ? "lunch" : ""} ${h >= 19 && h <= 22 ? "dinner" : ""}`}
              />
            ))}
          </Fragment>
        ))}
        {reservations.map((r) => {
          const col = r.day + 2; // +1 for hour col, +1 for 1-indexed grid
          const row = r.hour - 9 + 2; // +1 for header row, +1 for 1-indexed
          return (
            <div
              key={r.id}
              className={`b2b-timeline-block src-${r.source.toLowerCase().replace("-", "")}`}
              style={{
                gridColumn: `${col} / span 1`,
                gridRow: `${row} / span ${r.duration}`,
              }}
              title={`${r.name} · ${r.coperti} coperti`}
            >
              <b>{r.time}</b>
              <span>
                {r.name} · {r.coperti}×
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PrenotazioniPage() {
  const [filter, setFilter] = useState<"tutte" | "oggi" | "settimana">("settimana");
  const filteredRes =
    filter === "oggi"
      ? reservations.filter((r) => r.day === 2)
      : filter === "settimana"
      ? reservations
      : reservations;

  return (
    <>
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
        <div className="b2b-avatar" aria-label="Mario Rossi">
          MR
        </div>
      </header>

      <div className="b2b-content">
        <div className="b2b-page-head">
          <div>
            <h1>Prenotazioni</h1>
            <div className="b2b-sub">Settimana in corso · 21 – 27 aprile 2026</div>
          </div>
          <div className="b2b-page-actions">
            <div className="b2b-tabs" role="tablist" aria-label="Intervallo">
              <button
                className={`b2b-tab ${filter === "oggi" ? "active" : ""}`}
                onClick={() => setFilter("oggi")}
                type="button"
              >
                Oggi
              </button>
              <button
                className={`b2b-tab ${filter === "settimana" ? "active" : ""}`}
                onClick={() => setFilter("settimana")}
                type="button"
              >
                Settimana
              </button>
              <button
                className={`b2b-tab ${filter === "tutte" ? "active" : ""}`}
                onClick={() => setFilter("tutte")}
                type="button"
              >
                Tutte
              </button>
            </div>
            <button className="b2b-btn" type="button">
              {IcoCal} 21 – 27 apr
            </button>
            <button className="b2b-btn b2b-btn-primary" type="button">
              {IcoPlus} Nuova prenotazione
            </button>
          </div>
        </div>

        {/* KPI row */}
        <section className="b2b-kpi-grid">
          <article className="b2b-kpi k-warm">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Oggi</span>
            </div>
            <div className="b2b-kpi-value">
              24<span className="b2b-kpi-unit">coperti</span>
            </div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▲ +6</span>
              <span>vs martedì</span>
            </div>
          </article>
          <article className="b2b-kpi k-sage">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Settimana</span>
            </div>
            <div className="b2b-kpi-value">
              182<span className="b2b-kpi-unit">coperti</span>
            </div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▲ 12%</span>
              <span>vs settimana scorsa</span>
            </div>
          </article>
          <article className="b2b-kpi k-sand">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">No-show</span>
            </div>
            <div className="b2b-kpi-value">
              3<span className="b2b-kpi-unit">%</span>
            </div>
            <div className="b2b-kpi-foot">
              <span className="b2b-delta up">▼ 1,2pt</span>
              <span>migliorato</span>
            </div>
          </article>
          <article className="b2b-kpi k-ink">
            <div className="b2b-kpi-top">
              <span className="b2b-kpi-label">Walk-in</span>
            </div>
            <div className="b2b-kpi-value">
              18<span className="b2b-kpi-unit">%</span>
            </div>
            <div className="b2b-kpi-foot">
              <span>sul totale settimana</span>
            </div>
          </article>
        </section>

        {/* Timeline */}
        <section className="b2b-card">
          <div className="b2b-card-head">
            <div>
              <h3>Calendario settimana</h3>
              <div className="b2b-sub">
                {reservations.length} prenotazioni · 9 conferme TheGuide · 3 via phone · 1 walk-in
              </div>
            </div>
            <div className="b2b-card-head-actions">
              <div className="b2b-tabs">
                <button className="b2b-tab active" type="button">
                  Griglia
                </button>
                <button className="b2b-tab" type="button">
                  Lista
                </button>
              </div>
            </div>
          </div>
          <Timeline />
          <div className="b2b-chart-legend" style={{ marginTop: 14 }}>
            <span>
              <span className="b2b-legend-dot" style={{ background: "#C6704A" }} />
              TheGuide
            </span>
            <span>
              <span className="b2b-legend-dot" style={{ background: "#6F9A87" }} />
              Google
            </span>
            <span>
              <span className="b2b-legend-dot" style={{ background: "#8A7A66" }} />
              Phone
            </span>
            <span>
              <span className="b2b-legend-dot" style={{ background: "#C88A2E" }} />
              Walk-in
            </span>
          </div>
        </section>

        {/* Reservations table + side */}
        <section className="b2b-row-2">
          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Elenco prenotazioni</h3>
                <div className="b2b-sub">
                  {filteredRes.length} totali · filtri attivi: {filter}
                </div>
              </div>
              <div className="b2b-card-head-actions">
                <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                  Esporta CSV
                </button>
              </div>
            </div>
            <div className="b2b-table-wrap">
              <table className="b2b-table">
                <thead>
                  <tr>
                    <th>Quando</th>
                    <th>Cliente</th>
                    <th>Coperti</th>
                    <th>Note</th>
                    <th>Sorgente</th>
                    <th>Stato</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRes.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{r.time}</div>
                        <div style={{ fontSize: 11, color: "var(--b2b-muted)" }}>{r.date}</div>
                      </td>
                      <td>
                        <div className="b2b-client">
                          <div className={`b2b-client-av ${r.av}`}>{r.initials}</div>
                          <div className="b2b-client-meta">
                            <span className="b2b-client-name">{r.name}</span>
                            <span className="b2b-client-sub">
                              <span aria-hidden>{flag(r.flag)}</span>
                              {r.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                        {r.coperti}
                      </td>
                      <td style={{ color: "var(--b2b-ink-2)", fontSize: 12, whiteSpace: "normal", maxWidth: 220 }}>
                        {r.note || <span style={{ color: "var(--b2b-muted)" }}>—</span>}
                      </td>
                      <td>
                        <span className={`b2b-method ${sourceTone[r.source]}`}>{r.source}</span>
                      </td>
                      <td>
                        <span className={`b2b-status2 st-${statusTone[r.status]}`}>{r.status}</span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="b2b-btn b2b-btn-sm" type="button">
                            Modifica
                          </button>
                          <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                            Contatta
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="b2b-card">
              <div className="b2b-card-head">
                <div>
                  <h3>Liste d'attesa</h3>
                  <div className="b2b-sap">Clienti in attesa · sabato sera</div>
                </div>
              </div>
              <div className="b2b-waitlist">
                <div className="b2b-waitlist-row">
                  <div className="b2b-client-av a1">DP</div>
                  <div style={{ flex: 1 }}>
                    <b>D. Petrov · 4 coperti</b>
                    <div className="b2b-sub2">Sab 26 · 20:30 · +7 15 min</div>
                  </div>
                  <button className="b2b-btn b2b-btn-sm" type="button">
                    Conferma
                  </button>
                </div>
                <div className="b2b-waitlist-row">
                  <div className="b2b-client-av a2">AS</div>
                  <div style={{ flex: 1 }}>
                    <b>A. Schmitt · 2 coperti</b>
                    <div className="b2b-sub2">Sab 26 · 21:00 · +30 min</div>
                  </div>
                  <button className="b2b-btn b2b-btn-sm" type="button">
                    Conferma
                  </button>
                </div>
                <div className="b2b-waitlist-row">
                  <div className="b2b-client-av a3">MG</div>
                  <div style={{ flex: 1 }}>
                    <b>M. Garcia · 3 coperti</b>
                    <div className="b2b-sub2">Sab 26 · 21:30 · flex</div>
                  </div>
                  <button className="b2b-btn b2b-btn-sm" type="button">
                    Conferma
                  </button>
                </div>
              </div>
            </div>

            <div className="b2b-card">
              <div className="b2b-card-head">
                <div>
                  <h3>Richieste speciali oggi</h3>
                  <div className="b2b-sub">2 memo in chef</div>
                </div>
              </div>
              <div className="b2b-special-note n-anniv">
                <b>Anniversario · tavolo 7</b>
                <p>
                  R. Brown (GB) festeggia il 10° anniversario. Preparata torta al cioccolato con candelina,
                  servita a fine cena con due calici di Passito.
                </p>
              </div>
              <div className="b2b-special-note n-diet">
                <b>Celiaci · 2 coperti</b>
                <p>
                  C. Silva (BR) ha confermato intolleranza al glutine severa. Utilizzare taglieri e
                  utensili dedicati. Pane senza glutine in dispensa.
                </p>
              </div>
              <div className="b2b-special-note n-view">
                <b>Tavolo vista Duomo · 19:30</b>
                <p>
                  M. Laurent (FR) ha prenotato tramite TheGuide con richiesta "tavolo vista". Prenotato
                  tavolo 12 in veranda.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

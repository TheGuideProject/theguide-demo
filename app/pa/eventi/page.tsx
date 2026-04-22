"use client";

import { useState } from "react";

// ==============================
// DATA
// ==============================

type EvType = "cul" | "spo" | "rel" | "com";

type CalEvent = {
  day: number;
  t: string;
  type: EvType;
};

// April/May 2026 calendar — start April on Wed (day 1 is Wed)
// We'll render a single month (May 2026) which has 31 days, starts on Fri.
const CAL_EVENTS: CalEvent[] = [
  { day: 1, t: "Festa Lavoro", type: "com" },
  { day: 3, t: "Notte Bianca", type: "cul" },
  { day: 5, t: "Artigiani fiera", type: "com" },
  { day: 8, t: "Concerto Duomo", type: "rel" },
  { day: 10, t: "Maratona 10K", type: "spo" },
  { day: 11, t: "Mostra Uffizi", type: "cul" },
  { day: 14, t: "Rinascimento Dig.", type: "cul" },
  { day: 17, t: "Torneo Calcio St.", type: "spo" },
  { day: 18, t: "Processione", type: "rel" },
  { day: 21, t: "Festival Oltrarno", type: "cul" },
  { day: 23, t: "Arti&Mestieri", type: "com" },
  { day: 24, t: "Calcio Storico", type: "spo" },
  { day: 26, t: "Incontro cultura", type: "cul" },
  { day: 28, t: "Rievocazione", type: "rel" },
  { day: 30, t: "Mercato Centrale", type: "com" }
];

const UPCOMING = [
  { date: "03 mag", type: "cul", name: "La Notte Bianca", loc: "Centro storico", expected: "38.000", permit: "Approvato", crowd: "Attivo", owner: "M. Vitali", critical: true },
  { date: "10 mag", type: "spo", name: "Maratona 10K Firenze", loc: "Lungarni", expected: "12.000 + 8.000 spett.", permit: "Approvato", crowd: "Attivo", owner: "R. Bernini" },
  { date: "14 mag", type: "cul", name: "Mostra \"Rinascimento Digitale\"", loc: "Galleria degli Uffizi", expected: "9.400", permit: "Approvato", crowd: "Da definire", owner: "A. Conti" },
  { date: "17 mag", type: "spo", name: "Calcio Storico · batteria 1", loc: "Piazza Santa Croce", expected: "18.200", permit: "In revisione", crowd: "Da definire", owner: "L. Nardi", critical: true },
  { date: "21 mag", type: "cul", name: "Festival Oltrarno", loc: "Piazza Santo Spirito", expected: "6.800", permit: "Approvato", crowd: "Attivo", owner: "S. Bartoli" },
  { date: "24 mag", type: "spo", name: "Calcio Storico · finale", loc: "Piazza Santa Croce", expected: "22.500", permit: "In revisione", crowd: "Da definire", owner: "L. Nardi" }
];

const INBOX = [
  { n: "Il Cenacolo · concerto pub. privato", m: "18 mag · 300 persone · Limonaia Boboli · DPI antincendio", by: "Assoc. Pescatori Arno" },
  { n: "Fiera Biologico Oltrarno", m: "29 mag · 2500 visitatori · Piazza Santo Spirito", by: "Consorzio Toscana Bio" },
  { n: "Gara ciclistica amatoriale", m: "12 giu · Lungarno · 600 partecipanti · chiusura 3h", by: "ASD Firenze Bike" },
  { n: "Mostra fotografica al chiuso", m: "15 giu · Palazzo Strozzi · 400 pax/giorno · 30g", by: "Fond. Palazzo Strozzi" },
  { n: "Processione religiosa annuale", m: "22 giu · Corpus Domini · 1200 pax · 2km", by: "Diocesi Firenze" }
];

const CONFLICTS = [
  { date: "17 mag", ev: "Calcio Storico · batteria 1 vs Processione religiosa", msg: "Entrambi gli eventi si sovrappongono su Piazza Santa Croce · Raccomandazione: spostare processione a Pz. San Firenze" },
  { date: "24 mag", ev: "Calcio Storico finale vs Maratona 10K rinvio", msg: "Se maratona spostata, sovrapposizione su Lungarni nord · Coordinare logistica comune" }
];

const KAN_TODO = [
  { n: "Calcio Storico · catering", m: "4 fornitori selezionati · call in programma" },
  { n: "Maratona 10K · cronometraggio", m: "RFQ inviato a 3 società" }
];
const KAN_WORK = [
  { n: "Notte Bianca · sicurezza", m: "Bozza piano · in attesa firma Prefettura" },
  { n: "Festival Oltrarno · audio", m: "Contratto in revisione legale" },
  { n: "Fiera Biologico · stand", m: "68/120 stand assegnati" }
];
const KAN_DONE = [
  { n: "Mostra Uffizi · allestimento", m: "Contratto firmato · setup 12 mag" },
  { n: "Notte Bianca · illuminazione", m: "Confermato RTI Elettra" }
];

function evColorFor(type: EvType | string) {
  if (type === "cul") return "cul";
  if (type === "spo") return "spo";
  if (type === "rel") return "rel";
  return "com";
}

// ==============================
// COMPONENT
// ==============================

export default function EventiPage() {
  const [view, setView] = useState<"cal" | "list">("cal");

  // May 2026: 31 days, starts on Friday (day of week 5, 0=Sun)
  // render 6 weeks starting from Sunday containing day 1
  const monthStart = 5; // friday
  const daysInMonth = 31;
  const cells: { day: number; inMonth: boolean }[] = [];
  const prefill = monthStart; // Sun..Thu padding (5 days)
  for (let i = 0; i < prefill; i++) cells.push({ day: 30 - (prefill - 1 - i), inMonth: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, inMonth: true });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - prefill - daysInMonth + 1, inMonth: false });

  return (
    <>
      <header className="pa-topbar">
        <div className="pa-title">
          <div className="pa-crumb">Comune di Firenze · Monitoraggio</div>
          <h1 className="pa-h1">Eventi città · maggio 2026</h1>
        </div>
        <div className="pa-topbar-actions">
          <div className="pa-range">
            <span className="cal" aria-hidden>▦</span>
            <span>Maggio 2026</span>
            <span className="caret" aria-hidden>▼</span>
          </div>
          <div className="pa-chips" style={{ margin: 0 }}>
            <button className={`pa-chip${view === "cal" ? " active" : ""}`} onClick={() => setView("cal")} type="button">Calendario</button>
            <button className={`pa-chip${view === "list" ? " active" : ""}`} onClick={() => setView("list")} type="button">Lista</button>
          </div>
          <button className="pa-btn pa-btn-primary" type="button">+ Nuovo evento</button>
          <div className="pa-avatar" aria-label="Utente">MV</div>
        </div>
      </header>

      <main className="pa-content">
        {/* Stats */}
        <section>
          <div className="pa-kpi-grid">
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Eventi programmati</span></div>
              <div className="pa-kpi-value">48<small>mag</small></div>
              <div className="pa-kpi-unit">totale stagionale maggio</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ 8</span><span>vs mag 2025</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>In corso ora</span><span className="live-dot" /></div>
              <div className="pa-kpi-value">12<small>live</small></div>
              <div className="pa-kpi-unit">eventi live nell'area metropolitana</div>
              <div className="pa-kpi-foot"><span className="pa-trend flat">≈ atteso</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Critici crowd-mgmt</span></div>
              <div className="pa-kpi-value">2<small>urg.</small></div>
              <div className="pa-kpi-unit">Calcio Storico · Notte Bianca</div>
              <div className="pa-kpi-foot"><span className="pa-trend down">attenzione</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Permessi richiesti</span></div>
              <div className="pa-kpi-value">18<small>aperti</small></div>
              <div className="pa-kpi-unit">workflow amministrativo</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ 3</span><span>settimana</span></div>
            </div>
          </div>
        </section>

        {/* Calendar or list */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>{view === "cal" ? "Calendario eventi · maggio 2026" : "Lista prossimi 6 eventi"}</h3>
                <div className="sub">
                  {view === "cal" ? "Click su giorno per dettagli (demo) · colori per tipologia" : "Ordinati per data · azioni rapide"}
                </div>
              </div>
              <div className="pa-legend" style={{ margin: 0 }}>
                <span><span className="pa-legend-swatch" style={{ background: "#E4EBEF" }} />cultura</span>
                <span><span className="pa-legend-swatch" style={{ background: "#F3E3D6" }} />sport</span>
                <span><span className="pa-legend-swatch" style={{ background: "#FBEFD6" }} />religioso</span>
                <span><span className="pa-legend-swatch" style={{ background: "#E5EEEA" }} />commercio</span>
              </div>
            </div>

            {view === "cal" ? (
              <div className="pa-cal">
                {["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"].map((d) => (
                  <div key={d} className="pa-cal-dow">{d}</div>
                ))}
                {cells.map((c, i) => {
                  const events = c.inMonth ? CAL_EVENTS.filter((e) => e.day === c.day) : [];
                  return (
                    <div key={i} className={`pa-cal-cell${c.inMonth ? "" : " muted"}${c.inMonth && c.day === 22 ? " today" : ""}`}>
                      <div className="d">{c.day}</div>
                      {events.map((e, j) => (
                        <span key={j} className={`pa-cal-ev ${e.type}`}>{e.t}</span>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="pa-event-list">
                {UPCOMING.map((e) => (
                  <div key={e.name} className="pa-event">
                    <div className="pa-event-date">
                      <div className="m">{e.date.split(" ")[1]}</div>
                      <div className="d">{e.date.split(" ")[0]}</div>
                    </div>
                    <div className="pa-event-body">
                      <div className="n">{e.name} {e.critical && <span className="pa-badge danger" style={{ marginLeft: 6 }}>CRIT</span>}</div>
                      <div className="s">
                        <span>📍 {e.loc}</span>
                        <span>· attesi <b>{e.expected}</b></span>
                        <span className={`pa-badge ${e.permit === "Approvato" ? "ok" : e.permit === "In revisione" ? "warn" : "danger"}`}>{e.permit}</span>
                        <span className={`pa-badge ${e.crowd === "Attivo" ? "sage" : "neutral"}`}>Crowd: {e.crowd}</span>
                        <span>· resp. <b>{e.owner}</b></span>
                      </div>
                    </div>
                    <div className="pa-event-cta">
                      <span className={`pa-tag ${evColorFor(e.type) === "spo" ? "accent" : evColorFor(e.type) === "cul" ? "" : "sage"}`}>{e.type === "cul" ? "Cultura" : e.type === "spo" ? "Sport" : e.type === "rel" ? "Religioso" : "Commercio"}</span>
                      <button className="pa-btn pa-btn-sm" type="button">Gestisci</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Upcoming list (always visible) when in cal view */}
        {view === "cal" && (
          <section>
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Prossimi eventi · 21 giorni</h3>
                  <div className="sub">Status permessi · crowd plan · responsabile</div>
                </div>
                <span className="pa-tag neutral">6 eventi</span>
              </div>
              <div className="pa-event-list">
                {UPCOMING.map((e) => (
                  <div key={e.name} className="pa-event">
                    <div className="pa-event-date">
                      <div className="m">{e.date.split(" ")[1]}</div>
                      <div className="d">{e.date.split(" ")[0]}</div>
                    </div>
                    <div className="pa-event-body">
                      <div className="n">{e.name}</div>
                      <div className="s">
                        <span>📍 {e.loc}</span>
                        <span>· attesi <b>{e.expected}</b></span>
                        <span className={`pa-badge ${e.permit === "Approvato" ? "ok" : e.permit === "In revisione" ? "warn" : "danger"}`}>{e.permit}</span>
                        <span className={`pa-badge ${e.crowd === "Attivo" ? "sage" : "neutral"}`}>Crowd: {e.crowd}</span>
                        <span>· resp. <b>{e.owner}</b></span>
                      </div>
                    </div>
                    <div className="pa-event-cta">
                      <span className={`pa-tag ${e.type === "spo" ? "accent" : e.type === "cul" ? "" : "sage"}`}>{e.type === "cul" ? "Cultura" : "Sport"}</span>
                      <button className="pa-btn pa-btn-sm" type="button">Gestisci</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Conflicts */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>Conflitti rilevati</h3>
                <div className="sub">Sovrapposizioni data · location</div>
              </div>
              <span className="pa-tag warn">2 attivi</span>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {CONFLICTS.map((c, i) => (
                <div key={i} className="pa-conflict">
                  <div className="sev">⚠</div>
                  <div>
                    <div className="t">{c.date} · {c.ev}</div>
                    <div className="m">{c.msg}</div>
                  </div>
                  <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">Risolvi</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Permissions + Vendor board */}
        <section>
          <div className="pa-grid-2">
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Inbox permessi</h3>
                  <div className="sub">5 nuove richieste · in attesa di valutazione</div>
                </div>
                <span className="pa-tag warn">5 aperte</span>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {INBOX.map((p, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, padding: 12, border: "1px solid var(--pa-line-2)", borderRadius: 12, background: "var(--pa-surface)" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--pa-ink)", fontSize: 13 }}>{p.n}</div>
                      <div style={{ fontSize: 11, color: "var(--pa-muted)", marginTop: 2 }}>{p.m}</div>
                      <div style={{ fontSize: 10.5, color: "var(--pa-ink-blue)", marginTop: 4, fontWeight: 600 }}>Richiedente: {p.by}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">Approva</button>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">Info</button>
                      <button className="pa-btn pa-btn-sm" type="button" style={{ color: "var(--pa-danger)" }}>Rifiuta</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Coordinamento fornitori</h3>
                  <div className="sub">Board Kanban · 7 attività totali</div>
                </div>
                <span className="pa-tag neutral">semanal</span>
              </div>
              <div className="pa-kanban">
                <div className="pa-kan-col">
                  <div className="pa-kan-title">Da contattare <span>{KAN_TODO.length}</span></div>
                  {KAN_TODO.map((k, i) => (
                    <div key={i} className="pa-kan-card">
                      {k.n}
                      <div className="m">{k.m}</div>
                    </div>
                  ))}
                </div>
                <div className="pa-kan-col">
                  <div className="pa-kan-title">In lavorazione <span>{KAN_WORK.length}</span></div>
                  {KAN_WORK.map((k, i) => (
                    <div key={i} className="pa-kan-card">
                      {k.n}
                      <div className="m">{k.m}</div>
                    </div>
                  ))}
                </div>
                <div className="pa-kan-col">
                  <div className="pa-kan-title">Confermato <span>{KAN_DONE.length}</span></div>
                  {KAN_DONE.map((k, i) => (
                    <div key={i} className="pa-kan-card">
                      {k.n}
                      <div className="m">{k.m}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="pa-footer">
          <div>© 2026 TheGuide Srl · Gestione eventi · Workflow SUAP integrato</div>
          <div className="links">
            <a href="#">Modulistica</a>
            <a href="#">Regolamenti</a>
            <a href="#">Calendar export (ICS)</a>
          </div>
        </footer>
      </main>
    </>
  );
}

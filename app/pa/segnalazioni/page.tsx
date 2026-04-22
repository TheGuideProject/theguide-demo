"use client";

import { useState } from "react";

// ==============================
// DATA
// ==============================

type Cat = "tutti" | "pulizia" | "rumore" | "sicurezza" | "trasporti" | "accessibilita" | "altro";
type Stato = "aperto" | "corso" | "risolto" | "chiuso";
type Prio = "alta" | "media" | "bassa";

const CATS: { k: Cat; label: string; color: string }[] = [
  { k: "tutti", label: "Tutte", color: "#2F4858" },
  { k: "pulizia", label: "Pulizia urbana", color: "#6F9A87" },
  { k: "rumore", label: "Rumore", color: "#C6704A" },
  { k: "sicurezza", label: "Sicurezza", color: "#B9452E" },
  { k: "trasporti", label: "Trasporti", color: "#2F4858" },
  { k: "accessibilita", label: "Accessibilità", color: "#C9923E" },
  { k: "altro", label: "Altro", color: "#8A7F72" }
];

type Ticket = {
  id: string;
  cat: Exclude<Cat, "tutti">;
  catLabel: string;
  zona: string;
  desc: string;
  user: string;
  verified: boolean;
  data: string;
  prio: Prio;
  assigned: string;
  stato: Stato;
  x: number;
  y: number;
};

const TICKETS: Ticket[] = [
  { id: "TK-2026-3417", cat: "pulizia", catLabel: "Pulizia", zona: "Ponte Vecchio", desc: "Accumulo rifiuti lato nord · sacchi non raccolti", user: "turista", verified: true, data: "22/04 ore 14:32", prio: "media", assigned: "AMIA zona C", stato: "corso", x: 275, y: 235 },
  { id: "TK-2026-3416", cat: "rumore", catLabel: "Rumore", zona: "Santo Spirito", desc: "Schiamazzi notturni dopo 02:00 · bar senza autorizzazione", user: "anonimo", verified: false, data: "22/04 ore 02:45", prio: "alta", assigned: "Polizia Loc.", stato: "aperto", x: 210, y: 290 },
  { id: "TK-2026-3415", cat: "trasporti", catLabel: "Trasporti", zona: "Stazione SMN", desc: "Autobus linea 7 guasto · passeggeri a terra da 45 min", user: "cittadino", verified: true, data: "22/04 ore 09:12", prio: "alta", assigned: "ATAF", stato: "corso", x: 150, y: 180 },
  { id: "TK-2026-3414", cat: "sicurezza", catLabel: "Sicurezza", zona: "Piazzale Michelangelo", desc: "Illuminazione non funzionante scalinata est", user: "cittadino", verified: true, data: "22/04 ore 07:00", prio: "media", assigned: "Silfi", stato: "risolto", x: 380, y: 340 },
  { id: "TK-2026-3413", cat: "accessibilita", catLabel: "Accessibilità", zona: "Duomo", desc: "Rampa accesso piazza Duomo ostruita", user: "cittadino", verified: true, data: "21/04 ore 18:20", prio: "media", assigned: "Uff. mobilità", stato: "chiuso", x: 330, y: 130 },
  { id: "TK-2026-3412", cat: "pulizia", catLabel: "Pulizia", zona: "Ponte Vecchio", desc: "Scritte vandali su parapetto sud", user: "turista", verified: true, data: "21/04 ore 11:05", prio: "bassa", assigned: "AMIA zona C", stato: "aperto", x: 275, y: 240 },
  { id: "TK-2026-3411", cat: "rumore", catLabel: "Rumore", zona: "San Niccolò", desc: "Lavori edili in orario non consentito · sabato 08:00", user: "cittadino", verified: true, data: "21/04 ore 08:15", prio: "media", assigned: "Polizia Loc.", stato: "corso", x: 390, y: 295 },
  { id: "TK-2026-3410", cat: "trasporti", catLabel: "Trasporti", zona: "Novoli", desc: "Semaforo T1 guasto · incrocio Via di Novoli", user: "cittadino", verified: true, data: "21/04 ore 07:30", prio: "alta", assigned: "Gestione traffico", stato: "risolto", x: 70, y: 160 },
  { id: "TK-2026-3409", cat: "sicurezza", catLabel: "Sicurezza", zona: "Ponte Vecchio", desc: "Affluenza eccessiva · rischio calpestio", user: "turista", verified: true, data: "20/04 ore 16:45", prio: "alta", assigned: "Iris triage", stato: "aperto", x: 278, y: 232 },
  { id: "TK-2026-3408", cat: "altro", catLabel: "Altro", zona: "Oltrarno", desc: "Animale domestico disperso · segnalazione utente", user: "turista", verified: true, data: "20/04 ore 10:00", prio: "bassa", assigned: "—", stato: "chiuso", x: 220, y: 310 },
  { id: "TK-2026-3407", cat: "pulizia", catLabel: "Pulizia", zona: "Ponte Vecchio", desc: "Raccolta mancata · zona monumentale", user: "turista", verified: false, data: "20/04 ore 06:15", prio: "media", assigned: "AMIA zona C", stato: "risolto", x: 272, y: 237 },
  { id: "TK-2026-3406", cat: "accessibilita", catLabel: "Accessibilità", zona: "Campo di Marte", desc: "Marciapiede dissestato via Valfonda", user: "cittadino", verified: true, data: "19/04 ore 17:00", prio: "media", assigned: "Uff. mobilità", stato: "corso", x: 500, y: 140 }
];

const TEMPLATES = [
  { t: "Sanificazione in corso", m: "La struttura è stata segnalata al nostro servizio AMIA · intervento entro 24h · seguirà conferma." },
  { t: "Intervento in programmazione", m: "La tua segnalazione è stata inoltrata all'ente competente · riceverai aggiornamento entro 3 giorni." },
  { t: "Richiesta dettagli", m: "Per intervenire efficacemente necessitiamo dettagli aggiuntivi (foto, orario preciso)." },
  { t: "Chiuso risolto", m: "L'intervento è stato completato · grazie per la collaborazione." },
  { t: "Escalato", m: "La segnalazione è stata escalata al responsabile dell'area. Tempi di risposta estesi." }
];

// ==============================
// COMPONENT
// ==============================

export default function SegnalazioniPage() {
  const [cat, setCat] = useState<Cat>("tutti");
  const [showMap, setShowMap] = useState(false);

  const filtered = TICKETS.filter((t) => cat === "tutti" || t.cat === cat);

  return (
    <>
      <header className="pa-topbar">
        <div className="pa-title">
          <div className="pa-crumb">Comune di Firenze · Governance</div>
          <h1 className="pa-h1">Segnalazioni cittadini e turisti</h1>
        </div>
        <div className="pa-topbar-actions">
          <div className="pa-chips" style={{ margin: 0 }}>
            <button className={`pa-chip${!showMap ? " active" : ""}`} onClick={() => setShowMap(false)} type="button">Lista</button>
            <button className={`pa-chip${showMap ? " active" : ""}`} onClick={() => setShowMap(true)} type="button">Mappa</button>
          </div>
          <button className="pa-btn pa-btn-primary" type="button">+ Nuova segnalazione</button>
          <div className="pa-avatar" aria-label="Utente">MV</div>
        </div>
      </header>

      <main className="pa-content">
        {/* KPIs */}
        <section>
          <div className="pa-kpi-grid">
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Aperte</span></div>
              <div className="pa-kpi-value">42<small>attive</small></div>
              <div className="pa-kpi-unit">da gestire · 8 in priorità alta</div>
              <div className="pa-kpi-foot"><span className="pa-trend flat">≈ in linea</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>In lavorazione</span></div>
              <div className="pa-kpi-value">28<small>corso</small></div>
              <div className="pa-kpi-unit">assegnate a operatori</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ 6</span><span>vs ieri</span></div>
            </div>
            <div className="pa-card pa-kpi kpi-green">
              <div className="pa-kpi-top"><span>Risolte settimana</span></div>
              <div className="pa-kpi-value">67<small>total</small></div>
              <div className="pa-kpi-unit">chiusura positiva settimana 16</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ 12%</span><span>produttività</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Tempo medio risoluzione</span></div>
              <div className="pa-kpi-value">2,1<small>giorni</small></div>
              <div className="pa-kpi-unit">SLA interno 3 giorni · rispettato</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▼ 0,4</span><span>miglioramento</span></div>
            </div>
          </div>
        </section>

        {/* Category chips */}
        <section>
          <div className="pa-chips">
            {CATS.map((c) => (
              <button key={c.k} className={`pa-chip${cat === c.k ? " active" : ""}`} onClick={() => setCat(c.k)} type="button">
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: c.color, marginRight: 6 }} />
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* AI triage */}
        <section>
          <div className="pa-ai-triage">
            <div className="av">I</div>
            <div className="msg">
              <div className="l">Iris · AI Triage</div>
              <div className="t">Ho raggruppato 8 segnalazioni su <b>Ponte Vecchio</b> relative ad affluenza eccessiva e rifiuti nelle ultime 48h · suggerita <b>estensione temporanea ZTL</b> nei weekend di alta stagione (apr–giu). Impatto stimato: -22% calpestio, -18% rifiuti.</div>
            </div>
            <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">Proposta ZTL</button>
          </div>
        </section>

        {/* List or map */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>{showMap ? "Mappa segnalazioni · pin per categoria" : "Feed segnalazioni recenti"}</h3>
                <div className="sub">{filtered.length} risultati · aggiornato live</div>
              </div>
              <span className="pa-tag">{showMap ? "mappa" : "feed"}</span>
            </div>

            {showMap ? (
              <div style={{ padding: "10px 0" }}>
                <svg viewBox="0 0 620 400" className="pa-map-svg" role="img" aria-label="Mappa segnalazioni">
                  <defs>
                    <pattern id="paGridS" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#D8CFBD" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="620" height="400" fill="#EFE8DB" />
                  <rect width="620" height="400" fill="url(#paGridS)" />
                  <path d="M -20 260 Q 120 230, 240 250 T 440 260 Q 540 265, 640 250" stroke="#92B3AB" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.75" />
                  <path d="M 60 80 Q 280 40, 520 70 Q 580 140, 570 260 Q 540 340, 420 370 Q 260 380, 120 350 Q 50 280, 60 80 Z" fill="none" stroke="#CABE9E" strokeWidth="1.3" strokeDasharray="4 3" />
                  {filtered.map((t) => {
                    const c = CATS.find((x) => x.k === t.cat)!;
                    return (
                      <g key={t.id}>
                        <circle cx={t.x} cy={t.y} r="10" fill={c.color} opacity=".25" />
                        <circle cx={t.x} cy={t.y} r="5" fill={c.color} stroke="#fff" strokeWidth="1.5" />
                      </g>
                    );
                  })}
                </svg>
                <div className="pa-legend" style={{ marginTop: 8 }}>
                  {CATS.slice(1).map((c) => (
                    <span key={c.k}><span className="pa-legend-swatch" style={{ background: c.color }} />{c.label}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {filtered.map((t) => (
                  <div key={t.id} className="pa-ticket">
                    <div className={`pa-ticket-priority ${t.prio}`} style={{ width: 4, minHeight: 52 }} />
                    <div style={{ gridColumn: "2 / 3" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                        <span className="id">{t.id}</span>
                        <span className="pa-badge">{t.catLabel}</span>
                        <span className={`pa-badge ${t.prio === "alta" ? "danger" : t.prio === "media" ? "warn" : "sage"}`}>{t.prio}</span>
                        <span style={{ fontSize: 10.5, color: "var(--pa-muted)" }}>📍 {t.zona} · {t.data}</span>
                      </div>
                      <div className="t" style={{ marginTop: 4 }}>{t.desc}</div>
                      <div className="m">
                        <span>{t.verified ? "✓" : "?"} {t.user}</span>
                        {" · "}
                        <span>assegnato a <b style={{ color: "var(--pa-ink-2)" }}>{t.assigned}</b></span>
                      </div>
                    </div>
                    <div>
                      {t.stato === "aperto" ? <span className="pa-badge danger">Aperto</span> : t.stato === "corso" ? <span className="pa-badge warn">In corso</span> : t.stato === "risolto" ? <span className="pa-badge ok">Risolto</span> : <span className="pa-badge">Chiuso</span>}
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">Apri</button>
                      <button className="pa-btn pa-btn-sm" type="button">⋯</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Response templates */}
        <section>
          <div className="pa-grid-2">
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Template di risposta</h3>
                  <div className="sub">5 risposte predefinite · usa su ticket aperti</div>
                </div>
                <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">+ Nuovo template</button>
              </div>
              <div className="pa-templates">
                {TEMPLATES.map((tpl) => (
                  <div key={tpl.t} className="pa-template">
                    <div>
                      <div className="t">{tpl.t}</div>
                      <div className="m">{tpl.m}</div>
                    </div>
                    <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">Usa</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Distribuzione categorie · settimana</h3>
                  <div className="sub">Volume segnalazioni aggregato</div>
                </div>
                <span className="pa-tag">169 tot.</span>
              </div>
              <div className="pa-bars">
                {[
                  { z: "Pulizia urbana", p: 42, tone: "sage" },
                  { z: "Rumore", p: 38, tone: "accent" },
                  { z: "Sicurezza", p: 28, tone: "primary" },
                  { z: "Trasporti", p: 26, tone: "primary" },
                  { z: "Accessibilità", p: 18, tone: "primary" },
                  { z: "Altro", p: 17, tone: "neutral" }
                ].map((r) => (
                  <div key={r.z} className="pa-bar-row">
                    <div className="pa-bar-label">{r.z}</div>
                    <div className="pa-bar-track">
                      <div className={`pa-bar-fill ${r.tone === "primary" ? "" : r.tone}`} style={{ width: `${(r.p / 42) * 100}%` }} />
                    </div>
                    <div className="pa-bar-value">{r.p}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: 10, background: "var(--pa-sage-soft)", borderRadius: 8, fontSize: 11.5, color: "#2f5748", fontWeight: 600 }}>
                ↓ -12% segnalazioni vs settimana scorsa · meglio di Genova (+3%), Roma (+5%).
              </div>
            </div>
          </div>
        </section>

        <footer className="pa-footer">
          <div>© 2026 TheGuide Srl · Sistema segnalazioni · Integrato con FILO municipale</div>
          <div className="links">
            <a href="#">Report trimestrale</a>
            <a href="#">App cittadini</a>
            <a href="#">API open</a>
          </div>
        </footer>
      </main>
    </>
  );
}

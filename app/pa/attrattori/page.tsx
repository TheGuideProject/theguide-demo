"use client";

import { useState } from "react";

// ==============================
// DATA
// ==============================

type Cat = "tutti" | "musei" | "chiese" | "monumenti" | "parchi" | "partner";

const CATS: { k: Cat; label: string }[] = [
  { k: "tutti", label: "Tutti · 218" },
  { k: "musei", label: "Musei · 42" },
  { k: "chiese", label: "Chiese · 58" },
  { k: "monumenti", label: "Monumenti · 34" },
  { k: "parchi", label: "Parchi · 18" },
  { k: "partner", label: "Partner · 66" }
];

type POI = {
  name: string;
  loc: string;
  cat: Cat;
  visitors: string;
  dwell: string;
  rating: number;
  saturation: number;
  queue: string;
  alert: "ok" | "warn" | "danger";
};

const POIS: POI[] = [
  { name: "Galleria degli Uffizi", loc: "Piazza della Signoria", cat: "musei", visitors: "48.420", dwell: "2h 12min", rating: 4.7, saturation: 94, queue: "48 min", alert: "danger" },
  { name: "Cattedrale Santa Maria del Fiore", loc: "Piazza del Duomo", cat: "chiese", visitors: "62.110", dwell: "1h 08min", rating: 4.8, saturation: 98, queue: "72 min", alert: "danger" },
  { name: "Galleria dell'Accademia (David)", loc: "San Marco", cat: "musei", visitors: "38.220", dwell: "1h 18min", rating: 4.8, saturation: 91, queue: "55 min", alert: "danger" },
  { name: "Ponte Vecchio", loc: "Lungarno", cat: "monumenti", visitors: "71.250", dwell: "28min", rating: 4.5, saturation: 82, queue: "—", alert: "warn" },
  { name: "Palazzo Pitti", loc: "Oltrarno", cat: "musei", visitors: "19.640", dwell: "1h 52min", rating: 4.6, saturation: 61, queue: "18 min", alert: "ok" },
  { name: "Giardino di Boboli", loc: "Oltrarno", cat: "parchi", visitors: "22.800", dwell: "1h 40min", rating: 4.7, saturation: 48, queue: "12 min", alert: "ok" },
  { name: "Basilica di Santa Croce", loc: "Santa Croce", cat: "chiese", visitors: "16.920", dwell: "1h 24min", rating: 4.5, saturation: 58, queue: "20 min", alert: "ok" },
  { name: "Basilica di San Lorenzo", loc: "San Lorenzo", cat: "chiese", visitors: "12.430", dwell: "58min", rating: 4.4, saturation: 42, queue: "15 min", alert: "ok" },
  { name: "Museo del Bargello", loc: "Santa Croce", cat: "musei", visitors: "8.910", dwell: "1h 12min", rating: 4.5, saturation: 38, queue: "—", alert: "ok" },
  { name: "Palazzo Vecchio", loc: "Piazza della Signoria", cat: "musei", visitors: "21.480", dwell: "1h 34min", rating: 4.6, saturation: 74, queue: "25 min", alert: "warn" },
  { name: "Santa Maria Novella", loc: "S.M. Novella", cat: "chiese", visitors: "14.220", dwell: "52min", rating: 4.5, saturation: 55, queue: "18 min", alert: "ok" },
  { name: "San Miniato al Monte", loc: "San Niccolò", cat: "chiese", visitors: "7.820", dwell: "42min", rating: 4.8, saturation: 31, queue: "—", alert: "ok" },
  { name: "Cappella Brancacci", loc: "Oltrarno", cat: "chiese", visitors: "4.610", dwell: "50min", rating: 4.7, saturation: 66, queue: "22 min", alert: "warn" },
  { name: "Cappelle Medicee", loc: "San Lorenzo", cat: "musei", visitors: "11.340", dwell: "1h 10min", rating: 4.6, saturation: 52, queue: "18 min", alert: "ok" },
  { name: "Piazzale Michelangelo", loc: "San Niccolò", cat: "monumenti", visitors: "42.880", dwell: "42min", rating: 4.7, saturation: 54, queue: "—", alert: "ok" }
];

const SUBMISSIONS = [
  { emo: "🏛", n: "Museo Horne (estensione serale)", m: "Orario 19–22 due sere/sett · test 3 mesi · 4 sale" },
  { emo: "🌳", n: "Giardino delle Rose — POI ufficiale", m: "Richiesta classificazione come attrattore green ufficiale" },
  { emo: "🖼", n: "Collezione Roberto Casamonti", m: "Partnership privata · arte contemporanea · 60K visitatori/anno" }
];

// simplified Firenze POI positions for map
const POI_MAP = [
  { x: 325, y: 120, label: "Duomo", cluster: 8 },
  { x: 310, y: 195, label: "Uffizi", cluster: 5 },
  { x: 275, y: 225, label: "Ponte V.", cluster: 3 },
  { x: 440, y: 200, label: "S. Croce", cluster: 6 },
  { x: 275, y: 100, label: "S. Lorenzo", cluster: 7 },
  { x: 220, y: 290, label: "Oltrarno", cluster: 9 },
  { x: 360, y: 340, label: "S. Miniato", cluster: 2 },
  { x: 500, y: 270, label: "Campo", cluster: 3 }
];

// ==============================
// COMPONENT
// ==============================

export default function AttrattoriPage() {
  const [activeCat, setActiveCat] = useState<Cat>("tutti");
  const [focused, setFocused] = useState<string | null>("Galleria degli Uffizi");

  const filtered = activeCat === "tutti" ? POIS : POIS.filter((p) => p.cat === activeCat);
  const focusPoi = POIS.find((p) => p.name === focused);

  return (
    <>
      <header className="pa-topbar">
        <div className="pa-title">
          <div className="pa-crumb">Comune di Firenze · Monitoraggio</div>
          <h1 className="pa-h1">Attrattori culturali · Firenze</h1>
        </div>
        <div className="pa-topbar-actions">
          <div className="pa-range">
            <span className="cal" aria-hidden>▦</span>
            <span>Settimana 16/2026</span>
            <span className="caret" aria-hidden>▼</span>
          </div>
          <button className="pa-btn pa-btn-primary" type="button">⇩ Esporta CSV</button>
          <div className="pa-avatar" aria-label="Utente">MV</div>
        </div>
      </header>

      <main className="pa-content">
        <section>
          <div className="pa-sub-h">
            <div className="pa-section-label" style={{ margin: 0 }}>
              Catalogo POI
              <span className="sub">218 attrattori mappati · categoria filtro</span>
            </div>
            <div className="pa-chips">
              {CATS.map((c) => (
                <button key={c.k} className={`pa-chip${activeCat === c.k ? " active" : ""}`} onClick={() => setActiveCat(c.k)} type="button">
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section>
          <div className="pa-kpi-grid">
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Attrattori mappati</span></div>
              <div className="pa-kpi-value">218<small>totali</small></div>
              <div className="pa-kpi-unit">di cui 66 con partnership attiva</div>
              <div className="pa-kpi-foot">
                <span className="pa-trend up">▲ 4</span>
                <span>nuove aggiunte</span>
              </div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Visitatori settimana</span></div>
              <div className="pa-kpi-value">412K<small>·wk 16</small></div>
              <div className="pa-kpi-unit">ingressi verificati · TravelPass + ticket</div>
              <div className="pa-kpi-foot">
                <span className="pa-trend up">▲ 7,4%</span>
                <span>vs settimana prec.</span>
              </div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Rating medio</span></div>
              <div className="pa-kpi-value">4,6<small>/5</small></div>
              <div className="pa-kpi-unit">media recensioni TheGuide ultimi 30g</div>
              <div className="pa-kpi-foot">
                <span className="pa-trend up">▲ 0,1</span>
                <span>trend positivo</span>
              </div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Waitlist media</span></div>
              <div className="pa-kpi-value">22<small>min</small></div>
              <div className="pa-kpi-unit">coda stimata ingresso</div>
              <div className="pa-kpi-foot">
                <span className="pa-trend down">▲ 3 min</span>
                <span>picco stagionale</span>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard + Focus */}
        <section>
          <div className="pa-grid-2-1">
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Leaderboard attrattori — settimana 16</h3>
                  <div className="sub">Click su una riga per aprire focus operativo</div>
                </div>
                <span className="pa-tag">{filtered.length} risultati</span>
              </div>
              <table className="pa-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Attrattore</th>
                    <th className="num">Visitatori wk</th>
                    <th className="num">Dwell</th>
                    <th className="num">Rating</th>
                    <th className="num">Saturazione</th>
                    <th className="num">Coda</th>
                    <th>Alert</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p.name} className={focused === p.name ? "active" : ""} onClick={() => setFocused(p.name)}>
                      <td>{String(i + 1).padStart(2, "0")}</td>
                      <td>
                        <div className="name">{p.name}</div>
                        <div className="loc">{p.loc}</div>
                      </td>
                      <td className="num">{p.visitors}</td>
                      <td className="num">{p.dwell}</td>
                      <td className="num">★ {p.rating}</td>
                      <td className="num">
                        <div style={{ fontWeight: 700 }}>{p.saturation}%</div>
                        <div className="pa-sat-bar">
                          <div className={`pa-sat-fill ${p.saturation > 90 ? "danger" : p.saturation > 75 ? "warn" : ""}`} style={{ width: `${p.saturation}%` }} />
                        </div>
                      </td>
                      <td className="num">{p.queue}</td>
                      <td>
                        {p.alert === "danger" ? <span className="pa-badge danger">CRIT</span> : p.alert === "warn" ? <span className="pa-badge warn">ATTN</span> : <span className="pa-badge ok">OK</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Focus operativo</h3>
                  <div className="sub">{focusPoi ? focusPoi.name : "Seleziona un attrattore"}</div>
                </div>
                {focusPoi && <span className={`pa-badge ${focusPoi.alert === "danger" ? "danger" : focusPoi.alert === "warn" ? "warn" : "ok"}`}>{focusPoi.alert === "danger" ? "Critico" : focusPoi.alert === "warn" ? "Attenzione" : "Nominale"}</span>}
              </div>
              {focusPoi && (
                <>
                  <div className="pa-tile-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <div className="pa-mini-metric">
                      <div className="n">Visitatori wk</div>
                      <div className="v">{focusPoi.visitors}</div>
                    </div>
                    <div className="pa-mini-metric">
                      <div className="n">Saturazione</div>
                      <div className="v">{focusPoi.saturation}%</div>
                    </div>
                    <div className="pa-mini-metric">
                      <div className="n">Dwell time</div>
                      <div className="v">{focusPoi.dwell}</div>
                    </div>
                    <div className="pa-mini-metric">
                      <div className="n">Rating</div>
                      <div className="v">★ {focusPoi.rating}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div className="pa-section-label" style={{ margin: "0 0 8px" }}>
                      Curva capacità · prossime 6 ore
                    </div>
                    <svg viewBox="0 0 320 110" style={{ width: "100%", height: 110, display: "block" }} role="img">
                      {[...Array(7)].map((_, i) => (
                        <line key={i} x1={i * 50 + 20} y1={10} x2={i * 50 + 20} y2={95} stroke="#EFE8DB" strokeWidth="1" />
                      ))}
                      <line x1="20" y1="95" x2="320" y2="95" stroke="#CABE9E" strokeWidth="1" />
                      <path d="M 20 70 Q 60 65, 80 40 T 140 20 Q 180 10, 220 30 T 300 65" fill="none" stroke="#C6704A" strokeWidth="2.5" />
                      <path d="M 20 70 Q 60 65, 80 40 T 140 20 Q 180 10, 220 30 T 300 65 L 300 95 L 20 95 Z" fill="#C6704A" opacity=".18" />
                      <line x1="170" y1="10" x2="170" y2="95" stroke="#2F4858" strokeWidth="1.2" strokeDasharray="3 3" />
                      <text x="170" y="8" textAnchor="middle" fontSize="9" fill="#2F4858" fontWeight="700">ora</text>
                      {["17", "18", "19", "20", "21", "22"].map((t, i) => (
                        <text key={t} x={20 + i * 50} y={108} textAnchor="middle" fontSize="9" fill="#8A7F72">{t}:00</text>
                      ))}
                    </svg>
                  </div>
                  <div className="pa-toggle" style={{ marginTop: 14 }}>
                    <div className="pa-toggle-label">
                      <div className="t">Timed-entry booking</div>
                      <div className="s">Obbligatorio slot 15 min · integrazione TravelPass</div>
                    </div>
                    <button className="pa-switch" aria-pressed={true} type="button">
                      <span className="sr-only">Toggle</span>
                    </button>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <div className="pa-section-label" style={{ margin: "0 0 6px" }}>Accessibilità e sicurezza</div>
                    <div style={{ display: "grid", gap: 6, fontSize: 12 }}>
                      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" defaultChecked /> Ingresso accessibile a disabilità motorie
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" defaultChecked /> Pianta di evacuazione aggiornata (2026)
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" /> Audio guide multilingua (IT/EN/DE/FR/JP)
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Map + submissions */}
        <section>
          <div className="pa-grid-2">
            <div className="pa-card pa-map-card">
              <div className="pa-map-head">
                <div className="pa-card-title">
                  <div>
                    <h3>Cluster POI mappati</h3>
                    <div className="sub">Raggruppamenti dinamici · zoom città</div>
                  </div>
                  <span className="pa-tag neutral">8 cluster</span>
                </div>
              </div>
              <div className="pa-map-body">
                <svg viewBox="0 0 620 400" className="pa-map-svg" role="img" aria-label="Cluster POI Firenze">
                  <defs>
                    <pattern id="paGridA" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#D8CFBD" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="620" height="400" fill="#EFE8DB" />
                  <rect width="620" height="400" fill="url(#paGridA)" />
                  <path d="M -20 260 Q 120 230, 240 250 T 440 260 Q 540 265, 640 250" stroke="#92B3AB" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.75" />
                  <path d="M 60 80 Q 280 40, 520 70 Q 580 140, 570 260 Q 540 340, 420 370 Q 260 380, 120 350 Q 50 280, 60 80 Z" fill="none" stroke="#CABE9E" strokeWidth="1.3" strokeDasharray="4 3" />
                  {POI_MAP.map((c, i) => {
                    const r = 14 + c.cluster * 2.4;
                    return (
                      <g key={i}>
                        <circle cx={c.x} cy={c.y} r={r + 6} fill="#C6704A" opacity=".18" />
                        <circle cx={c.x} cy={c.y} r={r} fill="#C6704A" stroke="#fff" strokeWidth="2" />
                        <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">{c.cluster}</text>
                        <text x={c.x} y={c.y + r + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1F1B16" style={{ paintOrder: "stroke", stroke: "#F6F0E3", strokeWidth: 3, strokeLinejoin: "round" }}>{c.label}</text>
                      </g>
                    );
                  })}
                </svg>
                <div className="pa-map-legend">
                  <span>Cluster piccolo (2-4 POI)</span>
                  <div className="bar" style={{ background: "linear-gradient(90deg, var(--pa-accent-soft), var(--pa-accent))" }} />
                  <span>Grande (8+ POI)</span>
                </div>
              </div>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Queue nuovi attrattori</h3>
                  <div className="sub">3 proposte in valutazione</div>
                </div>
                <span className="pa-tag warn">In revisione</span>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {SUBMISSIONS.map((s) => (
                  <div key={s.n} className="pa-submission">
                    <div className="pa-submission-thumb">{s.emo}</div>
                    <div>
                      <div className="n">{s.n}</div>
                      <div className="m">{s.m}</div>
                    </div>
                    <div className="pa-submission-cta">
                      <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">Approva</button>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">Rifiuta</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 11, color: "var(--pa-muted)" }}>
                Invii automaticamente inoltrati all'ufficio turismo per la classificazione formale · tempo medio valutazione: 12 giorni.
              </div>
            </div>
          </div>
        </section>

        <footer className="pa-footer">
          <div>© 2026 TheGuide Srl · Catalogo attrattori · Aggiornato 22 apr 2026</div>
          <div className="links">
            <a href="#">Manuale categorie</a>
            <a href="#">Partnership</a>
            <a href="#">Export dati open</a>
          </div>
        </footer>
      </main>
    </>
  );
}

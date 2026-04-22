"use client";

import { useState } from "react";

// ==============================
// DATA
// ==============================

type Tipo = "tutti" | "hotel" | "bb" | "affitta" | "air" | "agri";

const TIPI: { k: Tipo; label: string }[] = [
  { k: "tutti", label: "Tutti · 1.842" },
  { k: "hotel", label: "Hotel · 412" },
  { k: "bb", label: "B&B · 298" },
  { k: "affitta", label: "Affittacamere · 184" },
  { k: "air", label: "AirBnB · 890" },
  { k: "agri", label: "Agriturismo · 58" }
];

type Struct = {
  name: string;
  tipo: Exclude<Tipo, "tutti">;
  tipoLabel: string;
  zona: string;
  posti: number;
  cir: string;
  occ: number;
  rating: number;
  ispez: string;
  stato: "ok" | "warn" | "sosp";
};

const STRUCTS: Struct[] = [
  { name: "Hotel Lungarno", tipo: "hotel", tipoLabel: "Hotel ★★★★★", zona: "Oltrarno", posti: 148, cir: "048017-001", occ: 87, rating: 4.8, ispez: "15/02/2026", stato: "ok" },
  { name: "Grand Hotel Cavour", tipo: "hotel", tipoLabel: "Hotel ★★★★", zona: "Centro", posti: 210, cir: "048017-002", occ: 92, rating: 4.6, ispez: "22/03/2026", stato: "ok" },
  { name: "Hotel Brunelleschi", tipo: "hotel", tipoLabel: "Hotel ★★★★", zona: "Duomo", posti: 186, cir: "048017-003", occ: 89, rating: 4.7, ispez: "08/01/2026", stato: "ok" },
  { name: "B&B Santo Spirito", tipo: "bb", tipoLabel: "B&B", zona: "Oltrarno", posti: 8, cir: "048017-1847", occ: 76, rating: 4.7, ispez: "22/04/2026", stato: "ok" },
  { name: "Casa Vacanze Duomo", tipo: "air", tipoLabel: "Short-let", zona: "Duomo", posti: 12, cir: "—", occ: 94, rating: 4.4, ispez: "n/a", stato: "warn" },
  { name: "Residenza Signoria", tipo: "affitta", tipoLabel: "Affittacamere", zona: "Centro", posti: 22, cir: "048017-0892", occ: 71, rating: 4.5, ispez: "14/02/2026", stato: "ok" },
  { name: "Villa La Vedetta", tipo: "hotel", tipoLabel: "Hotel ★★★★★L", zona: "San Niccolò", posti: 68, cir: "048017-011", occ: 82, rating: 4.9, ispez: "05/03/2026", stato: "ok" },
  { name: "Apartment Arno 32", tipo: "air", tipoLabel: "Short-let", zona: "Santa Croce", posti: 6, cir: "—", occ: 88, rating: 4.6, ispez: "n/a", stato: "warn" },
  { name: "Agriturismo Il Chianti", tipo: "agri", tipoLabel: "Agriturismo", zona: "Galluzzo", posti: 34, cir: "048017-1234", occ: 58, rating: 4.8, ispez: "01/04/2026", stato: "ok" },
  { name: "Hotel Savoy", tipo: "hotel", tipoLabel: "Hotel ★★★★★L", zona: "Centro", posti: 88, cir: "048017-005", occ: 94, rating: 4.9, ispez: "22/02/2026", stato: "ok" },
  { name: "Piccolo Hotel Etrusco", tipo: "hotel", tipoLabel: "Hotel ★★★", zona: "Novoli", posti: 44, cir: "048017-077", occ: 62, rating: 4.2, ispez: "10/02/2025", stato: "warn" },
  { name: "Monolocale Oltrarno", tipo: "air", tipoLabel: "Short-let", zona: "Oltrarno", posti: 4, cir: "048017-1592", occ: 84, rating: 4.3, ispez: "18/03/2026", stato: "ok" },
  { name: "B&B Il Giardino", tipo: "bb", tipoLabel: "B&B", zona: "San Frediano", posti: 10, cir: "SOSPESO", occ: 0, rating: 3.8, ispez: "28/03/2026", stato: "sosp" },
  { name: "Residence Rifredi", tipo: "affitta", tipoLabel: "Residence", zona: "Rifredi", posti: 120, cir: "048017-0331", occ: 66, rating: 4.2, ispez: "12/01/2026", stato: "ok" },
  { name: "Villa Nova · short-let", tipo: "air", tipoLabel: "Short-let", zona: "Campo di Marte", posti: 16, cir: "—", occ: 78, rating: 4.0, ispez: "n/a", stato: "warn" },
  { name: "Hotel Baglioni", tipo: "hotel", tipoLabel: "Hotel ★★★★", zona: "Centro", posti: 192, cir: "048017-018", occ: 85, rating: 4.5, ispez: "19/02/2026", stato: "ok" },
  { name: "Agriturismo Bellavista", tipo: "agri", tipoLabel: "Agriturismo", zona: "Bagno a Ripoli", posti: 22, cir: "048017-1401", occ: 70, rating: 4.7, ispez: "04/04/2026", stato: "ok" },
  { name: "Ostello Santa Monaca", tipo: "affitta", tipoLabel: "Ostello", zona: "Oltrarno", posti: 68, cir: "048017-0044", occ: 91, rating: 4.4, ispez: "06/02/2026", stato: "ok" },
  { name: "Short-let Uffizi View", tipo: "air", tipoLabel: "Short-let", zona: "Signoria", posti: 8, cir: "SOSPESO", occ: 0, rating: 4.2, ispez: "11/04/2026", stato: "sosp" },
  { name: "B&B Piazza del Carmine", tipo: "bb", tipoLabel: "B&B", zona: "Oltrarno", posti: 12, cir: "048017-1102", occ: 74, rating: 4.6, ispez: "21/03/2026", stato: "ok" }
];

// Occupancy line-chart data: 30 days × 3 series (hotel, bb, airbnb)
const OCC_DAYS = 30;
const hotelSeries = Array.from({ length: OCC_DAYS }, (_, i) => 70 + Math.sin(i * 0.4) * 8 + (i / 30) * 10);
const bbSeries = Array.from({ length: OCC_DAYS }, (_, i) => 58 + Math.cos(i * 0.35) * 10 + (i / 30) * 8);
const airSeries = Array.from({ length: OCC_DAYS }, (_, i) => 82 + Math.sin(i * 0.5) * 6 + (i / 30) * 4);

// ==============================
// COMPONENT
// ==============================

export default function StrutturePage() {
  const [tipo, setTipo] = useState<Tipo>("tutti");
  const [q, setQ] = useState("");

  const filtered = STRUCTS.filter((s) => (tipo === "tutti" || s.tipo === tipo) && (q === "" || s.name.toLowerCase().includes(q.toLowerCase()) || s.zona.toLowerCase().includes(q.toLowerCase())));

  const makePath = (series: number[]) => {
    const max = 100;
    const step = 300 / (series.length - 1);
    return series.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${80 - (v / max) * 70}`).join(" ");
  };

  return (
    <>
      <header className="pa-topbar">
        <div className="pa-title">
          <div className="pa-crumb">Comune di Firenze · Monitoraggio</div>
          <h1 className="pa-h1">Strutture ricettive</h1>
        </div>
        <div className="pa-topbar-actions">
          <div className="pa-search">
            <span className="ico" aria-hidden>⌕</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca nome o zona…" />
          </div>
          <button className="pa-btn pa-btn-primary" type="button">+ Registra struttura</button>
          <div className="pa-avatar" aria-label="Utente">MV</div>
        </div>
      </header>

      <main className="pa-content">
        <section>
          <div className="pa-chips">
            {TIPI.map((t) => (
              <button key={t.k} className={`pa-chip${tipo === t.k ? " active" : ""}`} onClick={() => setTipo(t.k)} type="button">
                {t.label}
              </button>
            ))}
          </div>
        </section>

        {/* KPIs */}
        <section>
          <div className="pa-kpi-grid">
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Strutture registrate</span></div>
              <div className="pa-kpi-value">1.842<small>attive</small></div>
              <div className="pa-kpi-unit">totale registrato all'Osservatorio turistico</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ 34</span><span>30 giorni</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Posti letto</span></div>
              <div className="pa-kpi-value">14.320<small>tot.</small></div>
              <div className="pa-kpi-unit">capienza aggregata autorizzata</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ 220</span><span>nuovi posti</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Occupazione media</span></div>
              <div className="pa-kpi-value">78<small>%</small></div>
              <div className="pa-kpi-unit">ultime 4 settimane · stagionale</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ 6 pp</span><span>vs 2025</span></div>
            </div>
            <div className="pa-card pa-kpi kpi-green">
              <div className="pa-kpi-top"><span>CIR validi</span></div>
              <div className="pa-kpi-value">87<small>%</small></div>
              <div className="pa-kpi-unit">percentuale strutture con CIR attivo</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ 4 pp</span><span>compliance</span></div>
            </div>
          </div>
        </section>

        {/* Compliance alert bar */}
        <section>
          <div className="pa-card">
            <div className="pa-alert-bar" style={{ margin: 0 }}>
              <span className="ico" aria-hidden>!</span>
              <span>
                <b>18 strutture senza CIR attivo</b> · 24 richieste di verifica pendenti · 3 strutture sospese. Verifica richiesta entro 30 giorni (D.Lgs. 33/2017, art. 13-quater).
              </span>
              <button className="link" type="button">Apri report compliance →</button>
            </div>
          </div>
        </section>

        {/* Big table */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>Registro strutture · {filtered.length} risultati</h3>
                <div className="sub">Ordinato per rilevanza · click per aprire scheda</div>
              </div>
              <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">⇩ Esporta CSV</button>
            </div>
            <table className="pa-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Zona</th>
                  <th className="num">Posti letto</th>
                  <th>CIR</th>
                  <th className="num">Occup.</th>
                  <th className="num">Rating</th>
                  <th>Ult. ispezione</th>
                  <th>Stato</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.name}>
                    <td>
                      <div className="name">{s.name}</div>
                      <div className="loc">{s.zona}</div>
                    </td>
                    <td>{s.tipoLabel}</td>
                    <td>{s.zona}</td>
                    <td className="num">{s.posti}</td>
                    <td style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 11 }}>
                      {s.cir === "—" ? <span className="pa-badge warn">mancante</span> : s.cir === "SOSPESO" ? <span className="pa-badge danger">SOSP.</span> : s.cir}
                    </td>
                    <td className="num">
                      <div style={{ fontWeight: 700 }}>{s.occ}%</div>
                      <div className="pa-sat-bar">
                        <div className={`pa-sat-fill ${s.occ > 90 ? "danger" : s.occ > 75 ? "warn" : ""}`} style={{ width: `${s.occ}%` }} />
                      </div>
                    </td>
                    <td className="num">★ {s.rating}</td>
                    <td>{s.ispez}</td>
                    <td>
                      {s.stato === "ok" ? <span className="pa-badge ok">OK</span> : s.stato === "warn" ? <span className="pa-badge warn">Attenzione</span> : <span className="pa-badge danger">Sospesa</span>}
                    </td>
                    <td>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">⋯</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Occupancy trend + Short-let panel + Tax pie */}
        <section>
          <div className="pa-grid-2">
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Trend occupazione · 30 giorni</h3>
                  <div className="sub">Hotel vs B&B vs short-let · variazione %</div>
                </div>
                <span className="pa-tag">apr 2026</span>
              </div>
              <svg viewBox="0 0 340 120" style={{ width: "100%", height: 160, display: "block" }} role="img">
                {[0, 25, 50, 75, 100].map((v) => (
                  <g key={v}>
                    <line x1="20" y1={90 - (v / 100) * 70 + 10} x2="330" y2={90 - (v / 100) * 70 + 10} stroke="#EFE8DB" strokeWidth="1" />
                    <text x="16" y={92 - (v / 100) * 70 + 10} textAnchor="end" fontSize="8" fill="#8A7F72">{v}</text>
                  </g>
                ))}
                <g transform="translate(20 10)">
                  <path d={makePath(hotelSeries)} fill="none" stroke="#2F4858" strokeWidth="2" />
                  <path d={makePath(bbSeries)} fill="none" stroke="#C6704A" strokeWidth="2" />
                  <path d={makePath(airSeries)} fill="none" stroke="#6F9A87" strokeWidth="2" />
                </g>
                <g transform="translate(20 114)">
                  {[0, 7, 14, 21, 29].map((d) => (
                    <text key={d} x={(d / 29) * 310} textAnchor="middle" fontSize="9" fill="#8A7F72">
                      {d === 0 ? "24 mar" : d === 7 ? "31 mar" : d === 14 ? "07 apr" : d === 21 ? "14 apr" : "22 apr"}
                    </text>
                  ))}
                </g>
              </svg>
              <div className="pa-legend">
                <span><span className="pa-legend-swatch" style={{ background: "#2F4858" }} />Hotel</span>
                <span><span className="pa-legend-swatch" style={{ background: "#C6704A" }} />B&B</span>
                <span><span className="pa-legend-swatch" style={{ background: "#6F9A87" }} />Short-let</span>
              </div>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Short-let monitoring</h3>
                  <div className="sub">AirBnB e affini · piattaforme 3rd party</div>
                </div>
                <span className="pa-tag warn">890 attivi</span>
              </div>
              <div className="pa-tile-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div className="pa-mini-metric">
                  <div className="n">Annunci attivi</div>
                  <div className="v">890</div>
                </div>
                <div className="pa-mini-metric">
                  <div className="n">Host multi-property</div>
                  <div className="v">48<small style={{ fontSize: 11, color: "var(--pa-muted)", marginLeft: 3 }}>&gt;5 alloggi</small></div>
                </div>
                <div className="pa-mini-metric">
                  <div className="n">Durata media</div>
                  <div className="v">3,2<small style={{ fontSize: 11, color: "var(--pa-muted)", marginLeft: 3 }}>notti</small></div>
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div className="pa-section-label" style={{ margin: "0 0 8px" }}>Distribuzione per zona</div>
                <div className="pa-bars">
                  {[
                    { z: "Oltrarno", p: 28 },
                    { z: "Centro storico", p: 24 },
                    { z: "Santa Croce", p: 18 },
                    { z: "San Frediano", p: 12 },
                    { z: "San Niccolò", p: 10 },
                    { z: "Altre zone", p: 8 }
                  ].map((r) => (
                    <div key={r.z} className="pa-bar-row">
                      <div className="pa-bar-label">{r.z}</div>
                      <div className="pa-bar-track">
                        <div className="pa-bar-fill accent" style={{ width: `${(r.p / 28) * 100}%` }} />
                      </div>
                      <div className="pa-bar-value">{r.p}%</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pa-alert-bar" style={{ marginTop: 14 }}>
                <span className="ico" aria-hidden>!</span>
                <span><b>48 host multi-property</b> segnalati — analisi impatto quartiere suggerita da Iris.</span>
                <button className="link" type="button">Analisi →</button>
              </div>
            </div>
          </div>
        </section>

        {/* Tax compliance donut */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>Conformità imposta di soggiorno per tipologia</h3>
                <div className="sub">% pagato vs outstanding · tipologia struttura</div>
              </div>
              <span className="pa-tag sage">92% riscossione</span>
            </div>
            <div className="pa-grid-2-1">
              <div>
                <svg viewBox="0 0 200 200" style={{ width: 220, height: 220, display: "block", margin: "0 auto" }} role="img">
                  {/* donut: 4 segments (hotel, bb, air, agri) */}
                  {/* 54, 21, 22, 3 = 100 */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#EFE8DB" strokeWidth="26" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#2F4858" strokeWidth="26" strokeDasharray={`${54 * 5.027} ${500}`} transform="rotate(-90 100 100)" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#C6704A" strokeWidth="26" strokeDasharray={`${21 * 5.027} ${500}`} strokeDashoffset={`-${54 * 5.027}`} transform="rotate(-90 100 100)" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#6F9A87" strokeWidth="26" strokeDasharray={`${22 * 5.027} ${500}`} strokeDashoffset={`-${(54 + 21) * 5.027}`} transform="rotate(-90 100 100)" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#D69751" strokeWidth="26" strokeDasharray={`${3 * 5.027} ${500}`} strokeDashoffset={`-${(54 + 21 + 22) * 5.027}`} transform="rotate(-90 100 100)" />
                  <text x="100" y="100" textAnchor="middle" fontSize="24" fontWeight="800" fill="#2F4858">€1,28M</text>
                  <text x="100" y="118" textAnchor="middle" fontSize="11" fill="#8A7F72" fontWeight="600">YTD 2026</text>
                </svg>
              </div>
              <div>
                <div className="pa-donut-legend">
                  <div className="row">
                    <div className="sw" style={{ background: "#2F4858" }} />
                    <div>Hotel & resort</div>
                    <div className="val">€693K</div>
                    <div className="pct">54%</div>
                  </div>
                  <div className="row">
                    <div className="sw" style={{ background: "#C6704A" }} />
                    <div>B&B & case vacanza</div>
                    <div className="val">€269K</div>
                    <div className="pct">21%</div>
                  </div>
                  <div className="row">
                    <div className="sw" style={{ background: "#6F9A87" }} />
                    <div>Short-let / AirBnB</div>
                    <div className="val">€282K</div>
                    <div className="pct">22%</div>
                  </div>
                  <div className="row">
                    <div className="sw" style={{ background: "#D69751" }} />
                    <div>Agriturismo</div>
                    <div className="val">€38K</div>
                    <div className="pct">3%</div>
                  </div>
                </div>
                <div style={{ marginTop: 14, padding: 12, background: "var(--pa-warn-soft)", borderRadius: 10, fontSize: 11.5, color: "#5f4417", fontWeight: 600 }}>
                  Outstanding: <b>€98.320</b> distribuiti su 68 strutture · notifiche inviate automaticamente via PEC.
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="pa-footer">
          <div>© 2026 TheGuide Srl · Registro strutture · Sincronizzato con Regione Toscana</div>
          <div className="links">
            <a href="#">Procedure CIR</a>
            <a href="#">Sanzioni e sospensioni</a>
            <a href="#">Export open data</a>
          </div>
        </footer>
      </main>
    </>
  );
}

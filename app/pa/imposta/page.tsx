"use client";

import { useState } from "react";

// ==============================
// DATA
// ==============================

const MONTHS = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

// stacked 3-series revenue (hotel, bb, air) per month for 2026 (values in €K, YTD up to Apr)
const MONTHLY = [
  { hotel: 158, bb: 62, air: 74 },
  { hotel: 172, bb: 68, air: 82 },
  { hotel: 198, bb: 78, air: 94 },
  { hotel: 226, bb: 87, air: 105 },
  { hotel: 0, bb: 0, air: 0 },
  { hotel: 0, bb: 0, air: 0 },
  { hotel: 0, bb: 0, air: 0 },
  { hotel: 0, bb: 0, air: 0 },
  { hotel: 0, bb: 0, air: 0 },
  { hotel: 0, bb: 0, air: 0 },
  { hotel: 0, bb: 0, air: 0 },
  { hotel: 0, bb: 0, air: 0 }
];

type Contributor = {
  name: string;
  tipo: string;
  dichiarati: number;
  riscosso: number;
  diff: number;
  stato: "ok" | "pending" | "late";
};

const CONTRIBUTORS: Contributor[] = [
  { name: "Hotel Lungarno", tipo: "Hotel ★★★★★", dichiarati: 42800, riscosso: 42800, diff: 0, stato: "ok" },
  { name: "Grand Hotel Cavour", tipo: "Hotel ★★★★", dichiarati: 38400, riscosso: 38400, diff: 0, stato: "ok" },
  { name: "Hotel Brunelleschi", tipo: "Hotel ★★★★", dichiarati: 34200, riscosso: 31800, diff: -2400, stato: "pending" },
  { name: "Hotel Savoy", tipo: "Hotel ★★★★★L", dichiarati: 48600, riscosso: 48600, diff: 0, stato: "ok" },
  { name: "Villa La Vedetta", tipo: "Hotel ★★★★★L", dichiarati: 22400, riscosso: 22400, diff: 0, stato: "ok" },
  { name: "Hotel Baglioni", tipo: "Hotel ★★★★", dichiarati: 28800, riscosso: 24200, diff: -4600, stato: "late" },
  { name: "Residence Rifredi", tipo: "Residence", dichiarati: 18200, riscosso: 18200, diff: 0, stato: "ok" },
  { name: "Ostello Santa Monaca", tipo: "Ostello", dichiarati: 9800, riscosso: 9800, diff: 0, stato: "ok" },
  { name: "B&B Santo Spirito", tipo: "B&B", dichiarati: 4200, riscosso: 4200, diff: 0, stato: "ok" },
  { name: "Casa Vacanze Duomo", tipo: "Short-let", dichiarati: 0, riscosso: 0, diff: 0, stato: "pending" },
  { name: "Monolocale Oltrarno", tipo: "Short-let", dichiarati: 3800, riscosso: 3800, diff: 0, stato: "ok" },
  { name: "B&B Piazza del Carmine", tipo: "B&B", dichiarati: 5600, riscosso: 4200, diff: -1400, stato: "pending" },
  { name: "Apartment Arno 32", tipo: "Short-let", dichiarati: 4800, riscosso: 2400, diff: -2400, stato: "late" },
  { name: "Agriturismo Il Chianti", tipo: "Agriturismo", dichiarati: 6800, riscosso: 6800, diff: 0, stato: "ok" },
  { name: "Residenza Signoria", tipo: "Affittacamere", dichiarati: 11200, riscosso: 11200, diff: 0, stato: "ok" }
];

type Tariff = {
  tipo: string;
  bassa: number;
  media: number;
  alta: number;
  peak: number;
};

const TARIFFS_INIT: Tariff[] = [
  { tipo: "Hotel ★★★★★", bassa: 5.0, media: 6.0, alta: 7.0, peak: 8.0 },
  { tipo: "Hotel ★★★★", bassa: 4.0, media: 5.0, alta: 6.0, peak: 7.0 },
  { tipo: "Hotel ★★★", bassa: 3.0, media: 3.5, alta: 4.0, peak: 4.5 },
  { tipo: "B&B / Affittacamere", bassa: 2.0, media: 2.5, alta: 3.0, peak: 3.5 },
  { tipo: "Short-let / AirBnB", bassa: 3.0, media: 3.5, alta: 4.0, peak: 4.5 },
  { tipo: "Agriturismo", bassa: 1.5, media: 2.0, alta: 2.5, peak: 3.0 },
  { tipo: "Ostelli", bassa: 1.0, media: 1.5, alta: 2.0, peak: 2.5 }
];

// ==============================
// COMPONENT
// ==============================

export default function ImpostaPage() {
  const [year, setYear] = useState(2026);
  const [auto, setAuto] = useState(true);
  const [tariffs, setTariffs] = useState<Tariff[]>(TARIFFS_INIT);

  const updateTariff = (i: number, key: keyof Omit<Tariff, "tipo">, v: string) => {
    setTariffs((prev) =>
      prev.map((t, idx) => (idx === i ? { ...t, [key]: parseFloat(v) || 0 } : t))
    );
  };

  // max sum for chart scaling
  const maxTotal = Math.max(...MONTHLY.map((m) => m.hotel + m.bb + m.air)) || 1;

  return (
    <>
      <header className="pa-topbar">
        <div className="pa-title">
          <div className="pa-crumb">Comune di Firenze · Governance</div>
          <h1 className="pa-h1">Imposta di soggiorno</h1>
        </div>
        <div className="pa-topbar-actions">
          <select className="pa-select" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} style={{ width: 100 }}>
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
          </select>
          <div className="pa-toggle" style={{ padding: "6px 10px" }}>
            <div className="pa-toggle-label">
              <div className="t">Riscossione auto</div>
              <div className="s">TravelPass · tempo reale</div>
            </div>
            <button className={`pa-switch${auto ? "" : " off"}`} aria-pressed={auto} onClick={() => setAuto((v) => !v)} type="button">
              <span className="sr-only">Toggle</span>
            </button>
          </div>
          <button className="pa-btn pa-btn-primary" type="button">⇩ Esporta</button>
          <div className="pa-avatar" aria-label="Utente">MV</div>
        </div>
      </header>

      <main className="pa-content">
        {/* Hero */}
        <section>
          <div className="pa-card">
            <div className="pa-tax-hero" style={{ margin: 0 }}>
              <div className="lbl">Riscosso YTD {year}</div>
              <div className="val">€1.284.420<small>·+6% YoY</small></div>
              <div className="ch">Previsione fine anno €3.8M · riscossione automatica attiva · 92% coverage</div>
            </div>
          </div>
        </section>

        {/* Split tiles */}
        <section>
          <div className="pa-kpi-grid">
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top">
                <span>Hotel</span>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: "#2F4858" }} />
              </div>
              <div className="pa-kpi-value">54<small>%</small></div>
              <div className="pa-kpi-unit">€693K · 412 strutture</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ €42K</span><span>vs Q1 2025</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top">
                <span>B&B / affittacamere</span>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: "#C6704A" }} />
              </div>
              <div className="pa-kpi-value">21<small>%</small></div>
              <div className="pa-kpi-unit">€269K · 482 strutture</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ €18K</span><span>vs Q1 2025</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top">
                <span>Short-let / AirBnB</span>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: "#6F9A87" }} />
              </div>
              <div className="pa-kpi-value">22<small>%</small></div>
              <div className="pa-kpi-unit">€282K · 890 strutture</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ €28K</span><span>compliance +12%</span></div>
            </div>
            <div className="pa-card pa-kpi">
              <div className="pa-kpi-top"><span>Media per pernottamento</span></div>
              <div className="pa-kpi-value">€3,40<small>/notte</small></div>
              <div className="pa-kpi-unit">media pesata attraverso tipologie</div>
              <div className="pa-kpi-foot"><span className="pa-trend up">▲ €0,12</span><span>stagionalità</span></div>
            </div>
          </div>
        </section>

        {/* Monthly chart */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>Riscossione mensile · {year}</h3>
                <div className="sub">Stacked bar · Hotel / B&B / Short-let (valori in €K)</div>
              </div>
              <div className="pa-legend" style={{ margin: 0 }}>
                <span><span className="pa-legend-swatch" style={{ background: "#2F4858" }} />Hotel</span>
                <span><span className="pa-legend-swatch" style={{ background: "#C6704A" }} />B&B</span>
                <span><span className="pa-legend-swatch" style={{ background: "#6F9A87" }} />Short-let</span>
              </div>
            </div>
            <div className="pa-monthly">
              {MONTHLY.map((m, i) => {
                const total = m.hotel + m.bb + m.air;
                const h = (m.hotel / maxTotal) * 100;
                const b = (m.bb / maxTotal) * 100;
                const a = (m.air / maxTotal) * 100;
                return (
                  <div key={i} className="pa-monthly-col" title={`${MONTHS[i]} · €${total}K`}>
                    <span className="s" style={{ height: `${h}%`, background: "#2F4858" }} />
                    <span className="s s2" style={{ height: `${b}%` }} />
                    <span className="s s3" style={{ height: `${a}%` }} />
                  </div>
                );
              })}
            </div>
            <div className="pa-monthly-labels">
              {MONTHS.map((m, i) => (
                <span key={m} style={{ color: i <= 3 ? "var(--pa-ink-2)" : "var(--pa-muted)", fontWeight: i <= 3 ? 700 : 500 }}>
                  {m}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--pa-muted)" }}>
              Fonte: TravelPass · Dichiarazioni SUAP · integrazione PortalePA (agg. 22 apr 2026).
            </div>
          </div>
        </section>

        {/* Top contributors table */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>Top contributori · 50 strutture principali</h3>
                <div className="sub">Dichiarati vs riscosso · verifiche individuali</div>
              </div>
              <span className="pa-tag warn">3 con ritardo</span>
            </div>
            <table className="pa-table">
              <thead>
                <tr>
                  <th>Struttura</th>
                  <th>Tipo</th>
                  <th className="num">Dichiarati (€)</th>
                  <th className="num">Riscosso (€)</th>
                  <th className="num">Differenza</th>
                  <th>Stato</th>
                  <th>Azione</th>
                </tr>
              </thead>
              <tbody>
                {CONTRIBUTORS.map((c) => (
                  <tr key={c.name}>
                    <td>
                      <div className="name">{c.name}</div>
                    </td>
                    <td>{c.tipo}</td>
                    <td className="num">{c.dichiarati.toLocaleString("it-IT")}</td>
                    <td className="num">{c.riscosso.toLocaleString("it-IT")}</td>
                    <td className="num" style={{ color: c.diff < 0 ? "var(--pa-danger)" : "var(--pa-muted)", fontWeight: c.diff < 0 ? 700 : 500 }}>
                      {c.diff === 0 ? "—" : `€${c.diff.toLocaleString("it-IT")}`}
                    </td>
                    <td>
                      {c.stato === "ok" ? <span className="pa-badge ok">Saldato</span> : c.stato === "pending" ? <span className="pa-badge warn">In arrivo</span> : <span className="pa-badge danger">In ritardo</span>}
                    </td>
                    <td>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">Verifica</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Alerts */}
        <section>
          <div className="pa-card">
            <div className="pa-card-title">
              <div>
                <h3>Alert pagamenti</h3>
                <div className="sub">Strutture in ritardo · solleciti automatici attivi</div>
              </div>
              <span className="pa-tag danger">24 in ritardo</span>
            </div>
            <div className="pa-alerts">
              <div className="pa-alert warn">
                <div className="pa-alert-ico">!</div>
                <div className="pa-alert-body">
                  <div className="t">18 strutture con sollecito automatico inviato — scadenza 30 giorni</div>
                  <div className="s">PEC inviata · totale outstanding €38.420 · modulo F24 pre-compilato</div>
                </div>
                <div className="pa-alert-time">ieri</div>
              </div>
              <div className="pa-alert danger">
                <div className="pa-alert-ico">⚠</div>
                <div className="pa-alert-body">
                  <div className="t">6 strutture · sanzione amministrativa in corso</div>
                  <div className="s">Mancato versamento &gt; 60 giorni · articolo 10 reg. comunale · €18.200 outstanding</div>
                </div>
                <div className="pa-alert-time">3g fa</div>
              </div>
              <div className="pa-alert info">
                <div className="pa-alert-ico">ℹ</div>
                <div className="pa-alert-body">
                  <div className="t">12 solleciti chiusi positivamente · pagamenti ricevuti</div>
                  <div className="s">€24.820 incassati nell'ultima settimana</div>
                </div>
                <div className="pa-alert-time">5g fa</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tariff editor */}
        <section>
          <div className="pa-grid-2">
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Tariffe imposta di soggiorno</h3>
                  <div className="sub">Editor tariffario · €/persona/notte · per tipologia × periodo</div>
                </div>
                <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">Aggiorna tariffe</button>
              </div>
              <div className="pa-tariff">
                <div className="pa-tariff-head">
                  <div>Tipologia</div>
                  <div>Bassa</div>
                  <div>Media</div>
                  <div>Alta</div>
                  <div>Peak</div>
                </div>
                {tariffs.map((t, i) => (
                  <div key={t.tipo} className="pa-tariff-row">
                    <div style={{ fontWeight: 700, color: "var(--pa-ink)" }}>{t.tipo}</div>
                    <div>
                      <input type="number" step="0.1" value={t.bassa} onChange={(e) => updateTariff(i, "bassa", e.target.value)} />
                    </div>
                    <div>
                      <input type="number" step="0.1" value={t.media} onChange={(e) => updateTariff(i, "media", e.target.value)} />
                    </div>
                    <div>
                      <input type="number" step="0.1" value={t.alta} onChange={(e) => updateTariff(i, "alta", e.target.value)} />
                    </div>
                    <div>
                      <input type="number" step="0.1" value={t.peak} onChange={(e) => updateTariff(i, "peak", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: 10, background: "var(--pa-warn-soft)", borderRadius: 8, fontSize: 11, color: "#5f4417", fontWeight: 600 }}>
                Le modifiche generano automaticamente bozza di delibera comunale · approvazione richiesta Consiglio Comunale.
              </div>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Quadro normativo</h3>
                  <div className="sub">Riferimenti regolamentari vigenti</div>
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ padding: 12, border: "1px solid var(--pa-line-2)", borderRadius: 10, background: "var(--pa-surface-2)" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 800, color: "var(--pa-muted)" }}>Regolamento comunale</div>
                  <div style={{ fontWeight: 700, color: "var(--pa-ink)", marginTop: 4 }}>Imposta di soggiorno Comune di Firenze</div>
                  <div style={{ fontSize: 11, color: "var(--pa-muted)", marginTop: 2 }}>Delibera del Consiglio Comunale n. 24/2025 · in vigore dal 12/02/2025</div>
                  <div style={{ marginTop: 8 }}>
                    <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">⇩ Scarica PDF</button>
                  </div>
                </div>
                <div style={{ padding: 12, border: "1px solid var(--pa-line-2)", borderRadius: 10, background: "var(--pa-surface-2)" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 800, color: "var(--pa-muted)" }}>Riferimenti nazionali</div>
                  <ul style={{ margin: "4px 0 0", paddingLeft: 18, fontSize: 12, color: "var(--pa-ink-2)", lineHeight: 1.6 }}>
                    <li>D.Lgs. 14 marzo 2011, n. 23, art. 4</li>
                    <li>D.L. 50/2017, art. 4</li>
                    <li>Circolare MEF 07/2022</li>
                    <li>Legge regionale Toscana 86/2016</li>
                  </ul>
                </div>
                <div style={{ padding: 12, border: "1px solid var(--pa-sage-soft)", background: "var(--pa-sage-soft)", borderRadius: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#3f7764" }}>Utilizzo fondi 2025</div>
                  <div style={{ fontSize: 11.5, color: "#2f5748", marginTop: 4, lineHeight: 1.5 }}>
                    €3.2M destinati a: manutenzione centro storico (42%), pulizia urbana (28%), promozione turistica (18%), mobilità sostenibile (12%).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="pa-footer">
          <div>© 2026 TheGuide Srl · Imposta di soggiorno · Regolamento Comune di Firenze 24/2025</div>
          <div className="links">
            <a href="#">Versamento F24</a>
            <a href="#">Sanzioni</a>
            <a href="#">Utilizzo fondi</a>
          </div>
        </footer>
      </main>
    </>
  );
}

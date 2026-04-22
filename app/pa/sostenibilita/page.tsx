"use client";

// ==============================
// DATA
// ==============================

const SUB_INDEX = [
  { name: "Emissioni CO₂", val: 68, color: "#C6704A" },
  { name: "Mobilità", val: 72, color: "#2F4858" },
  { name: "Rifiuti", val: 79, color: "#6F9A87" },
  { name: "Acqua", val: 81, color: "#3f7764" },
  { name: "Biodiversità", val: 65, color: "#D69751" },
  { name: "Sociale", val: 78, color: "#8B6F5E" }
];

// CO2 breakdown per sector (%)
const CO2 = [
  { sec: "Trasporti", v: 38 },
  { sec: "Alloggi & strutture", v: 27 },
  { sec: "Ristorazione", v: 18 },
  { sec: "Attività turistiche", v: 11 },
  { sec: "Altro", v: 6 }
];

type IniStatus = "corso" | "done" | "plan";

const INITIATIVES: { date: string; name: string; desc: string; status: IniStatus; budget: string; impact: number }[] = [
  { date: "Q1 2026", name: "ZTL espansione centro storico", desc: "Estensione ZTL a San Frediano e Santo Spirito", status: "corso", budget: "€480K", impact: 8 },
  { date: "Q2 2026", name: "Incentivi hotel green", desc: "Contributo 15% per hotel con certificazione EMAS", status: "corso", budget: "€1.2M", impact: 9 },
  { date: "Q1 2026", name: "Car-sharing turistico dedicato", desc: "200 veicoli elettrici in zone strategiche", status: "done", budget: "€680K", impact: 7 },
  { date: "Q3 2026", name: "Recupero acque grigie musei", desc: "Impianto pilota Uffizi · riuso irrigazione Boboli", status: "plan", budget: "€320K", impact: 6 },
  { date: "Q2 2026", name: "Compostaggio ristoranti centro", desc: "Rete 420 esercizi · compost condiviso", status: "corso", budget: "€180K", impact: 7 },
  { date: "Q1 2026", name: "Bici pubbliche ampliamento", desc: "+1.200 bici · 38 nuove stazioni periferiche", status: "done", budget: "€2.1M", impact: 8 },
  { date: "Q4 2026", name: "Pannelli solari musei pubblici", desc: "Tetti Bargello, Palazzo Vecchio, Novecento", status: "plan", budget: "€950K", impact: 8 },
  { date: "Q2-Q3 2026", name: "Campagna awareness turisti", desc: "App TheGuide · badge sostenibile · push contestuali", status: "corso", budget: "€120K", impact: 5 }
];

const PARTNERS = [
  { name: "Hotel Lungarno", score: 92 },
  { name: "Agriturismo Il Chianti", score: 91 },
  { name: "Villa La Vedetta", score: 89 },
  { name: "Osteria dei Pazzi", score: 88 },
  { name: "Hotel Brunelleschi", score: 85 },
  { name: "B&B Santo Spirito", score: 84 },
  { name: "Ristorante La Pentola", score: 82 },
  { name: "Vineria Belvedere", score: 81 },
  { name: "Bottega Artigiana Grazia", score: 80 },
  { name: "Hotel Savoy", score: 79 }
];

// SDG: 17 goals, 8 highlighted
const SDG_17 = Array.from({ length: 17 }, (_, i) => i + 1);
const SDG_ON = new Set([3, 6, 8, 11, 12, 13, 15, 17]);
// SDG colors (official)
const SDG_COLORS: Record<number, string> = {
  1: "#E5243B", 2: "#DDA63A", 3: "#4C9F38", 4: "#C5192D", 5: "#FF3A21", 6: "#26BDE2",
  7: "#FCC30B", 8: "#A21942", 9: "#FD6925", 10: "#DD1367", 11: "#FD9D24", 12: "#BF8B2E",
  13: "#3F7E44", 14: "#0A97D9", 15: "#56C02B", 16: "#00689D", 17: "#19486A"
};

// ==============================
// COMPONENT
// ==============================

export default function SostenibilitaPage() {
  return (
    <>
      <header className="pa-topbar">
        <div className="pa-title">
          <div className="pa-crumb">Comune di Firenze · Governance</div>
          <h1 className="pa-h1">TheGuide Green Index · Firenze</h1>
        </div>
        <div className="pa-topbar-actions">
          <div className="pa-range">
            <span className="cal" aria-hidden>▦</span>
            <span>Aprile 2026</span>
            <span className="caret" aria-hidden>▼</span>
          </div>
          <button className="pa-btn pa-btn-primary" type="button">⇩ Genera report ESG</button>
          <div className="pa-avatar" aria-label="Utente">MV</div>
        </div>
      </header>

      <main className="pa-content">
        {/* Hero */}
        <section>
          <div className="pa-green-hero">
            <div className="pa-green-circle">
              <div>
                <div className="score">74<small>/100</small></div>
              </div>
            </div>
            <div className="pa-green-info">
              <div className="k">TheGuide Green Index</div>
              <h2>Classe B · +3 pt vs mese scorso</h2>
              <div className="sub">Firenze è tra le città d'arte italiane più sostenibili · benchmark top 15% UE.</div>
              <div style={{ fontSize: 11, opacity: .85, fontWeight: 700, marginTop: 6 }}>Target 2026 · 82/100</div>
              <div className="pa-green-progress">
                <div className="fill" style={{ width: `${(74 / 82) * 100}%` }} />
              </div>
              <div className="pa-green-target">74 attuale ↗ 82 target · 8 punti mancanti · roadmap 12 iniziative</div>
            </div>
          </div>
        </section>

        {/* 6 sub-index */}
        <section>
          <div className="pa-section-label">
            Sottoindici
            <span className="sub">Scala 0-100 · media mobile 30 giorni</span>
          </div>
          <div className="pa-sub-index">
            {SUB_INDEX.map((s) => (
              <div key={s.name} className="card">
                <div className="n">{s.name}</div>
                <div className="v">{s.val}</div>
                <div className="bar">
                  <i style={{ width: `${s.val}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CO2 + Initiative timeline */}
        <section>
          <div className="pa-grid-2">
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Emissioni CO₂ per settore</h3>
                  <div className="sub">Breakdown % · scope 1+2 aggregate stimate</div>
                </div>
                <span className="pa-tag sage">-12% YoY</span>
              </div>
              <svg viewBox="0 0 340 180" style={{ width: "100%", height: 200, display: "block" }} role="img">
                {CO2.map((c, i) => {
                  const barW = (c.v / 40) * 240;
                  const y = 10 + i * 32;
                  return (
                    <g key={c.sec}>
                      <text x="8" y={y + 14} fontSize="11" fontWeight="700" fill="#1F1B16">{c.sec}</text>
                      <rect x="90" y={y} width={barW} height={20} rx="4" fill="#C6704A" opacity={0.88 - i * 0.07} />
                      <text x={90 + barW + 6} y={y + 14} fontSize="11" fontWeight="700" fill="#2F4858">{c.v}%</text>
                    </g>
                  );
                })}
              </svg>
              <div style={{ marginTop: 8, padding: 10, background: "var(--pa-sage-soft)", borderRadius: 8, fontSize: 11.5, color: "#2f5748", fontWeight: 600 }}>
                Riduzione cumulativa 248 tonnellate CO₂ equivalenti dal 1 gennaio 2026 · pari a 1.400 voli Firenze-Londra.
              </div>
            </div>

            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Roadmap iniziative · 2026</h3>
                  <div className="sub">8 iniziative attive · budget totale €6.0M</div>
                </div>
                <span className="pa-tag neutral">Q1 → Q4</span>
              </div>
              <div className="pa-timeline-list">
                {INITIATIVES.map((i, idx) => (
                  <div key={idx} className="pa-ti">
                    <div className="date">{i.date}</div>
                    <div>
                      <div className="name">{i.name}</div>
                      <div className="desc">{i.desc}</div>
                    </div>
                    <div className="budget">{i.budget}</div>
                    <div>
                      {i.status === "corso" ? <span className="pa-badge warn">In corso</span> : i.status === "done" ? <span className="pa-badge ok">Completato</span> : <span className="pa-badge">Pianificato</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partner leaderboard */}
        <section>
          <div className="pa-grid-2">
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Leaderboard partner sostenibilità</h3>
                  <div className="sub">Top 10 attività turistiche · Green Partner Score</div>
                </div>
                <span className="pa-tag sage">Certificazione EMAS</span>
              </div>
              <div style={{ display: "grid", gap: 4 }}>
                {PARTNERS.map((p, i) => (
                  <div key={p.name} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto auto", gap: 10, alignItems: "center", padding: "8px 10px", borderBottom: "1px solid var(--pa-line-2)", fontSize: 12 }}>
                    <div style={{ fontWeight: 800, color: "var(--pa-muted)" }}>{String(i + 1).padStart(2, "0")}</div>
                    <div style={{ fontWeight: 700, color: "var(--pa-ink)" }}>{p.name}</div>
                    <div style={{ width: 120 }}>
                      <div className="pa-sat-bar">
                        <div className="pa-sat-fill" style={{ width: `${p.score}%` }} />
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, color: "var(--pa-sage)", fontVariantNumeric: "tabular-nums", minWidth: 34, textAlign: "right" }}>{p.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SDG grid + impact story */}
            <div style={{ display: "grid", gap: 14 }}>
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Allineamento UN SDG</h3>
                    <div className="sub">Obiettivi 2030 · 8 di 17 primari</div>
                  </div>
                  <span className="pa-tag sage">8/17</span>
                </div>
                <div className="pa-sdg">
                  {SDG_17.map((n) => (
                    <div key={n} className={`pa-sdg-cell${SDG_ON.has(n) ? " on" : ""}`} style={{ background: SDG_ON.has(n) ? SDG_COLORS[n] : undefined }}>
                      {n}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: "var(--pa-muted)", lineHeight: 1.5 }}>
                  SDG primari: 3 salute e benessere · 6 acqua · 8 lavoro dignitoso · 11 città sostenibili · 12 consumo responsabile · 13 clima · 15 terra · 17 partnership.
                </div>
              </div>

              <div className="pa-card" style={{ background: "linear-gradient(135deg, #E5EEEA, #F3E3D6)", border: "1px solid var(--pa-sage-soft)" }}>
                <div className="pa-card-title">
                  <div>
                    <h3>Impatto 2026 · storytelling</h3>
                    <div className="sub">Dati condivisibili con cittadinanza</div>
                  </div>
                  <span className="pa-tag accent">Condividi</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#2F4858", lineHeight: 1.45, letterSpacing: "-.01em", padding: "6px 0 10px" }}>
                  Quest'anno abbiamo ridotto <span style={{ color: "#3f7764" }}>248 tonnellate di CO₂</span>, conservato <span style={{ color: "#2F4858" }}>1.2 milioni di litri d'acqua</span> e aumentato del 14% l'utilizzo dei trasporti pubblici dai turisti.
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">↗ Condividi su socials</button>
                  <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">Copia link</button>
                  <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">⇩ Infografica PDF</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="pa-footer">
          <div>© 2026 TheGuide Srl · Green Index v2.4 · Metodologia audited KPMG</div>
          <div className="links">
            <a href="#">Metodologia</a>
            <a href="#">Report ESG 2025</a>
            <a href="#">Adesione Green Partner</a>
          </div>
        </footer>
      </main>
    </>
  );
}

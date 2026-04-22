"use client";

import { useState } from "react";

/* =============================================================================
   TheGuide · B2B · Menu & Offerte
   ============================================================================= */

type Category = "antipasti" | "primi" | "secondi" | "dolci" | "vini";

type MenuItem = {
  id: string;
  category: Category;
  nameIt: string;
  nameEn: string;
  price: string;
  allergens: Array<"glutine" | "latticini" | "vegan" | "veg" | "pesce" | "uova">;
  available: boolean;
  hasGoodPhoto: boolean;
  emoji: string;
  tone: "warm" | "sage" | "ink" | "sand";
};

const items: MenuItem[] = [
  // Antipasti
  { id: "a1", category: "antipasti", nameIt: "Crostini toscani al fegatino", nameEn: "Tuscan liver crostini", price: "€ 9,00", allergens: ["glutine"], available: true, hasGoodPhoto: true, emoji: "◐", tone: "warm" },
  { id: "a2", category: "antipasti", nameIt: "Prosciutto e melone", nameEn: "Prosciutto & melon", price: "€ 14,00", allergens: [], available: true, hasGoodPhoto: false, emoji: "◆", tone: "sand" },
  { id: "a3", category: "antipasti", nameIt: "Panzanella di primavera", nameEn: "Spring panzanella", price: "€ 11,00", allergens: ["glutine", "vegan"], available: true, hasGoodPhoto: true, emoji: "✿", tone: "sage" },
  // Primi
  { id: "p1", category: "primi", nameIt: "Pappardelle al cinghiale", nameEn: "Wild boar pappardelle", price: "€ 16,00", allergens: ["glutine", "uova"], available: true, hasGoodPhoto: true, emoji: "≋", tone: "warm" },
  { id: "p2", category: "primi", nameIt: "Ribollita", nameEn: "Ribollita soup", price: "€ 12,00", allergens: ["vegan"], available: true, hasGoodPhoto: true, emoji: "○", tone: "sage" },
  { id: "p3", category: "primi", nameIt: "Tagliatelle al tartufo", nameEn: "Truffle tagliatelle", price: "€ 22,00", allergens: ["glutine", "uova", "latticini"], available: false, hasGoodPhoto: false, emoji: "◈", tone: "ink" },
  // Secondi
  { id: "s1", category: "secondi", nameIt: "Bistecca alla fiorentina · 1kg", nameEn: "Fiorentina steak · 1kg", price: "€ 62,00", allergens: [], available: true, hasGoodPhoto: true, emoji: "▮", tone: "warm" },
  { id: "s2", category: "secondi", nameIt: "Peposo alla fornacina", nameEn: "Slow-braised peposo", price: "€ 22,00", allergens: [], available: true, hasGoodPhoto: true, emoji: "●", tone: "ink" },
  { id: "s3", category: "secondi", nameIt: "Branzino in crosta di sale", nameEn: "Sea bass in salt crust", price: "€ 28,00", allergens: ["pesce"], available: true, hasGoodPhoto: false, emoji: "◇", tone: "sage" },
  // Dolci
  { id: "d1", category: "dolci", nameIt: "Cantucci e vin santo", nameEn: "Cantucci & vin santo", price: "€ 8,00", allergens: ["glutine", "uova"], available: true, hasGoodPhoto: true, emoji: "◎", tone: "warm" },
  { id: "d2", category: "dolci", nameIt: "Panna cotta ai frutti di bosco", nameEn: "Panna cotta with berries", price: "€ 7,00", allergens: ["latticini"], available: true, hasGoodPhoto: true, emoji: "◐", tone: "sand" },
  { id: "d3", category: "dolci", nameIt: "Tiramisù della casa", nameEn: "House tiramisù", price: "€ 8,50", allergens: ["glutine", "latticini", "uova"], available: true, hasGoodPhoto: false, emoji: "▣", tone: "ink" },
  // Vini
  { id: "v1", category: "vini", nameIt: "Chianti Classico DOCG · calice", nameEn: "Chianti Classico · glass", price: "€ 7,00", allergens: [], available: true, hasGoodPhoto: true, emoji: "♦", tone: "warm" },
  { id: "v2", category: "vini", nameIt: "Brunello di Montalcino · bott.", nameEn: "Brunello di Montalcino · btl", price: "€ 58,00", allergens: [], available: true, hasGoodPhoto: true, emoji: "▲", tone: "ink" },
  { id: "v3", category: "vini", nameIt: "Vernaccia di San Gimignano · cal.", nameEn: "Vernaccia · glass", price: "€ 6,00", allergens: [], available: true, hasGoodPhoto: false, emoji: "◊", tone: "sage" },
];

const catLabels: Record<Category, string> = {
  antipasti: "Antipasti",
  primi: "Primi",
  secondi: "Secondi",
  dolci: "Dolci",
  vini: "Vini",
};

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
const IcoUpload = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const IcoSpark = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2 13.5 8.5 20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
  </svg>
);
const IcoPlus = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

function AllergenChip({ kind }: { kind: MenuItem["allergens"][number] }) {
  const map: Record<string, { label: string; cls: string }> = {
    glutine: { label: "Glutine", cls: "chip-warn" },
    latticini: { label: "Latticini", cls: "chip-warn" },
    vegan: { label: "Vegan", cls: "chip-sage" },
    veg: { label: "Veg", cls: "chip-sage" },
    pesce: { label: "Pesce", cls: "chip-sand" },
    uova: { label: "Uova", cls: "chip-warn" },
  };
  const c = map[kind];
  return <span className={`b2b-chip ${c.cls}`}>{c.label}</span>;
}

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<Category>("antipasti");
  const [itemsState, setItemsState] = useState(items);
  const filtered = itemsState.filter((i) => i.category === activeCat);

  const toggleAvail = (id: string) => {
    setItemsState((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i))
    );
  };

  return (
    <>
      <header className="b2b-header">
        <div className="b2b-header-title">
          <span className="b2b-h-eyebrow">Partner</span>
          <span className="b2b-h-name">Trattoria Mario · Firenze</span>
        </div>
        <span className="b2b-pill">
          <span className="b2b-dot" />
          Menu pubblicato
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
            <h1>Menu & Offerte</h1>
            <div className="b2b-sub">
              42 piatti in catalogo · ultima pubblicazione oggi 09:14 · versione 2026-04-23a
            </div>
          </div>
          <div className="b2b-page-actions">
            <button className="b2b-btn" type="button">
              Anteprima Smart Lens
            </button>
            <button className="b2b-btn b2b-btn-primary" type="button">
              {IcoPlus} Pubblica modifiche
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="b2b-category-tabs">
          {(Object.keys(catLabels) as Category[]).map((c) => {
            const count = itemsState.filter((i) => i.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`b2b-cat-tab ${activeCat === c ? "active" : ""}`}
                type="button"
              >
                <span>{catLabels[c]}</span>
                <span className="b2b-cat-count">{count}</span>
              </button>
            );
          })}
        </div>

        <section className="b2b-row-menu">
          {/* Menu grid */}
          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>{catLabels[activeCat]}</h3>
                <div className="b2b-sub">
                  {filtered.length} piatti · {filtered.filter((i) => i.available).length} disponibili oggi
                </div>
              </div>
              <div className="b2b-card-head-actions">
                <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                  Riordina
                </button>
                <button className="b2b-btn b2b-btn-sm" type="button">
                  {IcoPlus} Piatto
                </button>
              </div>
            </div>
            <div className="b2b-menu-grid">
              {filtered.map((i) => (
                <div key={i.id} className={`b2b-menu-card ${!i.available ? "off" : ""}`}>
                  <div className={`b2b-menu-img tone-${i.tone}`}>
                    <span className="b2b-menu-glyph" aria-hidden>
                      {i.emoji}
                    </span>
                    {!i.hasGoodPhoto && <span className="b2b-menu-ph-flag">Foto da aggiornare</span>}
                  </div>
                  <div className="b2b-menu-body">
                    <div className="b2b-menu-names">
                      <b>{i.nameIt}</b>
                      <span>{i.nameEn}</span>
                    </div>
                    <div className="b2b-menu-meta">
                      <span className="b2b-menu-price">{i.price}</span>
                      <div className="b2b-menu-chips">
                        {i.allergens.map((a) => (
                          <AllergenChip key={a} kind={a} />
                        ))}
                      </div>
                    </div>
                    <div className="b2b-menu-foot">
                      <button
                        className={`b2b-toggle ${i.available ? "on" : ""}`}
                        onClick={() => toggleAvail(i.id)}
                        type="button"
                        aria-label={`Disponibilità ${i.nameIt}`}
                      />
                      <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                        Modifica
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="b2b-card">
              <div className="b2b-card-head">
                <div>
                  <h3>
                    <span className="b2b-spark-inline" style={{ color: "var(--b2b-accent)" }}>
                      {IcoSpark}
                    </span>{" "}
                    Traduzione Iris
                  </h3>
                  <div className="b2b-sub">Traduzioni automatiche · 4 lingue</div>
                </div>
              </div>
              <div className="b2b-lang-row">
                <span className="b2b-lang-code">IT → EN</span>
                <div className="b2b-lang-bar">
                  <span style={{ width: "100%", background: "var(--b2b-ok)" }} />
                </div>
                <span className="b2b-lang-pct">100%</span>
              </div>
              <div className="b2b-lang-row">
                <span className="b2b-lang-code">IT → DE</span>
                <div className="b2b-lang-bar">
                  <span style={{ width: "87%", background: "var(--b2b-warn)" }} />
                </div>
                <span className="b2b-lang-pct">87%</span>
              </div>
              <div className="b2b-lang-note">
                6 voci in review manuale — termini regionali toscani
              </div>
              <div className="b2b-lang-row">
                <span className="b2b-lang-code">IT → FR</span>
                <div className="b2b-lang-bar">
                  <span style={{ width: "94%", background: "var(--b2b-ok)" }} />
                </div>
                <span className="b2b-lang-pct">94%</span>
              </div>
              <div className="b2b-lang-row">
                <span className="b2b-lang-code">IT → JP</span>
                <div className="b2b-lang-bar">
                  <span style={{ width: "62%", background: "var(--b2b-accent)" }} />
                </div>
                <span className="b2b-lang-pct">62%</span>
              </div>
              <div className="b2b-lang-note">
                Traduzione parziale — 18 voci in coda
              </div>
              <button className="b2b-btn b2b-btn-sm" type="button" style={{ marginTop: 10, width: "100%" }}>
                Rivedi traduzioni pending
              </button>
            </div>

            <div className="b2b-card b2b-photo-prompt">
              <div className="b2b-photo-head">
                <div className="b2b-insight-ico" aria-hidden>
                  {IcoUpload}
                </div>
                <div>
                  <b>Foto piatti da aggiornare</b>
                  <div className="b2b-sub">
                    3 piatti senza foto di qualità. I piatti con foto convertono +38%.
                  </div>
                </div>
              </div>
              <div className="b2b-photo-list">
                <div className="b2b-photo-item">
                  <span className="b2b-menu-glyph tone-sand" aria-hidden>
                    ◆
                  </span>
                  <span>Prosciutto e melone</span>
                  <button className="b2b-btn b2b-btn-sm" type="button">
                    Carica
                  </button>
                </div>
                <div className="b2b-photo-item">
                  <span className="b2b-menu-glyph tone-sage" aria-hidden>
                    ◇
                  </span>
                  <span>Branzino in crosta</span>
                  <button className="b2b-btn b2b-btn-sm" type="button">
                    Carica
                  </button>
                </div>
                <div className="b2b-photo-item">
                  <span className="b2b-menu-glyph tone-ink" aria-hidden>
                    ▣
                  </span>
                  <span>Tiramisù della casa</span>
                  <button className="b2b-btn b2b-btn-sm" type="button">
                    Carica
                  </button>
                </div>
              </div>
            </div>

            <div className="b2b-card">
              <div className="b2b-card-head">
                <div>
                  <h3>Menu analytics</h3>
                  <div className="b2b-sub">Ultimi 30 giorni</div>
                </div>
              </div>
              <div className="b2b-ma-row">
                <span className="b2b-ma-tag ok">Top</span>
                <div style={{ flex: 1 }}>
                  <b>Bistecca alla fiorentina</b>
                  <div className="b2b-sub2">184 ordini · € 11.408 ricavi</div>
                </div>
                <span className="b2b-delta up" style={{ whiteSpace: "nowrap" }}>▲ +28%</span>
              </div>
              <div className="b2b-ma-row">
                <span className="b2b-ma-tag trend">Trend</span>
                <div style={{ flex: 1 }}>
                  <b>Panzanella di primavera</b>
                  <div className="b2b-sub2">Aggiunta 2 settimane fa · crescita rapida</div>
                </div>
                <span className="b2b-delta up">▲ +64%</span>
              </div>
              <div className="b2b-ma-row">
                <span className="b2b-ma-tag bad">Poor</span>
                <div style={{ flex: 1 }}>
                  <b>Tagliatelle al tartufo</b>
                  <div className="b2b-sub2">7 ordini · margine basso</div>
                </div>
                <span className="b2b-delta down">▼ −42%</span>
              </div>
              <div className="b2b-insight" style={{ marginTop: 12 }}>
                <div className="b2b-insight-ico" aria-hidden>
                  {IcoSpark}
                </div>
                <div className="b2b-insight-main">
                  <div className="b2b-insight-tag">Iris · Suggerimento</div>
                  <div className="b2b-insight-title" style={{ fontSize: 13 }}>
                    Sostituisci Tagliatelle al tartufo con un secondo toscano
                  </div>
                  <div className="b2b-insight-body" style={{ fontSize: 12 }}>
                    Il tartufo primaverile ha poca richiesta. Il peposo ha un margine del 62% vs 31%.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

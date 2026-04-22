"use client";

import { useState } from "react";

/* =============================================================================
   TheGuide · B2B · Recensioni
   ============================================================================= */

type Platform = "Google" | "TheGuide" | "TripAdvisor";
type Sentiment = "positivo" | "misto" | "negativo";
type FilterKey = "tutte" | "non_risposte" | "5" | "lt4" | "foto";

type Review = {
  id: string;
  name: string;
  initials: string;
  country: string;
  flag: string;
  date: string;
  rating: number;
  body: string;
  lang: string;
  platform: Platform;
  answered: boolean;
  photos: number;
  sentiment: Sentiment;
  aiReply?: string;
  av: "r1" | "r2" | "r3";
};

const reviews: Review[] = [
  {
    id: "rv1",
    name: "Marie Laurent",
    initials: "ML",
    country: "Francia",
    flag: "🇫🇷",
    date: "Oggi · 14:02",
    rating: 5,
    body:
      "Expérience exceptionnelle ! La ribollita était divine et le personnel très attentif. Le pairing de vin suggéré par Iris était parfait, nous avons adoré.",
    lang: "FR",
    platform: "TheGuide",
    answered: false,
    photos: 2,
    sentiment: "positivo",
    av: "r1",
    aiReply:
      "Grazie Marie! Ci fa molto piacere che il pairing con il Chianti Riserva ti sia piaciuto — ti aspettiamo presto per la nostra nuova degustazione di primavera. Salutoni da Mario e tutto il team.",
  },
  {
    id: "rv2",
    name: "Hiroshi Tanaka",
    initials: "HT",
    country: "Giappone",
    flag: "🇯🇵",
    date: "Ieri · 21:14",
    rating: 5,
    body:
      "Best Florentine steak we had in Italy. Staff spoke great English, and the Smart Lens menu translation made ordering easy for our whole family. Definitely coming back.",
    lang: "EN",
    platform: "Google",
    answered: true,
    photos: 4,
    sentiment: "positivo",
    av: "r2",
  },
  {
    id: "rv3",
    name: "Stefan Weber",
    initials: "SW",
    country: "Germania",
    flag: "🇩🇪",
    date: "2 giorni fa",
    rating: 4,
    body:
      "Sehr gute Küche und ehrliche Preise. Nur die Wartezeit am Samstagabend war lang — vielleicht eine zweite Reservierungsrunde? Das Fleisch war trotzdem top.",
    lang: "DE",
    platform: "TheGuide",
    answered: false,
    photos: 0,
    sentiment: "misto",
    av: "r3",
    aiReply:
      "Grazie Stefan per la recensione onesta. Hai ragione sulla attesa del sabato sera: stiamo sperimentando una seconda sessione alle 21:30 da maggio. Ti scriviamo appena attiva così puoi prenotarla! Un saluto, Mario",
  },
  {
    id: "rv4",
    name: "Rachel Brown",
    initials: "RB",
    country: "Regno Unito",
    flag: "🇬🇧",
    date: "3 giorni fa",
    rating: 5,
    body:
      "Celebrated our 10th anniversary here. The team prepared a custom dessert with a candle — such a lovely touch. Peposo was unbelievable. Thank you Mario & team!",
    lang: "EN",
    platform: "TripAdvisor",
    answered: true,
    photos: 3,
    sentiment: "positivo",
    av: "r1",
  },
  {
    id: "rv5",
    name: "Carla Silva",
    initials: "CS",
    country: "Brasile",
    flag: "🇧🇷",
    date: "5 giorni fa",
    rating: 3,
    body:
      "Il cibo era buono ma abbiamo aspettato quasi un'ora per il secondo. Abbiamo anche trovato difficoltà con il parcheggio in zona. Consiglio di prenotare con anticipo.",
    lang: "IT",
    platform: "Google",
    answered: false,
    photos: 0,
    sentiment: "misto",
    av: "r2",
  },
  {
    id: "rv6",
    name: "Aleksander Kowalski",
    initials: "AK",
    country: "Polonia",
    flag: "🇵🇱",
    date: "1 settimana fa",
    rating: 5,
    body:
      "Świetna atmosfera i obsługa. Stek był idealnie przygotowany. Polecam każdemu, kto odwiedza Florencję. Dziękujemy za wspaniały wieczór!",
    lang: "PL",
    platform: "TheGuide",
    answered: true,
    photos: 2,
    sentiment: "positivo",
    av: "r3",
  },
  {
    id: "rv7",
    name: "Nicolas Martin",
    initials: "NM",
    country: "Francia",
    flag: "🇫🇷",
    date: "1 settimana fa",
    rating: 2,
    body:
      "Service distrait, on a dû attendre 20 minutes avant que quelqu'un prenne notre commande. La nourriture était correcte mais pas exceptionnelle.",
    lang: "FR",
    platform: "Google",
    answered: false,
    photos: 0,
    sentiment: "negativo",
    av: "r1",
    aiReply:
      "Nicolas, ci dispiace molto per l'esperienza. 20 minuti sono inaccettabili e stiamo facendo formazione aggiuntiva al team. Vorremmo rifarci con una cena a nostro carico la prossima volta che sei a Firenze. Scrivici in privato, grazie.",
  },
  {
    id: "rv8",
    name: "Julia Schmidt",
    initials: "JS",
    country: "Germania",
    flag: "🇩🇪",
    date: "2 settimane fa",
    rating: 5,
    body:
      "Authentische toskanische Küche. Die Bistecca war perfekt gegrillt und die Atmosphäre sehr gemütlich. Das Smart Lens Feature hat uns sehr geholfen beim Bestellen.",
    lang: "DE",
    platform: "TheGuide",
    answered: true,
    photos: 5,
    sentiment: "positivo",
    av: "r2",
  },
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
const IcoSpark = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2 13.5 8.5 20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
  </svg>
);

function Stars({ n }: { n: number }) {
  return (
    <span className="b2b-stars" aria-label={`${n} stelle`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= n ? "" : "empty"}>
          ★
        </span>
      ))}
    </span>
  );
}

const dist = [
  { star: 5, count: 198, pct: 63 },
  { star: 4, count: 72, pct: 23 },
  { star: 3, count: 22, pct: 7 },
  { star: 2, count: 12, pct: 4 },
  { star: 1, count: 8, pct: 3 },
];

export default function RecensioniPage() {
  const [filter, setFilter] = useState<FilterKey>("tutte");

  const filtered = reviews.filter((r) => {
    if (filter === "tutte") return true;
    if (filter === "non_risposte") return !r.answered;
    if (filter === "5") return r.rating === 5;
    if (filter === "lt4") return r.rating < 4;
    if (filter === "foto") return r.photos > 0;
    return true;
  });

  return (
    <>
      <header className="b2b-header">
        <div className="b2b-header-title">
          <span className="b2b-h-eyebrow">Partner</span>
          <span className="b2b-h-name">Trattoria Mario · Firenze</span>
        </div>
        <span className="b2b-pill">
          <span className="b2b-dot" />
          Response rate 92%
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
            <h1>Recensioni</h1>
            <div className="b2b-sub">
              Tutte le piattaforme sincronizzate · Google, TheGuide, TripAdvisor
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="b2b-chip-row">
          {[
            { k: "tutte", lbl: "Tutte", count: reviews.length },
            { k: "non_risposte", lbl: "Non risposte", count: reviews.filter((r) => !r.answered).length },
            { k: "5", lbl: "5★", count: reviews.filter((r) => r.rating === 5).length },
            { k: "lt4", lbl: "< 4★", count: reviews.filter((r) => r.rating < 4).length },
            { k: "foto", lbl: "Con foto", count: reviews.filter((r) => r.photos > 0).length },
          ].map((c) => (
            <button
              key={c.k}
              className={`b2b-filter-chip ${filter === c.k ? "active" : ""}`}
              onClick={() => setFilter(c.k as FilterKey)}
              type="button"
            >
              {c.lbl}
              <span className="b2b-filter-count">{c.count}</span>
            </button>
          ))}
        </div>

        {/* Summary row */}
        <section className="b2b-row-2">
          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Riepilogo</h3>
                <div className="b2b-sub">Ultimi 90 giorni</div>
              </div>
            </div>
            <div className="b2b-summary">
              <div className="b2b-summary-big">
                <div className="b2b-summary-rating">4,7</div>
                <Stars n={5} />
                <div className="b2b-sub" style={{ marginTop: 4 }}>
                  312 recensioni totali
                </div>
              </div>
              <div className="b2b-summary-mini">
                <div className="b2b-summary-mini-card">
                  <span className="b2b-summary-mini-label">Nuove · settimana</span>
                  <b>24</b>
                  <span className="b2b-delta up" style={{ marginTop: 4 }}>▲ +18%</span>
                </div>
                <div className="b2b-summary-mini-card">
                  <span className="b2b-summary-mini-label">Response rate</span>
                  <b>92%</b>
                  <span className="b2b-delta up" style={{ marginTop: 4 }}>▲ +6pt</span>
                </div>
                <div className="b2b-summary-mini-card">
                  <span className="b2b-summary-mini-label">Tempo medio risposta</span>
                  <b>3,2h</b>
                  <span className="b2b-delta up" style={{ marginTop: 4 }}>▼ −42%</span>
                </div>
                <div className="b2b-summary-mini-card">
                  <span className="b2b-summary-mini-label">Sentiment positivo</span>
                  <b>86%</b>
                  <span className="b2b-delta up" style={{ marginTop: 4 }}>▲ +4pt</span>
                </div>
              </div>
            </div>
          </div>

          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Distribuzione stelle</h3>
                <div className="b2b-sub">Come ti valutano</div>
              </div>
            </div>
            {dist.map((d) => (
              <div key={d.star} className="b2b-dist-row">
                <span className="b2b-dist-star">
                  {d.star} <span style={{ color: "#D9A636" }}>★</span>
                </span>
                <div className="b2b-dist-bar">
                  <span
                    style={{
                      width: `${d.pct}%`,
                      background: d.star >= 4 ? "var(--b2b-ok)" : d.star === 3 ? "var(--b2b-warn)" : "#B24A28",
                    }}
                  />
                </div>
                <span className="b2b-dist-pct">{d.pct}%</span>
                <span className="b2b-dist-count">{d.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews feed + insights */}
        <section className="b2b-row-2">
          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Feed recensioni</h3>
                <div className="b2b-sub">
                  {filtered.length} in vista · ordinate per data più recente
                </div>
              </div>
              <div className="b2b-card-head-actions">
                <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                  Ordina
                </button>
              </div>
            </div>
            {filtered.map((r) => (
              <div key={r.id} className="b2b-review">
                <div className="b2b-review-head">
                  <div className={`b2b-review-av ${r.av}`}>{r.initials}</div>
                  <div className="b2b-review-who">
                    <b>
                      {r.name} <span style={{ marginLeft: 4 }}>{r.flag}</span>
                    </b>
                    <span>
                      {r.date} · {r.lang} · <span className="b2b-plat">{r.platform}</span>
                    </span>
                  </div>
                  <Stars n={r.rating} />
                </div>
                <div className="b2b-review-body">&ldquo;{r.body}&rdquo;</div>
                {r.photos > 0 && (
                  <div className="b2b-review-photos">
                    {Array.from({ length: r.photos }).map((_, i) => (
                      <div key={i} className={`b2b-photo-thumb t${(i % 4) + 1}`} />
                    ))}
                  </div>
                )}
                <div className="b2b-review-tags">
                  <span className={`b2b-chip sent-${r.sentiment}`}>
                    {r.sentiment === "positivo" ? "Positivo" : r.sentiment === "misto" ? "Misto" : "Negativo"}
                  </span>
                  {r.answered ? (
                    <span className="b2b-chip chip-ok">Risposta inviata</span>
                  ) : (
                    <span className="b2b-chip chip-warn">Da rispondere</span>
                  )}
                </div>
                {r.aiReply && !r.answered ? (
                  <div className="b2b-review-ai">
                    <div className="b2b-review-ai-tag">
                      <span className="b2b-spark">{IcoSpark}</span>
                      Iris · Risposta suggerita
                    </div>
                    <p>{r.aiReply}</p>
                    <div className="b2b-review-ai-actions">
                      <button className="b2b-btn b2b-btn-primary b2b-btn-sm" type="button">
                        Invia risposta
                      </button>
                      <button className="b2b-btn b2b-btn-sm" type="button">
                        Modifica
                      </button>
                      <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                        Rigenera
                      </button>
                    </div>
                  </div>
                ) : !r.answered ? (
                  <div className="b2b-review-ai-actions" style={{ display: "flex", gap: 6, marginTop: 6 }}>
                    <button className="b2b-btn b2b-btn-sm" type="button">
                      Rispondi
                    </button>
                    <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                      Chiedi a Iris
                    </button>
                    <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                      Segnala
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="b2b-card">
              <div className="b2b-card-head">
                <div>
                  <h3>Keyword insight</h3>
                  <div className="b2b-sub">Parole più frequenti · 90 giorni</div>
                </div>
              </div>
              <div className="b2b-kw-block">
                <div className="b2b-kw-title pos">Positive · menzioni</div>
                <div className="b2b-kw-row">
                  <span className="b2b-kw-chip pos">bistecca · 142</span>
                  <span className="b2b-kw-chip pos">servizio · 98</span>
                  <span className="b2b-kw-chip pos">atmosfera · 76</span>
                  <span className="b2b-kw-chip pos">Chianti · 54</span>
                  <span className="b2b-kw-chip pos">autentico · 48</span>
                </div>
              </div>
              <div className="b2b-kw-block">
                <div className="b2b-kw-title neg">Negative · menzioni</div>
                <div className="b2b-kw-row">
                  <span className="b2b-kw-chip neg">attesa · 22</span>
                  <span className="b2b-kw-chip neg">parcheggio · 14</span>
                  <span className="b2b-kw-chip neg">rumore · 8</span>
                  <span className="b2b-kw-chip neg">affollato · 6</span>
                </div>
              </div>
              <div className="b2b-lang-note" style={{ marginTop: 8 }}>
                Analisi semantica di Iris · 312 recensioni processate.
              </div>
            </div>

            <div className="b2b-card">
              <div className="b2b-card-head">
                <div>
                  <h3>Sorgente recensioni</h3>
                  <div className="b2b-sub">Distribuzione per piattaforma</div>
                </div>
              </div>
              <div className="b2b-src-row">
                <span className="b2b-src-name">Google</span>
                <div className="b2b-bar-track">
                  <span style={{ width: "52%", background: "#6F9A87" }} />
                </div>
                <span className="b2b-src-val">162</span>
              </div>
              <div className="b2b-src-row">
                <span className="b2b-src-name">TheGuide</span>
                <div className="b2b-bar-track">
                  <span style={{ width: "34%", background: "#C6704A" }} />
                </div>
                <span className="b2b-src-val">106</span>
              </div>
              <div className="b2b-src-row">
                <span className="b2b-src-name">TripAdvisor</span>
                <div className="b2b-bar-track">
                  <span style={{ width: "14%", background: "#C88A2E" }} />
                </div>
                <span className="b2b-src-val">44</span>
              </div>
            </div>

            <div className="b2b-insight">
              <div className="b2b-insight-ico" aria-hidden>
                {IcoSpark}
              </div>
              <div className="b2b-insight-main">
                <div className="b2b-insight-tag">Iris · Suggerimento</div>
                <div className="b2b-insight-title" style={{ fontSize: 13 }}>
                  Comunica le "2 sessioni" del sabato sera
                </div>
                <div className="b2b-insight-body" style={{ fontSize: 12 }}>
                  Il termine "attesa" appare 22 volte — soprattutto il sabato. Promuovi la seconda
                  sessione 21:30 nel menu TheGuide.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

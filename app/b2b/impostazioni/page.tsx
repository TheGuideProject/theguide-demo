"use client";

import { useState } from "react";

/* =============================================================================
   TheGuide · B2B · Impostazioni
   ============================================================================= */

type Tab = "profilo" | "team" | "integrazioni" | "fatturazione" | "notifiche" | "api";

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

const days: Array<{ k: string; lbl: string; closed?: boolean; from?: string; to?: string }> = [
  { k: "mon", lbl: "Lunedì", from: "12:00", to: "14:30" },
  { k: "tue", lbl: "Martedì", from: "12:00", to: "14:30" },
  { k: "wed", lbl: "Mercoledì", from: "12:00", to: "22:30" },
  { k: "thu", lbl: "Giovedì", from: "12:00", to: "22:30" },
  { k: "fri", lbl: "Venerdì", from: "12:00", to: "23:00" },
  { k: "sat", lbl: "Sabato", from: "12:00", to: "23:30" },
  { k: "sun", lbl: "Domenica", closed: true, from: "", to: "" },
];

const cuisineTags = [
  { lbl: "Toscana", on: true },
  { lbl: "Italian", on: true },
  { lbl: "Steakhouse", on: true },
  { lbl: "Wine bar", on: true },
  { lbl: "Regional", on: false },
  { lbl: "Fine dining", on: false },
  { lbl: "Trattoria", on: true },
  { lbl: "Vegetariano", on: false },
  { lbl: "Gluten-free friendly", on: true },
];

function ProfileTab() {
  const [dayState, setDayState] = useState(days);
  const [tags, setTags] = useState(cuisineTags);

  const toggleDay = (k: string) =>
    setDayState((ds) => ds.map((d) => (d.k === k ? { ...d, closed: !d.closed } : d)));
  const toggleTag = (lbl: string) =>
    setTags((ts) => ts.map((t) => (t.lbl === lbl ? { ...t, on: !t.on } : t)));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="b2b-card">
        <div className="b2b-card-head">
          <div>
            <h3>Informazioni attività</h3>
            <div className="b2b-sub">Visibili nel profilo TheGuide e Google</div>
          </div>
          <div className="b2b-card-head-actions">
            <button className="b2b-btn b2b-btn-primary b2b-btn-sm" type="button">
              Salva
            </button>
          </div>
        </div>
        <div className="b2b-form-grid">
          <div className="b2b-field">
            <label>Ragione sociale</label>
            <input type="text" defaultValue="Trattoria Mario S.R.L." />
          </div>
          <div className="b2b-field">
            <label>Partita IVA</label>
            <input type="text" defaultValue="IT05432891204" readOnly />
            <div className="b2b-field-hint">Verificata via Agenzia delle Entrate</div>
          </div>
          <div className="b2b-field b2b-field-2">
            <label>Indirizzo</label>
            <input type="text" defaultValue="Via Rosina 2r, 50123 Firenze FI, Italia" />
          </div>
          <div className="b2b-field">
            <label>Telefono</label>
            <input type="tel" defaultValue="+39 055 218 550" />
          </div>
          <div className="b2b-field">
            <label>Email prenotazioni</label>
            <input type="email" defaultValue="prenotazioni@trattoriamario.it" />
          </div>
          <div className="b2b-field b2b-field-2">
            <label>Descrizione breve</label>
            <textarea
              rows={3}
              defaultValue="Trattoria storica dal 1953, nel cuore del Mercato Centrale. Specialità bistecca alla fiorentina, ribollita e vini toscani selezionati."
            />
          </div>
        </div>
      </div>

      <div className="b2b-card">
        <div className="b2b-card-head">
          <div>
            <h3>Foto del locale</h3>
            <div className="b2b-sub">Logo + galleria · consigliate 6-10 foto</div>
          </div>
          <div className="b2b-card-head-actions">
            <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
              Riordina
            </button>
          </div>
        </div>
        <div className="b2b-photo-grid">
          <div className="b2b-photo-logo">
            <div className="b2b-logo-big">TM</div>
            <button className="b2b-btn b2b-btn-sm" type="button">
              Cambia logo
            </button>
          </div>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`b2b-photo-slot slot-${i}`}>
              <span className="b2b-photo-tag">Foto {i}</span>
              <button className="b2b-photo-re" type="button" aria-label="Riordina">⋮⋮</button>
            </div>
          ))}
          <button className="b2b-photo-add" type="button">
            + Carica
          </button>
        </div>
      </div>

      <div className="b2b-card">
        <div className="b2b-card-head">
          <div>
            <h3>Orari di apertura</h3>
            <div className="b2b-sub">Visualizzati in app e su Google</div>
          </div>
        </div>
        <div className="b2b-hours-list">
          {dayState.map((d) => (
            <div key={d.k} className={`b2b-hours-row ${d.closed ? "closed" : ""}`}>
              <span className="b2b-hours-day">{d.lbl}</span>
              {d.closed ? (
                <span className="b2b-hours-closed">Chiuso</span>
              ) : (
                <div className="b2b-hours-times">
                  <input type="time" defaultValue={d.from} />
                  <span>–</span>
                  <input type="time" defaultValue={d.to} />
                </div>
              )}
              <button
                className={`b2b-toggle ${!d.closed ? "on" : ""}`}
                onClick={() => toggleDay(d.k)}
                type="button"
                aria-label={`Toggle ${d.lbl}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="b2b-card">
        <div className="b2b-card-head">
          <div>
            <h3>Categoria & cucina</h3>
            <div className="b2b-sub">Aiuta Iris a consigliarti ai clienti giusti</div>
          </div>
        </div>
        <div className="b2b-tag-multi">
          {tags.map((t) => (
            <button
              key={t.lbl}
              className={`b2b-filter-chip ${t.on ? "active" : ""}`}
              onClick={() => toggleTag(t.lbl)}
              type="button"
            >
              {t.lbl}
            </button>
          ))}
        </div>
      </div>

      <div className="b2b-card">
        <div className="b2b-card-head">
          <div>
            <h3>Regole di prenotazione</h3>
            <div className="b2b-sub">Controlli di capacità e deposito</div>
          </div>
        </div>
        <div className="b2b-form-grid">
          <div className="b2b-field">
            <label>Max coperti simultanei</label>
            <input type="number" defaultValue={48} />
          </div>
          <div className="b2b-field">
            <label>Anticipo minimo prenotazione</label>
            <select defaultValue="2h">
              <option value="0">Immediato</option>
              <option value="1h">1 ora</option>
              <option value="2h">2 ore</option>
              <option value="24h">24 ore</option>
            </select>
          </div>
          <div className="b2b-field">
            <label>Deposito per coperto (gruppi 6+)</label>
            <input type="text" defaultValue="€ 10,00" />
          </div>
          <div className="b2b-field">
            <label>Anticipo cancellazione gratuita</label>
            <select defaultValue="4h">
              <option value="2h">2 ore</option>
              <option value="4h">4 ore</option>
              <option value="24h">24 ore</option>
            </select>
          </div>
          <div className="b2b-field b2b-field-2 b2b-field-row">
            <label>No-show fee automatica</label>
            <button className="b2b-toggle on" type="button" aria-label="Toggle no-show fee" />
            <span className="b2b-field-hint">€ 15 addebitati se il cliente non si presenta</span>
          </div>
        </div>
      </div>

      <div className="b2b-card">
        <div className="b2b-card-head">
          <div>
            <h3>Sostenibilità</h3>
            <div className="b2b-sub">Certificazioni e pratiche eco-friendly</div>
          </div>
        </div>
        <div className="b2b-sust-grid">
          <label className="b2b-check-card">
            <input type="checkbox" defaultChecked />
            <div>
              <b>Green Key</b>
              <div className="b2b-sub2">Certificazione turismo sostenibile</div>
            </div>
          </label>
          <label className="b2b-check-card">
            <input type="checkbox" defaultChecked />
            <div>
              <b>Eco-Friendly Toscana</b>
              <div className="b2b-sub2">Programma regionale</div>
            </div>
          </label>
          <label className="b2b-check-card">
            <input type="checkbox" />
            <div>
              <b>Zero Waste Kitchen</b>
              <div className="b2b-sub2">In valutazione</div>
            </div>
          </label>
          <label className="b2b-check-card">
            <input type="checkbox" defaultChecked />
            <div>
              <b>Km 0 / Locale</b>
              <div className="b2b-sub2">80% fornitori toscani</div>
            </div>
          </label>
        </div>
      </div>

      <div className="b2b-card b2b-danger">
        <div className="b2b-card-head">
          <div>
            <h3 style={{ color: "#B24A28" }}>Zona pericolosa</h3>
            <div className="b2b-sub">Azioni irreversibili sul tuo account partner</div>
          </div>
        </div>
        <div className="b2b-danger-row">
          <div>
            <b>Disattiva locale temporaneamente</b>
            <div className="b2b-sub2">
              Rimuove il locale da discovery app · riattivabile in 1 click
            </div>
          </div>
          <button className="b2b-btn b2b-btn-danger" type="button">
            Disattiva
          </button>
        </div>
        <div className="b2b-danger-row">
          <div>
            <b>Cancella account partner</b>
            <div className="b2b-sub2">
              Elimina profilo, dati storici, integrazioni · i payout pending verranno completati
            </div>
          </div>
          <button className="b2b-btn b2b-btn-danger-solid" type="button">
            Cancella account
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="b2b-card" style={{ minHeight: 280 }}>
      <div className="b2b-card-head">
        <div>
          <h3>{label}</h3>
          <div className="b2b-sub">Sezione in preparazione</div>
        </div>
      </div>
      <div className="b2b-placeholder">
        <div className="b2b-placeholder-ill">{label.charAt(0)}</div>
        <div>
          <b>Configurazione {label.toLowerCase()}</b>
          <p>
            Presto potrai gestire qui le impostazioni di {label.toLowerCase()}. Il team sta rifinendo
            gli ultimi dettagli · ETA maggio 2026.
          </p>
          <button className="b2b-btn b2b-btn-sm" type="button">
            Avvisami quando pronto
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ImpostazioniPage() {
  const [tab, setTab] = useState<Tab>("profilo");

  const tabs: Array<{ k: Tab; lbl: string }> = [
    { k: "profilo", lbl: "Profilo locale" },
    { k: "team", lbl: "Team" },
    { k: "integrazioni", lbl: "Integrazioni" },
    { k: "fatturazione", lbl: "Fatturazione" },
    { k: "notifiche", lbl: "Notifiche" },
    { k: "api", lbl: "API" },
  ];

  return (
    <>
      <header className="b2b-header">
        <div className="b2b-header-title">
          <span className="b2b-h-eyebrow">Partner</span>
          <span className="b2b-h-name">Trattoria Mario · Firenze</span>
        </div>
        <span className="b2b-pill">
          <span className="b2b-dot" />
          Profilo pubblicato
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
            <h1>Impostazioni</h1>
            <div className="b2b-sub">Configura il tuo account partner e le integrazioni</div>
          </div>
        </div>

        <div className="b2b-settings-tabs">
          {tabs.map((t) => (
            <button
              key={t.k}
              className={`b2b-settings-tab ${tab === t.k ? "active" : ""}`}
              onClick={() => setTab(t.k)}
              type="button"
            >
              {t.lbl}
            </button>
          ))}
        </div>

        {tab === "profilo" && <ProfileTab />}
        {tab === "team" && <PlaceholderTab label="Team" />}
        {tab === "integrazioni" && <PlaceholderTab label="Integrazioni" />}
        {tab === "fatturazione" && <PlaceholderTab label="Fatturazione" />}
        {tab === "notifiche" && <PlaceholderTab label="Notifiche" />}
        {tab === "api" && <PlaceholderTab label="API" />}
      </div>
    </>
  );
}

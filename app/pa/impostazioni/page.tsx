"use client";

import { useState } from "react";

// ==============================
// TABS
// ==============================

type Tab = "ente" | "utenti" | "integrazioni" | "data" | "api" | "audit";

const TABS: { k: Tab; label: string }[] = [
  { k: "ente", label: "Ente" },
  { k: "utenti", label: "Utenti & Ruoli" },
  { k: "integrazioni", label: "Integrazioni" },
  { k: "data", label: "Data policy" },
  { k: "api", label: "API" },
  { k: "audit", label: "Audit log" }
];

// ==============================
// USERS
// ==============================

const USERS = [
  { initials: "MV", name: "Marco Vitali", email: "m.vitali@comune.fi.it", role: "Admin", roleBadge: "accent" },
  { initials: "AC", name: "Alice Conti", email: "a.conti@comune.fi.it", role: "Responsabile dati", roleBadge: "" },
  { initials: "RB", name: "Riccardo Bernini", email: "r.bernini@comune.fi.it", role: "Eventi & permessi", roleBadge: "warn" },
  { initials: "LN", name: "Luca Nardi", email: "l.nardi@comune.fi.it", role: "Sicurezza", roleBadge: "danger" },
  { initials: "SB", name: "Stefania Bartoli", email: "s.bartoli@comune.fi.it", role: "Sostenibilità", roleBadge: "sage" },
  { initials: "GP", name: "Giulio Paci", email: "g.paci@comune.fi.it", role: "Viewer · reportistica", roleBadge: "" },
  { initials: "MF", name: "Maria Ferri", email: "m.ferri@comune.fi.it", role: "Compliance CIR", roleBadge: "" }
];

// ==============================
// INTEGRATIONS
// ==============================

const INTEGRATIONS = [
  { n: "Istat API", d: "Dati demografici e flussi · aggiornamento settimanale", on: true },
  { n: "Polizia Locale", d: "Contatto ordini di servizio e segnalazioni rapide", on: true },
  { n: "112 NUE", d: "Centrale unica emergenze · alert automatici", on: true },
  { n: "Regione Toscana", d: "Dati turismo regionali · CIR centralizzato", on: true },
  { n: "SUAPE", d: "Sportello unico attività produttive · permessi eventi", on: true },
  { n: "Trenitalia", d: "Arrivi/partenze stazioni FI-SMN e Campo di Marte", on: true },
  { n: "ATAF", d: "Flussi trasporto pubblico locale urbano", on: false },
  { n: "ENIT", d: "Promozione turistica nazionale · export campagne", on: false }
];

const AUDIT_LOG = [
  { t: "Modifica tariffe imposta di soggiorno", u: "M. Vitali", time: "22 apr · 16:42", ico: "✎" },
  { t: "Approvazione nuovo attrattore: Museo Horne", u: "A. Conti", time: "22 apr · 14:18", ico: "✓" },
  { t: "Export CSV · 1.842 strutture", u: "M. Ferri", time: "22 apr · 11:05", ico: "⇩" },
  { t: "Invito utente · G. Paci (Viewer)", u: "M. Vitali", time: "21 apr · 17:30", ico: "+" },
  { t: "Approvazione permesso evento · Festival Oltrarno", u: "R. Bernini", time: "21 apr · 10:22", ico: "✓" },
  { t: "Connessione integrazione ATAF disabilitata", u: "M. Vitali", time: "20 apr · 16:05", ico: "!" },
  { t: "Accesso API · chiave rigenerata", u: "Sistema", time: "20 apr · 08:01", ico: "🔑" }
];

const COLORS = ["#C6704A", "#2F4858", "#6F9A87", "#C9923E", "#B9452E", "#8B6F5E"];

// ==============================
// COMPONENT
// ==============================

export default function ImpostazioniPage() {
  const [tab, setTab] = useState<Tab>("ente");
  const [accent, setAccent] = useState("#C6704A");

  return (
    <>
      <header className="pa-topbar">
        <div className="pa-title">
          <div className="pa-crumb">Comune di Firenze · Governance</div>
          <h1 className="pa-h1">Impostazioni</h1>
        </div>
        <div className="pa-topbar-actions">
          <button className="pa-btn pa-btn-ghost" type="button">? Help</button>
          <button className="pa-btn pa-btn-primary" type="button">Salva modifiche</button>
          <div className="pa-avatar" aria-label="Utente">MV</div>
        </div>
      </header>

      <main className="pa-content">
        <section>
          <div className="pa-tabs">
            {TABS.map((t) => (
              <button key={t.k} className={`pa-tab${tab === t.k ? " active" : ""}`} onClick={() => setTab(t.k)} type="button">
                {t.label}
              </button>
            ))}
          </div>

          {/* Ente tab */}
          {tab === "ente" && (
            <div style={{ display: "grid", gap: 18 }}>
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Dati ente</h3>
                    <div className="sub">Anagrafica ente pubblico · visibile a TheGuide e partner</div>
                  </div>
                </div>
                <div className="pa-form">
                  <div className="pa-form-row">
                    <div className="lbl">Denominazione ente<span className="sub">ragione sociale ufficiale</span></div>
                    <input className="pa-input" defaultValue="Comune di Firenze" />
                  </div>
                  <div className="pa-form-row">
                    <div className="lbl">Codice ISTAT<span className="sub">codice comune ufficiale</span></div>
                    <input className="pa-input" defaultValue="048017" />
                  </div>
                  <div className="pa-form-row">
                    <div className="lbl">Partita IVA<span className="sub">ente pubblico</span></div>
                    <input className="pa-input" defaultValue="01307110484" />
                  </div>
                  <div className="pa-form-row">
                    <div className="lbl">Indirizzo PEC<span className="sub">casella certificata ente</span></div>
                    <input className="pa-input" type="email" defaultValue="protocollo@pec.comune.fi.it" />
                  </div>
                  <div className="pa-form-row">
                    <div className="lbl">Referente dati<span className="sub">Responsabile del trattamento (RPD)</span></div>
                    <input className="pa-input" defaultValue="Marco Vitali — dpo@comune.fi.it" />
                  </div>
                </div>
              </div>

              <div className="pa-grid-2">
                <div className="pa-card">
                  <div className="pa-card-title">
                    <div>
                      <h3>Territorio</h3>
                      <div className="sub">Subdivisioni territoriali gestite</div>
                    </div>
                    <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">+ Aggiungi</button>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {[
                      { n: "Centro storico", c: "UNESCO · 4 quartieri" },
                      { n: "Oltrarno", c: "Santo Spirito, San Frediano, San Niccolò" },
                      { n: "Santa Croce", c: "Santa Croce, Sant'Ambrogio" },
                      { n: "Campo di Marte", c: "Cure, Coverciano, Bellariva" },
                      { n: "Novoli / Rifredi", c: "4 frazioni" },
                      { n: "Gavinana / Galluzzo", c: "Periferia sud" }
                    ].map((s) => (
                      <div key={s.n} className="pa-sub-item">
                        <span>{s.n}</span>
                        <span className="c">{s.c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pa-card">
                  <div className="pa-card-title">
                    <div>
                      <h3>Tema dashboard</h3>
                      <div className="sub">Colore di accento secondario</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setAccent(c)}
                        className={`pa-color-chip${c === accent ? " selected" : ""}`}
                        style={{ background: c }}
                        aria-label={`Colore ${c}`}
                      />
                    ))}
                  </div>
                  <div style={{ marginTop: 14, padding: 14, border: "1px solid var(--pa-line)", borderRadius: 12, background: "var(--pa-surface-2)", display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: accent }} />
                    <div>
                      <div style={{ fontSize: 11, color: "var(--pa-muted)", fontWeight: 600 }}>Preview accent</div>
                      <div style={{ fontWeight: 800, color: accent, fontSize: 16 }}>Dashboard Comune di Firenze</div>
                    </div>
                  </div>
                  <div className="pa-form-row" style={{ marginTop: 18, gridTemplateColumns: "180px 1fr" }}>
                    <div className="lbl">Lingua ufficiale</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span className="pa-badge accent">IT · primaria</span>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">+ EN</button>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">+ Altre</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Fonti dati</h3>
                    <div className="sub">Abilita / disabilita fonti dati che popolano la dashboard</div>
                  </div>
                  <span className="pa-tag sage">6/6 attive</span>
                </div>
                <div className="pa-grid-4">
                  {[
                    { n: "Istat", d: "Dati demografici certificati", on: true },
                    { n: "Regione Toscana", d: "Flussi CIR regionale", on: true },
                    { n: "Questura", d: "Stati affluenza critici", on: true },
                    { n: "TheGuide Live", d: "Visitatori in-app live", on: true },
                    { n: "Sensori IoT città", d: "Densità, qualità aria, rumore", on: true },
                    { n: "Webcam pubbliche", d: "Stream centro storico (5)", on: true }
                  ].map((s) => (
                    <div key={s.n} style={{ padding: 12, border: "1px solid var(--pa-line)", borderRadius: 10, background: "var(--pa-surface)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--pa-ink)", fontSize: 12.5 }}>{s.n}</div>
                          <div style={{ fontSize: 10.5, color: "var(--pa-muted)", marginTop: 2 }}>{s.d}</div>
                        </div>
                        <button className={`pa-switch sm${s.on ? "" : " off"}`} aria-pressed={s.on} type="button"><span className="sr-only">Toggle</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Utenti tab */}
          {tab === "utenti" && (
            <div className="pa-grid-2-1">
              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Team & permessi</h3>
                    <div className="sub">7 membri · 4 ruoli attivi</div>
                  </div>
                  <span className="pa-tag">7 attivi</span>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {USERS.map((u) => (
                    <div key={u.email} className="pa-user-row">
                      <div className="pa-user-av">{u.initials}</div>
                      <div>
                        <div className="pa-user-name">{u.name}</div>
                        <div className="pa-user-mail">{u.email}</div>
                      </div>
                      <div>
                        <span className={`pa-badge ${u.roleBadge || ""}`}>{u.role}</span>
                      </div>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">⋯</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pa-card">
                <div className="pa-card-title">
                  <div>
                    <h3>Invita nuovo membro</h3>
                    <div className="sub">Email · ruolo · permessi</div>
                  </div>
                </div>
                <div className="pa-form" style={{ gap: 10 }}>
                  <div>
                    <div className="lbl" style={{ fontSize: 11, fontWeight: 700, color: "var(--pa-ink-2)", marginBottom: 4 }}>Email</div>
                    <input className="pa-input" placeholder="nome.cognome@comune.fi.it" />
                  </div>
                  <div>
                    <div className="lbl" style={{ fontSize: 11, fontWeight: 700, color: "var(--pa-ink-2)", marginBottom: 4 }}>Ruolo</div>
                    <select className="pa-select">
                      <option>Admin</option>
                      <option>Responsabile dati</option>
                      <option>Eventi & permessi</option>
                      <option>Sostenibilità</option>
                      <option>Compliance CIR</option>
                      <option>Viewer · reportistica</option>
                    </select>
                  </div>
                  <div>
                    <div className="lbl" style={{ fontSize: 11, fontWeight: 700, color: "var(--pa-ink-2)", marginBottom: 4 }}>Note</div>
                    <input className="pa-input" placeholder="Opzionale" />
                  </div>
                  <button className="pa-btn pa-btn-primary" type="button" style={{ justifyContent: "center" }}>Invia invito</button>
                </div>
              </div>
            </div>
          )}

          {/* Integrazioni tab */}
          {tab === "integrazioni" && (
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Integrazioni esterne</h3>
                  <div className="sub">8 sistemi collegabili · 6 connessi</div>
                </div>
                <span className="pa-tag sage">6/8</span>
              </div>
              <div className="pa-grid-4">
                {INTEGRATIONS.map((i) => (
                  <div key={i.n} className="pa-integration">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div className="name">{i.n}</div>
                      <span className={`pa-badge ${i.on ? "ok" : "warn"}`}>{i.on ? "Connesso" : "Disconnesso"}</span>
                    </div>
                    <div className="desc">{i.d}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">{i.on ? "Config" : "Connetti"}</button>
                      {i.on && <button className="pa-btn pa-btn-sm" type="button" style={{ color: "var(--pa-danger)" }}>Disconnetti</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data policy */}
          {tab === "data" && (
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Data policy & GDPR</h3>
                  <div className="sub">Politiche di conservazione e protezione dati</div>
                </div>
              </div>
              <div className="pa-form">
                <div className="pa-form-row">
                  <div className="lbl">Retention periodo<span className="sub">ms · massimo 60 mesi</span></div>
                  <select className="pa-select" defaultValue="48 mesi"><option>24 mesi</option><option>36 mesi</option><option>48 mesi</option><option>60 mesi</option></select>
                </div>
                <div className="pa-form-row">
                  <div className="lbl">Anonimizzazione<span className="sub">dati aggregati prima di export</span></div>
                  <button className="pa-switch" aria-pressed={true} type="button"><span className="sr-only">Toggle</span></button>
                </div>
                <div className="pa-form-row">
                  <div className="lbl">Condivisione Regione<span className="sub">pipeline settimanale</span></div>
                  <button className="pa-switch" aria-pressed={true} type="button"><span className="sr-only">Toggle</span></button>
                </div>
                <div className="pa-form-row">
                  <div className="lbl">DPIA · ultima valutazione<span className="sub">Data Protection Impact Assessment</span></div>
                  <div style={{ fontSize: 12, color: "var(--pa-ink-2)", fontWeight: 600 }}>12 febbraio 2026 · <span className="pa-badge ok" style={{ marginLeft: 6 }}>Valida</span></div>
                </div>
              </div>
            </div>
          )}

          {/* API tab */}
          {tab === "api" && (
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Chiavi API</h3>
                  <div className="sub">Access token per integrazioni personalizzate</div>
                </div>
                <button className="pa-btn pa-btn-primary pa-btn-sm" type="button">+ Nuova chiave</button>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  { n: "Chiave principale (read-only)", k: "pa_fi_9k2X…Fc4x", scope: "flussi · strutture · eventi" },
                  { n: "Chiave reportistica", k: "pa_fi_r2Eb…9Lw3", scope: "solo export CSV" },
                  { n: "Chiave partner Regione Toscana", k: "pa_fi_Tk8d…Pu1a", scope: "strutture + CIR" }
                ].map((k) => (
                  <div key={k.n} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 10, padding: 12, border: "1px solid var(--pa-line-2)", borderRadius: 10, background: "var(--pa-surface-2)", alignItems: "center", fontSize: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--pa-ink)" }}>{k.n}</div>
                      <div style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 11, color: "var(--pa-muted)", marginTop: 2 }}>{k.k}</div>
                      <div style={{ fontSize: 10.5, color: "var(--pa-ink-blue)", marginTop: 4 }}>Scope: {k.scope}</div>
                    </div>
                    <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">Copia</button>
                    <button className="pa-btn pa-btn-sm" type="button" style={{ color: "var(--pa-danger)" }}>Revoca</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit log */}
          {tab === "audit" && (
            <div className="pa-card">
              <div className="pa-card-title">
                <div>
                  <h3>Audit log</h3>
                  <div className="sub">Ultimi 7 giorni · export disponibile</div>
                </div>
                <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">⇩ Export</button>
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {AUDIT_LOG.map((a, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 10, padding: "10px 12px", border: "1px solid var(--pa-line-2)", borderRadius: 8, background: "var(--pa-surface)", alignItems: "center", fontSize: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--pa-ink-blue-soft)", color: "var(--pa-ink-blue)", display: "grid", placeItems: "center", fontWeight: 800 }}>{a.ico}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--pa-ink)" }}>{a.t}</div>
                      <div style={{ fontSize: 10.5, color: "var(--pa-muted)", marginTop: 1 }}>utente: {a.u}</div>
                    </div>
                    <div style={{ fontSize: 10.5, color: "var(--pa-muted)", fontVariantNumeric: "tabular-nums" }}>{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Danger zone (always visible) */}
        <section>
          <div className="pa-danger-zone">
            <h4>Zona pericolosa</h4>
            <div style={{ fontSize: 12, color: "#7f2a16" }}>
              Azioni irreversibili · richiesta conferma a doppio fattore dell'amministratore ente.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="pa-btn pa-btn-ghost pa-btn-sm" type="button">⇩ Esporta tutti i dati (GDPR)</button>
              <button className="pa-btn pa-btn-danger pa-btn-sm" type="button">Reset dashboard</button>
              <button className="pa-btn pa-btn-danger pa-btn-sm" type="button">Elimina ente</button>
            </div>
          </div>
        </section>

        <footer className="pa-footer">
          <div>© 2026 TheGuide Srl · Impostazioni · Conforme GDPR · Privacy-by-design</div>
          <div className="links">
            <a href="#">Termini servizio</a>
            <a href="#">Privacy policy</a>
            <a href="#">SLA</a>
          </div>
        </footer>
      </main>
    </>
  );
}

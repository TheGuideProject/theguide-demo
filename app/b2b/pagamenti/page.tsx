"use client";

import { useState } from "react";

/* =============================================================================
   TheGuide · B2B · Pagamenti & Payout
   ============================================================================= */

type TxnStatus = "Pagato" | "Rimborsato" | "Contestato" | "In attesa";
type Method = "TravelPass" | "Visa" | "Apple Pay" | "Mastercard" | "Google Pay" | "Contanti";

type Transaction = {
  id: string;
  date: string;
  time: string;
  method: Method;
  customer: string;
  initials: string;
  av: "a1" | "a2" | "a3" | "a4";
  ordine: string;
  lordo: string;
  fee: string;
  netto: string;
  status: TxnStatus;
};

const txns: Transaction[] = [
  { id: "t1", date: "23 apr", time: "14:02", method: "TravelPass", customer: "M. Laurent", initials: "ML", av: "a1", ordine: "Menu degustazione · 2", lordo: "€ 96,00", fee: "€ 1,34", netto: "€ 94,66", status: "Pagato" },
  { id: "t2", date: "23 apr", time: "13:18", method: "Apple Pay", customer: "H. Tanaka", initials: "HT", av: "a2", ordine: "Tagliata + Chianti", lordo: "€ 34,50", fee: "€ 0,48", netto: "€ 34,02", status: "Pagato" },
  { id: "t3", date: "23 apr", time: "13:05", method: "TravelPass", customer: "S. Weber", initials: "SW", av: "a3", ordine: "Aperitivo + antipasto", lordo: "€ 24,00", fee: "€ 0,34", netto: "€ 23,66", status: "Pagato" },
  { id: "t4", date: "23 apr", time: "12:48", method: "Visa", customer: "R. Brown", initials: "RB", av: "a4", ordine: "Pranzo famiglia · 4", lordo: "€ 148,20", fee: "€ 2,07", netto: "€ 146,13", status: "In attesa" },
  { id: "t5", date: "23 apr", time: "12:30", method: "TravelPass", customer: "A. Kowalski", initials: "AK", av: "a1", ordine: "Bistecca alla fiorentina", lordo: "€ 62,00", fee: "€ 0,87", netto: "€ 61,13", status: "Pagato" },
  { id: "t6", date: "22 apr", time: "21:42", method: "Mastercard", customer: "C. Silva", initials: "CS", av: "a2", ordine: "Menu degustazione · 2", lordo: "€ 96,00", fee: "€ 1,34", netto: "€ 94,66", status: "Pagato" },
  { id: "t7", date: "22 apr", time: "20:18", method: "TravelPass", customer: "N. Park", initials: "NP", av: "a3", ordine: "Antipasto toscano", lordo: "€ 18,00", fee: "€ 0,25", netto: "€ 17,75", status: "Pagato" },
  { id: "t8", date: "22 apr", time: "19:54", method: "Visa", customer: "E. Rodriguez", initials: "ER", av: "a4", ordine: "Pasta + vino · 3", lordo: "€ 84,00", fee: "€ 1,18", netto: "€ 82,82", status: "Pagato" },
  { id: "t9", date: "22 apr", time: "14:32", method: "Apple Pay", customer: "G. Dupont", initials: "GD", av: "a1", ordine: "Ribollita + dolce", lordo: "€ 28,00", fee: "€ 0,39", netto: "€ 27,61", status: "Pagato" },
  { id: "t10", date: "22 apr", time: "13:14", method: "TravelPass", customer: "J. Müller", initials: "JM", av: "a3", ordine: "Tavolata business · 5", lordo: "€ 184,00", fee: "€ 2,58", netto: "€ 181,42", status: "Pagato" },
  { id: "t11", date: "21 apr", time: "20:56", method: "Visa", customer: "L. Peterson", initials: "LP", av: "a4", ordine: "Bistecca + Brunello", lordo: "€ 118,00", fee: "€ 1,65", netto: "€ 116,35", status: "Contestato" },
  { id: "t12", date: "21 apr", time: "19:30", method: "TravelPass", customer: "T. Nguyen", initials: "TN", av: "a2", ordine: "Menu completo · 2", lordo: "€ 88,00", fee: "€ 1,23", netto: "€ 86,77", status: "Pagato" },
  { id: "t13", date: "21 apr", time: "13:48", method: "Google Pay", customer: "O. Rossi", initials: "OR", av: "a3", ordine: "Pranzo di gruppo · 8", lordo: "€ 268,00", fee: "€ 3,75", netto: "€ 264,25", status: "Pagato" },
  { id: "t14", date: "21 apr", time: "13:02", method: "TravelPass", customer: "K. Jansen", initials: "KJ", av: "a2", ordine: "Antipasto + pasta", lordo: "€ 32,00", fee: "€ 0,45", netto: "€ 31,55", status: "Rimborsato" },
  { id: "t15", date: "20 apr", time: "21:12", method: "Mastercard", customer: "D. Petrov", initials: "DP", av: "a1", ordine: "Cena × 4 · bistecca", lordo: "€ 212,00", fee: "€ 2,97", netto: "€ 209,03", status: "Pagato" },
  { id: "t16", date: "20 apr", time: "20:08", method: "TravelPass", customer: "A. Schmitt", initials: "AS", av: "a3", ordine: "Menu vegetariano · 2", lordo: "€ 54,00", fee: "€ 0,76", netto: "€ 53,24", status: "Pagato" },
  { id: "t17", date: "20 apr", time: "14:22", method: "Apple Pay", customer: "M. Garcia", initials: "MG", av: "a2", ordine: "Pranzo vegan + calici", lordo: "€ 48,00", fee: "€ 0,67", netto: "€ 47,33", status: "Pagato" },
  { id: "t18", date: "20 apr", time: "13:44", method: "Visa", customer: "F. Bianchi", initials: "FB", av: "a4", ordine: "Bistecca + Chianti", lordo: "€ 78,00", fee: "€ 1,09", netto: "€ 76,91", status: "Pagato" },
  { id: "t19", date: "19 apr", time: "20:38", method: "Contanti", customer: "Walk-in", initials: "WI", av: "a1", ordine: "Scontrino cassa", lordo: "€ 42,00", fee: "—", netto: "€ 42,00", status: "Pagato" },
  { id: "t20", date: "19 apr", time: "13:20", method: "TravelPass", customer: "I. Kowalski", initials: "IK", av: "a2", ordine: "Pranzo completo · 3", lordo: "€ 112,00", fee: "€ 1,57", netto: "€ 110,43", status: "Pagato" },
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
const IcoDownload = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IcoLock = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IcoChev = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .18s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const statusTone: Record<TxnStatus, string> = {
  Pagato: "ok",
  Rimborsato: "warn",
  Contestato: "bad",
  "In attesa": "warn",
};

const payoutHistory = [
  { amt: "€ 2.984,10", date: "17 apr 2026", status: "Completato" },
  { amt: "€ 3.124,40", date: "10 apr 2026", status: "Completato" },
  { amt: "€ 2.712,90", date: "3 apr 2026", status: "Completato" },
  { amt: "€ 2.841,60", date: "27 mar 2026", status: "Completato" },
  { amt: "€ 3.022,15", date: "20 mar 2026", status: "Completato" },
  { amt: "€ 2.654,80", date: "13 mar 2026", status: "Completato" },
];

export default function PagamentiPage() {
  const [fiscalOpen, setFiscalOpen] = useState(false);

  return (
    <>
      <header className="b2b-header">
        <div className="b2b-header-title">
          <span className="b2b-h-eyebrow">Partner</span>
          <span className="b2b-h-name">Trattoria Mario · Firenze</span>
        </div>
        <span className="b2b-pill">
          <span className="b2b-dot" />
          Payout sabato 26 apr
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
            <h1>Pagamenti & Payout</h1>
            <div className="b2b-sub">
              Aprile 2026 · sincronizzato con POS, Stripe, TravelPass, SdI.
            </div>
          </div>
          <div className="b2b-page-actions">
            <div className="b2b-tabs" role="tablist">
              <button className="b2b-tab" type="button">Marzo</button>
              <button className="b2b-tab active" type="button">Aprile</button>
              <button className="b2b-tab" type="button">Maggio</button>
            </div>
            <button className="b2b-btn" type="button">
              {IcoDownload} Scarica fattura
            </button>
          </div>
        </div>

        {/* Hero + small KPIs */}
        <section className="b2b-payout-grid">
          <div className="b2b-payout b2b-payout-large">
            <h3>Prossimo payout</h3>
            <div className="b2b-payout-amt">€ 3.427,80</div>
            <div className="b2b-payout-date">Accredito previsto sabato 26 aprile 2026</div>
            <div className="b2b-payout-meta">
              <div>
                <span>IBAN di destinazione</span>
                <b>IT** ···· ···· ···· ···· 4721</b>
              </div>
              <div>
                <span>Commissione TheGuide</span>
                <b>1,4% · € 48,60</b>
              </div>
              <div>
                <span>Transazioni incluse</span>
                <b>68 movimenti</b>
              </div>
              <div>
                <span>Ultimo accredito</span>
                <b>€ 2.984,10 · 17 apr</b>
              </div>
            </div>
            <div className="b2b-payout-foot">
              <button className="b2b-btn b2b-btn-primary" type="button">
                {IcoDownload} Scarica fattura
              </button>
              <button className="b2b-btn" type="button">
                Modifica IBAN
              </button>
            </div>
          </div>

          <div className="b2b-pay-mini-grid">
            <article className="b2b-kpi k-warm">
              <div className="b2b-kpi-top">
                <span className="b2b-kpi-label">Incassato mese</span>
              </div>
              <div className="b2b-kpi-value">€ 12.480</div>
              <div className="b2b-kpi-foot">
                <span className="b2b-delta up">▲ 18%</span>
                <span>vs marzo</span>
              </div>
            </article>
            <article className="b2b-kpi k-sage">
              <div className="b2b-kpi-top">
                <span className="b2b-kpi-label">Commissioni TheGuide</span>
              </div>
              <div className="b2b-kpi-value">€ 174,72</div>
              <div className="b2b-kpi-foot">
                <span>1,4% medio</span>
              </div>
            </article>
            <article className="b2b-kpi k-sand">
              <div className="b2b-kpi-top">
                <span className="b2b-kpi-label">TravelPass · % trans.</span>
              </div>
              <div className="b2b-kpi-value">
                42<span className="b2b-kpi-unit">%</span>
              </div>
              <div className="b2b-kpi-foot">
                <span className="b2b-delta up">▲ +6pt</span>
                <span>vs marzo</span>
              </div>
            </article>
            <article className="b2b-kpi k-ink">
              <div className="b2b-kpi-top">
                <span className="b2b-kpi-label">Apple Pay · % trans.</span>
              </div>
              <div className="b2b-kpi-value">
                28<span className="b2b-kpi-unit">%</span>
              </div>
              <div className="b2b-kpi-foot">
                <span>cashless trend</span>
              </div>
            </article>
          </div>
        </section>

        {/* Transactions table + side */}
        <section className="b2b-row-2">
          <div className="b2b-card">
            <div className="b2b-card-head">
              <div>
                <h3>Transazioni recenti</h3>
                <div className="b2b-sub">{txns.length} operazioni · aggiornato ora</div>
              </div>
              <div className="b2b-card-head-actions">
                <div className="b2b-tabs">
                  <button className="b2b-tab active" type="button">Tutte</button>
                  <button className="b2b-tab" type="button">Pagate</button>
                  <button className="b2b-tab" type="button">Problemi</button>
                </div>
                <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                  CSV
                </button>
              </div>
            </div>
            <div className="b2b-table-wrap">
              <table className="b2b-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Ordine</th>
                    <th>Metodo</th>
                    <th>Lordo</th>
                    <th>Fee</th>
                    <th>Netto</th>
                    <th>Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {txns.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{t.date}</div>
                        <div style={{ fontSize: 11, color: "var(--b2b-muted)" }}>{t.time}</div>
                      </td>
                      <td>
                        <div className="b2b-client">
                          <div className={`b2b-client-av ${t.av}`}>{t.initials}</div>
                          <div className="b2b-client-meta">
                            <span className="b2b-client-name">{t.customer}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "var(--b2b-ink-2)" }}>{t.ordine}</td>
                      <td>
                        <span className={`b2b-method ${t.method === "TravelPass" ? "tp" : ""}`}>
                          {t.method}
                        </span>
                      </td>
                      <td className="b2b-td-amt">{t.lordo}</td>
                      <td style={{ color: "var(--b2b-muted)", fontSize: 12 }}>{t.fee}</td>
                      <td className="b2b-td-amt">{t.netto}</td>
                      <td>
                        <span className={`b2b-status2 st-${statusTone[t.status]}`}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="b2b-card">
              <div className="b2b-card-head">
                <div>
                  <h3>Storico payout</h3>
                  <div className="b2b-sub">Ultimi 6 accrediti</div>
                </div>
              </div>
              {payoutHistory.map((p, i) => (
                <div key={i} className="b2b-payout-hist-row">
                  <div>
                    <b>{p.amt}</b>
                    <div className="b2b-sub2">{p.date}</div>
                  </div>
                  <span className="b2b-status2 st-ok">{p.status}</span>
                </div>
              ))}
              <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button" style={{ marginTop: 10, width: "100%" }}>
                Vedi tutti
              </button>
            </div>

            <div className="b2b-card">
              <div className="b2b-card-head">
                <div>
                  <h3>Carte registrate</h3>
                  <div className="b2b-sub">Per addebiti automatici</div>
                </div>
                <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                  + Aggiungi
                </button>
              </div>
              <div className="b2b-card-row">
                <span className="b2b-card-pay">VISA</span>
                <div style={{ flex: 1 }}>
                  <b>···· 4721</b>
                  <div className="b2b-sub2">Scade 08/28 · predefinita</div>
                </div>
                <span className="b2b-chip chip-ok">Primaria</span>
              </div>
              <div className="b2b-card-row">
                <span className="b2b-card-pay mc">MC</span>
                <div style={{ flex: 1 }}>
                  <b>···· 9014</b>
                  <div className="b2b-sub2">Scade 02/27</div>
                </div>
                <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                  Rimuovi
                </button>
              </div>
            </div>

            <div className="b2b-card b2b-sec-card">
              <div className="b2b-card-head">
                <div>
                  <h3>
                    <span style={{ display: "inline-block", width: 14, height: 14, verticalAlign: "middle", marginRight: 6, color: "var(--b2b-sage)" }}>
                      {IcoLock}
                    </span>
                    Sicurezza
                  </h3>
                  <div className="b2b-sub">Standard di protezione pagamenti</div>
                </div>
              </div>
              <div className="b2b-sec-row">
                <span>3D Secure 2.2</span>
                <span className="b2b-chip chip-ok">Attivo</span>
              </div>
              <div className="b2b-sec-row">
                <span>PCI DSS Level 1</span>
                <span className="b2b-chip chip-ok">Certificato</span>
              </div>
              <div className="b2b-sec-row">
                <span>Tokenizzazione Apple/Google Pay</span>
                <span className="b2b-chip chip-ok">Abilitato</span>
              </div>
              <div className="b2b-sec-row">
                <span>Rilevamento frodi Iris</span>
                <span className="b2b-chip chip-ok">On</span>
              </div>
            </div>
          </div>
        </section>

        {/* Fiscal */}
        <section className="b2b-card">
          <div className="b2b-card-head">
            <div>
              <h3>Dati fiscali</h3>
              <div className="b2b-sub">Sincronizzazione con Agenzia Entrate · SdI</div>
            </div>
            <div className="b2b-card-head-actions">
              <button className="b2b-btn b2b-btn-ghost b2b-btn-sm" type="button">
                Esporta XML
              </button>
            </div>
          </div>
          <div className="b2b-fiscal-grid">
            <div className="b2b-fiscal-cell">
              <span>Scontrini emessi</span>
              <b>428</b>
              <span className="b2b-sub2">aprile 2026</span>
            </div>
            <div className="b2b-fiscal-cell">
              <span>Invio SdI</span>
              <b>Automatico</b>
              <span className="b2b-sub2">ogni transazione</span>
            </div>
            <div className="b2b-fiscal-cell">
              <span>IVA incassata</span>
              <b>€ 1.122,80</b>
              <span className="b2b-sub2">10% ristorazione</span>
            </div>
            <div className="b2b-fiscal-cell">
              <span>Regime</span>
              <b>Ristorazione</b>
              <span className="b2b-sub2">agevolato ONL</span>
            </div>
          </div>

          <button
            className="b2b-accordion"
            type="button"
            onClick={() => setFiscalOpen((o) => !o)}
            aria-expanded={fiscalOpen}
          >
            <span>Dettagli regime & invio SdI</span>
            <span style={{ display: "inline-block", width: 16, height: 16 }}>
              <IcoChev open={fiscalOpen} />
            </span>
          </button>
          {fiscalOpen && (
            <div className="b2b-accordion-body">
              <p>
                Il tuo regime è <b>Ristorazione (codice ATECO 56.10.11)</b>. TheGuide invia
                automaticamente ogni scontrino elettronico al Sistema di Interscambio (SdI)
                entro 12 ore dalla transazione.
              </p>
              <ul>
                <li>IVA al 10% applicata di default su ristorazione.</li>
                <li>Fatture B2B estere gestite con reverse charge.</li>
                <li>Estrazione mensile disponibile in formato XML e CSV.</li>
                <li>Chiusura automatica del registratore di cassa alle 02:00.</li>
              </ul>
              <p style={{ marginTop: 8 }}>
                Per modifiche al regime, contatta il supporto fiscale dedicato TheGuide.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

"use client";
import { StatusBar } from "../PhoneChrome";

export function A11YScreen({ onClose }: { onClose: () => void }) {
  return (
    <>
      <StatusBar variant="a11y" />
      <div className="s-a11y">
        <div className="a11y-top">
          <button
            className="icon-btn"
            style={{ background: "#FFD54A", color: "#000" }}
            onClick={onClose}
          >
            ‹
          </button>
          <div className="icon">♿</div>
          <h3>Firenze accessibile</h3>
          <div className="chip-y">A11Y</div>
        </div>
        <div className="a11y-body">
          <div className="a11y-card">
            <h4>Percorso senza barriere</h4>
            <p>
              Uffizi → Ponte Vecchio · 420 metri · 8 minuti · solo pavimentazione piana,
              nessun gradino.
            </p>
            <div className="a11y-diagram">
              <div className="route" />
              <div className="wp a">A</div>
              <div className="wp b">B</div>
            </div>
            <button className="a11y-cta">Avvia navigazione vocale</button>
          </div>

          <div className="a11y-card">
            <h4>Audio-descrizione Iris</h4>
            <p>
              1.200 opere con descrizione audio dettagliata per visitatori non vedenti o
              ipovedenti. Cliccabile ovunque nei musei convenzionati.
            </p>
          </div>

          <div className="a11y-card">
            <h4>Musei autism-friendly</h4>
            <p>
              4 musei a Firenze con quiet hours dedicate (mar/giov 17-19). Iris adatta il
              tono e la durata delle spiegazioni.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

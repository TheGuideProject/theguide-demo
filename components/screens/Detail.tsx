"use client";
import { StatusBar } from "../PhoneChrome";
import { POIS } from "../../lib/constants";

interface Props {
  poiId: string;
  onBack: () => void;
  onPlay: () => void;
  onAR: () => void;
  onCheckout: () => void;
}

export function DetailScreen({ poiId, onBack, onPlay, onAR, onCheckout }: Props) {
  const poi = POIS.find((p) => p.id === poiId) || POIS[0];

  return (
    <>
      <StatusBar />
      <div className="s-detail">
        <div className="hero">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, #EBD9B8 0%, #E8A77A 50%, #C65D3A 100%)"
            }}
          />
          <button className="back-btn" onClick={onBack}>
            ‹
          </button>
          <div className="hero-meta">
            <div>
              <h3>{poi.name}</h3>
              <div className="loc">📍 {poi.location}</div>
            </div>
            <div className="rating-pill">⭐ {poi.rating}</div>
          </div>
        </div>

        <div className="detail-body">
          <div className="ai-summary">
            <div className="tag">✨ Iris per te</div>
            <p>
              {poi.description ||
                "Ti consiglio di visitarlo al mattino presto per evitare le folle. La luce migliore è tra le 9 e le 11."}
            </p>
          </div>

          <div className="actions">
            <button className="action-big primary" onClick={onPlay}>
              <div className="ico">🎧</div>
              Audio guida
              <span className="sub">18 min · italiano</span>
            </button>
            <button className="action-big" onClick={onAR}>
              <div className="ico">🏛</div>
              Visualizza 3D
              <span className="sub">Ricostruzione 1436</span>
            </button>
            <button className="action-big" onClick={onCheckout}>
              <div className="ico">🎟</div>
              Salta la fila
              <span className="sub">Da €28</span>
            </button>
            <button className="action-big">
              <div className="ico">🗺</div>
              Itinerario
              <span className="sub">Aggiungi</span>
            </button>
          </div>

          <div className="callout">
            <div className="ico">i</div>
            <div>
              <b>Orari oggi</b>
              08:15 – 18:45 · Ultima salita 17:45 · 463 gradini, nessun ascensore.
            </div>
          </div>

          <div style={{ height: 20 }} />
        </div>
      </div>
    </>
  );
}

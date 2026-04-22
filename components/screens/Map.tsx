"use client";
import { StatusBar } from "../PhoneChrome";
import { POIS } from "../../lib/constants";

interface Props {
  onOpenDetail: (id: string) => void;
  onOpenAR: () => void;
}

export function MapScreen({ onOpenDetail, onOpenAR }: Props) {
  return (
    <>
      <StatusBar />
      <div className="s-map">
        <div className="map-bg" />
        <div className="river" />

        <div className="map-top">
          <div className="search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <span>Firenze · Oggi</span>
          </div>
          <button className="chip solid">Per me</button>
        </div>

        <div className="filter-row">
          <button className="chip accent">Arte</button>
          <button className="chip">Food</button>
          <button className="chip">Gratis</button>
          <button className="chip">Nascosti</button>
          <button className="chip" onClick={onOpenAR}>AR</button>
        </div>

        <button
          className="pin"
          style={{ top: "28%", left: "48%" }}
          onClick={() => onOpenDetail("duomo")}
        >
          Duomo
        </button>
        <button
          className="pin sage"
          style={{ top: "50%", left: "30%" }}
          onClick={() => onOpenDetail("uffizi")}
        >
          Uffizi
        </button>
        <button
          className="pin dark"
          style={{ top: "52%", left: "58%" }}
          onClick={() => onOpenDetail("bardini")}
        >
          Ponte V.
        </button>
        <button
          className="pin"
          style={{ top: "66%", left: "44%" }}
          onClick={() => onOpenDetail("mercato")}
        >
          Oltrarno
        </button>

        <div className="sheet">
          <div className="sheet-grab" />
          <h4>Vicino a te · 4 suggerimenti</h4>
          <div className="poi-row">
            {POIS.map((p) => (
              <button
                className="poi-card"
                key={p.id}
                onClick={() => onOpenDetail(p.id)}
              >
                <div className={`poi-thumb ${p.thumb === "accent" ? "" : p.thumb}`} />
                <div className="poi-title">{p.name}</div>
                <div className="poi-meta">
                  <span>⭐ {p.rating}</span>
                  <span>{p.distance}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { StatusBar } from "../PhoneChrome";
import { POIS } from "../../lib/constants";
import type { ScreenId } from "../../lib/types";

interface Props {
  onOpenDetail: (id: string) => void;
  onOpenAR: () => void;
  onJump: (id: ScreenId) => void;
}

const MAP_TILE = "https://staticmap.openstreetmap.de/staticmap.php?center=43.7696,11.2558&zoom=15&size=400x600&maptype=mapnik";

export function MapScreen({ onOpenDetail, onOpenAR, onJump }: Props) {
  return (
    <>
      <StatusBar />
      <div className="s-map">
        <div
          className="map-real"
          style={{ backgroundImage: `url("${MAP_TILE}")` }}
        />
        <div className="map-overlay" />
        <div className="map-attrib">© OpenStreetMap</div>

        <div className="map-top">
          <button
            className="search-box real"
            onClick={() => onJump("chat")}
            style={{ border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", width: "100%" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <span>Chiedi a Iris · Firenze oggi</span>
          </button>
          <button className="chip solid" onClick={() => onJump("itinerary")}>Per me</button>
        </div>

        <div className="filter-row">
          <button className="chip accent" onClick={() => onOpenDetail("uffizi")}>Arte</button>
          <button className="chip" onClick={() => onOpenDetail("mercato")}>Food</button>
          <button className="chip" onClick={() => onJump("pmap")}>Partner</button>
          <button className="chip" onClick={() => onJump("event")}>Eventi</button>
          <button className="chip" onClick={onOpenAR}>AR</button>
          <button className="chip" onClick={() => onJump("smartlens-monument")}>Lens</button>
        </div>

        <button className="map-pin duomo" style={{ top: "32%", left: "49%" }} onClick={() => onOpenDetail("duomo")}>
          <span className="pin-dot" />
          <span className="pin-lbl">Duomo · 250m</span>
        </button>
        <button className="map-pin sage" style={{ top: "52%", left: "44%" }} onClick={() => onOpenDetail("uffizi")}>
          <span className="pin-dot" />
          <span className="pin-lbl">Uffizi</span>
        </button>
        <button className="map-pin dark" style={{ top: "55%", left: "36%" }} onClick={() => onOpenDetail("bardini")}>
          <span className="pin-dot" />
          <span className="pin-lbl">Ponte V.</span>
        </button>
        <button className="map-pin" style={{ top: "22%", left: "38%" }} onClick={() => onOpenDetail("mercato")}>
          <span className="pin-dot" />
          <span className="pin-lbl">Mercato</span>
        </button>
        <div className="map-pin-self" style={{ top: "44%", left: "54%" }}>
          <span className="pulse" />
          <span className="dot" />
        </div>

        <div className="sheet">
          <div className="sheet-grab" />
          <h4>Vicino a te · 4 suggerimenti</h4>
          <div className="poi-row">
            {POIS.map((p) => (
              <button className="poi-card" key={p.id} onClick={() => onOpenDetail(p.id)}>
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

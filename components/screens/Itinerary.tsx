"use client";
import { useState } from "react";
import { StatusBar } from "../PhoneChrome";

const DAYS = [
  { label: "Gio 24 apr", short: "Gio", num: "24" },
  { label: "Ven 25 apr", short: "Ven", num: "25" },
  { label: "Sab 26 apr", short: "Sab", num: "26" }
];

const ITEMS_BY_DAY: { time: string; icon: string; title: string; sub: string; hero?: boolean }[][] = [
  [
    { time: "08:30", icon: "☕", title: "Caffè · Ditta Artigianale", sub: "Oltrarno · 20 min · partner" },
    { time: "09:15", icon: "🏛", title: "Cupola Brunelleschi · skip-the-line", sub: "Prima dell'affollamento · 1h30", hero: true },
    { time: "11:00", icon: "🚶", title: "Passeggiata · Via dei Servi", sub: "Audio-tour Iris · 25 min" },
    { time: "12:30", icon: "🍝", title: "Pranzo · Trattoria Mario", sub: "10% con TravelPass · 1h" },
    { time: "14:30", icon: "🎨", title: "Galleria degli Uffizi", sub: "Botticelli focus · 2h", hero: true },
    { time: "17:30", icon: "🍷", title: "Aperitivo · Enoteca Pitti", sub: "Calice in omaggio · partner" }
  ],
  [
    { time: "09:00", icon: "🎨", title: "Palazzo Pitti · Sala Bianca", sub: "Skip-the-line · 1h30", hero: true },
    { time: "11:00", icon: "🌳", title: "Giardino di Boboli", sub: "Passeggiata guidata · 1h" },
    { time: "13:00", icon: "🥪", title: "Lampredotto · Sergio Pollini", sub: "Street food locale" },
    { time: "15:00", icon: "🏞", title: "Piazzale Michelangelo", sub: "Tramonto sulla città" },
    { time: "20:00", icon: "🥩", title: "Cena · Regina Bistecca", sub: "Prenotato · 4 persone" }
  ],
  [
    { time: "09:30", icon: "⛪", title: "Basilica di Santa Croce", sub: "Tombe di Dante e Michelangelo" },
    { time: "11:30", icon: "🛍", title: "Scuola del Cuoio", sub: "Artigiani · partner · 5% cash" },
    { time: "13:30", icon: "🐟", title: "Mercato Centrale · 1° piano", sub: "Scelta libera · 1h" },
    { time: "16:00", icon: "🚄", title: "Rientro · Stazione SMN", sub: "Frecciarossa · binario in app" }
  ]
];

export function ItineraryScreen() {
  const [day, setDay] = useState(0);
  const items = ITEMS_BY_DAY[day];

  return (
    <>
      <StatusBar />
      <div className="s-itin">
        <div className="itin-hero">
          <small>✨ Iris ha preparato per te</small>
          <h3>Firenze · 3 giorni su misura</h3>
          <div className="chips">
            <span className="chip solid">Arte 40%</span>
            <span className="chip">Food 35%</span>
            <span className="chip">Off-the-beaten 25%</span>
          </div>
        </div>
        <div className="day-tabs">
          {DAYS.map((d, i) => (
            <button
              key={d.label}
              className={`day-tab ${i === day ? "active" : ""}`}
              onClick={() => setDay(i)}
            >
              <b>
                {d.short} {d.num}
              </b>
              apr
            </button>
          ))}
        </div>
        <div className="timeline">
          {items.map((it, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-time">{it.time}</div>
              <div className={`tl-card ${it.hero ? "hero" : ""}`}>
                <div className="tl-icon">{it.icon}</div>
                <div>
                  <div className="tl-title">{it.title}</div>
                  <div className="tl-sub">{it.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

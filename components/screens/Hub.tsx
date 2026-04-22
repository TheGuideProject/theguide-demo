"use client";
import { StatusBar } from "../PhoneChrome";
import type { ScreenId } from "../../lib/types";

interface HubItem {
  id: ScreenId;
  label: string;
  icon: string;
  hint: string;
  tone: "warm" | "sage" | "sand" | "ink" | "accent";
}

const SECTIONS: { title: string; items: HubItem[] }[] = [
  {
    title: "Onboarding",
    items: [
      { id: "welcome", label: "Welcome", icon: "👋", hint: "Schermo d'apertura", tone: "warm" },
      { id: "chat", label: "Chat con Iris", icon: "✨", hint: "AI onboarding", tone: "accent" }
    ]
  },
  {
    title: "Scoperta",
    items: [
      { id: "map", label: "Mappa", icon: "🗺", hint: "POI e pin live", tone: "sand" },
      { id: "detail", label: "POI", icon: "🏛", hint: "Scheda luogo", tone: "accent" },
      { id: "ar", label: "AR 3D", icon: "🕶", hint: "Ricostruzione storica", tone: "ink" },
      { id: "smartlens-monument", label: "Smart Lens", icon: "📸", hint: "Monumenti", tone: "sage" },
      { id: "smartlens-menu", label: "Smart Menu", icon: "🍽", hint: "Traduci menu", tone: "warm" },
      { id: "event", label: "Live Radar", icon: "🎭", hint: "Eventi ora", tone: "accent" }
    ]
  },
  {
    title: "Viaggio",
    items: [
      { id: "itinerary", label: "Itinerario", icon: "📆", hint: "3 giorni su misura", tone: "sand" },
      { id: "player", label: "Audio Iris", icon: "🎧", hint: "Guida vocale", tone: "ink" },
      { id: "kids", label: "Kids mode", icon: "🦊", hint: "Caccia al tesoro", tone: "warm" },
      { id: "group", label: "Gruppo", icon: "👥", hint: "Vota e dividi", tone: "sage" },
      { id: "a11y", label: "Accessibilità", icon: "♿", hint: "Alto contrasto", tone: "ink" }
    ]
  },
  {
    title: "Payments",
    items: [
      { id: "pass", label: "TravelPass", icon: "🎟", hint: "Store", tone: "accent" },
      { id: "wallet", label: "Wallet", icon: "💳", hint: "Saldo e txn", tone: "warm" },
      { id: "convert", label: "Ricarica", icon: "💱", hint: "USD → EUR", tone: "sage" },
      { id: "pmap", label: "Partner", icon: "◉", hint: "412 a Firenze", tone: "sand" },
      { id: "qr", label: "QR Pay", icon: "📷", hint: "Slide-to-pay", tone: "accent" },
      { id: "checkout", label: "Checkout", icon: "🛒", hint: "3 secondi", tone: "ink" },
      { id: "success", label: "Ricevuta", icon: "✅", hint: "Success state", tone: "sage" }
    ]
  },
  {
    title: "Account",
    items: [{ id: "profile", label: "Profilo", icon: "👤", hint: "Badge · XP", tone: "ink" }]
  }
];

interface Props {
  onJump: (id: ScreenId) => void;
}

export function HubScreen({ onJump }: Props) {
  return (
    <>
      <StatusBar />
      <div className="s-hub">
        <div className="hub-header">
          <div className="hub-kicker">Scopri TheGuide</div>
          <h2>Tutto in un tap</h2>
          <p>
            Naviga tra le 21 schermate del prodotto. Ogni tile apre la funzione
            reale: AR, Iris, wallet, pass, partner e altro.
          </p>
        </div>

        {SECTIONS.map((sec) => (
          <div key={sec.title} className="hub-section">
            <div className="hub-sec-title">{sec.title}</div>
            <div className="hub-grid">
              {sec.items.map((it) => (
                <button
                  key={it.id}
                  className={`hub-tile ${it.tone}`}
                  onClick={() => onJump(it.id)}
                >
                  <span className="hub-icon">{it.icon}</span>
                  <span className="hub-label">{it.label}</span>
                  <span className="hub-hint">{it.hint}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ height: 18 }} />
      </div>
    </>
  );
}

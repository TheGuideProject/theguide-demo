import type { Poi, Screen, ScreenId } from "./types";

export const SCREENS: Record<ScreenId, Screen> = {
  welcome: { id: "welcome", title: "Welcome", isModal: true },
  chat: { id: "chat", title: "Iris · Onboarding", isModal: true },
  map: { id: "map", title: "Esplora Firenze", tab: "map" },
  detail: { id: "detail", title: "Cupola del Brunelleschi", isModal: true },
  ar: { id: "ar", title: "AR · Foro Romano", isModal: true },
  wallet: { id: "wallet", title: "TravelPass", tab: "wallet" },
  itinerary: { id: "itinerary", title: "Itinerario AI", tab: "itinerary" },
  player: { id: "player", title: "Audio guida", isModal: true },
  checkout: { id: "checkout", title: "Checkout", isModal: true },
  profile: { id: "profile", title: "Profilo", tab: "profile" },
  convert: { id: "convert", title: "Ricarica TravelPass", isModal: true },
  pmap: { id: "pmap", title: "Partner", tab: "discover" },
  qr: { id: "qr", title: "Paga QR", isModal: true },
  success: { id: "success", title: "Successo", isModal: true },
  "smartlens-monument": {
    id: "smartlens-monument",
    title: "Smart Lens · David",
    isModal: true
  },
  "smartlens-menu": {
    id: "smartlens-menu",
    title: "Smart Lens · Menu",
    isModal: true
  },
  group: { id: "group", title: "Viaggio di gruppo", isModal: true },
  kids: { id: "kids", title: "Kids mode", isModal: true },
  event: { id: "event", title: "Live radar", isModal: true },
  a11y: { id: "a11y", title: "Accessibilità", isModal: true },
  pass: { id: "pass", title: "TravelPass Store", isModal: true }
};

export const POIS: Poi[] = [
  {
    id: "duomo",
    name: "Cupola del Brunelleschi",
    location: "Piazza del Duomo · Firenze",
    rating: 4.8,
    distance: "250m",
    thumb: "accent",
    description:
      "Ti consiglio di salire alle 8:15: niente fila, luce radente sui mattoni. 18€ ticket, il mio audio in italiano."
  },
  {
    id: "mercato",
    name: "Mercato Centrale",
    location: "San Lorenzo",
    rating: 4.6,
    distance: "400m",
    thumb: "sage"
  },
  {
    id: "bardini",
    name: "Giardino Bardini",
    location: "Oltrarno",
    rating: 4.7,
    distance: "1.1km",
    thumb: "ink"
  },
  {
    id: "uffizi",
    name: "Galleria degli Uffizi",
    location: "Piazzale degli Uffizi",
    rating: 4.9,
    distance: "320m",
    thumb: "accent"
  }
];

export const SCREEN_SHOWCASE: {
  id: ScreenId;
  label: string;
  group: string;
}[] = [
  { id: "welcome", label: "Welcome", group: "Onboarding" },
  { id: "chat", label: "Iris · Chat", group: "Onboarding" },
  { id: "map", label: "Mappa", group: "Scoperta" },
  { id: "detail", label: "POI · Dettaglio", group: "Scoperta" },
  { id: "ar", label: "AR 3D", group: "Scoperta" },
  { id: "smartlens-monument", label: "Smart Lens · Monumento", group: "Scoperta" },
  { id: "smartlens-menu", label: "Smart Lens · Menu", group: "Scoperta" },
  { id: "event", label: "Live Radar", group: "Scoperta" },
  { id: "itinerary", label: "Itinerario AI", group: "Viaggio" },
  { id: "player", label: "Audio Iris", group: "Viaggio" },
  { id: "kids", label: "Kids mode", group: "Viaggio" },
  { id: "group", label: "Group trip", group: "Viaggio" },
  { id: "a11y", label: "Accessibilità", group: "Viaggio" },
  { id: "pass", label: "TravelPass Store", group: "Payments" },
  { id: "wallet", label: "Wallet", group: "Payments" },
  { id: "convert", label: "Ricarica/FX", group: "Payments" },
  { id: "pmap", label: "Partner", group: "Payments" },
  { id: "qr", label: "QR Pay", group: "Payments" },
  { id: "success", label: "Success", group: "Payments" },
  { id: "checkout", label: "Checkout", group: "Payments" },
  { id: "profile", label: "Profilo", group: "Account" }
];

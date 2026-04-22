export type ScreenId =
  | "welcome"
  | "chat"
  | "map"
  | "detail"
  | "ar"
  | "wallet"
  | "itinerary"
  | "player"
  | "checkout"
  | "profile"
  | "convert"
  | "pmap"
  | "qr"
  | "success"
  | "smartlens-monument"
  | "smartlens-menu"
  | "group"
  | "kids"
  | "event"
  | "a11y"
  | "pass";

export type TabId = "map" | "itinerary" | "wallet" | "discover" | "profile";

export interface Poi {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance: string;
  thumb: "accent" | "sage" | "ink";
  description?: string;
}

export interface Screen {
  id: ScreenId;
  title: string;
  subtitle?: string;
  tab?: TabId;
  isModal?: boolean;
}

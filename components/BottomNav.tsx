"use client";
import type { TabId } from "../lib/types";

const ITEMS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "map",
    label: "Mappa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
  {
    id: "itinerary",
    label: "Viaggio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    )
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="14" rx="3" />
        <path d="M22 11h-5a3 3 0 0 0 0 6h5" />
      </svg>
    )
  },
  {
    id: "discover",
    label: "Scopri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.4" />
        <rect x="14" y="3" width="7" height="7" rx="1.4" />
        <rect x="3" y="14" width="7" height="7" rx="1.4" />
        <rect x="14" y="14" width="7" height="7" rx="1.4" />
      </svg>
    )
  },
  {
    id: "profile",
    label: "Profilo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    )
  }
];

export function BottomNav({
  active,
  onChange
}: {
  active: TabId;
  onChange: (t: TabId) => void;
}) {
  return (
    <nav className="bottom-nav" aria-label="Navigazione principale">
      {ITEMS.map((i) => (
        <button
          key={i.id}
          className={`bn-item ${active === i.id ? "active" : ""}`}
          onClick={() => onChange(i.id)}
        >
          {i.icon}
          <span>{i.label}</span>
        </button>
      ))}
    </nav>
  );
}

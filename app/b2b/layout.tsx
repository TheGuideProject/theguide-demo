"use client";

import "./b2b.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* =============================================================================
   TheGuide · B2B Partner Dashboard — shared layout
   Provides the persistent sidebar for all `/b2b/*` routes.
   ============================================================================= */

const IcoDash = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);
const IcoBookings = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IcoOffers = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IcoAnalytics = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IcoReviews = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const IcoPayout = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);
const IcoMenu = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);
const IcoSettings = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: number;
};

const PRIMARY_NAV: NavItem[] = [
  { href: "/b2b", label: "Panoramica", icon: IcoDash },
  { href: "/b2b/prenotazioni", label: "Prenotazioni", icon: IcoBookings, badge: 2 },
  { href: "/b2b/menu", label: "Menu & Offerte", icon: IcoMenu },
  { href: "/b2b/promozioni", label: "Promozioni", icon: IcoOffers },
];

const MANAGEMENT_NAV: NavItem[] = [
  { href: "/b2b/analytics", label: "Analytics", icon: IcoAnalytics },
  { href: "/b2b/recensioni", label: "Recensioni", icon: IcoReviews },
  { href: "/b2b/pagamenti", label: "Pagamenti", icon: IcoPayout },
  { href: "/b2b/impostazioni", label: "Impostazioni", icon: IcoSettings },
];

function NavLink({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const isActive =
    item.href === "/b2b"
      ? currentPath === "/b2b"
      : currentPath === item.href || currentPath.startsWith(item.href + "/");
  return (
    <Link
      href={item.href}
      prefetch={false}
      className={`b2b-nav-item ${isActive ? "active" : ""}`}
    >
      <span className="b2b-nav-ico">{item.icon}</span>
      <span>{item.label}</span>
      {item.badge ? <span className="b2b-nav-badge">{item.badge}</span> : null}
    </Link>
  );
}

export default function B2BLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/b2b";

  return (
    <div className="b2b-root">
      <div className="b2b-shell">
        <aside className="b2b-sidebar">
          <div className="b2b-side-brand">
            <div className="b2b-logo">TG</div>
            <div className="b2b-brand-txt">
              <span className="b2b-brand-main">TheGuide</span>
              <span className="b2b-brand-sub">Partner</span>
            </div>
          </div>

          <div className="b2b-side-section">Principale</div>
          {PRIMARY_NAV.map((n) => (
            <NavLink key={n.href} item={n} currentPath={pathname} />
          ))}

          <div className="b2b-side-section">Gestione</div>
          {MANAGEMENT_NAV.map((n) => (
            <NavLink key={n.href} item={n} currentPath={pathname} />
          ))}

          <div className="b2b-side-foot">
            <div style={{ fontWeight: 700, color: "var(--b2b-ink)", fontSize: 12 }}>
              Piano Partner · Pro
            </div>
            <div>Rinnovo 31 ott 2026</div>
            <div style={{ color: "var(--b2b-accent)", fontWeight: 700, fontSize: 12 }}>
              Aggiungi un locale →
            </div>
          </div>
        </aside>

        <main className="b2b-main">{children}</main>
      </div>
    </div>
  );
}

"use client";

import "./pa.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* =============================================================================
   TheGuide · PA / Comuni Dashboard — shared layout
   Provides the persistent sidebar for all `/pa/*` routes.
   ============================================================================= */

type NavItem = {
  href: string;
  label: string;
  ico: string;
};

const NAV_PRIMARY: NavItem[] = [
  { href: "/pa", ico: "◉", label: "Panoramica" },
  { href: "/pa/flussi", ico: "◎", label: "Flussi turistici" },
  { href: "/pa/attrattori", ico: "◆", label: "Attrattori" },
  { href: "/pa/eventi", ico: "◇", label: "Eventi" },
  { href: "/pa/strutture", ico: "○", label: "Strutture ricettive" }
];

const NAV_SECONDARY: NavItem[] = [
  { href: "/pa/imposta", ico: "⌂", label: "Imposta di soggiorno" },
  { href: "/pa/sostenibilita", ico: "⌘", label: "Sostenibilità" },
  { href: "/pa/segnalazioni", ico: "⚑", label: "Segnalazioni" },
  { href: "/pa/impostazioni", ico: "⚙", label: "Impostazioni" }
];

function isActive(current: string, href: string) {
  if (href === "/pa") return current === "/pa";
  return current === href || current.startsWith(href + "/");
}

function NavLink({ item, current }: { item: NavItem; current: string }) {
  const active = isActive(current, item.href);
  return (
    <Link
      href={item.href}
      prefetch={false}
      className={`pa-nav-item${active ? " active" : ""}`}
    >
      <span className="ico" aria-hidden>{item.ico}</span>
      <span>{item.label}</span>
    </Link>
  );
}

export default function PALayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/pa";

  return (
    <div className="pa-root">
      <aside className="pa-sidebar">
        <div className="pa-brand">
          <div className="pa-logo-mark">TG</div>
          <div className="pa-brand-text">
            <div className="n">TheGuide</div>
            <div className="sub">PA · Comuni</div>
          </div>
        </div>

        <div className="pa-entity">
          <div className="pa-entity-label">Ente attivo</div>
          <div className="pa-entity-name">Comune di Firenze</div>
          <div className="pa-entity-region">Regione Toscana · ISTAT 048017</div>
        </div>

        <nav className="pa-nav">
          <div className="pa-nav-title">Monitoraggio</div>
          {NAV_PRIMARY.map((n) => (
            <NavLink key={n.href} item={n} current={pathname} />
          ))}
          <div className="pa-nav-title">Governance</div>
          {NAV_SECONDARY.map((n) => (
            <NavLink key={n.href} item={n} current={pathname} />
          ))}
        </nav>

        <div className="pa-sidebar-foot">
          <b>Dati aggiornati</b>
          22 apr 2026 · 17:04
          <br />
          Fonti: Istat, Regione Toscana, TheGuide Live, Questura.
        </div>
      </aside>

      <div className="pa-main">{children}</div>
    </div>
  );
}

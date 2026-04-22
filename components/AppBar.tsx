"use client";

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onHub?: () => void;
  variant?: "light" | "dark" | "transparent";
}

export function AppBar({ title, subtitle, onBack, onHub, variant = "light" }: Props) {
  return (
    <div className={`appbar ${variant}`}>
      {onBack ? (
        <button className="ab-btn" onClick={onBack} aria-label="Indietro">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      ) : (
        <span style={{ width: 32 }} />
      )}
      <div className="ab-title">
        <div className="t">{title}</div>
        {subtitle && <div className="s">{subtitle}</div>}
      </div>
      {onHub ? (
        <button className="ab-btn" onClick={onHub} aria-label="Tutte le schermate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.4" />
            <rect x="14" y="3" width="7" height="7" rx="1.4" />
            <rect x="3" y="14" width="7" height="7" rx="1.4" />
            <rect x="14" y="14" width="7" height="7" rx="1.4" />
          </svg>
        </button>
      ) : (
        <span style={{ width: 32 }} />
      )}
    </div>
  );
}

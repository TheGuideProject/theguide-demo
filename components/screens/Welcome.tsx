"use client";
import { StatusBar } from "../PhoneChrome";

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <>
      <div className="s-welcome">
        <StatusBar />
        <div style={{ marginTop: 20 }}>
          <div className="brand-big">
            The<em>Guide</em>
          </div>
          <p className="welcome-sub">
            Scopri l&apos;Italia come non l&apos;hai mai vista.
            <br />
            Una guida intelligente che impara da te.
          </p>
        </div>
        <div className="welcome-illu">
          <div className="illu-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2A241E" strokeWidth={1.4}>
              <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" />
              <circle cx="12" cy="10" r="2.5" fill="#C65D3A" stroke="none" />
            </svg>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="btn btn-dark btn-full" onClick={onStart}>
            Inizia il viaggio
          </button>
          <button className="btn btn-link btn-full" onClick={onStart}>
            Ho già un account · Accedi
          </button>
        </div>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { PhoneFrame } from "./PhoneChrome";
import { BottomNav } from "./BottomNav";
import { AppBar } from "./AppBar";
import { WelcomeScreen } from "./screens/Welcome";
import { ChatScreen } from "./screens/Chat";
import { MapScreen } from "./screens/Map";
import { DetailScreen } from "./screens/Detail";
import { ARScreen } from "./screens/AR";
import { WalletScreen } from "./screens/Wallet";
import { ItineraryScreen } from "./screens/Itinerary";
import { PlayerScreen } from "./screens/Player";
import { CheckoutScreen } from "./screens/Checkout";
import { ProfileScreen } from "./screens/Profile";
import { ConvertScreen } from "./screens/Convert";
import { PartnerMapScreen } from "./screens/PartnerMap";
import { QRScreen } from "./screens/QR";
import { SuccessScreen } from "./screens/Success";
import { SmartLensMonument, SmartLensMenu } from "./screens/SmartLens";
import { GroupScreen } from "./screens/Group";
import { KidsScreen } from "./screens/Kids";
import { EventScreen } from "./screens/Event";
import { A11YScreen } from "./screens/A11Y";
import { TravelPassScreen } from "./screens/TravelPass";
import { HubScreen } from "./screens/Hub";
import type { ScreenId, TabId } from "../lib/types";
import { SCREEN_SHOWCASE, SCREENS } from "../lib/constants";

const MODAL_META: Partial<Record<ScreenId, { title: string; subtitle?: string; variant?: "light" | "dark" | "transparent" }>> = {
  chat: { title: "Iris · onboarding", subtitle: "AI Guide", variant: "light" },
  detail: { title: "POI", subtitle: "Scheda luogo", variant: "transparent" },
  ar: { title: "AR 3D", subtitle: "Ricostruzione", variant: "dark" },
  player: { title: "Audio Iris", subtitle: "Guida vocale", variant: "dark" },
  checkout: { title: "Checkout", subtitle: "TheGuide Pay", variant: "light" },
  convert: { title: "Ricarica", subtitle: "USD → EUR", variant: "light" },
  qr: { title: "Paga QR", subtitle: "Slide-to-pay", variant: "light" },
  success: { title: "Ricevuta", subtitle: "Pagato", variant: "light" },
  "smartlens-monument": { title: "Smart Lens", subtitle: "Monumento", variant: "dark" },
  "smartlens-menu": { title: "Smart Menu", subtitle: "Menu IT→EN", variant: "light" },
  group: { title: "Gruppo", subtitle: "Vota e dividi", variant: "light" },
  kids: { title: "Kids mode", subtitle: "Caccia al tesoro", variant: "light" },
  event: { title: "Live Radar", subtitle: "Eventi ora", variant: "light" },
  a11y: { title: "Accessibilità", subtitle: "High contrast", variant: "dark" },
  pass: { title: "TravelPass Store", subtitle: "5 tier", variant: "dark" }
};

export default function App() {
  const [tab, setTab] = useState<TabId>("discover");
  const [modal, setModal] = useState<ScreenId | null>("welcome");
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [activePoi, setActivePoi] = useState<string>("duomo");

  const openModal = (id: ScreenId) => {
    setHistory((h) => (modal ? [...h, modal] : h));
    setModal(id);
  };

  const closeModal = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setModal(prev);
    } else {
      setModal(null);
    }
  };

  const closeAll = () => {
    setHistory([]);
    setModal(null);
  };

  const goHub = () => {
    setTab("discover");
    closeAll();
  };

  const jumpTo = (id: ScreenId) => {
    const tabs: Record<string, TabId> = {
      map: "map",
      itinerary: "itinerary",
      wallet: "wallet",
      profile: "profile"
    };
    if (tabs[id]) {
      setTab(tabs[id]);
      closeAll();
    } else {
      openModal(id);
    }
  };

  const openPoi = (id: string) => {
    setActivePoi(id);
    openModal("detail");
  };

  const renderTab = () => {
    switch (tab) {
      case "map":
        return <MapScreen onOpenDetail={openPoi} onOpenAR={() => openModal("ar")} onJump={jumpTo} />;
      case "itinerary":
        return <ItineraryScreen onJump={jumpTo} />;
      case "wallet":
        return (
          <WalletScreen
            onQR={() => openModal("qr")}
            onTopUp={() => openModal("convert")}
            onPartners={() => setTab("discover")}
            onPass={() => openModal("pass")}
            onReceipt={() => openModal("success")}
          />
        );
      case "discover":
        return <HubScreen onJump={jumpTo} />;
      case "profile":
        return (
          <ProfileScreen
            onKids={() => openModal("kids")}
            onA11y={() => openModal("a11y")}
            onGroup={() => openModal("group")}
            onJump={jumpTo}
          />
        );
    }
  };

  const renderModal = () => {
    if (!modal) return null;
    switch (modal) {
      case "welcome":
        return <WelcomeScreen onStart={() => openModal("chat")} />;
      case "chat":
        return <ChatScreen onDone={() => { setTab("itinerary"); closeAll(); }} />;
      case "detail":
        return (
          <DetailScreen
            poiId={activePoi}
            onBack={closeModal}
            onPlay={() => openModal("player")}
            onAR={() => openModal("ar")}
            onCheckout={() => openModal("checkout")}
            onAddItinerary={() => { setTab("itinerary"); closeAll(); }}
          />
        );
      case "ar":
        return <ARScreen onClose={closeModal} />;
      case "player":
        return <PlayerScreen onClose={closeModal} onIris={() => openModal("chat")} />;
      case "checkout":
        return (
          <CheckoutScreen
            onClose={closeModal}
            onSuccess={() => openModal("success")}
          />
        );
      case "convert":
        return (
          <ConvertScreen onClose={closeModal} onSuccess={() => openModal("success")} />
        );
      case "pmap":
        return <PartnerMapScreen onQR={() => openModal("qr")} onCheckout={() => openModal("checkout")} />;
      case "qr":
        return <QRScreen onClose={closeModal} onSuccess={() => openModal("success")} />;
      case "success":
        return <SuccessScreen onClose={() => { setTab("wallet"); closeAll(); }} />;
      case "smartlens-monument":
        return <SmartLensMonument onClose={closeModal} />;
      case "smartlens-menu":
        return <SmartLensMenu onClose={closeModal} />;
      case "group":
        return <GroupScreen onClose={closeModal} />;
      case "kids":
        return <KidsScreen onClose={closeModal} />;
      case "event":
        return <EventScreen onClose={closeModal} />;
      case "a11y":
        return <A11YScreen onClose={closeModal} />;
      case "pass":
        return (
          <TravelPassScreen
            onClose={closeModal}
            onCheckout={() => openModal("checkout")}
          />
        );
      default:
        return null;
    }
  };

  const modalMeta = modal ? MODAL_META[modal] : null;
  const showAppBar = modal && modal !== "welcome" && modal !== "chat" && modal !== "detail" && modal !== "ar" && modal !== "player" && modal !== "a11y" && modal !== "pass";

  return (
    <div className="stage">
      <div className="stage-inner">
        <header className="brand-bar">
          <div className="brand">
            <div className="logo-mark">TG</div>
            The<em>Guide</em>
          </div>
          <div className="meta">
            <span>
              <span className="dot" />
              Demo interattivo · Iris v1
            </span>
            <a
              className="tag-live"
              href="https://github.com/TheGuideProject"
              target="_blank"
              rel="noreferrer"
            >
              ★ GitHub
            </a>
          </div>
        </header>

        <div className="hero-copy">
          <span className="kicker">Pitch Deck 2026 · Mockup Prodotto</span>
          <h1>
            L&apos;AI travel companion <em>per l&apos;Italia</em>.
          </h1>
          <p>
            Prova l&apos;app direttamente sullo schermo qui sotto. Usa la tab-bar,
            apri il menu <b>Scopri</b> per saltare tra schermate, tocca pin, scansiona
            QR, paga col TravelPass. Tutto il flusso è navigabile come un&apos;app reale.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <PhoneFrame>
            <div className="app">
              {renderTab()}
              <BottomNav active={tab} onChange={(t) => { setTab(t); closeAll(); }} />
            </div>
            {modal && (
              <div
                style={{
                  position: "absolute",
                  inset: 10,
                  borderRadius: 36,
                  overflow: "hidden",
                  background: "var(--bg)",
                  zIndex: 40,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {showAppBar && modalMeta && (
                  <AppBar
                    title={modalMeta.title}
                    subtitle={modalMeta.subtitle}
                    onBack={closeModal}
                    onHub={goHub}
                    variant={modalMeta.variant}
                  />
                )}
                <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  {renderModal()}
                </div>
              </div>
            )}
          </PhoneFrame>

          <div
            style={{
              maxWidth: 320,
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 18,
              padding: 18,
              boxShadow: "var(--shadow)"
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: ".12em",
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: 12
              }}
            >
              Scorciatoie · 21 schermate
            </div>
            {Array.from(new Set(SCREEN_SHOWCASE.map((s) => s.group))).map((g) => (
              <div key={g} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--ink-2)",
                    marginBottom: 6
                  }}
                >
                  {g}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {SCREEN_SHOWCASE.filter((s) => s.group === g).map((s) => {
                    const isActive =
                      modal === s.id ||
                      (modal === null && (SCREENS[s.id]?.tab ?? null) === tab);
                    return (
                      <button
                        key={s.id}
                        className="chip"
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          background: isActive ? "var(--accent)" : "var(--surface)",
                          color: isActive ? "#fff" : "var(--ink-2)",
                          borderColor: isActive ? "var(--accent)" : "var(--line)"
                        }}
                        onClick={() => jumpTo(s.id)}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div
              style={{
                borderTop: "1px solid var(--line)",
                marginTop: 8,
                paddingTop: 12,
                fontSize: 11,
                color: "var(--muted)",
                lineHeight: 1.55
              }}
            >
              La demo si comporta come un&apos;app reale: apri il menu <b>Scopri</b>{" "}
              (tab-bar), oppure usa il pulsante ⟵ in alto per tornare indietro e ▦
              per saltare ovunque.
            </div>
          </div>
        </div>

        <div className="footer-info">
          <div className="pills">
            <span className="pill">AI · Iris</span>
            <span className="pill">AR · ARKit</span>
            <span className="pill">TravelPass</span>
            <span className="pill">TheGuide Pay</span>
            <span className="pill">B2B · Dashboard</span>
          </div>
          <p>
            TheGuide è una proposta di investimento pre-seed. Il prodotto è in
            fase di concept; tutti i dati mostrati sono segnaposto.{" "}
            <a href="mailto:info@theguide.pro">info@theguide.pro</a>
          </p>
          <p style={{ marginTop: 10, fontSize: 11 }}>
            © 2026 Jacopo Quaresima · Documento e demo riservati.
          </p>
        </div>
      </div>
    </div>
  );
}

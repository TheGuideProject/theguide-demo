"use client";
import { useState } from "react";
import { PhoneFrame } from "./PhoneChrome";
import { BottomNav } from "./BottomNav";
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
import type { ScreenId, TabId } from "../lib/types";
import { SCREEN_SHOWCASE } from "../lib/constants";

export default function App() {
  const [tab, setTab] = useState<TabId>("map");
  const [modal, setModal] = useState<ScreenId | null>("welcome");
  const [activePoi, setActivePoi] = useState<string>("duomo");

  const closeModal = () => setModal(null);

  const jumpTo = (id: ScreenId) => {
    const tabs: Record<string, TabId> = {
      map: "map",
      itinerary: "itinerary",
      wallet: "wallet",
      pmap: "discover",
      profile: "profile"
    };
    if (tabs[id]) {
      setTab(tabs[id]);
      setModal(null);
    } else {
      setModal(id);
    }
  };

  const openPoi = (id: string) => {
    setActivePoi(id);
    setModal("detail");
  };

  const renderTab = () => {
    switch (tab) {
      case "map":
        return <MapScreen onOpenDetail={openPoi} onOpenAR={() => setModal("ar")} />;
      case "itinerary":
        return <ItineraryScreen />;
      case "wallet":
        return (
          <WalletScreen
            onQR={() => setModal("qr")}
            onTopUp={() => setModal("convert")}
            onPartners={() => setTab("discover")}
            onPass={() => setModal("pass")}
          />
        );
      case "discover":
        return <PartnerMapScreen onQR={() => setModal("qr")} />;
      case "profile":
        return (
          <ProfileScreen
            onKids={() => setModal("kids")}
            onA11y={() => setModal("a11y")}
            onGroup={() => setModal("group")}
          />
        );
    }
  };

  const renderModal = () => {
    if (!modal) return null;
    switch (modal) {
      case "welcome":
        return <WelcomeScreen onStart={() => setModal("chat")} />;
      case "chat":
        return <ChatScreen onDone={() => { setTab("itinerary"); setModal(null); }} />;
      case "detail":
        return (
          <DetailScreen
            poiId={activePoi}
            onBack={closeModal}
            onPlay={() => setModal("player")}
            onAR={() => setModal("ar")}
            onCheckout={() => setModal("checkout")}
          />
        );
      case "ar":
        return <ARScreen onClose={closeModal} />;
      case "player":
        return <PlayerScreen onClose={closeModal} onIris={() => setModal("chat")} />;
      case "checkout":
        return (
          <CheckoutScreen
            onClose={closeModal}
            onSuccess={() => setModal("success")}
          />
        );
      case "convert":
        return (
          <ConvertScreen onClose={closeModal} onSuccess={() => setModal("success")} />
        );
      case "qr":
        return <QRScreen onClose={closeModal} onSuccess={() => setModal("success")} />;
      case "success":
        return <SuccessScreen onClose={() => { setTab("wallet"); setModal(null); }} />;
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
            onCheckout={() => setModal("checkout")}
          />
        );
      default:
        return null;
    }
  };

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
            Prova l&apos;app direttamente sullo schermo qui sotto. Tocca i pin, attiva
            l&apos;AR, scansiona un QR, paga col TravelPass. Tutto quello che vedi
            è un concept interattivo, non un prodotto in produzione.
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
              <BottomNav active={tab} onChange={setTab} />
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
                {renderModal()}
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
              Prova tutti i 21 schermi
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
                  {SCREEN_SHOWCASE.filter((s) => s.group === g).map((s) => (
                    <button
                      key={s.id}
                      className="chip"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background:
                          (modal === s.id ||
                            (modal === null && s.id === (tab === "discover" ? "pmap" : tab)))
                            ? "var(--accent)"
                            : "var(--surface)",
                        color:
                          (modal === s.id ||
                            (modal === null && s.id === (tab === "discover" ? "pmap" : tab)))
                            ? "#fff"
                            : "var(--ink-2)",
                        borderColor:
                          modal === s.id ? "var(--accent)" : "var(--line)"
                      }}
                      onClick={() => jumpTo(s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
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
              Il demo imita un iPhone. Usa la tab-bar in basso, apri i pin sulla
              mappa, o salta tra schermi con queste scorciatoie.
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

"use client";
import { StatusBar } from "../PhoneChrome";

interface Props {
  onQR: () => void;
  onTopUp: () => void;
  onPartners: () => void;
  onPass: () => void;
}

export function WalletScreen({ onQR, onTopUp, onPartners, onPass }: Props) {
  return (
    <>
      <StatusBar />
      <div className="s-wallet">
        <div className="wallet-hero">
          <div className="label">TravelPass · Saldo</div>
          <div className="amount">
            124,50<small>€</small>
          </div>
          <div className="cashback">
            ↑ Hai guadagnato <b style={{ marginLeft: 4 }}>€8,75</b>
            <span style={{ marginLeft: 4 }}>questa settimana</span>
          </div>
        </div>

        <div className="wallet-actions">
          <button className="w-action" onClick={onQR}>
            <div className="ico">📷</div>
            Paga QR
          </button>
          <button className="w-action" onClick={onTopUp}>
            <div className="ico">＋</div>
            Ricarica
          </button>
          <button className="w-action" onClick={onPass}>
            <div className="ico">🎟</div>
            Pass
          </button>
          <button className="w-action" onClick={onPartners}>
            <div className="ico">◉</div>
            Partner
          </button>
        </div>

        <div className="w-section-title">Ultime transazioni</div>
        <Txn icon="🍝" title="Trattoria Mario" sub="Firenze · oggi 13:24" amount="−€35,00" cb="+€1,75" />
        <Txn icon="🏛" title="Uffizi · skip-the-line" sub="Partner · ieri 14:30" amount="−€26,00" cb="+€0,00" muted />
        <Txn icon="🍷" title="Enoteca Pitti" sub="ieri 19:45" amount="−€42,00" cb="+€2,10" />
        <Txn icon="＋" title="Ricarica · Apple Pay" sub="15 apr · 08:12" amount="+€150,00" cb="" muted />
        <Txn icon="🎁" title="Cashback weekend" sub="partner network" amount="+€8,75" cb="" />

        <div style={{ height: 16 }} />
      </div>
    </>
  );
}

function Txn({
  icon,
  title,
  sub,
  amount,
  cb,
  muted
}: {
  icon: string;
  title: string;
  sub: string;
  amount: string;
  cb: string;
  muted?: boolean;
}) {
  return (
    <div className="txn">
      <div className="icon">{icon}</div>
      <div className="mid">
        <div className="t">{title}</div>
        <div className="s">{sub}</div>
      </div>
      <div className="right">
        <div className="amt">{amount}</div>
        {cb && !muted && <div className="cb">{cb} cashback</div>}
        {muted && cb === "" && (
          <div className="cb" style={{ color: "var(--muted)" }}>—</div>
        )}
      </div>
    </div>
  );
}

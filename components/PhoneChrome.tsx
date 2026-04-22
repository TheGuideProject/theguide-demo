"use client";
import type { ReactNode } from "react";

export function StatusBar({
  variant = "light"
}: {
  variant?: "light" | "dark" | "a11y";
}) {
  return (
    <div className={`statusbar ${variant === "dark" ? "dark" : variant === "a11y" ? "a11y" : ""}`}>
      <span>9:41</span>
      <div className="right">
        <span>5G</span>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone" role="presentation">
      <div className="phone-inner">{children}</div>
    </div>
  );
}

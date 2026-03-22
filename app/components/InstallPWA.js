"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function InstallPWA() {
  useEffect(() => {
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;

      const btn = document.getElementById("installBtn");
      if (btn) btn.style.display = "flex";
    });

    window.installApp = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
      }
    };
  }, []);

  return (
    <button
      id="installBtn"
      onClick={() => window.installApp()}
      style={{
        display: "none",
        position: "fixed",
        bottom: 20,
        right: 20,
        padding: "10px 15px",
        background: "#059669", // emerald color (your theme)
        color: "white",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* LOGO */}
      <Image
        src="/app_logo.png"   // 👈 public folder এ রাখতে হবে
        alt="App Logo"
        width={30}
        height={30}
        style={{ borderRadius: "6px" }}
      />

      {/* TEXT */}
      <div style={{ textAlign: "left" }}>
        <div style={{ fontWeight: "bold", fontSize: "14px" }}>
        প্রবাসী মুক্ত ফান্ড
        </div>
        <div style={{ fontSize: "14px", opacity: 0.9 }}>
          Install App
        </div>
      </div>
    </button>
  );
}
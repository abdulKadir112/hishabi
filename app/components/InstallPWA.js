
"use client";

import { useEffect } from "react";

export default function InstallPWA() {
  useEffect(() => {
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;

      const btn = document.getElementById("installBtn");
      if (btn) btn.style.display = "block";
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
        background: "black",
        color: "white",
        borderRadius: 8,
      }}
    >
      Install App
    </button>
  );
}
import styles from "./PWA.module.scss";
import React, { useEffect, useState } from "react";

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowButton(false);
      }
    }
  };

  if (!showButton) return null;

  return (
    <div className={styles.installWrapper}>
      <button onClick={handleInstallClick} className={styles.installBtn}>
        Установить Finly
      </button>
    </div>
  );
};

export default InstallPWAButton;

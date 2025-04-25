// src/components/ThemeSelector/index.jsx
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./ThemeSelector.module.scss";

const themes = ["pixel", "cyberpunk", "fantasy", "ios", "iosDark", "iosAuto"];

const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  return (
    <div className={styles.selector}>
      {themes.map((theme) => (
        <button
          key={theme}
          className={`${styles.button} ${currentTheme === theme ? styles.active : ""}`}
          onClick={() => setCurrentTheme(theme)}
        >
          {theme}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;

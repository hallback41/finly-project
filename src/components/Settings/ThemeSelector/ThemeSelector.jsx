import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import styles from "./ThemeSelector.module.scss";

const themes = ["pixel", "cyberpunk", "fantasy", "ios", "iosDark", "iosAuto"];

const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <div className={styles.selector}>
      <h2 className={styles["selector__title"]}>{t("Theme")}</h2>
      <div className={styles["selector__body"]}>
        {themes.map((theme) => (
          <button
            key={theme}
            className={`${styles["selector__button"]} ${currentTheme === theme ? styles.active : ""}`}
            onClick={() => setCurrentTheme(theme)}
          >
            {t(theme)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;

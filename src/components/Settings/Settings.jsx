import styles from "./Settings.module.scss";
import ThemeVideoBackground from "../CategoriesBlock/ThemeVideoBackground";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import LoginSection from "./LoginSection/LoginSection";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import CurrencySelector from "./CurrencySelector/CurrencySelector";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import AboutMe from "./AboutMe/AboutMe";
import InstallPWAButton from "./PWA/PWA";

const Settings = () => {
  const { currentTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`${styles.settings} container`}>
      <ThemeVideoBackground theme={currentTheme} />
      <div className={styles["settings__content"]}>
        <h1 className={styles["settings__title"]}>{t("Settings")}</h1>
        <ThemeSelector />
        <LoginSection />
        <LanguageSelector />
        <CurrencySelector />
        <InstallPWAButton />
        <AboutMe />
      </div>
    </div>
  );
};

export default Settings;

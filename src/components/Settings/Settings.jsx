import styles from "./Settings.module.scss";
import ThemeVideoBackground from "../CategoriesBlock/ThemeVideoBackground";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import LoginSection from "./LoginSection/LoginSection";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import CurrencySelector from "./CurrencySelector/CurrencySelector";
import { useTheme } from "@/context/ThemeContext";
import AddTestExpensesButton from "../tests/AddTestExpensesButton";

const Settings = () => {
  const { currentTheme } = useTheme();

  return (
    <div className={`${styles.settings} container`}>
      <AddTestExpensesButton />
      <ThemeVideoBackground theme={currentTheme} />
      <div className={styles["settings__content"]}>
        <h1 className={styles["settings__title"]}>Settings</h1>
        <ThemeSelector />
        <LoginSection />
        <LanguageSelector />
        <CurrencySelector />
      </div>
    </div>
  );
};

export default Settings;

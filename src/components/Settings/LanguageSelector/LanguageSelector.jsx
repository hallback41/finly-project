import { useTranslation } from "react-i18next";
import styles from "./LanguageSelector.module.scss";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "uk", name: "Українська ❤️" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "ru", name: "Русский" },
];

const LanguageSelector = ({ value, onChange }) => {
  const { t, i18n } = useTranslation();

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className={styles.languageSelector}>
      <h2 className={styles.languageSelector__title}>{t("Select Language")}</h2>
      <div className={styles.languageSelector__buttons}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            className={
              value === lang.code ? `${styles.languageSelector__btn} ${styles.active}` : styles.languageSelector__btn
            }
            onClick={() => handleChange(lang.code)}
            type="button"
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;

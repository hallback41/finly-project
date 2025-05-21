import styles from "./LanguageSelector.module.scss";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "uk", name: "Українська" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "ru", name: "Русский" },
];

const LanguageSelector = ({ value, onChange }) => {
  return (
    <div className={styles.languageSelector}>
      <h2 className={styles.languageSelector__title}>Select Language:</h2>
      <div className={styles.languageSelector__buttons}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            className={
              value === lang.code ? `${styles.languageSelector__btn} ${styles.active}` : styles.languageSelector__btn
            }
            onClick={() => onChange && onChange(lang.code)}
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

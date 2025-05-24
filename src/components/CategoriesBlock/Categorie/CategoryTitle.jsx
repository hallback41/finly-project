import { useTranslation } from "react-i18next";
import styles from "./Categorie.module.scss";

const CategoryTitle = ({ name, theme }) => {
  const { t } = useTranslation();
  const isCyberpunk = theme === "cyberpunk";
  return (
    <div className={styles["categorie__title"]}>
      <h3 className={styles["categorie__title-text"]}>
        {t(name)}
        {isCyberpunk && (
          <>
            <span className="glitch-top" aria-hidden="true">
              {t(name)}
            </span>
            <span className="glitch-bottom" aria-hidden="true">
              {t(name)}
            </span>
          </>
        )}
      </h3>
      <h3 className={styles["categorie__title-text-overlay"]}>{t(name)}</h3>
    </div>
  );
};

export default CategoryTitle;

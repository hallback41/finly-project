import styles from "./Categorie.module.scss";

const CategoryTitle = ({ name, theme }) => {
  const isCyberpunk = theme === "cyberpunk";
  return (
    <div className={styles["categorie__title"]}>
      <h3 className={styles["categorie__title-text"]}>
        {name}
        {isCyberpunk && (
          <>
            <span className="glitch-top" aria-hidden="true">
              {name}
            </span>
            <span className="glitch-bottom" aria-hidden="true">
              {name}
            </span>
          </>
        )}
      </h3>
      <h3 className={styles["categorie__title-text-overlay"]}>{name}</h3>
    </div>
  );
};

export default CategoryTitle;

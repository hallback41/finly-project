import styles from "./Categorie.module.scss";

const CategorieLogo = ({ theme, icon, id }) => {
  const isCyberpunk = theme === "cyberpunk";

  return (
    <div
      className={styles["categorie__logo"]}
      style={
        isCyberpunk
          ? {
              backgroundImage: `url(${icon})`,
              "--logo-url": `url(${icon})`,
            }
          : undefined
      }
    >
      <img className={styles["categorie__logo-img"]} src={icon} alt={id} loading="lazy" />
    </div>
  );
};

export default CategorieLogo;

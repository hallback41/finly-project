import styles from "./Categorie.module.scss";
import React, { useState } from "react";
import CategorieFormInput from "../CategorieFormInput";
import allIcons from "../../../utils/getCategoryIcon";
import { useTheme } from "../../../context/ThemeContext";
import { AnimatePresence } from "framer-motion";
import FadeSlideIn from "../../UI/motion";
import backgrounds from "@/utils/getCategoryBackgrounds";

const Categorie = ({ name, id, isEditing, onActivate, shouldPulse }) => {
  const [hasError, setHasError] = useState(false);
  const { currentTheme } = useTheme();
  const icon = allIcons?.[currentTheme]?.[id];
  const backgroundImage = backgrounds?.[currentTheme]?.[id];

  const handleSubmit = (amount) => {
    console.log("added to category", id, amount);
    onActivate(null);
  };

  const handleClick = (e) => {
    const clickedInsideForm = e.target.closest(`.${styles["categorie__form"]}`);
    if (clickedInsideForm) return;

    onActivate(id);
  };

  const classNames = [
    styles.categorie,
    styles[`categorie--${id}`],
    hasError && styles["categorie--error"],
    isEditing && styles["categorie--active"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      onClick={handleClick}
      className={`categorie ${classNames}`}
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
    >
      <div className={styles["categorie__wrapper"]}>
        <div
          className={styles["categorie__logo"]}
          style={
            currentTheme === "cyberpunk"
              ? {
                  backgroundImage: `url(${icon})`,
                  "--logo-url": `url(${icon})`,
                }
              : undefined
          }
        >
          <img className={styles["categorie__logo-img"]} src={icon} alt={id} />
        </div>

        <div className={styles["categorie__title"]}>
          <h3 className={styles["categorie__title-text"]}>
            {name}
            {currentTheme === "cyberpunk" && (
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
      </div>

      <AnimatePresence>
        {isEditing && (
          <FadeSlideIn className={styles["categorie__form"]} direction="top" duration={0.3} trigger={id}>
            <CategorieFormInput name={name} id={id} onSubmit={handleSubmit} setHasError={setHasError} />
          </FadeSlideIn>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Categorie;

import styles from "./Categorie.module.scss";
import React, { useState } from "react";
import CategorieFormInput from "../CategorieFormInput";
import allIcons from "../../../utils/getCategoryIcon";
import { useTheme } from "../../../context/ThemeContext";
import { AnimatePresence } from "framer-motion";
import FadeSlideIn from "../../UI/motion";
import backgrounds from "@/utils/getCategoryBackgrounds";
import CategorieLogo from "./CategorieLogo";
import CategoryTitle from "./CategoryTitle";

const getClassNames = ({ id, hasError, isEditing }) => {
  return [
    styles.categorie,
    styles[`categorie--${id}`],
    hasError && styles["categorie--error"],
    isEditing && styles["categorie--active"],
  ]
    .filter(Boolean)
    .join(" ");
};

const Categorie = ({ name, id, isEditing, onActivate }) => {
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

  return (
    <li
      onClick={handleClick}
      className={`categorie ${getClassNames({ id, hasError, isEditing })}`}
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
    >
      <div className={styles["categorie__wrapper"]}>
        <CategorieLogo theme={currentTheme} icon={icon} id={id} />

        <CategoryTitle name={name} theme={currentTheme} />
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

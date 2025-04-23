import styles from "./CategoriesBlock.module.scss";
import React, { useCallback, useState } from "react";
import Categorie from "./Categorie";
import { useTheme } from "@/context/ThemeContext";
import ThemeVideoBackground from "./ThemeVideoBackground";

const CategoriesBlock = ({ categoriesData }) => {
  const [activeId, setActiveId] = useState(null);
  const { currentTheme } = useTheme();

  const handleActivate = useCallback((id) => {
    setActiveId(id);
  }, []);

  return (
    <section className={`${styles.categories} container`}>
      <ThemeVideoBackground theme={currentTheme} />

      <ul className={styles["categories__list"]}>
        {categoriesData.map(({ id, name }) => (
          <Categorie key={id} id={id} name={name} isEditing={activeId === id} onActivate={handleActivate} />
        ))}
      </ul>
    </section>
  );
};

export default CategoriesBlock;

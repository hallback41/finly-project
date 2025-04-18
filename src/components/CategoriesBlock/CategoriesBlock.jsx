import styles from "./CategoriesBlock.module.scss";
import React, { useState } from "react";
import Categorie from "./Categorie";
import { useTheme } from "@/context/ThemeContext";

const CategoriesBlock = ({ categoriesData }) => {
  const [activeId, setActiveId] = useState(null);
  const { currentTheme } = useTheme();

  const handleActivate = (id) => {
    setActiveId(id);
  };

  return (
    <section className={`${styles.categories} container`}>
      {currentTheme === "ios" && (
        <video className={styles["categories__bg-video"]} autoPlay loop muted playsInline preload="auto">
          <source src="/public/videos/ios-bg.mp4" type="video/mp4" />
        </video>
      )}
      {currentTheme === "iosDark" && (
        <video className={styles["categories__bg-video"]} autoPlay loop muted playsInline preload="auto">
          <source src="/public/videos/ios-bg-dark.mp4" type="video/mp4" />
        </video>
      )}

      <ul className={styles["categories__list"]}>
        {categoriesData.map(({ id, name }) => (
          <Categorie key={id} id={id} name={name} isEditing={activeId === id} onActivate={handleActivate} />
        ))}
      </ul>
    </section>
  );
};

export default CategoriesBlock;

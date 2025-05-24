import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./CategorieFormInput.module.scss";
import allIcons from "../../../utils/getCategoryIcon";
import { useTheme } from "../../../context/ThemeContext";
import { useDatabase } from "../../../context/DataBaseContext";
import { useTranslation } from "react-i18next";

const CategorieFormInput = ({ name, id, setHasError, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const inputRef = useRef(null);
  const { currentTheme } = useTheme();
  const { updateCategorie, categories } = useDatabase();
  const { t } = useTranslation();

  const icon = allIcons?.[currentTheme]?.[id];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const numericValue = Number(amount);

      if (!amount || isNaN(numericValue)) {
        setHasError(true);
        setTimeout(() => setHasError(false), 300);
        return;
      }

      const currentCategorie = categories.find((cat) => cat.id === id);
      const newExpense = {
        id: crypto.randomUUID(),
        amount: numericValue,
        date: new Date().toISOString(),
      };

      console.log("adding expence:", categories);

      updateCategorie(id, {
        expenses: [...currentCategorie.expenses, newExpense],
      });

      console.log(`Categ. "${name}" updated`);

      setAmount("");
      onSuccess();
    },
    [amount, setHasError, updateCategorie, categories, id]
  );

  return (
    <div className={styles["form__wrapper"]}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["form__img"]}>
          <img src={icon} alt={id} />
        </div>

        <div className={styles["form__input-container"]}>
          <input
            ref={inputRef}
            className={styles["form__input"]}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onWheel={(e) => e.target.blur()}
            onKeyDown={(e) => {
              const invalidChars = ["e", "E", "+", "-", ","];
              if (invalidChars.includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {amount === "" && <span className={styles["form__fake-placeholder"]}>?</span>}
        </div>

        <button className={styles["form__btn"]} type="submit">
          {t("ADD")}
        </button>
      </form>
    </div>
  );
};

export default CategorieFormInput;

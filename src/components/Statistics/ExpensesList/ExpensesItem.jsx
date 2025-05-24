import styles from "./ExpensesItem.module.scss";
import React, { useState, useCallback } from "react";
import { formatDate } from "../../../utils/formatDate";
import { useDatabase } from "../../../context/DataBaseContext";
import ConfirmModal from "../../UI/ConfirmModal";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../../../context/CurrencyContext"; // Импортируй хук

const ExpensesItem = ({ id, categoryId, amount, date, category }) => {
  const { removeExpenseFromCategory } = useDatabase();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { currency } = useCurrency(); // Получи объект валюты

  const handleConfirm = useCallback(() => {
    removeExpenseFromCategory(categoryId, id);
    setIsOpen(false);
  }, [id, categoryId, removeExpenseFromCategory]);

  const handleKeyDown = (e) => {
    if (isOpen && e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <>
      <li className={styles.item}>
        <span className={styles["item__date"]}>{formatDate(date)}</span>
        <span className={styles["item__category"]}>{t(category)}</span>
        {/* Используй currency.symbol */}
        <span className={styles["item__amount"]}>
          {amount}
          <span style={{ marginLeft: 4 }}>{currency.symbol}</span>
        </span>
        <button className={styles["item__deleteBtn"]} onClick={() => setIsOpen(true)}>
          {t("Delete")}
        </button>
      </li>

      <ConfirmModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title={t("Delete expense?")}
        confirmText={t("Confirm")}
        cancelText={t("Back")}
        className={styles["item__modal"]}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default ExpensesItem;

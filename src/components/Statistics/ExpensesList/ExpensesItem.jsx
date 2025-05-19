import styles from "./ExpensesItem.module.scss";
import React from "react";
import { formatDate } from "../../../utils/formatDate";
import { useDatabase } from "../../../context/DataBaseContext";
import { useCallback, useState } from "react";
import ConfirmModal from "../../UI/ConfirmModal";

const ExpensesItem = ({ id, categoryId, amount, date, category }) => {
  const { removeExpenseFromCategory } = useDatabase();
  const [isOpen, setIsOpen] = useState(false);

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
        <span className={styles["item__category"]}>{category}</span>
        <span className={styles["item__amount"]}>{`${amount}\u00A0$`}</span>
        <button className={styles["item__deleteBtn"]} onClick={() => setIsOpen(true)}>
          Delete
        </button>
      </li>

      <ConfirmModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="Delete expense?"
        confirmText="Confirm"
        cancelText="Back"
        className={styles["item__modal"]}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default ExpensesItem;

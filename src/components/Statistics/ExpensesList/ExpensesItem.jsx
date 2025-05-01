import styles from "./ExpensesItem.module.scss";
import React from "react";
import { formatDate } from "../../../utils/formatDate";
import { useDatabase } from "../../../context/DataBaseContext";
import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";

const ExpensesItem = ({ id, categoryId, amount, date, category }) => {
  const { removeExpenseFromCategory } = useDatabase();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    removeExpenseFromCategory(categoryId, id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (isOpen && e.key === "Enter") {
        handleConfirm();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

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

      <Modal className={styles["item__modal"]} open={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className={styles["item__modalTitle"]}>Delete expense?</h2>
        <div className={styles["item__modalBtns"]}>
          <button
            className={`${styles["item__modalBtn"]} ${styles["item__modalBtn--back"]}`}
            onClick={() => setIsOpen(false)}
          >
            Back
          </button>
          <button
            className={`${styles["item__modalBtn"]} ${styles["item__modalBtn--confirm"]}`}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ExpensesItem;

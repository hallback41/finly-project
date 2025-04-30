import styles from "./ExpensesItem.module.scss";
import React from "react";
import { formatDate } from "../../../utils/formatDate";
import { useDatabase } from "../../../context/DataBaseContext";

const ExpensesItem = ({ id, categoryId, amount, date, category }) => {
  const { removeExpenseFromCategory } = useDatabase();

  const handleDelete = () => {
    removeExpenseFromCategory(categoryId, id);
  };

  return (
    <li className={styles.item}>
      <span className={styles["item__date"]}>{formatDate(date)}</span>
      <span className={styles["item__category"]}>{category}</span>
      <span className={styles["item__amount"]}>{`${amount}\u00A0$`}</span>
      <button className={styles["item__deleteBtn"]} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default ExpensesItem;

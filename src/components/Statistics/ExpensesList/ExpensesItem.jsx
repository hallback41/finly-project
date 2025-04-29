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
      <span className={styles.date}>{formatDate(date)}</span>
      <span className={styles.category}>{category}</span>
      <span className={styles.amount}>{`${amount}$`}</span>
      <button className={styles.deleteButton} onClick={handleDelete}>
        ✖
      </button>
    </li>
  );
};

export default ExpensesItem;

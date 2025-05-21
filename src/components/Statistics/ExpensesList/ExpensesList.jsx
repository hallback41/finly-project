import styles from "./ExpensesList.module.scss";
import React, { useMemo } from "react";
import ExpensesItem from "./ExpensesItem";

const ExpensesList = ({ expenses }) => {
  const sortedExpenses = useMemo(() => [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)), [expenses]);

  return (
    <ul className={`${styles.list} container`}>
      {sortedExpenses.map((expense) => (
        <ExpensesItem
          key={expense.id}
          id={expense.id}
          categoryId={expense.categoryId}
          amount={expense.amount}
          date={expense.date}
          category={expense.categoryName}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;

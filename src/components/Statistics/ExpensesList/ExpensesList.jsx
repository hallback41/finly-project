import styles from "./ExpensesList.module.scss";
import React, { useMemo } from "react";
import { useDatabase } from "../../../context/DataBaseContext";
import ExpensesItem from "./ExpensesItem";

const ExpensesList = () => {
  const { categories } = useDatabase();

  const allExpenses = useMemo(() => {
    return categories
      .flatMap((cat) =>
        cat.expenses.map((exp) => ({
          ...exp,
          categoryId: cat.id,
          categoryName: cat.name,
        }))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [categories]);

  return (
    <ul className={`${styles.list} container`}>
      {allExpenses.map((expense) => (
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

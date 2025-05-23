import styles from "./ExpensesList.module.scss";
import React, { useMemo } from "react";
import ExpensesItem from "./ExpensesItem";

const ExpensesList = ({ expenses }) => {
  const sortedExpenses = useMemo(() => [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)), [expenses]);

  let lastDay = null;

  return (
    <ul className={`${styles.list} container`}>
      {sortedExpenses.map((expense, idx) => {
        const currDay = new Date(expense.date).toLocaleDateString(); // Можно настроить формат

        const isNewDay = currDay !== lastDay;
        lastDay = currDay;

        return (
          <React.Fragment key={expense.id}>
            {isNewDay && (
              <li className={styles["day-separator"]}>
                <div className={styles["day-separator__line"]}></div>
                <span className={styles["day-separator__date"]}>{currDay}</span>
                <div className={styles["day-separator__line"]}></div>
              </li>
            )}
            <ExpensesItem
              id={expense.id}
              categoryId={expense.categoryId}
              amount={expense.amount}
              date={expense.date}
              category={expense.categoryName}
            />
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default ExpensesList;

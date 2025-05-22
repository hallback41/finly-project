import React from "react";
import styles from "./DataExpensesSelect.module.scss";

const monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DataExpensesSelect = ({ expenses = [], selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) => {
  const yearsWithExpenses = React.useMemo(() => {
    return new Set(expenses.map((exp) => new Date(exp.date).getFullYear()));
  }, [expenses]);

  const thisYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 5 }, (_, i) => thisYear - i).reverse();

  const activeMonths = React.useMemo(() => {
    const set = new Set();
    expenses.forEach((exp) => {
      const d = new Date(exp.date);
      if (d.getFullYear() === selectedYear) set.add(d.getMonth());
    });
    return set;
  }, [expenses, selectedYear]);

  return (
    <div className={styles["expenses-select"]}>
      {/* Враппер для года */}
      <div className={styles["expenses-select__section"]}>
        <span className={styles["expenses-select__title"]}>Year:</span>
        <div className={styles["expenses-select__years"]}>
          {availableYears.map((year) => {
            const hasExpenses = yearsWithExpenses.has(year);
            return (
              <button
                key={year}
                className={[
                  styles["expenses-select__year-btn"],
                  hasExpenses
                    ? styles["expenses-select__year-btn--active"]
                    : styles["expenses-select__year-btn--inactive"],
                  selectedYear === year ? styles["expenses-select__year-btn--selected"] : "",
                ].join(" ")}
                onClick={() => hasExpenses && setSelectedYear(year)}
                disabled={!hasExpenses}
                type="button"
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>

      {/* Враппер для месяцев */}
      <div className={styles["expenses-select__section"]}>
        <span className={styles["expenses-select__title"]}>Month:</span>
        <div className={styles["expenses-select__grid"]}>
          {monthsList.map((month, i) => {
            const isActive = activeMonths.has(i);
            const isSelected = selectedMonth === i;
            return (
              <button
                key={month}
                className={[
                  styles["expenses-select__btn"],
                  isActive ? styles["expenses-select__btn--active"] : styles["expenses-select__btn--inactive"],
                  isSelected ? styles["expenses-select__btn--selected"] : "",
                ].join(" ")}
                onClick={() => isActive && setSelectedMonth(i)}
                disabled={!isActive}
                type="button"
              >
                {month}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataExpensesSelect;

import React from "react";
import styles from "./DataExpensesSelect.module.scss";

const monthsList = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

const DataExpensesSelect = ({ expenses = [], selectedMonth, setSelectedMonth, selectedYear }) => {
  const activeMonths = React.useMemo(() => {
    const set = new Set();
    expenses.forEach((exp) => {
      const d = new Date(exp.date);
      if (!selectedYear || d.getFullYear() === selectedYear) set.add(d.getMonth());
    });
    return set;
  }, [expenses, selectedYear]);

  return (
    <div className={styles["expenses-select"]}>
      <span className={styles["expenses-select__title"]}>Месяц:</span>
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
  );
};

export default DataExpensesSelect;

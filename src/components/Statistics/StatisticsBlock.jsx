import styles from "./StatisticsBlock.module.scss";
import React, { useState, useMemo } from "react";
import ExpensesList from "./ExpensesList/ExpensesList";
import DataExpensesSelect from "./DataExpensesSelect/DataExpensesSelect";
import ThemeVideoBackground from "../CategoriesBlock/ThemeVideoBackground";
import { useDatabase } from "../../context/DataBaseContext";
import { useTheme } from "@/context/ThemeContext";
import Charts from "./ChartsBlock/Charts/Charts";

const StatisticsBlock = () => {
  const { currentTheme } = useTheme();
  const { categories } = useDatabase();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const allExpenses = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.expenses.map((exp) => ({
        ...exp,
        categoryId: cat.id,
        categoryName: cat.name,
      }))
    );
  }, [categories]);

  const filteredExpenses = useMemo(
    () =>
      allExpenses.filter((exp) => {
        const d = new Date(exp.date);
        return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
      }),
    [allExpenses, selectedMonth, selectedYear]
  );

  return (
    <div className={`${styles.statistics} container`}>
      <div className={styles["video-wrapper"]}>
        <ThemeVideoBackground theme={currentTheme} />
        <div className={styles["video-blur"]}></div>
      </div>
      <DataExpensesSelect
        expenses={allExpenses}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <Charts expenses={filteredExpenses} />
      <ExpensesList expenses={filteredExpenses} />
    </div>
  );
};

export default StatisticsBlock;

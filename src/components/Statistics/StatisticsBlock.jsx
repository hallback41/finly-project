import styles from "./StatisticsBlock.module.scss";
import React from "react";
import ExpensesList from "./ExpensesList/ExpensesList";
import DataExpensesSelect from "./DataExpensesSelect/DataExpensesSelect";
import ThemeVideoBackground from "../CategoriesBlock/ThemeVideoBackground";
import { useTheme } from "@/context/ThemeContext";
import Charts from "./ChartsBlock/Charts/Charts";

const StatisticsBlock = () => {
  const { currentTheme } = useTheme();
  return (
    <div className={`${styles.statistics} container`}>
      <div className={styles["video-wrapper"]}>
        <ThemeVideoBackground theme={currentTheme} />
        <div className={styles["video-blur"]}></div>
      </div>
      <DataExpensesSelect />
      <Charts />
      <ExpensesList />
    </div>
  );
};

export default StatisticsBlock;

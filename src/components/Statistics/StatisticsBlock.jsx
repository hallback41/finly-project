import PolarBarChart from "./ChartsBlock/Charts/PolarBarChart/PolarBarChart ";
import BarRaceChart from "./ChartsBlock/Charts/BarRaceChart/BarRaceChart";
import styles from "./StatisticsBlock.module.scss";
import React from "react";
import ExpensesList from "./ExpensesList/ExpensesList";
import ThemeVideoBackground from "../CategoriesBlock/ThemeVideoBackground";
import { useTheme } from "@/context/ThemeContext";

const StatisticsBlock = () => {
  const { currentTheme } = useTheme();
  return (
    <div className={`${styles.statistics} container`}>
      <div className={styles["video-wrapper"]}>
        <ThemeVideoBackground theme={currentTheme} />
        <div className={styles["video-blur"]}></div>
      </div>
      <PolarBarChart />
      <BarRaceChart />
      <ExpensesList />
    </div>
  );
};

export default StatisticsBlock;

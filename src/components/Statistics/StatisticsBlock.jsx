import PolarBarChart from "./ChartsBlock/Charts/PolarBarChart/PolarBarChart ";
import BarRaceChart from "./ChartsBlock/Charts/BarRaceChart/BarRaceChart";
import styles from "./StatisticsBlock.module.scss";
import React from "react";

const StatisticsBlock = () => {
  return (
    <div className={`${styles.statistics} container`}>
      <PolarBarChart />
      <BarRaceChart />
    </div>
  );
};

export default StatisticsBlock;

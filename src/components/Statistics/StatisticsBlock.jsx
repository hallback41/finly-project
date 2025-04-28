import PolarBarChart from "./ChartsBlock/Chart/PolarBarChart ";
import styles from "./StatisticsBlock.module.scss";
import React from "react";

const StatisticsBlock = () => {
  return (
    <div className={`${styles.statistics} container`}>
      <PolarBarChart />
    </div>
  );
};

export default StatisticsBlock;

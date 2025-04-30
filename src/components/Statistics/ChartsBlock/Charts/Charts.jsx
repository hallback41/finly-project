import styles from "./Charts.module.scss";
import PolarBarChart from "./PolarBarChart/PolarBarChart ";
import BarRaceChart from "./BarRaceChart/BarRaceChart";

const Charts = () => {
  return (
    <ul className={styles["charts-list"]}>
      <li className={`${styles["charts-list__item"]} ${styles["charts-list__item--polar"]}`}>
        <PolarBarChart />
      </li>
      <li className={`${styles["charts-list__item"]} ${styles["charts-list__item--bar"]}`}>
        <BarRaceChart />
      </li>
    </ul>
  );
};
export default Charts;

import styles from "./Charts.module.scss";
import PolarBarChart from "./PolarBarChart/PolarBarChart ";
import BarRaceChart from "./BarRaceChart/BarRaceChart";

const Charts = ({ expenses }) => {
  return (
    <ul className={styles["charts-list"]}>
      <li className={`${styles["charts-list__item"]} ${styles["charts-list__item--polar"]}`}>
        <PolarBarChart expenses={expenses} />
      </li>
      <li className={`${styles["charts-list__item"]} ${styles["charts-list__item--bar"]}`}>
        <BarRaceChart expenses={expenses} />
      </li>
    </ul>
  );
};
export default Charts;

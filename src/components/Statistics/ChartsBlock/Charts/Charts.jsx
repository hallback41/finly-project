import styles from "./Charts.module.scss";
import PolarBarChart from "./PolarBarChart/PolarBarChart ";
import BarRaceChart from "./BarRaceChart/BarRaceChart";
import TreemapChart from "./TreemapChart/TreemapChart";
import MonthExpensesBarChart from "./MonthExpensesChart/MonthExpensesChart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Charts = ({ expenses }) => {
  return (
    <ul className={styles["charts-list"]}>
      <li className={`${styles["charts-list__item"]} ${styles["charts-list__item--polar"]}`}>
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <SwiperSlide>
            <MonthExpensesBarChart expenses={expenses} />
          </SwiperSlide>
          <SwiperSlide>
            <TreemapChart categories={expenses} />
          </SwiperSlide>
          <SwiperSlide>
            <PolarBarChart expenses={expenses} />
          </SwiperSlide>
        </Swiper>
      </li>
      <li className={`${styles["charts-list__item"]} ${styles["charts-list__item--bar"]}`}>
        <BarRaceChart expenses={expenses} />
      </li>
    </ul>
  );
};
export default Charts;

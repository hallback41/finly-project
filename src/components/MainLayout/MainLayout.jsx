import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CryptoTracker from "../CryptoTracker/CryptoTracker";
import CategoriesBlock from "../CategoriesBlock/CategoriesBlock";
import StatisticsBlock from "../Statistics/StatisticsBlock";
import categoriesData from "../categoriesData/categoriesData";
import Settings from "../Settings/Settings";
import styles from "./MainLayout.module.scss";

const MainSwiper = () => (
  <Swiper spaceBetween={32} slidesPerView={1} initialSlide={3} style={{ height: "100vh" }}>
    <SwiperSlide>
      <div className={styles.slideScrollable}>
        <CryptoTracker />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className={styles.slideScrollable}>
        <CategoriesBlock categoriesData={categoriesData} />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className={styles.slideScrollable}>
        <StatisticsBlock />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className={styles.slideScrollable}>
        <Settings />
      </div>
    </SwiperSlide>
  </Swiper>
);

export default MainSwiper;

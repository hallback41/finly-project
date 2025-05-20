import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CryptoTracker from "../CryptoTracker/CryptoTracker";
import CategoriesBlock from "../CategoriesBlock/CategoriesBlock";
import StatisticsBlock from "../Statistics/StatisticsBlock";
import categoriesData from "../categoriesData/categoriesData";

const MainSwiper = () => (
  <Swiper spaceBetween={32} slidesPerView={1} initialSlide={1} style={{ height: "100vh" }}>
    <SwiperSlide>
      <div className="slide-scrollable">
        <CryptoTracker />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="slide-scrollable">
        <CategoriesBlock categoriesData={categoriesData} />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="slide-scrollable">
        <StatisticsBlock />
      </div>
    </SwiperSlide>
  </Swiper>
);

export default MainSwiper;

import Countdown from "@/components/countdown";
import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";
import { flashDealsArray } from "@/data/home";
import FlashCard from "./Card.js";
export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          FLASH SALE
          <MdFlashOn />
        </h1>
        <Countdown date={new Date(2023, 6, 11, 25)} />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals_swiper"
        breakpoints={{
          450: { slidesPerView: 2 },
          630: { slidesPerView: 3 },
          920: { slidesPerView: 4 },
          1232: { slidesPerView: 5 },
          1520: { slidesPerView: 6 },
        }}
      >
        <div className={styles.flashDeals_list}>
          {flashDealsArray.map((product, i) => (
            <SwiperSlide key={i}>
              <FlashCard product={product} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

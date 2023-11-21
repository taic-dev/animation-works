import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const SwiperSlider = () => {
  const onAutoplayTimeLeft = (s: any, time: number , progress: number) => {
    console.log(s)
  }

  return (
    <Swiper
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Pagination, Autoplay]}
      loop={true}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
    >
      <SwiperSlide>
        <img src="images/slider1.jpg" alt="スライダー1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="images/slider1.jpg" alt="スライダー1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="images/slider1.jpg" alt="スライダー1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="images/slider1.jpg" alt="スライダー1" />
      </SwiperSlide>
    </Swiper>
  );
};

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const SwiperSlider = () => {
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    console.log(s.activeIndex);
    console.log(time);
    console.log(progress);

    onSlideChange(progress)

    if(progress === 1){
      console.log("change!!!!!")
    }
  };

  const onSlideChange = (s: any) => {
    console.log(s.activeIndex, "slide change")
  }

  return (
    <div className="slider">
      <h1>Swiper Slide</h1>
      <div className="content">
        <div className="left-content">
          <Swiper
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            onSlideChange={onSlideChange}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Pagination, Autoplay]}
            // loop={true}
            // onAutoplayTimeLeft={onAutoplayTimeLeft}
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
        </div>
        <div className="right-content">
          <div className="title">
            <h2>Services</h2>
            <span>事業内容</span>
          </div>
          <ul className="list">
            <li className="item">
              <div className="item-title">
                <div className="time-circle">
                  <svg viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span className="number">01</span>
                </div>
                <p>サービス1</p>
              </div>
              <span>＞</span>
            </li>
            <li className="item">
              <div className="item-title">
                <div className="time-circle">
                  <svg viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span className="number">02</span>
                </div>
                <p>サービス2</p>
              </div>
              <span>＞</span>
            </li>
            <li className="item">
              <div className="item-title">
                <div className="time-circle">
                  <svg viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span className="number">03</span>
                </div>
                <p>サービス3</p>
              </div>
              <span>＞</span>
            </li>
            <li className="item">
              <div className="item-title">
                <div className="time-circle">
                  <svg viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span className="number">04</span>
                </div>
                <p>サービス4</p>
              </div>
              <span>＞</span>
            </li>
            <li className="item">
              <div className="item-title">
                <div className="time-circle">
                  <svg viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span className="number">05</span>
                </div>
                <p>サービス5</p>
              </div>
              <span>＞</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

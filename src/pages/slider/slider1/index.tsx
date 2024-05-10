import "swiper/css";
import "swiper/css/effect-fade";
import "./style.css"
import { useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SLIDER_DATA, SLIDER_IMAGE_DATA } from "./constants";
import { handleAutoplayTimeLeft } from "./hook";

export const SwiperSlider = () => {
  const [focus, setFocus] = useState<number | null>(0);

  return (
    <div className="slider">
      <h1>Swiper Slide</h1>
      <div className="content">
        <div className="left-content">
          <Swiper
            loop={true}
            effect="fade"
            modules={[Autoplay, EffectFade]}
            updateOnWindowResize={false}
            onAutoplayTimeLeft={handleAutoplayTimeLeft}
            onSlideChange={(s) => setFocus(s.realIndex)}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
          >
            {SLIDER_IMAGE_DATA.map(({ imageLink, altName }, index) => (
              <SwiperSlide key={index}>
                <img src={`../../../../images/slider/${imageLink}`} alt={altName} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="right-content">
          <div className="title">
            <h2>Services</h2>
            <span>事業内容</span>
          </div>
          <ul className="list">
            {SLIDER_DATA.map(({ id, text }, index) => (
              <li key={id} className={`item ${index === focus ? "is-focus" : ""}`}>
                <div className="item-title">
                  <div className={`time-circle ${index === focus ? "is-focus" : ""}`}>
                    <svg viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span className="number">{id}</span>
                  </div>
                  <p>{text}</p>
                </div>
                <span>＞</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

import React from "react";
// import styles from './MainSlider.module.css';
//importing assets
import slider1 from "../../../public/assets/slider-image-1.jpeg";
import slider2 from "../../../public/assets/slider-image-2.jpeg";
import slider3 from "../../../public/assets/slider-image-3.jpeg";
import slider4 from "../../../public/assets/grocery-banner.png";
import slider5 from "../../../public/assets/grocery-banner-2.jpeg";
// import slider6 from "../../../public/assets/slider-2.jpeg";

import Slider from "react-slick";

function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    <div className="flex container mx-auto my-5 h-[600px]">
      <div className="w-3/4">
        <Slider {...settings}>
          
          <img src={slider1} alt="slider-image-1" className="h-[600px]"  />
          <img src={slider2} alt="slider-image-2" className="h-[600px]"/>
          <img src={slider3} alt="slider-image-3" className="h-[600px]"/>
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={slider4} alt="" className="h-1/2"/>
        <img src={slider5} alt="" className="h-1/2"/>
      </div>
    </div>
      
    </>
  );
}

export default MainSlider;

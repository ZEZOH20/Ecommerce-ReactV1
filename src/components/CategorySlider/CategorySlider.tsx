import React from 'react';
// import styles from './CategorySlider.module.css';
import Slider from 'react-slick';
function CategorySlider() {
  // slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return(
    <>
          {/* slider  */}
      <div className="mx-auto max-w-5xl px-4 py-6">
        <Slider {...settings}>
          {new_data.map((category: cat) => (
            <div key={category._id} className="px-2">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-90  object-fit rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
};

export default CategorySlider;


import React from 'react';
import axios from 'axios';
// import styles from './CategorySlider.module.css';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import { PRODUCTS_BASE_URL } from '../../Constants';
function CategorySlider() {
  // Tanstack Query
  let {data:new_data}=useQuery({
    queryFn:fetchData,
    queryKey:["Products"]
  })

  //Functions
  async function fetchData(){
    return await axios.get(`${PRODUCTS_BASE_URL}`)
  }

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
          {new_data?.map((category: cat) => (
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


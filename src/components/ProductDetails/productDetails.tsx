import React from 'react';
import styles from './Products.module.css';
import { useParams } from 'react-router-dom';
// import { useFetchProductDetails } from '../../Hooks/ProductDetailsHook';
// import SimpleSlider from '../SimpleSlider/SimpleSlider';
import { useGet } from '../../Hooks/GetHook';
import Slider from "react-slick";


function ProductDetails() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  let {id}= useParams();
  // console.log(id);
  const url=`https://ecommerce.routemisr.com/api/v1/products/${id}`;
  let {data, isLoading, isFetching, error}= useGet(url);
  // let {data, isLoading, isFetching, error}= useFetchProductDetails(id);
  data=data?.data.data;
  console.log(data);
  // console.log(data?.data.data.title);
  return(
    <>
    
        {isFetching || isLoading ? <p>Loading</p>
        :
        <div className="card w-[80%] mx-auto flex">
          <div className="w-1/4">
          <Slider {...settings}>{
            data?.images.map(img=>{
              return(
                <div>
                  <h3><img className="w-full" src={img} alt="df" /></h3>
                </div>
              ) 
            })
            }
            
          </Slider>
            
          <div className="w-3/4"></div>
        </div>
            <h2>{data?.title}</h2>
            <h3>{data?.description}</h3>
            
        </div> }

        {/* <Slider {...settings}>
      
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider> */}
        
        {/* <div className="card shadow-2xl flex">
            <div>
                <img className="w-full" src="" alt="" />
            </div>
            <p>{data?.data.title}</p>
            <div className="content">
                <h3></h3>
            </div>
        </div> */}
    </>
  )
};

export default ProductDetails;
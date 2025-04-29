// import React from 'react';
// import styles from './Products.module.css';
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
  let {data, isLoading, isFetching, error}= useGet('',url,'','');
  // let {data, isLoading, isFetching, error}= useFetchProductDetails(id);
  data=data?.data.data;
  console.log(data);
  // console.log(data?.data.data.title);
  return(
    <>
    
        {isFetching || isLoading ? <p>Loading</p>
        :
        <div className="card w-[80%] mx-auto flex mt-20">
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
            
          
      </div>
            
      <div className="card shadow-md px-4 py-4 rounded-md ">
        <img className="w-full" src={data?.img_src} alt=""/>
        
            {/* <h3 className="text-xl font-normal text-blue-600">{data?.category}</h3> */}
            <h3 className="text-3xl font-normal ">{data?.title}</h3>
        <div className="rating flex justify-between mt-3">
            <h3 className="text-xl text-gray">{data?.price} EGP</h3>
            
            <div className="rating flex justify-center items-center text-xl">
                <p className="text-gray bg-transparent p-1 rounded-md ">4.8</p>
                {/* yellow star */}
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>  
        </div>
        

        </div>
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
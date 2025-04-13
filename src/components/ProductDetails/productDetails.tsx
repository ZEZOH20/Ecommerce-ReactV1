import React from 'react';
import styles from './Products.module.css';
import { useParams } from 'react-router-dom';
import { useFetchProductDetails } from '../../Hooks/ProductDetailsHook';
import SimpleSlider from '../SimpleSlider/SimpleSlider';
import { useGet } from '../../Hooks/GetHook';


function ProductDetails() {
  
  let {id}= useParams();
  // console.log(id);
  const url=`https://ecommerce.routemisr.com/api/v1/products/${id}`;
  let {data, isLoading, isFetching, error}= useGet(url);
  // let {data, isLoading, isFetching, error}= useFetchProductDetails(id);
  data=data?.data.data;
  // console.log(data?.data.data.title);
  return(
    <>
    <SimpleSlider/>
        {isFetching || isLoading ? 
        <div className="card">
          <div className="w-1/4">
            <img className="w-full" src="`${data?.imageCover}`" alt="" /></div>
          <div className="w-3/4"></div>
        </div> : <p>{data?.title}</p>}


        
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
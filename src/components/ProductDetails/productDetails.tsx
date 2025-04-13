import React from 'react';
import styles from './Products.module.css';
import { useParams } from 'react-router-dom';
import { useFetchProductDetails } from '../../Hooks/ProductDetailsHook';

function ProductDetails() {
  let {id}= useParams();
  // console.log(id);
  const {data, isLoading, isFetching, error}= useFetchProductDetails(id);
  // console.log(data?.data.data.title);
  return(
    <>
        {isFetching || isLoading ? <p>Loading ...</p> : <p>{data?.data?.data.title}</p>}
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
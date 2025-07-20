// import React from 'react';
// import styles from './Products.module.css';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import SimpleSlider from '../SimpleSlider/SimpleSlider';

import Slider from "react-slick";
import { PRODUCTS_BASE_URL } from "../../Constants";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
// import { queryOptions } from '@tanstack/react-query';
// import { Slider } from 'react-slick';

function ProductDetails() {
  const context = useContext(UserContext);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const params = useParams();
  console.log(params);
  const id = params.id;
  const category= params.category;
  console.log(`category is ${category}`);
  console.log(id);
  const url = `${PRODUCTS_BASE_URL}/${id}`;
  function getProductDetails() {
    console.log(url);
    return axios.get(url);
  }
  let { data, isLoading, isFetching } = useQuery({
    queryKey: [`${id}`],
    queryFn: getProductDetails,
  });
  const { mutate: addToCart } = useMutation({
    mutationFn: postdata,
    // mutationKey: [""]
  });
  function postdata() {
    let token = context.token;
    let id = data?.data?.data?._id;
    token = token.slice(1, -1);
    console.log(token);
    console.log(id);
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: id },
      {
        headers: {
          token,
        },
      }
    );
  }

  // usePost(`${CART_BASE_URL}`, token, props.id);
  function addToCartHandler() {
    addToCart(undefined, {
      onSuccess: () => {
        toast.success("Product Added Successfully to your Cart");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }
  // let {data, isLoading, isFetching, error}= useQuery({
  //   queryKey:[`${id}`],
  //   queryFn:getProductDetails
  // })
  // function  getCategoryProducts(){
  //   const arr=await axios.get(`${CATEGORY_BASE_URL}/${data?.data?.data?.category?._id}`)
  //   return arr;
  // }
  // let {data, isLoading, isFetching, error}= useFetchProductDetails(id);

  const new_data = data?.data?.data;
  console.log(new_data);
  // console.log(data?.data.data.title);
  return (
    <>
      {
        isFetching || isLoading ? (
          <p>Loading</p>
        ) : (
          <div className="card w-[80%] mx-auto flex mt-20">
            <div className="w-1/4">
              <Slider {...settings}>
                {new_data?.images.map((img:string) => {
                  return (
                    <div>
                      <h3>
                        <img className="w-full" src={img} alt="df" />
                      </h3>
                    </div>
                  );
                })}
              </Slider>
            </div>

            <div className="card shadow-md px-4 py-4 rounded-md ">
              <img className="w-full" src={new_data?.img_src} alt="" />

              {/* <h3 className="text-xl font-normal text-blue-600">{data?.category}</h3> */}
              <h3 className="text-3xl font-normal text-blue-600">
                {new_data?.title}
              </h3>
              <h3 className="text-2xl font-normal ">{new_data?.description}</h3>
              <div className="rating flex justify-between mt-3">
                <h3 className="text-xl text-gray">{new_data?.price} EGP</h3>

                <div className="rating flex justify-center items-center text-xl">
                  <p className="text-gray bg-transparent p-1 rounded-md ">
                    4.8
                  </p>
                  {/* yellow star */}
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => addToCartHandler()}
                className="text-white text-lg px-4 py-2 rounded-lg bg-blue-600 w-full mt-3 hover:shadow-md"
              >
                Add to cart
              </button>
            </div>
          </div>
        )
        //   {/* <Slider {...settings}>{
        //       data?.images.map(img=>{
        //         return(
        //           <div>
        //             <h3><img className="w-full" src={img} alt="df" /></h3>
        //           </div>
        //         )
        //       })
        //       }

        //     </Slider> */}
        //  }

        /* <Slider {...settings}>
      
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
    </Slider> */
      }

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
  );
}

export default ProductDetails;

// import React from 'react';
// import styles from './Products.module.css';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import SimpleSlider from '../SimpleSlider/SimpleSlider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { PRODUCTS_BASE_URL } from "../../Constants";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
// import { queryOptions } from '@tanstack/react-query';
// import { Slider } from 'react-slick';
import Categories from "./../Categories/Categories";
import { IProduct } from "../../Interfaces/ProductInterface";
import Card from "../Card/Card";

function ProductDetails() {
  const context = useContext(UserContext);

  
  let productSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplayspeed:2000

  };

  let relatedProductsSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplayspeed:2000
  };

  const params = useParams();
  console.log(params);
  const id = params.id;
  const category = params.category;
  console.log(`category is ${category}`);
  console.log(id);

  // Tanstack Query
  // Fetching the product details
  let { data: product, isLoading: isProductLoading } = useQuery<IProduct>({
    queryKey: ["product", id],
    queryFn: getProductDetails,
  });
  // Adding Product to Cart
  const { mutate: addToCart } = useMutation({
    mutationFn: postdata,
    // mutationKey: [""]
  });
  // Fetching all the related products
  let { data: relatedProducts, isLoading: isrealtedProductsLoading } = useQuery<
    IProduct[]
  >({
    queryKey: ["Products", id],
    queryFn: getRelatedProducts,
  });
  //  console.log("Hello", relatedProducts);
  //functions
  function getProductDetails() {
    return axios
      .get(`${PRODUCTS_BASE_URL}/${id}`)
      .then((response) => response?.data?.data);
  }
  console.log("Hello", relatedProducts);

  async function getRelatedProducts() {
    let response = await axios.get(`${PRODUCTS_BASE_URL}`);
    return response?.data?.data.filter(
      (item) => item.category.name === category
    );
  }
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

  // const product = data?.data?.data;

  console.log(product);
  // console.log(data?.data.data.title);
  return (
    <>
      {isProductLoading ? (
        <p>Loading</p>
      ) : (
        <div className="card w-[80%] mx-auto flex mt-20">
          <div className="w-1/4">
            <Slider {...productSettings}>
              {product?.images.map((img: string) => {
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
            <img className="w-full" src={product?.img_src} alt="" />

            {/* <h3 className="text-xl font-normal text-blue-600">{data?.category}</h3> */}
            <h3 className="text-3xl font-normal text-blue-600">
              {product?.title}
            </h3>
            <h3 className="text-2xl font-normal ">{product?.description}</h3>
            <div className="rating flex justify-between mt-3">
              <h3 className="text-xl text-gray">{product?.price} EGP</h3>

              <div className="rating flex justify-center items-center text-xl">
                <p className="text-gray bg-transparent p-1 rounded-md ">4.8</p>
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
      )}
      <div className="w-full">
        <Slider {...relatedProductsSettings}>
          {relatedProducts?.map((item)=>{
            return (
              
              <div className="w-1/3 bg-teal-500 h-30">s</div>
              
              // <Card
              // className="w-full"
              //   key={item.id}
              //   id={item.id}
              //   title={item.title}
              //   img_src={item.images[0]}
              //   rating={item.ratingsAverage}
              //   price={item.price}
              //   category={item.category.name}
              // />
          )
          })}
        </Slider>
      </div>
    </>
  );
}

export default ProductDetails;

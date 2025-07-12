import { useContext } from "react";
import { userContext } from "../../Context/userContext.tsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CardInterface } from "../../Interfaces/ProductInterface.ts";
import { BASE_URL, CART_BASE_URL } from "../../Constants.ts";
// import styles from './Card.module.css';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
function Card(props: CardInterface) {
  let { token } = useContext(userContext) ?? { token: "default" };
  // const {token} = useContext(userContext);

  function postdata(){
    token=token.slice(1,-1);
    console.log(token);
    console.log(props.id);
    return axios.post(`${CART_BASE_URL}`, 
      { productId: props.id },{
      headers:{
        token
      } 
    })
  }
  const { mutate: addToCart } = useMutation(
    {
      mutationFn: postdata,
      // mutationKey: [""]
    }
  )
  // usePost(`${CART_BASE_URL}`, token, props.id);
  function addToCartHandler() {
    addToCart(undefined, {
      onSuccess: () => {
        toast.success("Product Added Successfully to your Cart");

      },
      onError: () => {
        toast.error("Can not Add product to Cart");
      },
    });
  }
  // function notify () {
  //     return toast('Here is your toast.');
  // }
  
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2 ">
        <Link to={`/productDetails/${props.id}`}>
          <div className="card shadow-md px-4 py-4 rounded-md ">
            <img className="w-full" src={props.img_src} alt="" />

            <h3 className="text-xl font-normal text-blue-600">
              {props.category}
            </h3>
            <h3 className="text-3xl font-normal ">{props.title.split(' ').slice(0, 2).join(' ')}</h3>
            <div className="rating flex justify-between mt-3">
              <h3 className="text-xl text-gray">{props.price} EGP</h3>

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
          </div>
        </Link>
        {token && props.count == null && (
          <button
            onClick={() => addToCartHandler()}
            className="text-white text-lg px-4 py-2 rounded-lg bg-blue-600 w-full mt-3 hover:shadow-md"
          >
            Add to cart
          </button>
        )}
      </div>

      {/* <div className="container w-1/3">
            <div
                className="px-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="p-8 rounded-t-lg w-100" src={props.img_src} alt="product image"/>
                </a>
                <div className="px-5 pb-5 ">
                    <div className="flex justify-between">
                    <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {props.title}
                        </h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                        
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <span
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                                {props.rating}
                        </span>
                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>

                        </div>
                        
                    </div>
                    </div> */}

      {/* <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${props.price}</span>

                        {(token && props.count == null) && <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={addToCartHandler}>Add to cart</button>}
                    </div>
                </div>
            </div>
            </div> */}

      {/* <a href="#"
               className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                {/*<div className=" bg-[url(../../assets/office.jpg)] w-full h-full"></div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {props.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                            <img src={props.img_src} alt="" />
                    <Button>Add to Cart</Button>
                </div>
            </a> */}
    </>
  );
}

export default Card;

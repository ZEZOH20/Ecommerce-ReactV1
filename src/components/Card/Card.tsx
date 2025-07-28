import { useContext } from "react";
import { UserContext } from "../../Context/UserContext.tsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CardInterface } from "../../Interfaces/ProductInterface.ts";
import { CART_BASE_URL } from "../../Constants.ts";
// import styles from './Card.module.css';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";


function Card(props: CardInterface) {
  let { token } = useContext(UserContext) ?? { token: "default" };
  // const {token} = useContext(userContext);
  // let token = localStorage.getItem("token") || "";
  const { mutate: addToCart } = useMutation(
    {
      mutationFn: postdata,
      // mutationKey: [""]
    }
  )

  function postdata(){
    if(token[0]==='"')
    token=token.slice(1,-1); // to get expose of thedouble quotes
    console.log(`token is ${token}`);
    console.log(props.id);
    return axios.post(`${CART_BASE_URL}`, 
      { productId: props.id },{
      headers:{
        token
      } 
    })
  }
  
  // usePost(`${CART_BASE_URL}`, token, props.id);
  function addToCartHandler() {
    addToCart(undefined, {
      onSuccess: () => {
        toast.success("Product Added Successfully to your Cart");

      },
      onError: (error) => {
        toast.error(`${error}`);
      },
    });
  }
  // function notify () {
  //     return toast('Here is your toast.');
  // }
  
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2 ">
        <Link to={`/productDetails/${props.id}/${props.category}`}>
          <div className="card shadow-md px-4 py-4 rounded-md w-full">
            <img className="w-full" src={props.img_src} alt="" />

            <h3 className="text-xl font-normal text-blue-600">
              {props.category}
            </h3>
            <h3 className="text-3xl font-normal ">{props.title.split(' ').slice(0, 2).join(' ')}</h3>
            <div className="rating flex justify-between mt-3">
              <h3 className="text-xl text-gray">{props.price} EGP</h3>

              <div className="rating flex justify-center items-center text-xl">
                <p className="text-gray bg-transparent p-1 rounded-md ">{props.rating}</p>
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
        
          <button
            onClick={() => addToCartHandler()}
            className="text-white text-lg px-4 py-2 rounded-lg bg-blue-600 w-full mt-3 hover:shadow-md cursor-pointer"
          >
            Add to cart
          </button>
        
      </div>
</>
  )
}
export default Card;

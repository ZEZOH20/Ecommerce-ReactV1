import React, {useContext, useEffect, useState} from 'react';
import {userContext} from "../../Context/UserContext.tsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Card from "../Card/Card.tsx";
import { useGet } from '../../Hooks/GetHook.tsx';

/*
const { mutate, isSuccess, isError, error } = usePost(
        'https://ecommerce.routemisr.com/api/v1/cart',token,props.id);
        
    //     {
    //       onSuccess: () => toast.success("Product added successfully!"),
    //       onError: () => toast.error("Failed to add product."),
    //     }
    //   );
    function addToCart(){
        
            mutate(undefined, {
              onSuccess: (data) => {
                console.log("✅ Response data:", data);
                // You can now use the response however you want
              },
              onError: (err) => {
                console.error("❌ Error adding to cart:", err);
              },
            });
          
         
    }
*/
// import styles from './Cart.module.css';

function Cart(){
  function delete_handler(){
    // console.log("Hello Delete");
  }
    // const url=`https://ecommerce.routemisr.com/api/v1/cart`;
    // let {token} = useContext(userContext);
    // const { mutate, isSuccess, isError, error } = usePut(
    //   'https://ecommerce.routemisr.com/api/v1/cart',token,props.id);
      
  //     {
  //       onSuccess: () => toast.success("Product added successfully!"),
  //       onError: () => toast.error("Failed to add product."),
  //     }
  //   );
  const url=`https://ecommerce.routemisr.com/api/v1/cart`;
  let {token} = useContext(userContext);
    token = token.slice(1, -1);
    console.log("token",token)
    const headers={"token": token}
    console.log("headers", headers)
    let {data, isLoading, isFetching, error}=useGet("", url,  token);
    // console.log(data);
    var products = data?.data?.data?.products; 
    console.log(products);
    return(<>
      {/* {data?.data.data.title} */}
      
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    
    <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
    </thead>
    <tbody>
    
          {
        products?.map((p)=>{
          return(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          Apple Watch
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={1} required />
            </div>
            <button className="flex  my-auto items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              {/* <span className="sr-only">Quantity button</span> */}
              <span className="text-xl font-normal text-gray bg-black ">+</span>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          $599
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>delete_handler()} className="cursor-pointer font-medium text-red-600 dark:text-red-500">
            Remove
          </button>
        </td>
      </tr>
          );
        })
      }
    
    </tbody>
  </table>
</div>


    </>)
}
// function Cart() {
//     const {token} = useContext(userContext);
//     const navigate = useNavigate();
//     const [productCart, setProductCart] = useState([]);
//     // const [apiError, setApiError] = useState(null);
//     const getProductsCart = () => {
//         axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
//             headers: {
//                 "token": token
//             }
//         }).then((response) => {
//             const products = response.data.data.products;
//             console.log(products);
//             const simplifiedProducts = products.map((products) => ({
//                 count: products.count,
//                 price: products.price,
//                 id: products["product"].id,
//                 title: products["product"].title,
//                 image: products["product"].imageCover,
//                 rating: products["product"].ratingAverage,
//             }))
//             setProductCart(simplifiedProducts);
//         }).catch((e) => {
//             navigate('Page404')
//             setApiError(e.message)
//         });
//     }
//     useEffect(() => {
//         token ? getProductsCart() : navigate('/signin');
//     }, [])
//     return (
//         <>
//             <div className=" grid grid-cols-3 gap-2">
//                 {productCart ? productCart.map((p) => (

//                     <Card id={p.id} title={p.title}  price={p.price} img_src={p.image} rating={p.rating} />

//                     // </Card>
//                 )) : <div className="alert_box"></div> }
//             </div>
//         </>
//     )
   
// };

export default Cart;
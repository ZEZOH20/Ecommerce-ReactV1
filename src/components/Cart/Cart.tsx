import React, {useContext, useEffect, useRef, useState} from 'react';
import {userContext} from "../../Context/UserContext.tsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Card from "../Card/Card.tsx";
import { useGet } from '../../Hooks/GetHook.tsx';
import { usePut } from '../../Hooks/PutHook.tsx';
import { useDelete } from '../../Hooks/DeleteHook.tsx';

// const { mutate, isSuccess, isError, error } = usePost(
//   'https://ecommerce.routemisr.com/api/v1/cart',token,props.id);
/*

        
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
  let {token} = useContext(userContext);
  const myRef= useRef(null);
  const { mutate: increment, error : incrementError } = usePut();
  const { mutate: decrement, error : decrementError } = usePut();
  const { mutate: Delete, error : deleteError } = useDelete();
  // const { mutate: decrement, isSuccess, isError, error } = usePut(
  //   'https://ecommerce.routemisr.com/api/v1/cart',token,myRef.current);
// const { mutate: decrement, isSuccess, isError, error } = usePut(
//     'https://ecommerce.routemisr.com/api/v1/cart',token,count);
  function delete_handler(id:string){
    // console.log("Hello Delete");
    Delete({
      url:`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      token
  });
  }
  function incrementHandler(id:string, currentCount: number){
    console.log(currentCount, currentCount);
    console.log(id);
    increment(
      { 
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        token,
        count: String(currentCount+1)
      },{
      onSuccess: (data) => {
        console.log("Product Added Successfully to your Cart");
      },
      onError: (err) => {
        // console.log("Error status:", err?.response?.status);
      },
    });

  }
  function decrementHandler(id:string, currentCount: number){
    if(currentCount===1) return; 
    decrement(
      { 
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        token,
        count: String(currentCount-1)
      },{
      onSuccess: (data) => {
        console.log("Product removed Successfully to your Cart");
      },
      onError: (err) => {
        // console.log("Error status:", err?.response?.status);
      },
    });
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
  
    token = token.slice(1, -1);
    // console.log("token",token)
    const headers={"token": token}
    // console.log("headers", headers)
    let {data, isLoading, isFetching, error: get_error}=useGet("", url,  token);
    // console.log(data);
    var products = data?.data?.data?.products; 
    // console.log(products);
    return(<>
      {/* {data?.data.data.title} */}
      {/* console.log(products); */}
      {isLoading || isFetching ? <h2 className="text-center font-bold txet-7xl text-blue-600">Loading ...</h2> : <p>Hello World</p>}
<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="py-3 px-15 bg-black text-center">
            Image
        </th>
        <th scope="col" className="py-3 px-10 bg-red-500 text-center">
            Product
        </th>
        <th scope="col" className="py-3 px-18 bg-blue-600 text-center"> 
           Qty
        </th>
        <th scope="col" className=" py-3 px-7 bg-gray-800 text-center">
          Price
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-100 text-center">
            Action
        </th>
      </tr>
    </thead>
    <tbody>
    
          {
            
            products ? 
        products?.map((p)=>{
          // console.log(Object.keys(p));
          return(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              {/* Image  */}
              <td className="p-4 flex justify-center">
                <img src={p.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
              </td>
              {/* Product Name  */}
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                {p.product.title}
              </td>
              {/* QTY  */}
              <td className="px-6 py-4 text-center">
                <div className="flex items-center mx-auto w-fit">
                  {/* Increment Button  */}
                  <button onClick={()=>{decrementHandler(p.product.id,p.count)}} className="text-lg inline-flex items-center justify-center p-1 me-3  font-medium h-6 w-6 text-gray-500  border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    -
                  </button>
                  {/* Quantity div  */}
                  <div>
                    <div ref={myRef} id="product_qty" className="text-center bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {p.count}
                    </div>
                  </div>
                  {/* Decrement Button  */}
                  <button onClick={()=>{incrementHandler(p.product.id,p.count)}} className="flex text-md  my-auto items-center justify-center h-6 w-6 p-1 ms-3 font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    +
                  </button>
                </div>
              </td>
              {/* Price   */}
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                {p.price} EGP
              </td>
              {/* Remove Button  */}
              <td className="px-6 py-4 text-center">
                <button onClick={()=>delete_handler(p.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500">
                  Remove
                </button>
              </td>
            </tr>
          );
        })
              :<h2 className="mt-30 text-5xl font-semibold text-blue-600">Cart is Empty</h2>
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
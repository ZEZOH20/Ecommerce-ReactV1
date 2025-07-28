import { useContext, useRef } from "react";
import { UserContext } from "../../Context/UserContext.tsx";
import { Product } from "../../Interfaces/ProductInterface.ts";
import axios from "axios";
import { CART_BASE_URL, CASH_BASE_URL, CHECKOUT_BASE_URL } from "../../Constants.ts";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


function Cart() {
  const navigate= useNavigate();
  let usercontext = useContext(UserContext);
  let token = usercontext?.token || "";

  //functions
  async function getdata() {
    console.log(token);
    const data = await axios.get(`${CART_BASE_URL}`, {
      headers: { token },
    });
    // console.log(data);
    return data;
  }

  token = token.slice(1, -1);  // weird statement position it is in the middle of nothing

  // const headers={"token": token}
  async function incrementHandler(id: string, count: number) {
    await axios.put(
      `${CART_BASE_URL}/${id}`,
      { count: count + 1 },
      {
        headers: {
          token,
        },
      }
    );
    refetch();
    // setCart([]);
    // forceUpdate();
  }

  async function decrementHandler(id: string, count: number) {
    await axios.put(
      `${CART_BASE_URL}/${id}`,
      { count: count - 1 },
      {
        headers: {
          token,
        },
      }
    );
    refetch();
    // setCart([]);
    // forceUpdate();
  }

  async function deleteHandler(id: string) {
    await axios.delete(`${CART_BASE_URL}/${id}`, {
      headers: {
        token,
      },
    });
    refetch();
  }
  function checkout(){
    // navigate('/checkout') 
  }
  let { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["Cart"],
    queryFn: getdata,
    
  });
  
    // console.log(data);
  
  const columns = ["Image", "Product", "Qty", "Price", "Action"];
  if (isLoading || isFetching) {
    return (
      <h2 className="text-center font-bold txet-7xl text-blue-600">
        Loading ...
      </h2>
    );
  }
  
  if (data?.data?.data?.products.length === 0)
    return (
      <p className="text-4xl font-bold text-blue-600 text-center mt-30 mb-30">
        Empty Cart
      </p>
    );

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-600 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => {
                return (
                  <th
                    scope="col"
                    className="py-3 px-15  text-center text-white"
                  >
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data
              ? data?.data?.data?.products?.map((p: Product) => {
                  // console.log(Object.keys(p));
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      {/* Image  */}
                      <td className="p-4 flex justify-center">
                        <img
                          src={p.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt=""
                        />
                      </td>
                      {/* Product Name  */}
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                        {p.product.title}
                      </td>
                      {/* QTY  */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center mx-auto w-fit">
                          {/* Increment Button  */}
                          <button
                            onClick={() => {
                              decrementHandler(p.product.id, p.count);
                            }}
                            className="text-lg inline-flex items-center justify-center p-1 me-3  font-medium h-6 w-6 text-gray-500  border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            -
                          </button>
                          {/* Quantity div  */}
                          <div>
                            <div
                              id="product_qty"
                              className="text-center bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {p.count}
                            </div>
                          </div>
                          {/* Decrement Button  */}
                          <button
                            onClick={() => {
                              incrementHandler(p.product.id, p.count);
                            }}
                            className="flex text-md  my-auto items-center justify-center h-6 w-6 p-1 ms-3 font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
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
                        <button
                          onClick={() => deleteHandler(p.product.id)}
                          className="cursor-pointer font-medium text-red-600 dark:text-red-500"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <button onClick={()=>checkout()}>Checkout</button>
    </>
  );
}

export default Cart;

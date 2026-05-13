import { useContext } from "react";
import { UserContext } from "../../Context/UserContextValue.ts";
import { apiClient, authHeaders } from "../../api/client.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface CartProduct {
  id: string;
  title: string;
  imageCover: string;
}

interface CartItem {
  count: number;
  price: number;
  product: CartProduct;
}

interface CartResponse {
  data: {
    products: CartItem[];
  };
}

interface UpdateCartItemVariables {
  id: string;
  count: number;
}

function Cart() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useContext(UserContext);

  async function getCart() {
    const response = await apiClient.get<CartResponse>("/cart", authHeaders(token));
    return response.data.data;
  }

  async function updateCartItem({ id, count }: UpdateCartItemVariables) {
    return apiClient.put(`/cart/${id}`, { count }, authHeaders(token));
  }

  async function deleteCartItem(id: string) {
    return apiClient.delete(`/cart/${id}`, authHeaders(token));
  }

  const invalidateCart = () => {
    queryClient.invalidateQueries({ queryKey: ["Cart"] });
  };

  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: invalidateCart,
  });

  const { mutate: removeItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: invalidateCart,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["Cart"],
    queryFn: getCart,
  });

  const columns = ["Image", "Product", "Qty", "Price", "Action"];

  if (isLoading || isFetching) {
    return (
      <h2 className="text-center font-bold text-4xl text-blue-600 my-20">
        Loading ...
      </h2>
    );
  }

  const products = data?.products || [];
  const isMutating = isUpdating || isDeleting;

  if (products.length === 0) {
    return (
      <p className="text-4xl font-bold text-blue-600 text-center mt-30 mb-30">
        Empty Cart
      </p>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-600 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="py-3 px-15  text-center text-white"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4 flex justify-center">
                  <img
                    src={p.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={p.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                  {p.product.title}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center mx-auto w-fit">
                    <button
                      onClick={() =>
                        updateItem({
                          id: p.product.id,
                          count: Math.max(1, p.count - 1),
                        })
                      }
                      disabled={isMutating || p.count <= 1}
                      className="text-lg inline-flex items-center justify-center p-1 me-3  font-medium h-6 w-6 text-gray-500  border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      -
                    </button>
                    <div>
                      <div
                        id={`product_qty_${p.product.id}`}
                        className="text-center bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {p.count}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        updateItem({ id: p.product.id, count: p.count + 1 })
                      }
                      disabled={isMutating}
                      className="flex text-md  my-auto items-center justify-center h-6 w-6 p-1 ms-3 font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                  {p.price} EGP
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => removeItem(p.product.id)}
                    disabled={isMutating}
                    className="cursor-pointer font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => navigate("/checkout")}
        className="login_button my-6"
      >
        Checkout
      </button>
    </>
  );
}

export default Cart;

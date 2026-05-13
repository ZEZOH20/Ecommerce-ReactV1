import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { apiClient, authHeaders } from "../../api/client";
import { UserContext } from "../../Context/UserContextValue";
import { IProduct } from "../../Interfaces/ProductInterface";
import Card from "../Card/Card";

function ProductDetails() {
  const { token } = useContext(UserContext);
  const { id, category } = useParams<{ id: string; category: string }>();

  const productSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const relatedProductsSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery<IProduct>({
    queryKey: ["product", id],
    queryFn: getProductDetails,
    enabled: Boolean(id),
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: postData,
  });

  const { data: relatedProducts = [], isLoading: isRelatedProductsLoading } =
    useQuery<IProduct[]>({
    queryKey: ["relatedProducts", category, id],
    queryFn: getRelatedProducts,
    enabled: Boolean(category),
  });

  async function getProductDetails() {
    const response = await apiClient.get(`/products/${id}`);
    return response.data.data as IProduct;
  }

  async function getRelatedProducts() {
    const response = await apiClient.get("/products");
    const products = response.data.data as IProduct[];

    return products.filter(
      (item) => item.category.name === category && item.id !== id
    );
  }

  function postData() {
    if (!product?._id) {
      throw new Error("Product is not available.");
    }

    return apiClient.post("/cart", { productId: product._id }, authHeaders(token));
  }

  function addToCartHandler() {
    if (!token) {
      toast.error("Please sign in before adding products to your cart.");
      return;
    }

    addToCart(undefined, {
      onSuccess: () => {
        toast.success("Product Added Successfully to your Cart");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  if (isProductLoading) {
    return (
      <p className="text-center font-bold text-4xl text-blue-600 my-20">
        Loading product...
      </p>
    );
  }

  if (isProductError) {
    return (
      <div className="alert_box mx-auto my-20 max-w-xl" role="alert">
        {productError instanceof Error
          ? productError.message
          : "Failed to load product"}
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center font-bold text-4xl text-blue-600 my-20">
        Product not found
      </p>
    );
  }

  return (
    <>
      <div className="card w-[80%] mx-auto flex mt-20">
        <div className="w-1/4">
          <Slider {...productSettings}>
            {product.images.map((img) => (
              <div key={img}>
                <img className="w-full" src={img} alt={product.title} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="card shadow-md px-4 py-4 rounded-md ">
          <img className="w-full" src={product.imageCover} alt={product.title} />

          <h3 className="text-3xl font-normal text-blue-600">
            {product.title}
          </h3>
          <h3 className="text-2xl font-normal ">{product.description}</h3>
          <div className="rating flex justify-between mt-3">
            <h3 className="text-xl text-gray">{product.price} EGP</h3>

            <div className="rating flex justify-center items-center text-xl">
              <p className="text-gray bg-transparent p-1 rounded-md ">
                {product.ratingsAverage}
              </p>
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

      {!isRelatedProductsLoading && relatedProducts.length > 0 && (
        <div className="w-[90%] mx-auto mt-16">
          <Slider {...relatedProductsSettings}>
            {relatedProducts.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                img_src={item.images[0]}
                rating={item.ratingsAverage}
                price={item.price}
                category={item.category.name}
              />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}

export default ProductDetails;

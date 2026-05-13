import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client";
import Card from "../Card/Card";

interface Product {
  id: string;
  title: string;
  price: number;
  ratingsAverage: number;
  images: string[];
  category: {
    name: string;
  };
}

async function getProducts() {
  const response = await apiClient.get("/products");
  const products = response.data.data;
  return Array.isArray(products) ? (products as Product[]) : [];
}

export default function Products() {
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <p className="text-center font-bold text-4xl text-blue-600 my-20">
        Loading products...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="alert_box mx-auto my-20 max-w-xl" role="alert">
        {error instanceof Error ? error.message : "Failed to load products"}
      </div>
    );
  }

  const productList = Array.isArray(products) ? products : [];

  if (productList.length === 0) {
    return (
      <p className="text-center font-bold text-4xl text-blue-600 my-20">
        No products found
      </p>
    );
  }

  return (
    <div className="parent flex flex-wrap justify-evenly">
      {productList.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          title={product.title}
          img_src={product.images[0]}
          rating={product.ratingsAverage}
          price={product.price}
          category={product.category.name}
        />
      ))}
    </div>
  );
}

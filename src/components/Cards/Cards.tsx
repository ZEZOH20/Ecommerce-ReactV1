import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card.tsx";
import { apiClient } from "../../api/client.ts";
interface Product {
  id: string;
  title: string;
  price: number;
  ratingsAverage: number;
  images: string[];
  count?: number;
  category: {
    name: string;
  };
}

async function getProducts() {
  const response = await apiClient.get("/products");
  const products = response.data.data;
  return Array.isArray(products) ? (products as Product[]) : [];
}

function Cards() {
  const { data: products = [], error, isError } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
  });

  return (
    <div className="parent flex flex-wrap justify-evenly ">
      {isError ? (
        <div className="alert_box">
          {error?.message || "Something went wrong"}
        </div>
      ) : (
        products.map((p) => (
          <Card
            key={p.id}
            id={p.id}
            title={p.title}
            img_src={p.images[0]}
            rating={p.ratingsAverage}
            price={p.price}
            category={p.category.name}
          />
        ))
      )}
    </div>
  );
}

export default Cards;

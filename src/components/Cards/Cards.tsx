import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card.tsx";
// import { useGet } from "../../Hooks/GetHook.tsx";
import { PRODUCTS_BASE_URL } from "./../../Constants";
import axios from "axios";
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
function Cards() {
  const url = `${PRODUCTS_BASE_URL}`;
  function getdata() {
    return axios.get(url);
  }
  // const {data, error}=useGet("Products",url,'');
  // const {data, error}={useGet("Products",url,'')};
  const { data, error } = useQuery({
    queryKey: ["Products"],
    queryFn: getdata,
  });

  const new_data = data?.data?.data || [];

  // console.log("new_data: ",new_data);
  return (
    <>
      <div className="parent flex flex-wrap justify-evenly ">
        {new_data ? (
          new_data.map((p: Product) => {
            // console.log('new data: ',new_data)
            return (
              <Card
                key={p.id}
                id={p.id}
                title={p.title}
                img_src={p.images[0]}
                rating={p.ratingsAverage}
                price={p.price}
                category={p.category.name}
              />
            );
          })
        ) : (
          <div className="alert_box">
            {" "}
            {error?.message || "Something went wrong"}
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;

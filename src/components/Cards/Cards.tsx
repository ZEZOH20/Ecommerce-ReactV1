import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "../Card/Card.tsx";
import { useFetchProducts } from "../../Hooks/ProductFetchQuery.tsx";

function Cards (){
    // const [apiError, setApiError] = useState(null);
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //         .then(response => setProducts(response.data.data))
    //         .catch(e => setApiError(e.message));

    // }, []);
    const {data, isFetching, isLoading, error}=useFetchProducts();
    // const data=[];
    const new_data=data.data.data;
    console.log("new_data: ",new_data);
    return (
        <>
            <div className=" grid grid-cols-3 gap-2">
                {new_data.map(p=>{
                    return <p>{p.id}</p> 
                })}
                {/* {products ? products.map((p) => (
                    
                        <Card id={p.id} title={p.title} img_src={p.images[3]} rating={p.ratingsAverage} price={p.price}/>
                            
                        </Card>
                )):  <div className="alert_box"> {error?.message || "Something went wrong"}</div> } */}
                
            </div>
        </>);
}

export default Cards;
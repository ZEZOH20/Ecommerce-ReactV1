import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "../Card/Card.tsx";

const Cards = () => {
    const [apiError, setApiError] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then(response => setProducts(response.data.data))
            .catch(e => setApiError(e.message));

    }, []);
    console.log("products: ",products);
    return (
        <>
            <div className=" grid grid-cols-3 gap-2">
                {products ? products.map((p) => (
                    
                        <Card id={p.id} title={p.title} img_src={p.images[3]} rating={p.ratingsAverage} price={p.price}/>
                            
                        // </Card>
                )) : <div className="alert_box"> {apiError}</div> }
                
            </div>
        </>);
}

export default Cards;
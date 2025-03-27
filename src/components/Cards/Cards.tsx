import React, {useEffect, useState} from "react";
import axios from "axios";
import AlertBox from "../utilities/AlertBox/AlertBox.tsx";
import Card from "../Card/Card.tsx";

const Cards = () => {
    const [apiError, setApiError] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then(response => setProducts(response.data.data))
            .catch(e => setApiError(e.message));

    }, []);
    console.log("title: ",products);
    return (
        <>
            <div className=" grid grid-cols-3 gap-2">
                {products ? products.map((p) => (
                    
                        <Card title={p.title} img_src={p.images[3]} rating={p.ratingsAverage} price={p.price}/>
                            
                        // </Card>
                )) : <AlertBox> {apiError} </AlertBox>}
            </div>
        </>);
}

export default Cards;
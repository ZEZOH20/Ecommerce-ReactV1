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
    console.log(products);
    return (
        <>
            <div className=" grid grid-cols-3 gap-2">
                {products ? products.map((p) => (
                        <Card>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                                {p.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest
                                enterprise
                                technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </Card>
                )) : <AlertBox> {apiError} </AlertBox>}
            </div>
        </>);
}

export default Cards;
import React, {useContext, useEffect, useState} from 'react';
import {userContext} from "../../Context/UserContext.tsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Card from "../Card/Card.tsx";


// import styles from './Cart.module.css';

function Cart() {
    const {token} = useContext(userContext);
    const navigate = useNavigate();
    const [productCart, setProductCart] = useState([]);
    const [apiError, setApiError] = useState(null);
    const getProductsCart = () => {
        axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                "token": token
            }
        }).then((response) => {
            const products = response.data.data.products;
            console.log(products);
            const simplifiedProducts = products.map((products) => ({
                count: products.count,
                price: products.price,
                id: products["product"].id,
                title: products["product"].title,
                image: products["product"].imageCover,
                rating: products["product"].ratingAverage,
            }))
            setProductCart(simplifiedProducts);
        }).catch((e) => {
            navigate('Page404')
            setApiError(e.message)
        });
    }
    useEffect(() => {
        token ? getProductsCart() : navigate('/signin');
    }, [])
    return (
        <>
            <div className=" grid grid-cols-3 gap-2">
                {productCart ? productCart.map((p) => (

                    <Card id={p.id} title={p.title}  price={p.price} img_src={p.image} rating={p.rating} />

                    // </Card>
                )) : <div className="alert_box"></div> }
            </div>
        </>
    )
};

export default Cart;
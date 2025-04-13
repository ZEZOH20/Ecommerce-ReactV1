import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "../Card/Card.tsx";
import { useFetchProducts } from "../../Hooks/ProductsFetchQuery.tsx";
import { useGet } from "../../Hooks/GetHook.tsx";

function Cards (){
    const url='https://ecommerce.routemisr.com/api/v1/products/';

    const {data, isFetching, isLoading, error}=useGet(url);
    
    const new_data=data?.data?.data || [];
    // console.log("new_data: ",new_data);
    return (
        <>
            <div className="parent flex flex-wrap justify-evenly ">
                {new_data ? new_data.map(p=>{
                    return  <Card id={p.id} title={p.title} img_src={p.images[3]} rating={p.ratingsAverage} price={p.price}/>
                
                }) :  <div className="alert_box"> {error?.message || "Something went wrong"}</div> }
                
            </div>
        </>);
}

export default Cards;
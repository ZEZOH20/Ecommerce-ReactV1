import React, {useEffect, useState} from 'react';
import officeImg from '../../assets/office.jpg';
import Button from "../utilities/Button/Button.tsx";
import axios from "axios";
import AlertBox from "../utilities/AlertBox/AlertBox.tsx";
// import styles from './Card.module.css';

const Card = ({children}:{children :React.ReactNode}) => {
    return (
        // <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        //      src={officeImg} alt=""/>
        <>
            <a href="#"
               className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                {/*<div className=" bg-[url(../../assets/office.jpg)] w-full h-full"></div>*/}
                <div className="flex flex-col justify-between p-4 leading-normal">
                    {children}
                    <Button>Welcome Egypt</Button>
                </div>
            </a>
        </>
    );
}

export default Card;


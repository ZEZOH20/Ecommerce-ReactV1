import './App.css'
import Signup from './components/Signup/Signup.tsx';
import Signin from './components/Signin/Signin.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import Page404 from './components/Page404/Page404.tsx';
import Home from './components/Home/Home.tsx';
import Layout from './components/Layout/Layout.tsx';
import Child from './components/Child/child.tsx';
// import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AlertBox from "./components/utilities/AlertBox/AlertBox.tsx";
import Cards from "./components/Cards/Cards.tsx";



function App() {
    const router = createBrowserRouter([
        {
            path: '', element: <Layout/>, children: [
                {index: true, element: <Home/>},
                {path: '/signin', element: <Signin/>},
                {path: '/signup', element: <Signup/>},
                {path: '*', element: <Page404/>},
            ]
        }

    ])
    return (
        <>
             {/*<RouterProvider router={router}/>*/}
            <Signup/>
            {/*<Cards/>*/}
        </>
    )
}

export default App


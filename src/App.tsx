import './App.css'
import Signup from './components/Signup/Signup.tsx';
import Signin from './components/Signin/Signin.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import Page404 from './components/Page404/Page404.tsx';
import Home from './components/Home/Home.tsx';
import Layout from './components/Layout/Layout.tsx';

// import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AlertBox from "./components/utilities/AlertBox/AlertBox.tsx";
import Cards from "./components/Cards/Cards.tsx";
import UserContext from './Context/UserContext.tsx';
import Cart from './components/Cart/Cart.tsx';
import Categories from './components/Categories/Categories.tsx';
import Products from './components/Products/Products.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';



function App() {
    const router = createBrowserRouter([
        {
            path: '', element: <Layout/>, children: [
                {index: true, element: <ProtectedRoute><Home/></ProtectedRoute>},
                {path: '/signin', element: <Signin/>},
                {path: '/signup', element: <Signup/>},
                {path: '/cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
                {path: '/Products', element: <ProtectedRoute><Products/></ProtectedRoute>},
                {path: '/Categories', element: <ProtectedRoute><Categories/></ProtectedRoute>},
                {path: '*', element: <Page404/>},
            ]
        }

    ])
    return (
        <> 
            <UserContext>
                <RouterProvider router={router}/>
            </UserContext>
             
             {/* <p>Hello</p> */}
            {/* <Signup/> */}
            {/*<Cards/>*/}
        </>
    )
}

export default App


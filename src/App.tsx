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
import { createBrowserRouter, RouterProvider } from "react-router-dom";





function App() {
    const  router= createBrowserRouter([
        {path:'' , element:<Layout/> ,children:[
            {index:true , element:<Home/>},
            {path:'/signin' , element:<Signin/>},
            {path:'/signup' , element:<Signup/>},
            {path:'*' , element:<Page404/>},
        ]}
      
    ])
    return (
        <>
            {/* <RouterProvider router={router}/> */}
            <Signup/>
        </>
    )
}

export default App

import './App.css'
import Signup from './components/Signup/Signup.tsx';
import Signin from './components/Signin/Signin.tsx';

import Page404 from './components/Page404/Page404.tsx';
import Home from './components/Home/Home.tsx';
import Layout from './components/Layout/Layout.tsx';
import { Toaster } from 'react-hot-toast';
import {createBrowserRouter, RouterProvider, useRouteError} from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import UserContextProvider from './Context/UserContext.tsx';
import Categories from './components/Categories/Categories.tsx';
import CategoryDetails from './components/CategoryDetails/CategoryDetails.tsx';
import Products from './components/Products/Products.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './components/ProductDetails/ProductDetails.tsx';
import Cart from './components/Cart/Cart.tsx';
import Checkout from './components/Checkout/Checkout.tsx';

const queryClient= new QueryClient();

function RouteError() {
    const error = useRouteError();
    const message = error instanceof Error ? error.message : "Something went wrong";

    return (
        <div className="alert_box mx-auto my-20 max-w-xl" role="alert">
            {message}
        </div>
    );
}

function App() {
    

    const router = createBrowserRouter([
        {
            path: '', element: <Layout/>, errorElement: <RouteError/>, children: [
                {index: true, element: <ProtectedRoute><Home/></ProtectedRoute>},
                {path: '/signin', element: <Signin/>},
                {path: '/signup', element: <Signup/>},
                {path: '/cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
                {path: '/checkout', element: <ProtectedRoute><Checkout/></ProtectedRoute>},
                {path: '/products', element: <ProtectedRoute><Products/></ProtectedRoute>},
                {path: '/product-details/:id/:category', element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
                {path: '/categories', element: <ProtectedRoute><Categories/></ProtectedRoute>},
                {path: '/category-details/:id', element: <ProtectedRoute><CategoryDetails/></ProtectedRoute>},
                {path: '*', element: <Page404/>},
            ]
        }

    ])
    return (
        <>
        
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <UserContextProvider>
                    <RouterProvider router={router}/>
                </UserContextProvider>
            </QueryClientProvider>
            <Toaster position="top-center" reverseOrder={false} />
                
        </>
    )
}

export default App


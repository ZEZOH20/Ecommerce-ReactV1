import React, {useState} from 'react'
import {useFormik} from "formik";
import * as Yup from "yup"
import axios from "axios"
import Label from '../utilities/Label/Label';
import Input from '../utilities/Input/Input';
import Button from '../utilities/Button/Button';
import { useNavigate } from 'react-router-dom';



function Signin() {
    const navigate=useNavigate();
    const [apiError, setApiError] = useState(null);
    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Invalid email"),
        password: Yup.string().required("Password is required").min(5, "Password must be at least 5 characters").max(10, "Password is too long"),

    })

    const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: () => {
            console.log(values);
            axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
                .then(msg => {
                    console.log(msg);
                    navigate('/');
                })
                .catch(error => setApiError(error?.response?.data?.message))
        }
    });

    return (

        <>


            <div className="p-5 mt-10 max-w-xl mx-auto">
                {apiError &&
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        {apiError}
                    </div>}
                <h2 className=" text-4xl text-blue-600 font-bold mb-10">Login</h2>
                <form onSubmit={handleSubmit}>


                    <div className="relative z-0 w-full mb-5 group">
                        <Input type="email" name="email" value={values.email} onChange={handleChange}
                               onBlur={handleBlur} id="floating_email"></Input>
                        
                        <Label htmlFor="floating_email">Email address</Label>
                        
                    </div>

                    {errors.email && touched.email &&
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            {errors.email}
                        </div>}


                    <div className="relative z-0 w-full mb-5 group">
                        <Input type="password" name="password" value={values.password} onChange={handleChange}
                               onBlur={handleBlur} id="floating_password"></Input>
                        
                        <Label htmlFor="floating_password">Password</Label>
                    </div>

                    {errors.password && touched.password &&
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            {errors.password}
                        </div>}


                    <Button>Login</Button>

                </form>
            </div>
        </>
    )
}

export default Signin
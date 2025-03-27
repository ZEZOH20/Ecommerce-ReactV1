import React, {useState} from 'react'
import {useFormik} from "formik";
import * as Yup from "yup"
import axios from "axios"

function Signin() {
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
                .then(msg => console.log(msg))
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
                        <input type="email" name="email" value={values.email} onChange={handleChange}
                               onBlur={handleBlur} id="floating_email"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "/>
                        <label htmlFor="floating_email"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                            address</label>
                    </div>

                    {errors.email && touched.email &&
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            {errors.email}
                        </div>}


                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="password" value={values.password} onChange={handleChange}
                               onBlur={handleBlur} id="floating_passwod"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "/>
                        <label htmlFor="floating_password"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>

                    {errors.password && touched.password &&
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            {errors.password}
                        </div>}


                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signin
                    </button>

                </form>
            </div>
        </>
    )
}

export default Signin
import React, {useState} from 'react'
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios"
import AlertBox from '../utilities/AlertBox/AlertBox';
import Input from '../utilities/Input/Input';
import Label from "../utilities/Label/Label.tsx";
import Button from '../utilities/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

// const navigate=useNavigate();
function Signup(){
  const navigate= useNavigate();
  const [apiError, setApiError] = useState(null);
  const validationSchema=Yup.object({
    name: Yup.string().required("Name is required").min(3,"Name must be at least 3 characters").max(10,"Name is too long"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required").min(5,"Password must be at least 5 characters").max(10,"Password is too long"),
    rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password"),"Hello"])
  })
    
  const {values, handleChange, handleSubmit, handleBlur, errors, touched}=useFormik({
    initialValues:{
      name:"",
      phone:"",
      email:"",
      password:"",
      rePassword:"",
    },
    validationSchema,
    onSubmit:()=>{
      console.log(values);
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
      .then(data=>{
        // console.log(data.data.token);
        console.log("success");
        // localStorage.setItem("token", data.data.token);
        

        navigate('/signin');
      })
      .catch(error => setApiError(error?.response?.data?.message))
    }
  });

  return (

    <>
    

    <div className="p-5 mt-10 max-w-xl mx-auto">
    {apiError && 
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           {apiError}
        </div>}
      <h2 className=" text-4xl text-blue-600 font-bold mb-10">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* <Label>Name</Label> */}
        <div className="relative z-0 w-full mb-5 group">
            <Input type="text" name="name" value={values.name} id="floating_name" onChange={handleChange} onBlur={handleBlur}/>
            <Label htmlFor="floating_name">Name</Label>
        </div>

        {errors.name && touched.name &&
        <AlertBox>{errors.name}</AlertBox>}
        

        <div className="relative z-0 w-full mb-5 group">
          <Input type="tel" name="phone" value={values.phone} id="floating_phone" onChange={handleChange} onBlur={handleBlur}/>
          <Label htmlFor="floating_phone">Phone</Label>
        </div>

        {errors.phone &&  touched.phone &&
        <AlertBox>{errors.phone}</AlertBox>}
        

        <div className="relative z-0 w-full mb-5 group">
          <Input type="email" name="email" value={values.email} id="floating_email" onChange={handleChange} onBlur={handleBlur}/>
          <Label htmlFor="floating_email">Email</Label>
        </div>

        {errors.email && touched.email &&
        <AlertBox>{errors.email}</AlertBox>}


        <div className="relative z-0 w-full mb-5 group">
          <Input type="password" name="password" value={values.password} id="floating_password" onChange={handleChange} onBlur={handleBlur}/>
          <Label htmlFor="floating_password">Password</Label> 
        </div>

        {errors.password && touched.password &&
        <AlertBox>{errors.password}</AlertBox>}


        <div className="relative z-0 w-full mb-5 group">
          <Input type="password" name="rePassword" value={values.rePassword} id="floating_rePassword" onChange={handleChange} onBlur={handleBlur}/>
          <Label htmlFor="floating_rePassword">rePassword</Label> 
        </div>
        
        {errors.rePassword && touched.rePassword &&
        <AlertBox>{errors.rePassword}</AlertBox>}
        
        <Button type="submit">Submit</Button>
        
        {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}

      </form>
    </div>
    </>
  )
}

export default Signup
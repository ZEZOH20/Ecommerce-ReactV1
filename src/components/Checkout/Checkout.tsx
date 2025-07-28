import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { CHECKOUT_BASE_URL, CASH_BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css"

function Checkout() {
  //state
  const [loading, setLoading] = useState(false);
  // const {  setToken } = useContext(UserContext);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate(); // for programmatic routing

  //validation Schema
  const validationSchema = Yup.object({
      details: Yup.string().required("Details Field is required").min(5, "Details must be at least 5 characters")
      .max(20, "Password is too long"),
      phone: Yup.string()
            .required("Phone is required")
            .matches(/^01[0125][0-9]{8}$/),
      
      
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        details: "",
        phone: "",
        city: "",
        choice: ""
      },
      validationSchema,
      onSubmit: () => {
        console.log(values);
        setLoading(true);
        axios
          .post(`${AUTH_BASE_URL}/signin`, values)
          .then((res) => {
            navigate("/"); // redirecting to home page
          })
          .catch((error) => {
            setApiError(error?.response?.data?.message);
          });
      },
    });

  return (
    <>
      <div className="p-5 mt-10 mb-6 max-w-xl mx-auto">
        {apiError && (
          <div className="alert_box" role="alert">
            {apiError}
          </div>
        )}
        <h2 className=" text-4xl text-blue-600 font-bold mb-10">Checkouot</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              value={values.details}
              onChange={handleChange}
              onBlur={handleBlur}
              id="floating_details"
              className="floating_input peer"
              placeholder=" "
            />

            <label htmlFor="floating_deatils" className="floating_label">
              Details
            </label>
          </div>

          {errors.details && touched.details && (
            <div className="alert_box" role="alert">
              {errors.details}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              id="floating_phone"
              className="floating_input peer"
              placeholder=""
            ></input>

            <label htmlFor="floating_phone" className="floating_phone">
              Phone
            </label>
          </div>

          {errors.phone && touched.phone && (
            <div className="alert_box" role="alert">
              {errors.phone}
            </div>
          )}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              id="floating_city"
              className="floating_input peer"
              placeholder=""
            ></input>

            <label htmlFor="floating_city" className="floating_city">
              City
            </label>
          </div>

          {errors.city && touched.city && (
            <div className="alert_box" role="alert">
              {errors.city}
            </div>
          )}

          <button type="submit" className="login_button" disabled={loading}>
            {loading ? <i className="fa fa-spinner fa-spin text-white"></i> : "Login"}
          </button>
          
        </form>
      </div>
    </>
  );
}



export default Checkout;

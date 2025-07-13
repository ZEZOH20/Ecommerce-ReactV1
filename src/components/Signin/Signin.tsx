import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AUTH_BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";


function Signin() {
  //state
  const [loading, setLoading] = useState(false);
  const {  setToken } = useContext(UserContext);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate(); // for programmatic routing

  //validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(20, "Password is too long"),
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: () => {
        console.log(values);
        setLoading(true);
        axios
          .post(`${AUTH_BASE_URL}/signin`, values)
          .then((res) => {
            setToken(res.data.token);
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/"); // redirecting to home page
          })
          .catch((error) => {
            setApiError(error?.response?.data?.message);
            setLoading(false);
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
        <h2 className=" text-4xl text-blue-600 font-bold mb-10">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              id="floating_email"
              className="floating_input peer"
              placeholder=" "
            />

            <label htmlFor="floating_email" className="floating_label">
              Email address
            </label>
          </div>

          {errors.email && touched.email && (
            <div className="alert_box" role="alert">
              {errors.email}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="floating_password"
              className="floating_input peer"
              placeholder=""
            ></input>

            <label htmlFor="floating_password" className="floating_label">
              Password
            </label>
          </div>

          {errors.password && touched.password && (
            <div className="alert_box" role="alert">
              {errors.password}
            </div>
          )}

          <button type="submit" className="login_button" disabled={loading}>
            {loading ? "Loading" : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signin;

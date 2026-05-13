import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiClient, authHeaders, isApiError } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContextValue";

import "@fortawesome/fontawesome-free/css/all.min.css";

interface CheckoutValues {
  details: string;
  phone: string;
  city: string;
  choice: "cash" | "online";
}

interface CartPayload {
  data: {
    _id: string;
  };
}

interface CheckoutPayload {
  session?: {
    url?: string;
  };
}

function getErrorMessage(error: unknown) {
  if (isApiError(error)) {
    return error.response?.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Checkout failed. Please try again.";
}

function Checkout() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { token } = useContext(UserContext);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    details: Yup.string()
      .required("Details field is required")
      .min(5, "Details must be at least 5 characters")
      .max(120, "Details are too long"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone number is invalid"),
    city: Yup.string().required("City is required"),
    choice: Yup.string()
      .oneOf(["cash", "online"], "Choose a payment method")
      .required("Choose a payment method"),
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik<CheckoutValues>({
      initialValues: {
        details: "",
        phone: "",
        city: "",
        choice: "cash",
      },
      validationSchema,
      onSubmit: async (formValues) => {
        const userToken = token;

        if (!userToken) {
          setApiError("You must sign in before checkout.");
          navigate("/signin");
          return;
        }

        setLoading(true);
        setApiError(null);

        try {
          const cartResponse = await apiClient.get<CartPayload>(
            "/cart",
            authHeaders(userToken),
          );

          const cartId = cartResponse.data.data._id;
          const shippingAddress = {
            details: formValues.details,
            phone: formValues.phone,
            city: formValues.city,
          };

          if (formValues.choice === "online") {
            const checkoutResponse = await apiClient.post<CheckoutPayload>(
              `/orders/checkout-session/${cartId}?url=${window.location.origin}`,
              { shippingAddress },
              authHeaders(userToken),
            );

            const checkoutUrl = checkoutResponse.data.session?.url;

            if (!checkoutUrl) {
              throw new Error("Checkout session URL was not returned.");
            }

            window.location.href = checkoutUrl;
            return;
          }

          await apiClient.post(
            `/orders/${cartId}`,
            { shippingAddress },
            authHeaders(userToken),
          );

          navigate("/");
        } catch (error) {
          setApiError(getErrorMessage(error));
        } finally {
          setLoading(false);
        }
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
        <h2 className=" text-4xl text-blue-600 font-bold mb-10">Checkout</h2>
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

            <label htmlFor="floating_details" className="floating_label">
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

            <label htmlFor="floating_phone" className="floating_label">
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

            <label htmlFor="floating_city" className="floating_label">
              City
            </label>
          </div>

          {errors.city && touched.city && (
            <div className="alert_box" role="alert">
              {errors.city}
            </div>
          )}

          <div className="mb-5 flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="choice"
                value="cash"
                checked={values.choice === "cash"}
                onChange={handleChange}
              />
              Cash
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="choice"
                value="online"
                checked={values.choice === "online"}
                onChange={handleChange}
              />
              Online
            </label>
          </div>

          {errors.choice && touched.choice && (
            <div className="alert_box" role="alert">
              {errors.choice}
            </div>
          )}

          <button type="submit" className="login_button" disabled={loading}>
            {loading ? (
              <i className="fa fa-spinner fa-spin text-white"></i>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
      </div>
    </>
  );
}



export default Checkout;

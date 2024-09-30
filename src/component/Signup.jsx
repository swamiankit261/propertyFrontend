import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_URL } from "../App";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
    companyName: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "zipCode"].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`${BACKEND_URL}/users/register`, formData, config);
      if (data.success) {
        Swal.fire({
          title: `${data.message}!`,
          text: "Welcome aboard!",
          icon: "success",
          confirmButtonText: "Great!",
        });
        navigate("/");
      } else if (data.errors) {
        Swal.fire({
          title: "Registration Failed!",
          text: data.error,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Registration Failed!",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <center>
        <form
          style={{ position: "relative", top: "100px" }}
          className="row w-50 p-5 rounded-4 shadow text-start"
          onSubmit={submitForm}
        >
          <div className="mb-3 col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="mobileNo" className="form-label">
              Mobile No.
            </label>
            <input
              type="text"
              name="mobileNo"
              className="form-control"
              id="mobileNo"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              id="companyName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="street" className="form-label">
              Street
            </label>
            <input
              type="text"
              name="street"
              className="form-control"
              id="street"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              name="city"
              className="form-control"
              id="city"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              name="state"
              className="form-control"
              id="state"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="zipCode" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              className="form-control"
              id="zipCode"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
          </div>
          <button
            type="submit"
            className="w-100 btn btn-success"
            style={{ backgroundColor: "rgb(94, 63, 224)" }}
          >
            Submit
          </button>
          <br />
          <Link to="/" className="mt-3" style={{ color: "rgb(94, 63, 224)" }}>
            Already have an Account
          </Link>
        </form>
      </center>
    </div>
  );
};

export default Signup;

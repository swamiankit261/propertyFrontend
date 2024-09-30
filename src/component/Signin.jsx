import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../App";
import toast from 'react-hot-toast';
import Cookies from "js-cookie";

const Signin = ({ setLoginEmail, loginEmail }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const changeHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data, Error } = await axios.post(
        `${BACKEND_URL}/users/login`,
        { email, password },
        config
      );

      if (data?.success) {
        Cookies.set("accessToken", data?.data.accessToken)
        toast.success(`${data.message}`, { icon: '👏' })
        setLoginEmail(loginEmail + 1);
        navigate("/Home");
      } else {
        toast.error(`${data}jtlrjo`);
      }
    } catch (error) {
      // toast.error(error.message)
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log("Error response:", error);
        toast.error("Error: " + error.message);
      } else if (error.request) {
        // Request was made but no response received
        console.log("Error request:", error);
        toast.error("Network error: Please check your connection.");
      } else {
        // Something else happened
        console.log("Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <center style={{ position: "relative", top: "200px" }}>
        <form className="w-50 p-5 rounded-4 shadow text-start" onSubmit={submitHandle}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandle}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandle}
              className="form-control"
              id="password"
              required
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
          <br />
          <Link to="/Signup" className="mt-3" style={{ color: "rgb(94, 63, 224)" }}>
            Create an Account
          </Link>
        </form>
      </center>
    </div>
  );
};

export default Signin;

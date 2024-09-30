import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Navbar from "./component/Navbar";
import Home from "./Home";
import "./App.css";
import Properties from "./component/Properties";
import ProductDetails from "./component/ProductDetails";
import Owner from "./component/owner";
import Contact from "./component/Contectus";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const App = () => {
  const [loggedData, setLoggedData] = useState();
  const [loginEmail, setLoginEmail] = useState(0);
  const [count, setCount] = useState(0);
  const [user, setuser] = useState()

  const navigate = useNavigate();

  const getcurrentUser = async () => {
    try {
      let { data } = await axios.get(`${BACKEND_URL}/users/currentuser`, { headers: { 'Authorization': Cookies.get("accessToken") } })
      if (data?.success || false) {
        toast.success(`welcome ${data?.data.firstName}`, { icon: '👏' });

        navigate("/Home")
      } else {
        navigate("/Signup")
      }
      // console.log(BACKEND_URL)
      setLoggedData(data);
    } catch (error) {
      console.log("currentuser", error.message)
    }
  }

  useEffect(() => {
    getcurrentUser()
  }, [count, loginEmail]);

  return (
    <div>
      <Navbar
        loggedData={loggedData}
        setCount={setCount}
        count={count}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Signin setLoginEmail={setLoginEmail} loginEmail={loginEmail} />
          }
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/Contactus" element={<Contact />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

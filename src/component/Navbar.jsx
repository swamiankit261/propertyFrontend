import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import "../App.css";
import "../component/Navbar.css";
import { BACKEND_URL } from '../App';

const Navbar = ({ setCount, count, loggedData }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(true); // Initialize scrolled state to true by default

    useEffect(() => {
        const handleScroll = () => {
            const isHome = location.pathname === "/Home";
            const isScrolled = window.scrollY > 0;
            setScrolled(!isHome || isScrolled);
        };

        handleScroll(); // Call handleScroll once on initial load
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    const registerProperties = () => {
        if (!!loggedData?.success) {
            navigate("/owner")
        } else {
            toast.error("Please login to post property");
            navigate("/");
        }
    }

    const logout = async () => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/users/logout`, {}, {
                headers: { 'Authorization': Cookies.get("accessToken") }
            });
            if (data.success) {
                Cookies.remove('accessToken')
                toast.success(data.message);
                navigate("/");
                setCount(count + 1);
                loggedData.success = false;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div id="container" className={scrolled ? 'scrolled' : ''}>
            <div className="shopName">

                <Link to="/Home"><b>PROPERTY</b>DEKHO</Link>
            </div>
            <div id="collection">
                <div id="Home"><Link to="/Home">HOME</Link></div>
                <div id="Properties"><Link to="/properties">PROPERTIES</Link></div>

            </div>




            <div id="collection-login">
                {/* <Link to="/owner"> */}
                <div className="style__postContainer" onClick={registerProperties}>
                    <div className="style__post">Post property</div>
                    <div className="fre__outerwrap">FREE<div className="fre__innerwrap"></div></div>
                </div>
                {/* </Link> */}
                <div id="contact" className='mt-1'><Link to="/Contactus">Contact Us</Link></div>
                <div id="about" className='mt-1'><Link to="/Home">About Us</Link></div>
                {loggedData?.success ? (
                    <>
                        <div id="logout" onClick={logout}>
                            <FontAwesomeIcon className='btn btn-outline-light rounded-4' icon={faPowerOff} />
                        </div>


                        <div id="profile">
                            <Link to="/profile">
                                <div className='d-flex '>
                                    <span className='h6 text-light ms-3'>{loggedData?.data.email}</span>

                                    {/* <FontAwesomeIcon style={{ fontSize: "10px" }} className='btn btn-outline-light rounded-1' icon={faUser} /> */}
                                </div>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div id="register">
                            <Link to="/Signup">
                                <FontAwesomeIcon icon={faUserPlus} />
                            </Link>
                        </div>
                        <div id="login">
                            <Link to="/" className={location.pathname === "/" ? "scrolled" : ""}>Login</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;

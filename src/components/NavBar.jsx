// eslint-disable-next-line no-unused-vars
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


const NavBar = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
      setIsContentVisible(!isContentVisible);
  };

  const navigate = useNavigate()
  const logout = () => {
      axios.get('http://localhost:3000/api/auth/logout')
      .then(result => {
        Cookies.remove('jwtToken');
        Cookies.remove('user') ;
        const msg = result.data.success;
        console.log(msg);
        navigate('/login')
      })
      .catch(err => {
        const error = err.response ? err.response.data.error : 'An error occurred in logout';
        console.log(error);
      });
    }
  
  return (
    <nav className="flex items-center justify-between flex-wrap bg-pink-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
        <span className="font-semibold text-xl tracking-tight">
        SyndiPay
        </span>
      </div>
      <div className="block lg:hidden">
            <button
                className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                onClick={toggleContent}>
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
            {isContentVisible && (
                <div className="hidden-content">
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                      <div className="text-sm lg:flex-grow">
                        <Link to="/"
                          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                          Home
                        </Link>
                        <Link to="/forgotPassword"
                          className="block me-2 mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                          Reset Password
                        </Link>
                        <button
                          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                          onClick={logout}>
                          Logout
                        </button>
                        {/* <Link to="/GetUser"
                          className="block ms-4 mt-4 lg:inline-block font-bold lg:mt-0 text-black-200 hover:text-white">
                          Get User
                        </Link> */}
                      </div>
                    </div>
                </div>
            )}
        </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow hidden lg:block">
          <Link to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
          </Link>
          <Link to="/forgotPassword"
            className="block me-2 mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Reset Password
          </Link>
          <button
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            onClick={logout}>
            Logout
          </button> 
          {/* <Link to="/GetUser"
            className="block ms-4 mt-4 lg:inline-block font-bold lg:mt-0 text-black-200 hover:text-white">
            Get User
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

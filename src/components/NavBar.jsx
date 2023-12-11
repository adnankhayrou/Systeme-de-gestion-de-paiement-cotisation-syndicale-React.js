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
    // <nav className="flex items-center justify-between flex-wrap bg-pink-700 p-6">
    //   <div className="flex items-center flex-shrink-0 text-white mr-6">
    //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    // </svg>
    //     <span className="font-semibold text-xl tracking-tight">
    //     SyndiPay
    //     </span>
    //   </div>
    //   <div className="block lg:hidden">
    //         <button
    //             className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
    //             onClick={toggleContent}>
    //             <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //                 <title>Menu</title>
    //                 <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    //             </svg>
    //         </button>
    //         {isContentVisible && (
    //             <div className="hidden-content">
    //                 <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    //                   <div className="text-sm lg:flex-grow">
    //                     <Link to="/"
    //                       className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
    //                       Home
    //                     </Link>
    //                     <Link to="/forgotPassword"
    //                       className="block me-2 mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
    //                       Reset Password
    //                     </Link>
    //                     <button
    //                       className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
    //                       onClick={logout}>
    //                       Logout
    //                     </button>
    //                   </div>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    //   <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    //     <div className="text-sm lg:flex-grow hidden lg:block">
    //       <Link to="/"
    //         className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
    //         Home
    //       </Link>
    //       <Link to="/forgotPassword"
    //         className="block me-2 mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
    //         Reset Password
    //       </Link>
    //       <button
    //         className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
    //         onClick={logout}>
    //         Logout
    //       </button> 
    //     </div>
    //   </div>
    // </nav>

    <nav className="z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            {/* <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button> */}
            <Link to="" className="flex ms-2 md:me-24">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 me-3 text-pink-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">SyndiPay</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"/>
                </button>
              </div>
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    Neil Sims
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

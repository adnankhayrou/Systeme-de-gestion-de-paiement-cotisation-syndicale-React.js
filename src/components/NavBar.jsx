// eslint-disable-next-line no-unused-vars
import { React } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-center ">
          <div className=" flex items-center justify-start rtl:justify-end">
            <Link to="" className="flex md:me-24">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 me-3 text-pink-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">SyndiPay</span>
            </Link>
          </div>
          <div className="flex items-center">
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import NavBar from './NavBar'
import SideBar from './SideBare'
import Cookies from 'js-cookie';

const Home = () => {
  const user = JSON.parse(Cookies.get('user'));

  return (
    <>
      <NavBar/>
      <SideBar/>
      {/* Main content */}
      <div className="sm:ml-64">
      <div className="flex items-center mt-6 pt-6 justify-center">
        <div>
          <div>
              <div className="flex justify-center content-center border rounded-[25px] shadow">
                <div className="w-fit rounded-[25px] bg-white p-8 aspect">
                  <div className="h-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="h-10 w-10 fill-white stroke-pink-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  </div>
                  <div className="my-2 flex items-center">
                    <div>
                    <p className=" me-3 font-bold text-base font-large text-gray-500">
                    Apartments
                    </p>
                  </div>
                    <h2 className="text-xl font-bold">
                      <span>26</span>
                    </h2>
                  </div>
                </div>
                <div className="w-fit rounded-[25px] bg-white p-8 aspect">
                  <div className="h-12">
                    <svg
                      className="h-10 w-10 fill-white stroke-pink-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <div className="my-2 flex items-center">
                    <div>
                    <p className=" me-3 font-bold text-base font-large text-gray-500">
                     Residents
                    </p>
                  </div>
                    <h2 className="text-xl font-bold">
                      <span>26</span>
                    </h2>
                  </div>
                </div>
            </div>

            </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Home
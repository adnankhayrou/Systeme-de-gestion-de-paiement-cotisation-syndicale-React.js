// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import NavBar from '../Layouts/NavBar'
import SideBar from '../Layouts/SideBare'
import axios from 'axios';
import { useUserContext } from '../Context/UserContext';

const Home = () => {
  const { user } = useUserContext();
  const user_id = user._id
  const [loading, setLoading] = useState(true);
  const [allApartments, setAllApartment] = useState([]);
  const [apartments, setApartment] = useState([]);
  const [paidApartments, setPaidApartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://localhost:3000/api/payment/getAllPayments/${user_id}`);
        // console.log(response.data);
        setAllApartment(response.data.apartments);
        setApartment(response.data.unpaidApartments);
        setPaidApartment(response.data.AlreadyPaidApartments);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <>
      <NavBar/>
      <SideBar/>
      
      {/* Main content */}
      <div className="sm:ml-64 pt-5">
      <div className="lg:flex sm:grid items-center mt-5 pt-14 justify-center m-3">
        {/* cards */}
        <div>
          <div>
              <div className="flex justify-center content-center border rounded-[25px] shadow mb-3 me-3">
                <div className="w-fit rounded-[25px] bg-white p-3 aspect">
                  <div className="h-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="h-8 w-8 fill-white stroke-pink-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  </div>
                  <div className=" flex items-center">
                    <div>
                    <p className=" me-3 font-bold text-base font-large text-gray-500">
                    Apartments
                    </p>
                  </div>
                    <h2 className="text-xl font-bold">
                      <span>{allApartments.length}</span>
                    </h2>
                  </div>
                </div>
                <div className="w-fit rounded-[25px] bg-white p-3 aspect">
                  <div className="h-12">
                    <svg
                      className="h-8 w-8 fill-white stroke-pink-700"
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
                  <div className=" flex items-center">
                    <div>
                    <p className=" me-3 font-bold text-base font-large text-gray-500">
                     Residents
                    </p>
                  </div>
                    <h2 className="text-xl font-bold">
                      <span>{allApartments.length}</span>
                    </h2>
                  </div>
                </div>
            </div>

            </div>

            </div>
            <div>
          <div>
              <div className="flex justify-center content-center border rounded-[25px] shadow shadow mb-3 me-3">
                <div className="w-fit rounded-[25px] bg-white p-3 aspect">
                  <div className="h-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 fill-white stroke-pink-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                  </div>
                  <div className=" flex items-center">
                    <div>
                    <p className=" me-3 font-bold text-base font-large text-gray-500">
                    Already Paid
                    </p>
                  </div>
                    <h2 className="text-xl font-bold">
                      <span>{paidApartments.length}</span>
                    </h2>
                  </div>
                </div>
                <div className="w-fit rounded-[25px] bg-white p-3 aspect">
                  <div className="h-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 fill-white stroke-pink-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>

                  </div>
                  <div className=" flex items-center">
                    <div>
                    <p className=" me-3 font-bold text-base font-large text-gray-500">
                     Not Paid
                    </p>
                  </div>
                    <h2 className="text-xl font-bold">
                      <span>{apartments.length}</span>
                    </h2>
                  </div>
                </div>
            </div>

            </div>
        </div>
      </div>
      </div>
      {loading ? (
        <div className="sm:ml-64 pt-2">
      <div className="flex justify-center items-center  mt-40 sm:me-30">
        <div className="spinner-border text-yellow-500" role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"/>
        </svg>
        </div>
        <div className="ml-2">Loading...</div>
      </div>
      </div>
      ) : (
        <>
      {/* two tables */}
      <div className="sm:ml-64 lg:flex sm:grid items-center mt-6 pt-6 justify-center ms-3">
      <div className=" overflow-x-auto rounded-lg mb-3 me-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="text-pink-700 px-6 border-none rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none py-3">
              unpaid Apartments
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3">
            Building
            </th>
            <th scope="col" className="px-6 py-3">
             number
            </th>
            <th scope="col" className="px-6 py-3">
             name
            </th>
            <th scope="col" className="px-6 py-3">
             cin
            </th>
            <th scope="col" className="px-6 rounded-tr-lg py-3">
              Payment
            </th>
          </tr>
        </thead>
        <tbody>
        {apartments.map((apartment) => (
          <tr key={apartment._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-9 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {apartment.building_ID}
            </th>
            <td className="px-9 py-4">
            {apartment.apartment_number}
            </td>
            <td className="px-4 py-4">
            {apartment.resident_name}
            </td>
            <td className="px-4 py-4">
            {apartment.resident_cin}
            </td>
            <td className="px-6 py-4">
              <p className='rounded bg-pink-800 text-white p-2 pt-1'>unpaid</p>
            </td>
          </tr>
           ))}
        </tbody>
      </table>
      </div>
      
      <div className=" overflow-x-auto rounded-lg mb-3 me-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="text-pink-700 px-6 rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none py-3">
              paid apartments
            </th>
          </tr>
          <tr>
          <th scope="col" className="px-6 py-3">
            Building
            </th>
            <th scope="col" className="px-6 py-3">
             number
            </th>
            <th scope="col" className="px-6 py-3">
             name
            </th>
            <th scope="col" className="px-6 py-3">
             date
            </th>
            <th scope="col" className="px-6 rounded-tr-lg py-3">
              Payment
            </th>
          </tr>
        </thead>
        <tbody>
        {paidApartments.map((paidApartment) => (
          <tr key={paidApartment._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-9 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {paidApartment.apartment.building_ID}
            </th>
            <td className="px-9 py-4">
            {paidApartment.apartment.apartment_number}
            </td>
            <td className="px-6 py-4">
            {paidApartment.apartment.resident_name}
            </td>
            <td className="px-4 py-4">
            {new Date(paidApartment.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
            </td>
            <td className="px-6 py-4">
              <p className='rounded bg-green-800 text-white text-center p-2 pt-1'>paid</p>
            </td>
          </tr>
           ))}
        </tbody>
      </table>
      </div>
      </div>

      {/* single table */}
      <div className="sm:ml-64 sm:px-12 my-4 mx-2">
      <div className=" overflow-x-auto rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className=" text-pink-700 px-6 rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none py-3">
              apartments details
            </th>
          </tr>
          <tr>
          <th scope="col" className="px-6 py-3">
               Building ID
            </th>
            <th scope="col" className="px-6 py-3">
               apartment number
            </th>
            <th scope="col" className="px-6 py-3">
               resident name
            </th>
            <th scope="col" className="px-6 py-3">
               resident phone
            </th>
            <th scope="col" className="px-6 py-3">
               resident cin
            </th>
            <th scope="col" className="px-6 rounded-tr-lg py-3">
               condition
            </th>
          </tr>
        </thead>
        <tbody>
        {allApartments.map((allApartment) => (
          <tr key={allApartment._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {allApartment.building_ID}
            </th>
            <td className="px-14 py-4">
              {allApartment.apartment_number}
            </td>
            <td className="px-12 py-4">
            {allApartment.resident_name}
            </td>
            <td className="px-9 py-4">
              {allApartment.resident_phone}
            </td>
            <td className="px-9 py-4">
            {allApartment.resident_cin}
            </td>
            <td className="px-9 py-4">
            {allApartment.condition}
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>

      </>
      )}
    </>
  )
}

export default Home
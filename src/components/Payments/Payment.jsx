/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import NavBar from '../Layouts/NavBar'
import SideBar from '../Layouts/SideBare'
import axios from 'axios';
import Cookies from 'js-cookie';
import sweetalert from 'sweetalert2';
import './print.css'
import { useNavigate } from 'react-router-dom';


const Payment = () => {
  const user = JSON.parse(Cookies.get('user'));
  const user_id = user._id
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apartments, setApartment] = useState([]);
  const [paidApartments, setPaidApartment] = useState([]);
  const [refetch, setRefetch] = useState(true)
  const [paymentData, setPaymentData] = useState({
    apartment: '',
    payment: 'paid',
    user_id: user_id,
  });

  const handlePrint = () => {
    window.print();
  };

  const paymentFacture = (id) => {
    navigate('/paymentFacture', { state: { paymentId: id }});
  }

  const handleClick = async (aparmentId) => {
    setPaymentData({ ...paymentData, apartment: aparmentId })
    // console.log(paymentData.apartment);
    const result = await new Promise((resolve) => {
      sweetalert.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7a014a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Pay it!',
      }).then((result) => {
        resolve(result);
      });
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.post(`http://localhost:3000/api/payment/createPayment`, paymentData);
        const msg = response.data.success
        setRefetch(!refetch);
        sweetalert.fire('Success!', `${msg}`, 'success');
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://localhost:3000/api/payment/getAllPayments/${user_id}`);
        // console.log(response.data.AlreadyPaidApartments);
        setApartment(response.data.unpaidApartments);
        setPaidApartment(response.data.AlreadyPaidApartments);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch]);
  return (
    <>
    <NavBar/>
    <div className='none-print'> 
    <SideBar/>
    </div>
      {loading ? (
        <div className="sm:ml-64 pt-2">
      <div className="flex justify-center items-center  mt-64 sm:me-40">
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
          {/* print button */}
      <div className="sm:ml-64 pt-2"></div>
      <div className="lg:flex sm:grid items-center justify-center m-3"></div>
      <div className="sm:ml-64 sm:px-14 ps-3 my-3 sm:mt-14 print-only none-print">
        <div className=" rounded-lg mb-3 me-3 pt-6">
          <div className='flex justify-end mt-5'>
            <button 
            onClick={handlePrint} 
            className="flex block text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-800 dark:hover:bg-pink-700 " type="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="me-2 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
              Print
            </button>
          </div>
        </div>
      </div>
      <div className="pt-14 hidden needToshow">
      <div className="lg:flex sm:grid items-center justify-center m-3">
        <p className='font-bold text-pink-800'>This Month Statistics</p>
      </div>
      </div>
      {/* unpaid apartment table */}
      <div className="sm:ml-64 sm:px-14 ps-3 my-3 sm:mt-12 full">
        <div className=" overflow-x-auto rounded-lg mb-3 me-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" text-pink-700 px-6 rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none py-3">
                  Unpaid Apartments
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
                <th scope="col" className="px-6 py-3 none-print">
                resident phone
                </th>
                <th scope="col" className="px-6 py-3 none-print">
                resident cin
                </th>
                <th scope="col" className="px-6 py-3 none-print">
                condition
                </th>
                <th scope="col" className="px-8 rounded-tr-lg py-3 none-print">
                  Action
                </th>
                <th scope="col" className="px-8 rounded-tr-lg py-3 hidden needToshow">
                  payment
                </th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => (
              <tr key={apartment._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {apartment.building_ID}
                </th>
                <td className="px-14 py-4">
                  {apartment.apartment_number}
                </td>
                <td className="px-12 py-4">
                {apartment.resident_name}
                </td>
                <td className="px-9 py-4 none-print">
                  {apartment.resident_phone}
                </td>
                <td className="px-9 py-4 none-print">
                {apartment.resident_cin}
                </td>
                <td className="px-9 py-4 none-print">
                {apartment.condition}
                </td>
                <td className="px-6 py-4 none-print">
                  <button className="rounded p-2 pt-0 flex font-medium text-white bg-pink-700 "
                  onClick={() => handleClick(apartment._id)}>
                  pay now
                  </button>
                </td>
                <td className="px-6 py-4 hidden needToshow">
                  <button className="rounded p-2 pt-0 flex font-medium text-red-800 bg-pink-700 ">
                  unpaid
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* paid apartment table */}
      <div className="sm:ml-64 sm:px-14 ps-3 my-3 sm:mt-12 full">
        <div className=" overflow-x-auto rounded-lg mb-3 me-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" text-pink-700 px-6 rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none py-3">
                  paid Apartments
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">
                Building ID
                </th>
                <th scope="col" className="px-6 py-3">
                apartment number
                </th>
                <th scope="col" className="px-6 py-3 ">
                resident name
                </th>
                <th scope="col" className="px-6 py-3 none-print">
                resident phone
                </th>
                <th scope="col" className="px-6 py-3 none-print">
                resident cin
                </th>
                <th scope="col" className="px-6 py-3">
                date
                </th>
                <th scope="col" className="px-6 none-print">
                  facture
                </th>
                <th scope="col" className="px-6 rounded-tr-lg py-3">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {paidApartments.map((paidApartment) => (
              <tr key={paidApartment._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {paidApartment.apartment.building_ID}
                </th>
                <td className="px-14 py-4">
                  {paidApartment.apartment.apartment_number}
                </td>
                <td className="px-12 py-4">
                {paidApartment.apartment.resident_name}
                </td>
                <td className="px-9 py-4 none-print">
                  {paidApartment.apartment.resident_phone}
                </td>
                <td className="px-9 py-4 none-print">
                {paidApartment.apartment.resident_cin}
                </td>
                <td className=" py-4">
                {new Date(paidApartment.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
                </td>
                <td className="px-9 py-4 none-print">
                <button 
                  onClick={() => paymentFacture(paidApartment._id)} 
                  className="text-sm text-pink-700 text-center" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                  </svg>
                  </button>
                </td>
                <td className="px-6 py-4 ">
                <p className="font-medium p-1 pt-0 text-white rounded bg-green-700 text-center changetext">
                  {paidApartment.payment}
                </p>
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

export default Payment
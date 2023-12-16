import { Link, useLocation } from 'react-router-dom';
import NavBar from '../Layouts/NavBar'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Facture = () => {
    const location = useLocation();
    let payment_id = location.state?.paymentId;
    const [payment, setPayment] = useState({});
    console.log(payment);

    const handlePrint = () => {
        window.print();
      };


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/payment/getResidentPayment/${payment_id}`);
            // console.log(response.data.residentPayment);
            setPayment(response.data.residentPayment);

          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [payment_id]);

  return (
    <>
    <NavBar/>
    <div className="sm:ml-64 sm:px-14 ps-3 my-3 mb-20 mt-14 print-only none-print">
        <div className="flex justify-between rounded-lg mb-3 me-3 pt-6">
          <div className='flex justify-end mt-5'>
            <Link 
            to="/payment"
            className="flex block text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-800 dark:hover:bg-pink-700 " type="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
              {/* Back */}
            </Link>
          </div>
          <div className='flex justify-start mt-5'>
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
    {Array.isArray(payment) && payment.map((paymentItem) => (
    <div key={paymentItem._id} className="bg-white border rounded-lg shadow-lg px-6 py-4 max-w-md mx-auto afterRemovingButton">
        <h1 className="font-bold text-2xl my-4 text-center text-pink-800">Resident Invoice</h1>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
            <h1 className="text-lg font-bold">Invoice</h1>
            <div className="text-gray-700">
                <div>Date: {new Date().toLocaleDateString()}</div>
            </div>
        </div>
        <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Bill To:</h2>
            <div className="text-gray-700 mb-2">Name : {paymentItem.apartment.resident_name}</div>
            <div className="text-gray-700 mb-2">CIN : {paymentItem.apartment.resident_cin}</div>
            <div className="text-gray-700 mb-2">Phone number : {paymentItem.apartment.resident_phone}</div>
            
            <div className="flex text-gray-700 items-center"><h2 className="text-lg font-bold me-2">Aparment Conditon:</h2>{paymentItem.apartment.condition}</div>
        </div>
        <table className="w-full mb-8">
            <thead>
                <tr>
                    <th className="text-left font-bold text-gray-700">Description</th>
                    <th className="text-right font-bold text-gray-700">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-left text-gray-700">Payment : </td>
                    <td className="text-right text-gray-700">{paymentItem.payment}</td>
                </tr>
                
            </tbody>
            <tfoot>
                <tr>
                    <td className="text-left text-gray-700">Date : </td>
                    <td className="text-right text-gray-700">{new Date(paymentItem.date).toLocaleDateString()}</td>
                </tr>
            </tfoot>
        </table>
    <   div className="text-gray-700 mb-2">Thank you for your time!</div>
    </div>
    ))}
    </>
  )
}

export default Facture
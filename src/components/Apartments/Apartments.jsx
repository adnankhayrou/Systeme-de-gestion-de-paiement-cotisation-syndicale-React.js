/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import NavBar from '../Layouts/NavBar'
import SideBar from '../Layouts/SideBare'
import axios from 'axios';
import Cookies from 'js-cookie';
import sweetalert from 'sweetalert2';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';


const Apartments = () => {
  const user = JSON.parse(Cookies.get('user'));
  const user_id = user._id
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [apartments, setApartment] = useState([]);
  const [refetch, setRefetch] = useState(true)
  const [loading, setLoading] = useState(true);


  const editApartment = (id) => {
    navigate('/editApartment', { state: { aparmentId: id }});
  }

  const [addFormData, setAddFormData] = useState({
    building_ID: '',
    apartment_number: '',
    resident_name: '',
    resident_phone: '',
    resident_cin: '',
    condition: '',
    user_id: '',
  });

  const resetForm = () => {
    setAddFormData({
      building_ID: '',
      apartment_number: '',
      resident_name: '',
      resident_phone: '',
      resident_cin: '',
      condition: '',
      user_id: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm();
    setErrors({});
  };

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(true);

  const schema = yup.object().shape({
    building_ID: yup.string().required('Building ID is Required'),
    apartment_number: yup.number().required('Apartment Number is Required'),
    resident_name: yup.string().required('Resident Name is Required'),
    resident_phone: yup.string().required('Resident Phone is Required'),
    resident_cin: yup.string().required('Resident CIN is Required'),
    condition: yup.string().required('Condition is Required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(addFormData, { abortEarly: false });
      setAddFormData({ ...addFormData, user_id: user_id })
      const requestData = { ...addFormData };

      axios.post('http://localhost:3000/api/apartment/createApartment', requestData)
        .then(result => {
          const msg = result.data.success;
          // console.log(msg);
          setRefetch(!refetch);
          sweetalert.fire('Success!', `${msg}`, 'success');
          setShowModal(false)
          resetForm()
        })
        .catch(err => {
          const errorMsg = err.response ? err.response.data.error : 'An error occurred in add apartment';
          setError(errorMsg);
        });
    } catch (validationError) {
      const fieldErrors = {};
      validationError.inner.forEach(err => {
        fieldErrors[err.path] = err.message;
      });
      setErrors(fieldErrors);
      setValid(false);
    }
  };


  const deleteApartment = async (id) => {
    const result = await new Promise((resolve) => {
      sweetalert.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7a014a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        resolve(result);
      });
    });
  
    if (result.isConfirmed) {
      try {
        await axios.post(`http://localhost:3000/api/apartment/deleteApartment/${id}`);
        setRefetch(!refetch);
        sweetalert.fire('Deleted!', 'Your Apartment has been deleted.', 'success');
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://localhost:3000/api/apartment/getUserApartments/${user_id}`);
        setApartment(response.data.apartments);

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
    <SideBar/>
      

      {/* single table */}
      {loading ? (
        <div className="sm:ml-64 pt-2">
      <div className="flex justify-center items-center  mt-80 sm:me-40">
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
        apartments.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <p className="fs-3">You Have No Apartments For This Moment!</p>
          </div>
        ) : (
          <>
          {/* add button */}
      <div className="sm:ml-64 pt-2"></div>
      <div className="lg:flex sm:grid items-center justify-center m-3"></div>
      <div className="sm:ml-64 sm:px-14 ps-3 my-3 sm:mt-14">
        <div className=" rounded-lg mb-3 me-3 pt-6">
          <div className='flex justify-end mt-5'>
            <button onClick={() => setShowModal(true)} className="block text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-800 dark:hover:bg-pink-700 " type="button">
            + Add New Apartment
            </button>
          </div>
        </div>
      </div>
      {/* apartment table */}
      <div className="sm:ml-64 sm:px-14 ps-3 my-3 sm:mt-12">
        <div className=" overflow-x-auto rounded-lg mb-3 me-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" text-pink-700 px-6 rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none py-3">
                  Apartments details
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
                <th scope="col" className="px-6 py-3">
                condition
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 rounded-tr-lg py-3">
                  Delete
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
                <td className="px-9 py-4">
                  {apartment.resident_phone}
                </td>
                <td className="px-9 py-4">
                {apartment.resident_cin}
                </td>
                <td className="px-9 py-4">
                {apartment.condition}
                </td>
                <td className="px-9 py-4">
                  <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => editApartment(apartment._id)}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  </a>
                </td>
                <td className="px-9 py-4">
                  <button onClick={() => deleteApartment(apartment._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
      ))}
      
        {/* add modal */}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                      ADD APARTMENT
                    </h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleCloseModal()}>
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-800">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </span>
                  </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form className=" mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                      <div className="mb-4 flex flex-col gap-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={addFormData.building_ID}
                            name="building_ID"
                            onChange={(e) => setAddFormData({ ...addFormData, building_ID: e.target.value })}/>
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Building ID
                          </label>
                          {errors.building_ID && <span className="text-red-600 text-xs">{errors.building_ID}</span>}
                        </div>

                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={addFormData.apartment_number}
                            name="apartment_number"
                            onChange={(e) => setAddFormData({ ...addFormData, apartment_number: e.target.value })}
                            />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Apartment Number
                          </label>
                          {errors.apartment_number && <span className="text-red-600 text-xs">{errors.apartment_number}</span>}
                        </div>

                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={addFormData.resident_name}
                            name="resident_name"
                            onChange={(e) => setAddFormData({ ...addFormData, resident_name: e.target.value })}
                            />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Resident Name
                          </label>
                          {errors.resident_name && <span className="text-red-600 text-xs">{errors.resident_name}</span>}
                        </div>

                        <div className="relative mb-2 h-11 w-full min-w-[200px]">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={addFormData.resident_phone}
                            name="resident_phone"
                            onChange={(e) => setAddFormData({ ...addFormData, resident_phone: e.target.value })}
                            />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Resident Phone
                          </label>
                          {errors.resident_phone && <span className="text-red-600 text-xs">{errors.resident_phone}</span>}
                        </div>

                        <div className="relative mb-2 h-11 w-full min-w-[200px]">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={addFormData.resident_cin}
                            name="resident_cin"
                            onChange={(e) => setAddFormData({ ...addFormData, resident_cin: e.target.value })}
                            />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                           Resident CIN
                          </label>
                          {errors.resident_cin && <span className="text-red-600 text-xs">{errors.resident_cin}</span>}
                        </div>

                        <div className="relative mb-2 h-11 w-full min-w-[200px] hidden">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            // value={addFormData.condition}
                            name="condition"
                            // onChange={(e) => setAddFormData({ ...addFormData, condition: e.target.value })}
                            />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Condition 
                          </label>
                          {/* {errors.condition && <span className="text-red-600 text-xs">{errors.condition}</span>} */}
                        </div>
                      </div>

                      <div className="relative mb-2 h-11 w-full min-w-[200px]">
                          <select
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            value={addFormData.condition}
                            name="condition"
                            onChange={(e) => setAddFormData({ ...addFormData, condition: e.target.value })}>
                            <option value="" disabled>Select a condition</option>
                            <option value="owner">owner</option>
                            <option value="rent">rent</option>
                          </select>
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Condition
                          </label>
                          {errors.condition && <span className="text-red-600 text-xs">{errors.condition}</span>}
                      </div>
                      
                      <button className="mt-6 block w-full select-none rounded-lg bg-pink-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true">
                        Save
                      </button>
                      {/* Display overall form error */}
                      {!valid && <div className="text-red-600 text-xs">{error}</div>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
    </>
  )
}

export default Apartments
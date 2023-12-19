import { useLocation, useNavigate } from "react-router-dom";
import NavBar from '../Layouts/NavBar'
import SideBar from '../Layouts/SideBare'
import { useEffect, useState } from "react";
import axios from "axios";
import sweetalert from 'sweetalert2';
import * as yup from 'yup';
import { useUserContext } from '../Context/UserContext';


const EditApartment = () => {
    const { user } = useUserContext();
    const user_id = user._id

    const location = useLocation();
    let aparment_id = location.state?.aparmentId;
    // console.log(aparment_id);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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

    const [FormData, setFormData] = useState({
        building_ID: '',
        apartment_number: '',
        resident_name: '',
        resident_phone: '',
        resident_cin: '',
        condition: '',
        user_id: '',
      });
    
      const resetForm = () => {
        setFormData({
          building_ID: '',
          apartment_number: '',
          resident_name: '',
          resident_phone: '',
          resident_cin: '',
          condition: '',
          user_id: '',
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await schema.validate(FormData, { abortEarly: false });
          setFormData({ ...FormData, user_id: user_id })
          const requestData = { ...FormData };
    
          axios.post(`http://localhost:3000/api/apartment/updateApartment/${aparment_id}`, requestData)
            .then(result => {
              const msg = result.data.success;
              console.log(msg);
              sweetalert.fire('Success!', `${msg}`, 'success');
              resetForm()
              navigate('/apartments')
            })
            .catch(err => {
              setError(err);
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

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
    
            const response = await axios.get(`http://localhost:3000/api/apartment/getApartment/${aparment_id}`);
            console.log(response.data);
            setFormData({
                building_ID: response.data.data.building_ID,
                apartment_number: response.data.data.apartment_number,
                resident_name: response.data.data.resident_name,
                resident_phone: response.data.data.resident_phone,
                resident_cin: response.data.data.resident_cin,
                condition: response.data.data.condition,
                user_id: response.data.data.user_id,
              });
    
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, [aparment_id]);

  return (
    <>
    <NavBar/>
    <SideBar/>
    
    {loading ? (
    <div className="sm:ml-64 pt-2">
      <div className="flex justify-center items-center mt-64 sm:me-40">
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
     <div className="sm:ml-64 pt-2">
      <div className="lg:flex sm:grid items-center justify-center m-3">
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg mt-14 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    EDIT APARTMENT
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form className=" mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                      <div className="mb-4 flex flex-col gap-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={FormData.building_ID}
                            name="building_ID"
                            onChange={(e) => setFormData({ ...FormData, building_ID: e.target.value })}/>
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Building ID
                          </label>
                          {errors.building_ID && <span className="text-red-600 text-xs">{errors.building_ID}</span>}
                        </div>

                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={FormData.apartment_number}
                            name="apartment_number"
                            onChange={(e) => setFormData({ ...FormData, apartment_number: e.target.value })}
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
                            value={FormData.resident_name}
                            name="resident_name"
                            onChange={(e) => setFormData({ ...FormData, resident_name: e.target.value })}
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
                            value={FormData.resident_phone}
                            name="resident_phone"
                            onChange={(e) => setFormData({ ...FormData, resident_phone: e.target.value })}
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
                            value={FormData.resident_cin}
                            name="resident_cin"
                            onChange={(e) => setFormData({ ...FormData, resident_cin: e.target.value })}
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
                            value={FormData.condition}
                            name="condition"
                            onChange={(e) => setFormData({ ...FormData, condition: e.target.value })}>
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
      </div>
      </div>)}
    </>
  )
}

export default EditApartment
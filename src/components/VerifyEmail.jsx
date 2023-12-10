import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// import NavBar from './NavBar';


const VerifyEmail = () => {

  const { token } = useParams(); 
  const tokenWithdots = token.replace(/~/g, '.');
  console.log(tokenWithdots);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  verify();
  function verify () {
    axios.get(`http://localhost:3000/api/auth/verification/${tokenWithdots}`)
    .then(result => {
        const msg = result.data.success;
        setMessage(msg)
        console.log(msg);
        navigate('/login', { state: { message: msg }});
        })
        .catch(err => {
        const error = err.response ? err.response.data.error : 'An error occurred in register';
        setError(error)
        })
  }


  return (
    <>
    {/* <NavBar/> */}
    <div className="flex items-center mt-10 pt-10 justify-center">
    <div>
      <div>
          {message && (
            <div className="bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{message}</span> 
            </div>
          )}
        </div>
        <div>
          {error && (
            <div className="bg-red-100 mt-10 border border-red-400 text-red-700 fw-bold px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span> 
            </div>
          )}
        </div>
    </div>
    </div>
    </>
  )
}

export default VerifyEmail
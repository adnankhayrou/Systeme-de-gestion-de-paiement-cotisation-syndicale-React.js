import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Dashboard/Home'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import VerifyEmail from './components/Auth/VerifyEmail'
import Apartments from './components/Apartments/Apartments'
import EditApartment from './components/Apartments/EditApartment'
import Payment from './components/Payments/Payment'
import Cookies from 'js-cookie';

// eslint-disable-next-line react/prop-types
const LogoutMiddleware = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken'); 

  if (isAuthenticated) {
    return children;
  } 

  return (
    <Navigate to="/login" />
  )
}

// eslint-disable-next-line react/prop-types
const LoginMiddleware = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken'); 

  if (!isAuthenticated) {
    return children;
  } 

  return (
    <Navigate to="/"/>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogoutMiddleware> <Home /> </LogoutMiddleware>} />
        <Route path='/register' element={<LoginMiddleware> <Register /> </LoginMiddleware>} />
        <Route path='/login' element={<LoginMiddleware> <Login /> </LoginMiddleware>} />
        <Route path='/forgotPassword' element={ <ForgotPassword />} />
        <Route path='/resetPassword/:token' element={ <ResetPassword /> }/>
        <Route path='/verifyEmail/:token' element={ <VerifyEmail /> }/>
        <Route path='/apartments' element={<LogoutMiddleware> <Apartments /> </LogoutMiddleware>} />
        <Route path='/payment' element={<LogoutMiddleware> <Payment /> </LogoutMiddleware>} />
        <Route path='/editApartment' element={<LogoutMiddleware> <EditApartment /> </LogoutMiddleware>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import Cookies from 'js-cookie';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};
  

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(Cookies.get('user')) || null);  
  
    const logoutUser = async () => {
    setUser(Cookies.remove('user'));
    };

  return (
    <UserContext.Provider value={{ user, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

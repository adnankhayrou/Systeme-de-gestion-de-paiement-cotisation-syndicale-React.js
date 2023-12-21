/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import Cookies from 'js-cookie';
import { createContext, useContext,  useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};
  

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null);

  const logoutUser = async () => {
    Cookies.remove('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logoutUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

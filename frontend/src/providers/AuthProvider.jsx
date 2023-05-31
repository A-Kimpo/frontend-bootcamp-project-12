import React, {
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';
import axios from 'axios';

import routes from '../routes';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const makeRequest = async (route, { username, password }) => {
    const { data: { token } } = await axios.post(route, { username, password });
    localStorage.setItem('user', JSON.stringify({ token, username }));
    setLoggedIn(true);
  };

  const logIn = async (userData) => {
    await makeRequest(routes.logInPath(), userData);
  };

  const signUp = async (userData) => {
    await makeRequest(routes.signUpPath(), userData);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const checkAuth = () => {
    if (localStorage.getItem('user')) {
      setLoggedIn(true);
      return true;
    }
    return false;
  };

  const getUserName = () => {
    const { username } = JSON.parse(localStorage.getItem('user'));
    return username;
  };

  const getData = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(routes.dataPath(), { headers });
    return data;
  };

  const memo = useMemo(() => ({
    loggedIn,
    logIn,
    signUp,
    logOut,
    checkAuth,
    getUserName,
    getData,
  }));

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, {
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getUserName = () => {
    const { username } = JSON.parse(localStorage.getItem('user'));
    return username;
  };

  const getAuthHeaders = () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return headers;
  };

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const memo = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getUserName,
    getAuthHeaders,
  }));

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import {
  Button,
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import Page404 from './Page404';
import MainPage from './chat/MainPage';
import AuthContext from '../contexts/index';
import useAuth from '../hooks/index';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet chat</Navbar.Brand>
            <Nav className="mr-auto" />
            <AuthButton />
          </Container>
        </Navbar>

        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;

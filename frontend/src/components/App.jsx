import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Navbar,
  Button,
  Nav,
  Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import MainPage from './chat/MainPage';
import LogInPage from './login/LogInPage';
import SignUpPage from './SignUpPage';
import Page404 from './Page404';
import { useAuth } from '../providers/AuthProvider';

const AuthButton = ({ t }) => {
  const { loggedIn, logOut } = useAuth();

  return (
    loggedIn
      ? <Button onClick={logOut}>{t('logOutButton')}</Button>
      : null
  );
};

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return (
    loggedIn
      ? children
      : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">{t('appName')}</Navbar.Brand>
            <Nav className="mr-auto" />
            <AuthButton t={t} />
          </Container>
        </Navbar>

        <Routes>
          <Route path="*" element={<Page404 t={t} />} />
          <Route path="/signup" element={<SignUpPage t={t} />} />
          <Route path="/login" element={<LogInPage t={t} />} />
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
  );
};

export default App;

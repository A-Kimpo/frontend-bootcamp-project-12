import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import Page404 from './Page404';
import MainPage from './chat/MainPage';
import AuthProvider, { PrivateRoute, AuthButton } from '../providers/AuthProvider';

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

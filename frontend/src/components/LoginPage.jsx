import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { object, string } from 'yup';

import { useAuth } from '../providers/AuthProvider.jsx';
import routes from '../routes.js';

const LoginForm = ({ t }) => {
  const [failedLogin, setFailedLogin] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const validationSchema = object({
    username: string().required(),
    password: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username } = values;

      try {
        const { data: { token } } = await axios.post(routes.logInPath(), values);

        localStorage.setItem('user', JSON.stringify({ token, username }));

        auth.logIn();

        navigate('/', { replace: true });
      } catch (err) {
        return err.response.status === 401
          ? setFailedLogin(true)
          : setFailedLogin(false);
      }
      return null;
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('logInPage.header')}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          id="username"
          name="username"
          autoFocus
          placeholder={t('logInPage.username')}
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Form.Label htmlFor="username">{t('logInPage.username')}</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          id="password"
          name="password"
          type="password"
          placeholder={t('logInPage.password')}
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={failedLogin}
        />
        <Form.Label htmlFor="password">{t('logInPage.password')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {t('errors.unauthorized')}
        </Form.Control.Feedback>
      </Form.Floating>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('logInPage.submit')}</Button>
    </Form>
  );
};

const LoginPage = ({ t }) => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (localStorage.getItem('user')) {
        logIn();
        navigate('/', { replace: true });
      }
    };
    checkAuth();
  }, []);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src="loginImage.jpeg" roundedCircle alt={t('logInPage.header')} />
              <LoginForm t={t} />
            </Card.Body>
            <Card.Footer className="p-4">
              <Container className="text-center">
                <span>{t('logInPage.nullAccount')}</span>
                &nbsp;
                <Link to="/signup">{t('logInPage.signUpLink')}</Link>
              </Container>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

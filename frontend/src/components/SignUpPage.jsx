import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import axios from 'axios';

import routes from '../routes';
import { useAuth } from '../providers/AuthProvider';

const SignUpInput = ({ formik, variant, t }) => (
  <Form.Floating className="mb-3">
    <Form.Control
      id={`${variant}`}
      name={`${variant}`}
      type={variant === 'username' ? 'text' : 'password'}
      autoFocus={variant === 'username'}
      placeholder={t(`signUpPage.${variant}`)}
      autoComplete={`${variant}`}
      disabled={formik.isSubmitting}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[variant]}
      isInvalid={formik.errors[variant] && formik.touched[variant]}
    />
    <Form.Label htmlFor={`${variant}`}>{t(`signUpPage.${variant}`)}</Form.Label>
    <Form.Control.Feedback type="invalid" placement="right" tooltip>{t(formik.errors[variant])}</Form.Control.Feedback>
  </Form.Floating>
);

const SignUpForm = ({ t }) => {
  const [failedSignUp, setFailedSignUp] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const signUpSchema = object({
    username: string()
      .trim()
      .required('errors.required')
      .min(3, 'errors.length')
      .max(20, 'errors.length'),
    password: string()
      .required('errors.required')
      .min(6, 'errors.minLength'),
    confirmPassword: string()
      .required('errors.required')
      .oneOf([ref('password')], 'errors.diffPasswords'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const { data: { token } } = await axios.post(routes.signUpPath(), { username, password });

        localStorage.setItem('user', JSON.stringify({ token, username }));

        auth.logIn();

        navigate('/', { replace: true });
      } catch (err) {
        formik.setSubmitting(false);
        return err.response.status === 409
          ? setFailedSignUp(true)
          : null;
      }
      return null;
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('signUpPage.header')}</h1>
      <SignUpInput formik={formik} t={t} variant="username" />
      <SignUpInput formik={formik} t={t} variant="password" />
      <SignUpInput formik={formik} t={t} variant="confirmPassword" />
      {failedSignUp ? <Alert variant="danger">{t('errors.existUser')}</Alert> : null}
      <Button type="submit" variant="outline-primary" className="w-100">{t('signUpPage.submit')}</Button>
    </Form>
  );
};

const SignUpPage = ({ t }) => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <Image src="signUpImage.jpg" roundedCircle alt={t('signUpPage.header')} />
            <SignUpForm t={t} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignUpPage;

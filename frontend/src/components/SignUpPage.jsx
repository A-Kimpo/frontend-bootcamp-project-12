import React, { useState } from 'react';
import {
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../routes';
import { useAuth } from '../providers/AuthProvider';
import { getSignUpSchema } from '../validation';
import AuthPagesInner from './AuthPagesInner';

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

  const { logIn } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getSignUpSchema(),
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const { data: { token } } = await axios.post(routes.signUpPath(), { username, password });

        localStorage.setItem('user', JSON.stringify({ token, username }));

        logIn();

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
  <AuthPagesInner t={t} type="signUp">
    <SignUpForm t={t} />
  </AuthPagesInner>
);

export default SignUpPage;

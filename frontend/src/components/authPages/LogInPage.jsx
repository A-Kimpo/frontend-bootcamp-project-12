import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useAuth } from '../../providers/AuthProvider';
import { getLogInSchema } from '../../validation';
import AuthPagesInner from './AuthPagesInner';
import handleError from '../../handleError';
import routes from '../../routes';

const LogInForm = ({ t }) => {
  const [failedLogIn, setFailedLogIn] = useState(false);

  const { logIn } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: getLogInSchema(),
    onSubmit: async (values) => {
      try {
        await logIn(values);

        navigate(routes.mainPage(), { replace: true });
      } catch (err) {
        formik.setSubmitting(false);

        handleError(err, t);

        if (err.response.status === 401) {
          setFailedLogIn(true);
        }
      }
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
          isInvalid={failedLogIn}
        />
        <Form.Label htmlFor="password">{t('logInPage.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {t('errors.unauthorized')}
        </Form.Control.Feedback>
      </Form.Floating>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('logInPage.submit')}</Button>
    </Form>
  );
};

const LogInPage = ({ t }) => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkAuth()) navigate(routes.mainPage(), { replace: true });
  }, []);

  return (
    <AuthPagesInner t={t} type="logIn">
      <LogInForm t={t} />
    </AuthPagesInner>
  );
};

export default LogInPage;

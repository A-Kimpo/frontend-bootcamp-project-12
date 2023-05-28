import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';

import routes from '../routes';
import { useAuth } from '../providers/AuthProvider';

const SignUpForm = ({ formik, failedSignUp }) => (
  <Form onSubmit={formik.handleSubmit} className="w-50">
    <h1 className="text-center mb-4">Регистрация</h1>
    <Form.Floating className="mb-3">
      <Form.Control
        id="username"
        name="username"
        required
        autoFocus
        placeholder="От 3 до 20 символов"
        autoComplete="username"
        className="form-control"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <Form.Label htmlFor="username">Имя пользователя</Form.Label>
      <Form.Control.Feedback type="invalid" placement="right" tooltip>Обязательное поле</Form.Control.Feedback>
    </Form.Floating>
    <Form.Floating className="mb-3">
      <Form.Control
        id="password"
        name="password"
        type="password"
        required
        placeholder="Не менее 6 символов"
        autoComplete="new-password"
        aria-describedby="passwordHelpBlock"
        className="form-control"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <Form.Label htmlFor="password">Пароль</Form.Label>
      <Form.Control.Feedback type="invalid" tooltip>Обязательное поле</Form.Control.Feedback>
    </Form.Floating>
    <Form.Floating className="mb-4">
      <Form.Control
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Пароли должны совпадать"
        autoComplete="new-password"
        className="form-control"
        isInvalid={failedSignUp}
      />
      <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
      <Form.Control.Feedback type="invalid" tooltip>Пользователь существует</Form.Control.Feedback>
    </Form.Floating>
    <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
  </Form>
);

const SignUpPage = () => {
  const [failedSignUp, setFailedSignUp] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const validationSchema = object({
    username: string().required(),
    password: string().required(),
    // confirmPassword: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const { data: { token } } = await axios.post(routes.signUpPath(), { username, password });

        localStorage.setItem('user', JSON.stringify({ token, username }));

        auth.logIn();

        navigate('/', { replace: true });
      } catch (err) {
        return err.response.status === 409
          ? setFailedSignUp(true)
          : null;
      }
      return null;
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src="signUpImage.jpg" roundedCircle alt="Регистрация" />
              </div>
              <SignUpForm failedSignUp={failedSignUp} formik={formik} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;

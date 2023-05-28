import React from 'react';
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
import { object, string, ref } from 'yup';
import axios from 'axios';

import routes from '../routes';
import { useAuth } from '../providers/AuthProvider';

const SignUpInput = ({ formik, variant }) => (
  <Form.Floating className="mb-3">
    <Form.Control
      id={`${variant}`}
      name={`${variant}`}
      type={variant === 'password' || variant === 'confirmPassword' ? 'password' : 'text'}
      autoFocus={variant === 'username'}
      placeholder="t me"
      autoComplete={`${variant}`}
      disabled={formik.isSubmitting}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[variant]}
      isInvalid={formik.errors[variant] && formik.touched[variant]}
    />
    <Form.Label htmlFor={`${variant}`}>t me</Form.Label>
    <Form.Control.Feedback type="invalid" placement="right" tooltip>{formik.errors[variant]}</Form.Control.Feedback>
  </Form.Floating>
);

const SignUpForm = () => {
  // const [failedSignUp, setFailedSignUp] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const signUpSchema = object({
    username: string().trim().required()
      .min(3)
      .max(20),
    password: string().required().min(6),
    confirmPassword: string().required().oneOf([ref('password'), null]),
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
        // return err.response.status === 409
        //   ? setFailedSignUp(true)
        //   : null;
      }
      return null;
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">Регистрация</h1>
      <SignUpInput formik={formik} variant="username" />
      <SignUpInput formik={formik} variant="password" />
      <SignUpInput formik={formik} variant="confirmPassword" />
      <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
    </Form>
  );
};

const SignUpPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <Image src="signUpImage.jpg" roundedCircle alt="Регистрация" />
            </div>
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignUpPage;

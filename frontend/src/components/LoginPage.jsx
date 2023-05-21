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
import { Link } from 'react-router-dom';

const LoginPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
              <Image src="loginImage.jpeg" roundedCircle alt="Войти" />
            </Col>
            <Form className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">Войти</h1>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="username"
                  name="username"
                  autoFocus
                  placeholder="Ваш ник"
                  autoComplete="username"
                />
                <label htmlFor="username">Ваш ник</label>
              </Form.Floating>
              <Form.Floating className="mb-4">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  autoComplete="current-password"
                />
                <label htmlFor="password">Пароль</label>
                <Form.Control.Feedback type="invalid">
                  the username or password is incorrect
                </Form.Control.Feedback>
              </Form.Floating>
              <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              &nbsp;
              <Link to="/signup">Регистрация</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;

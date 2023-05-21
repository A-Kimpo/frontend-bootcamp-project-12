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

const SignUpPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <Image src="signUpImage.jpg" roundedCircle alt="Регистрация" />
            </div>
            <Form className="w-50">
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
                />
                <label className="form-label" htmlFor="username">Имя пользователя</label>
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
                />
                <label className="form-label" htmlFor="password">Пароль</label>
                <Form.Control.Feedback type="invalid" tooltip>Обязательное поле</Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating className="mb-4">
                <Form.Control
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Пароли должны совпадать"
                  autoComplete="new-password"
                  className="form-control"
                />
                <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                <Form.Control.Feedback type="invalid" tooltip />
              </Form.Floating>
              <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignUpPage;

import React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AuthPagesInner = ({ t, children, type }) => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <Image src={`${type}Image.jpg`} roundedCircle alt={t(`${type}.header`)} />
            {children}
          </Card.Body>
          {type === 'logIn'
            ? (
              <Card.Footer className="p-4">
                <Container className="text-center">
                  <span>{t('logInPage.nullAccount')}</span>
                  &nbsp;
                  <Link to="/signup">{t('logInPage.signUpLink')}</Link>
                </Container>
              </Card.Footer>
            )
            : null}
        </Card>
      </Col>
    </Row>
  </Container>
);

export default AuthPagesInner;

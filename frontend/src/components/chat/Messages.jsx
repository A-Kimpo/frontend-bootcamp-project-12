import { useFormik } from 'formik';
import React from 'react';
import {
  Button,
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectors as messagesSelectors } from '../../slices/messagesSlice';
import { useSocket } from '../../providers/SocketProvider';

const MessageField = () => {
  const messages = useSelector(messagesSelectors.selectAll);

  const { addMessage } = useSocket();

  const formik = useFormik({
    initialValues: {
      textMessage: '',
    },
    onSubmit: (values) => {
      addMessage(values.textMessage);
      formik.resetForm();
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted">0 сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map(({ id, body, username }) => (
            <React.Fragment key={id}>
              <div className="text-break mb-2">
                <b>{username}</b>
                :
                &nbsp;
                {body}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
            <InputGroup className="has-validation">
              <Form.Control
                name="textMessage"
                onChange={formik.handleChange}
                value={formik.values.textMessage}
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2"
              />
              <Button
                type="submit"
                disabled=""
                variant="group-vertical"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default MessageField;

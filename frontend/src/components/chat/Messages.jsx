import { useFormik } from 'formik';
import React from 'react';
import {
  Button,
  Image,
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectors as messagesSelectors } from '../../slices/messagesSlice';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { useSocket } from '../../providers/SocketProvider';

const MessagesHeader = ({ channelName, messagesCount }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b>
        #
        &nbsp;
        {channelName}
      </b>
    </p>
    <span className="text-muted">
      {messagesCount}
      &nbsp;
      сообщений
    </span>
  </div>
);

const MessagesField = ({ messages }) => {
  const renderMessages = messages
    .map(({ id, body, username }) => (
      <React.Fragment key={id}>
        <div className="text-break mb-2">
          <b>{username}</b>
          :
          &nbsp;
          {body}
        </div>
      </React.Fragment>
    ));

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {renderMessages}
    </div>
  );
};

const MessagesForm = ({ formik }) => (
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
          <Image src="sendMessage.svg" />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  </div>
);

const Messages = () => {
  const { addMessage } = useSocket();

  const messages = useSelector(messagesSelectors.selectAll);

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );
  const channelName = !currentChannel ? '' : currentChannel.name;

  const channelMessages = messages
    .filter(({ channelId }) => Number(channelId) === currentChannelId);

  const formik = useFormik({
    initialValues: {
      textMessage: '',
    },
    onSubmit: ({ textMessage }) => {
      addMessage(textMessage);
      formik.resetForm();
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader channelName={channelName} messagesCount={channelMessages.length} />
        <MessagesField messages={channelMessages} />
        <MessagesForm formik={formik} />
      </div>
    </Col>
  );
};

export default Messages;
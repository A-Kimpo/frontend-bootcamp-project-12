import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import {
  Button,
  Image,
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoFilter from 'leo-profanity';
import { toast } from 'react-toastify';

import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { selectors as messagesSelectors } from '../../slices/messagesSlice';
import { useSocket } from '../../providers/SocketProvider';
import toastifyConfig from '../../toastifyConfig';

const MessagesHeader = ({ channelName, messagesCount, t }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b>
        #
        &nbsp;
        {channelName}
      </b>
    </p>
    <span className="text-muted">
      {t('messages.messagesCount.messages', { count: messagesCount })}
    </span>
  </div>
);

const MessagesField = ({ messages }) => {
  const messageFieldRef = useRef();

  useEffect(() => {
    messageFieldRef.current.scrollTop = messageFieldRef.current.scrollHeight;
  }, [messages]);

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
    <div ref={messageFieldRef} id="messages-box" className="chat-messages overflow-auto px-5 ">
      {renderMessages}
    </div>
  );
};

const MessagesForm = ({ t }) => {
  const { addMessage } = useSocket();
  const messagesInputRef = useRef();

  useEffect(() => {
    messagesInputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      textMessage: '',
    },
    onSubmit: ({ textMessage }) => {
      try {
        addMessage(leoFilter.clean(textMessage));
        formik.resetForm();
      } catch (err) {
        formik.setSubmitting(false);
        toast.error(t('errors.networkError'), toastifyConfig);
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
        <InputGroup className="has-validation">
          <Form.Control
            id="messagesInput"
            name="textMessage"
            required
            ref={messagesInputRef}
            onChange={formik.handleChange}
            value={formik.values.textMessage}
            autoComplete="off"
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.messagesInput')}
            className="border-0 p-0 ps-2"
          />
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="group-vertical"
          >
            <Image src="sendMessage.svg" />
            <span className="visually-hidden">{t('messages.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

const Messages = () => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const channelMessages = messages
    .filter(({ channelId }) => Number(channelId) === currentChannelId);

  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );

  const channelName = !currentChannel ? '' : currentChannel.name;

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader channelName={channelName} messagesCount={channelMessages.length} t={t} />
        <MessagesField messages={channelMessages} />
        <MessagesForm t={t} />
      </div>
    </Col>
  );
};

export default Messages;

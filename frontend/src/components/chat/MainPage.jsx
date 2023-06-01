import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import { useAuth } from '../../providers/AuthProvider';

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getData, logOut } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { channels, messages, currentChannelId } = await getData();

        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
        dispatch(channelsActions.setCurrentChannel(currentChannelId));
      } catch (err) {
        toast.error(t('errors.authError'));
        logOut();
      }
    })();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;

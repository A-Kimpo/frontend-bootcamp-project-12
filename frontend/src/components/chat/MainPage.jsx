import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice';
import { actions as messagesActions, selectors as messagesSelectors } from '../../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import { useAuth } from '../../providers/AuthProvider';

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeaders, logOut } = useAuth();

  useEffect(() => {
    (async () => {
      const headers = getAuthHeaders();
      try {
        const { data } = await axios.get(routes.dataPath(), { headers });
        const { channels, messages, currentChannelId } = data;

        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannel(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
      } catch (err) {
        toast.error(t('errors.authError'));
        logOut();
      }
    })();
  }, [dispatch]);

  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels channels={channels} currentChannelId={currentChannelId} />
        <Messages messages={messages} currentChannelId={currentChannelId} />
      </Row>
    </Container>
  );
};

export default MainPage;

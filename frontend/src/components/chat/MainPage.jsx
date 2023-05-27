import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import routes from '../../routes';
import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice';
import { actions as messagesActions, selectors as messagesSelectors } from '../../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const { data } = await axios.get(routes.dataPath(), { headers });
      const { channels, messages, currentChannelId } = data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannel(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    })();
  }, []);

  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels channels={channels} currentChannelId={currentChannelId} />
        <Messages
          messages={messages}
          currentChannel={currentChannel}
          currentChannelId={currentChannelId}
        />
      </Row>
    </Container>
  );
};

export default MainPage;

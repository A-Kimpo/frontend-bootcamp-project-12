import React, { createContext, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { useAuth } from './AuthProvider';

const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const auth = useAuth();

  socket.on('newChannel', (channelName) => {
    dispatch(channelsActions.addChannel(channelName));
  });
  socket.on('renameChannel', ({ id, name }) => {
    dispatch(channelsActions.renameChannel({ id, changes: { name } }));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });
  socket.on('newMessage', (messageText) => {
    dispatch(messagesActions.addMessage(messageText));
  });

  const addChannel = async (name) => {
    const { data: { id } } = await socket.emitWithAck('newChannel', { name });
    dispatch(channelsActions.setCurrentChannel(id));
  };
  const renameChannel = (id, name) => socket.emit('renameChannel', { id, name });
  const removeChannel = (id) => socket.emit('removeChannel', { id });

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const addMessage = (text) => {
    socket.emit('newMessage', { body: text, channelId: currentChannelId, username: auth.getUserName() });
  };

  const memo = useMemo(() => ({
    addChannel,
    renameChannel,
    removeChannel,
    addMessage,
  }));

  return (
    <SocketContext.Provider value={memo}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

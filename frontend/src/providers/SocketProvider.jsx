import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { useAuth } from './AuthProvider';

const SocketContext = createContext({});

const useSocket = () => useContext(SocketContext);

const socket = io();

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useAuth();

  socket.on('newChannel', (channelName) => {
    dispatch(channelsActions.addChannel(channelName));
  });
  socket.on('renameChannel', ({ id, newName }) => {
    dispatch(channelsActions.renameChannel({ id, changes: { name: newName } }));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });
  socket.on('newMessage', (messageText) => {
    dispatch(messagesActions.addMessage(messageText));
  });

  const addChannel = (name) => socket.emit('newChannel', { name });
  const renameChannel = (name) => socket.emit('renameChannel', { name });
  const removeChannel = (id) => socket.emit('removeChannel', { id });

  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const addMessage = (text) => {
    socket.emit('newMessage', { body: text, channelId: currentChannel, username: auth.getUserName() });
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

export { SocketContext, useSocket };
export default SocketProvider;

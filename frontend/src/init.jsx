import React from 'react';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './slices';
import resources from './locales';
import App from './components/App';
import AuthProvider from './providers/AuthProvider';
import SocketProvider from './providers/SocketProvider';

export default async () => {
  await i18n.use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
      debug: true,
    });

  const socket = io();

  return (
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </AuthProvider>
    </Provider>
  );
};

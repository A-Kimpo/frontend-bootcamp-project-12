import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

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
    });

  leoProfanity.loadDictionary('ru');

  const socket = io();

  const rollbarConfig = {
    accessToken: 'ed45a4bbc50d4b43a0ae593918e8c63d',
    environment: 'testenv',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <AuthProvider>
            <SocketProvider socket={socket}>
              <App />
              <ToastContainer />
            </SocketProvider>
          </AuthProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import store from './slices';
import resources from './locales';
import AuthProvider from './providers/AuthProvider';
import SocketProvider from './providers/SocketProvider';
import App from './components/App';

export default async () => {
  await i18n.use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });

  const socket = io();

  leoProfanity.loadDictionary('ru');
  leoProfanity.loadDictionary('en');

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    environment: process.env.ROLLBAR_ENV,
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

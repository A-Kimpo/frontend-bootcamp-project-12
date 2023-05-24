import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';

import store from './slices';
import App from './components/App';

export default async () => (
  <Provider store={store}>
    <App />
  </Provider>
);

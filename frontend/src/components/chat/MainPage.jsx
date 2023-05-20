import React from 'react';

import Channels from './Channels';
import MessageField from './MessageField';

const MainPage = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <Channels />
      <MessageField />
    </div>
  </div>
);

export default MainPage;

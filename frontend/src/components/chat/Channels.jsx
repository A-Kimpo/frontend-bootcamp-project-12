import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Nav } from 'react-bootstrap';

import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button type="button" variant="group-vertical" className="p-0 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" variant="pills" fill id="channels-box" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name }) => (
          <React.Fragment key={id}>
            <Nav.Item as="li" className="w-100">
              <Button onClick={() => dispatch(channelsActions.setCurrentChannel(id))} type="button" variant={id === currentChannel ? 'secondary' : ''} className="w-100 rounded-0 text-start">
                <span className="me-1">#</span>
                {name}
              </Button>
            </Nav.Item>
          </React.Fragment>
        ))}
      </Nav>
    </Col>
  );
};
export default Channels;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Nav,
  ButtonGroup,
  Dropdown,
  Image,
} from 'react-bootstrap';

import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice';
import { useSocket } from '../../providers/SocketProvider';

const RemovableChannel = (props) => {
  const { id, name, currentChannel } = props;
  const dispatch = useDispatch();
  const variant = id === currentChannel ? 'secondary' : '';

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        onClick={() => dispatch(channelsActions.setCurrentChannel(id))}
        type="button"
        variant={variant}
        className="w-100 text-start text-truncate"
      >
        <span className="me-1">
          #
        </span>
        {name}
      </Button>

      <Dropdown.Toggle variant={variant} className="border-0">
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Удалить</Dropdown.Item>
        <Dropdown.Item>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const UnremovableChannel = (props) => {
  const { id, name, currentChannel } = props;
  const dispatch = useDispatch();
  const variant = id === currentChannel ? 'secondary' : '';

  return (
    <Button
      onClick={() => dispatch(channelsActions.setCurrentChannel(id))}
      type="button"
      variant={variant}
      className="w-100 text-start text-truncate"
    >
      <span className="me-1">
        #
      </span>
      {name}
    </Button>
  );
};

const ChannelsHeader = ({ addChannel }) => (
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>Каналы</b>
    <Button onClick={() => addChannel('NEW CHANNEL')} type="button" variant="group-vertical" className="p-0 text-primary">
      <Image src="addChannel.svg" />
      <span className="visually-hidden">+</span>
    </Button>
  </div>
);

const ChannelsField = ({ channels }) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const renderChannels = channels.map(({ id, name, removable }) => (
    <React.Fragment key={id}>
      <Nav.Item as="li" className="w-100">
        {!removable
          ? <UnremovableChannel id={id} name={name} currentChannel={currentChannelId} />
          : <RemovableChannel id={id} name={name} currentChannel={currentChannelId} />}
      </Nav.Item>
    </React.Fragment>
  ));

  return (
    <Nav as="ul" variant="pills" fill id="channels-box" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
      {renderChannels}
    </Nav>
  );
};

const Channels = () => {
  const channels = useSelector(channelsSelectors.selectAll);

  const { addChannel } = useSocket();

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader addChannel={addChannel} />
      <ChannelsField channels={channels} />
    </Col>
  );
};
export default Channels;

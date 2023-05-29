import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Col,
  Nav,
  ButtonGroup,
  Dropdown,
  Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { actions as channelsActions } from '../../slices/channelsSlice';
import getModal from '../modals';

const UnremovableChannel = ({ children }) => (children);

const RemovableChannel = ({
  id, variant, showModal, children, t,
}) => (
  <Dropdown as={ButtonGroup} className="d-flex">
    {children}
    <Dropdown.Toggle variant={variant} className="border-0">
      <span className="visually-hidden">{t('channels.channelControl')}</span>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => showModal('removing', id)}>{t('channels.remove')}</Dropdown.Item>
      <Dropdown.Item onClick={() => showModal('renaming', id)}>{t('channels.rename')}</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const ChannelsHeader = ({ showModal, t }) => (
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>{t('channels.header')}</b>
    <Button onClick={() => showModal('adding')} type="button" variant="group-vertical" className="p-0 text-primary">
      <Image src="addChannel.svg" />
      <span className="visually-hidden">+</span>
    </Button>
  </div>
);

const ChannelsField = ({
  channels, currentChannelId, showModal, t,
}) => {
  const dispatch = useDispatch();

  const renderChannels = channels
    .map(({ id, name, removable }) => {
      const setActiveChannel = (chId) => dispatch(channelsActions.setCurrentChannel(chId));
      const variant = id === currentChannelId ? 'secondary' : '';
      const Channel = !removable ? UnremovableChannel : RemovableChannel;

      return (
        <React.Fragment key={id}>
          <Nav.Item as="li" className="w-100">
            <Channel id={id} variant={variant} showModal={showModal} t={t}>
              <Button
                onClick={() => setActiveChannel(id)}
                type="button"
                variant={variant}
                className="w-100 text-start text-truncate"
              >
                <span className="me-1">#</span>
                {name}
              </Button>
            </Channel>
          </Nav.Item>
        </React.Fragment>
      );
    });

  return (
    <Nav as="ul" variant="pills" fill id="channels-box" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
      {renderChannels}
    </Nav>
  );
};

const renderModal = ({ modalInfo, hideModal, t }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component id={modalInfo.channelId} hideModal={hideModal} t={t} />;
};

const Channels = ({ channels, currentChannelId }) => {
  const { t } = useTranslation();

  const [modalInfo, setModalInfo] = useState({ type: null, channelId: null });
  const hideModal = () => setModalInfo({ type: null, channelId: null });
  const showModal = (type, channelId = null) => setModalInfo({ type, channelId });

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader showModal={showModal} t={t} />
      <ChannelsField
        channels={channels}
        currentChannelId={currentChannelId}
        showModal={showModal}
        t={t}
      />
      {renderModal({ modalInfo, hideModal, t })}
    </Col>
  );
};
export default Channels;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Col,
  Nav,
  ButtonGroup,
  Dropdown,
  Image,
} from 'react-bootstrap';

import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice';
import { actions as modalsActions } from '../../slices/modalsSlice';

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
      <Dropdown.Item onClick={() => showModal('remove', id)}>{t('channels.remove')}</Dropdown.Item>
      <Dropdown.Item onClick={() => showModal('rename', id)}>{t('channels.rename')}</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const ChannelsHeader = ({ showModal, t }) => (
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>{t('channels.header')}</b>
    <Button onClick={() => showModal('add')} type="button" variant="group-vertical" className="p-0 text-primary">
      <Image src="addChannel.svg" />
      <span className="visually-hidden">+</span>
    </Button>
  </div>
);

const ChannelsField = ({ showModal, t }) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

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

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showModal = (type, id = null) => dispatch(modalsActions.openModal({ type, id }));

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader showModal={showModal} t={t} />
      <ChannelsField showModal={showModal} t={t} />
    </Col>
  );
};
export default Channels;

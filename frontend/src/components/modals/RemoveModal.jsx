import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useSocket } from '../../providers/SocketProvider';
import toastifyConfig from '../../toastifyConfig';
import ModalBuilder from './ModalBuilder';

const RemoveModal = ({ id, hideModal, t }) => {
  const { removeChannel } = useSocket();
  const removeBtnRef = useRef();

  useEffect(() => {
    removeBtnRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      toast.success(t('toast.remove'), toastifyConfig);
      removeChannel(id);
      hideModal();
    } catch (err) {
      toast.error(t('errors.networkError'), toastifyConfig);
    }
  };

  return <ModalBuilder handleSubmit={handleSubmit} removeBtnRef={removeBtnRef} />;
};

export default RemoveModal;

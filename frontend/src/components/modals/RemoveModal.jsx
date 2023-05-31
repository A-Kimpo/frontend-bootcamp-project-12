import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useSocket } from '../../providers/SocketProvider';
import toastifyConfig from '../../toastifyConfig';
import ModalBuilder from './ModalBuilder';

const RemoveModal = ({
  id, hideModal, t, type,
}) => {
  const { removeChannel } = useSocket();

  useEffect(() => {
    const ref = document.getElementById('submitRemoving');
    ref.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t('toast.remove'), toastifyConfig);
    removeChannel(id);
    hideModal();
  };

  return <ModalBuilder type={type} handleSubmit={handleSubmit} hideModal={hideModal} t={t} />;
};

export default RemoveModal;

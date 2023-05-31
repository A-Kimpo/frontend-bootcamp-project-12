import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoFilter from 'leo-profanity';

import { useSocket } from '../../providers/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import toastifyConfig from '../../toastifyConfig';
import { getModalSchema } from '../../validation';
import ModalBuilder from './ModalBuilder';

const RenameModal = ({
  id, hideModal, t, type,
}) => {
  const { renameChannel } = useSocket();

  const { name: targetName } = useSelector(
    (state) => channelsSelectors.selectById(state, id),
  );
  const channels = useSelector(channelsSelectors.selectAll);
  const existingNames = channels.map(({ name }) => name);

  useEffect(() => {
    const ref = document.getElementById('channelName');
    ref.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: targetName,
    },
    validationSchema: getModalSchema(existingNames),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: ({ channelName }) => {
      toast.success(t('toast.rename'), toastifyConfig);
      renameChannel(id, leoFilter.clean(channelName));
      hideModal();
    },
  });

  return <ModalBuilder type={type} formik={formik} hideModal={hideModal} t={t} />;
};

export default RenameModal;

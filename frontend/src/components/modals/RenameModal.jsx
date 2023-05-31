import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoFilter from 'leo-profanity';

import { useSocket } from '../../providers/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import toastifyConfig from '../../toastifyConfig';
import { getModalSchema } from '../../validation';
import ModalBuilder from './ModalBuilder';

const RenameModal = ({ id, hideModal, t }) => {
  const { renameChannel } = useSocket();

  const { name: targetName } = useSelector(
    (state) => channelsSelectors.selectById(state, id),
  );
  const channels = useSelector(channelsSelectors.selectAll);
  const existingNames = channels.map(({ name }) => name);

  const formik = useFormik({
    initialValues: {
      channelName: targetName,
    },
    validationSchema: getModalSchema(existingNames),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: ({ channelName }) => {
      try {
        toast.success(t('toast.rename'), toastifyConfig);
        renameChannel(id, leoFilter.clean(channelName));
        hideModal();
      } catch (err) {
        toast.error(t('errors.networkError'), toastifyConfig);
      }
    },
  });

  return <ModalBuilder formik={formik} />;
};

export default RenameModal;

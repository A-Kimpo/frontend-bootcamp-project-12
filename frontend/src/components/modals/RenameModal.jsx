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
import handleError from '../../handleError';

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
        const { connected } = renameChannel(id, leoFilter.clean(channelName));

        if (connected) {
          toast.success(t('toast.rename'), toastifyConfig);
          hideModal();
        }
      } catch (err) {
        handleError(err, t);
      }
    },
  });

  return <ModalBuilder formik={formik} />;
};

export default RenameModal;

import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import leoFilter from 'leo-profanity';
import { toast } from 'react-toastify';

import toastifyConfig from '../../toastifyConfig';
import { useSocket } from '../../providers/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { getModalSchema } from '../../validation';
import ModalBuilder from './ModalBuilder';

const AddModal = ({ hideModal, t, type }) => {
  const { addChannel } = useSocket();

  const channels = useSelector(channelsSelectors.selectAll);
  const existingNames = channels.map(({ name }) => name);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: getModalSchema(existingNames),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: ({ channelName }) => {
      toast.success(t('toast.add'), toastifyConfig);
      addChannel(leoFilter.clean(channelName));
      hideModal();
    },
  });

  return <ModalBuilder type={type} formik={formik} hideModal={hideModal} t={t} />;
};

export default AddModal;

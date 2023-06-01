import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { useSocket } from '../../providers/SocketProvider';
import toastifyConfig from '../../toastifyConfig';
import ModalBuilder from './ModalBuilder';
import handleError from '../../handleError';

const RemoveModal = ({ id, hideModal, t }) => {
  const { removeChannel } = useSocket();
  const removeBtnRef = useRef();

  useEffect(() => {
    removeBtnRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: '',
    onSubmit: () => {
      try {
        toast.success(t('toast.remove'), toastifyConfig);
        removeChannel(id);
        hideModal();
      } catch (err) {
        handleError(err, t);
      }
    },
  });

  return <ModalBuilder formik={formik} removeBtnRef={removeBtnRef} />;
};

export default RemoveModal;

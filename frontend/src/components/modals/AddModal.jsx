import React from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { object, string } from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoFilter from 'leo-profanity';

import { useSocket } from '../../providers/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';

const AddModal = ({ hideModal, t }) => {
  const { addChannel } = useSocket();

  const channels = useSelector(channelsSelectors.selectAll);
  const existingNames = channels.map(({ name }) => name);

  const modalSchema = object({
    channelName: string()
      .min(3, 'errors.length')
      .max(20, 'errors.length')
      .notOneOf(existingNames, 'errors.existChannel'),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: modalSchema,
    onSubmit: ({ channelName }) => {
      if (leoFilter.clean(channelName).match(/[*]{3,}/gi)) {
        toast.warn(t('toast.moral'), {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return;
      }
      toast.success(t('toast.add'), {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      addChannel(leoFilter.clean(channelName));
      hideModal();
    },
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              id="channelName"
              name="channelName"
              type="text"
              placeholder={t('modals.channelName')}
              value={leoFilter.clean(formik.values.channelName)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isInvalid={formik.errors.channelName}
              autoFocus
            />
            <Form.Label htmlFor="channelName" className="visually-hidden">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{t(formik.errors.channelName)}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>{t('modals.add.cancel')}</Button>
            &nbsp;
            <Button variant="primary" type="submit">{t('modals.add.submit')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;

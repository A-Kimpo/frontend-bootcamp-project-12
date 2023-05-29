import React from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import leoFilter from 'leo-profanity';
import { toast } from 'react-toastify';

import toastifyConfig from '../../toastifyConfig';
import { useSocket } from '../../providers/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { getModalSchema } from '../../validation';

const AddModal = ({ hideModal, t }) => {
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
              value={formik.values.channelName}
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

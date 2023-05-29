import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoFilter from 'leo-profanity';

import { useSocket } from '../../providers/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import toastifyConfig from '../../toastifyConfig';
import { getModalSchema } from '../../validation';

const RenameModal = ({ id, hideModal, t }) => {
  const { renameChannel } = useSocket();

  const { name: targetName } = useSelector(
    (state) => channelsSelectors.selectById(state, id),
  );
  const channels = useSelector(channelsSelectors.selectAll);
  const existingNames = channels.map(({ name }) => name);

  const modalSchema = getModalSchema(existingNames);

  useEffect(() => {
    const ref = document.getElementById('channelNewName');
    ref.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelNewName: targetName,
    },
    validationSchema: modalSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: ({ channelNewName }) => {
      toast.success(t('toast.rename'), toastifyConfig);
      renameChannel(id, leoFilter.clean(channelNewName));
      hideModal();
    },
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              id="channelNewName"
              name="channelNewName"
              type="text"
              placeholder={t('modals.channelName')}
              value={formik.values.channelNewName}
              onChange={formik.handleChange}
              isInvalid={formik.errors.channelNewName}
            />
            <Form.Label htmlFor="channelNewName" className="visually-hidden">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{t(formik.errors.channelNewName)}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>{t('modals.rename.cancel')}</Button>
            &nbsp;
            <Button variant="primary" type="submit">{t('modals.rename.submit')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;

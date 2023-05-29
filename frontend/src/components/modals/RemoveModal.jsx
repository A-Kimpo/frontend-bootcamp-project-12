import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useSocket } from '../../providers/SocketProvider';
import toastifyConfig from '../../toastifyConfig';

const RemoveModal = ({ id, hideModal, t }) => {
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

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p className="lead">{t('modals.remove.warning')}</p>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>{t('modals.remove.cancel')}</Button>
            &nbsp;
            <Button id="submitRemoving" variant="danger" type="submit">{t('modals.remove.submit')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;

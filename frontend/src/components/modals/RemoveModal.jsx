import React from 'react';

import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';

import { useSocket } from '../../providers/SocketProvider';

const RemoveModal = ({ id, hideModal }) => {
  const { removeChannel } = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    removeChannel(id);
    hideModal();
  };

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h4">Remove channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p className="lead">Уверены?</p>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>Close</Button>
            &nbsp;
            <Button variant="danger" type="submit">Delete</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;

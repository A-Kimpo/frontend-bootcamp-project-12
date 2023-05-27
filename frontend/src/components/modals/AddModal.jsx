import React from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';

import { useSocket } from '../../providers/SocketProvider';

const AddModal = ({ hideModal }) => {
  const { addChannel } = useSocket();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: ({ channelName }) => {
      addChannel(channelName);
      hideModal();
    },
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.channelName}
              type="text"
              name="channelName"
              id="channelName"
              placeholder="Channel name"
              required
              autoFocus
            />
            <Form.Label htmlFor="channelName" className="visually-hidden">Channel</Form.Label>
            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>Close</Button>
            &nbsp;
            <Button variant="primary" type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;

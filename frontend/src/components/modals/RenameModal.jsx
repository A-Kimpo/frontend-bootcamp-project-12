import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useSocket } from '../../providers/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';

const RenameModal = ({ id, hideModal }) => {
  const { renameChannel } = useSocket();

  const { name: targetName } = useSelector(
    (state) => channelsSelectors.selectById(state, id),
  );

  useEffect(() => {
    const ref = document.getElementById('channelNewName');
    ref.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelNewName: targetName,
    },
    onSubmit: ({ channelNewName }) => {
      renameChannel(id, channelNewName);
      hideModal();
    },
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.channelNewName}
              type="text"
              name="channelNewName"
              id="channelNewName"
              placeholder="Channel name"
              required
            />
            <Form.Label htmlFor="channelNewName" className="visually-hidden">Rename</Form.Label>
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

export default RenameModal;

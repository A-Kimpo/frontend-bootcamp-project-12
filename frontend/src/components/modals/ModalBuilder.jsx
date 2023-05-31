import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import ModalInput from './ModalInput';

const ModalBuilder = ({
  handleSubmit, hideModal, t, type, formik = null,
}) => {
  const isRemove = type === 'remove';
  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.${type}.header`)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={isRemove ? handleSubmit : formik.handleSubmit}>
          {isRemove ? <p className="lead">{t('modals.remove.warning')}</p> : <ModalInput t={t} formik={formik} />}
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>{t(`modals.${type}.cancel`)}</Button>
            &nbsp;
            <Button
              id={isRemove ? 'submitRemoving' : ''}
              variant={isRemove ? 'danger' : 'primary'}
              type="submit"
            >
              {t(`modals.${type}.submit`)}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBuilder;

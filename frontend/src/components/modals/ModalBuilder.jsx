import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';

import { actions as modalsActions, selectors as modalsSelector } from '../../slices/modalsSlice';
import ModalInput from './ModalInput';

const ModalBuilder = ({ formik, removeBtnRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hideModal = () => dispatch(modalsActions.closeModal());
  const type = useSelector(modalsSelector.getModalType);
  const isOpened = useSelector(modalsSelector.isOpened);

  const isRemove = type === 'remove';

  return (
    <Modal show={isOpened} onHide={() => hideModal()} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.${type}.header`)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          {isRemove ? <p className="lead">{t('modals.remove.warning')}</p> : <ModalInput t={t} formik={formik} />}
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>{t(`modals.${type}.cancel`)}</Button>
            &nbsp;
            <Button
              ref={isRemove ? removeBtnRef : null}
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

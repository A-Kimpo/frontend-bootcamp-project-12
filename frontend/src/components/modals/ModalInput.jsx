import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

const ModalInput = ({ t, formik }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Form.Group className="mb-3">
      <Form.Control
        id="channelName"
        name="channelName"
        type="text"
        ref={inputRef}
        placeholder={t('modals.channelName')}
        value={formik.values.channelName}
        onChange={formik.handleChange}
        isInvalid={formik.errors.channelName}
        required
      />
      <Form.Label htmlFor="channelName" className="visually-hidden">{t('modals.channelName')}</Form.Label>
      <Form.Control.Feedback type="invalid">{t(formik.errors.channelName)}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default ModalInput;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';

import { actions as modalsActions, selectors as modalsSelectors } from '../../slices/modalsSlice';

const modalsMap = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

const ModalSwitcher = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const type = useSelector(modalsSelectors.getModalType);
  const channelId = useSelector(modalsSelectors.getModalId);
  const hideModal = () => dispatch(modalsActions.closeModal());

  const Component = modalsMap[type];
  return Component
    ? <Component id={channelId} hideModal={hideModal} t={t} />
    : null;
};

export default ModalSwitcher;

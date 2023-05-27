import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';

const modalsMap = {
  adding: AddModal,
  removing: RemoveModal,
  renaming: RenameModal,
};

export default (modalType) => modalsMap[modalType];

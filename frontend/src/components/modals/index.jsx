import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';

const modalsMap = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

export default (modalType) => modalsMap[modalType];

import { useAuth } from '../../context/AuthContext/useAuth';
import { Modal } from '../Modal/Modal';

import type { ProfileModalProps } from './types';
import styles from './HeaderModal.module.scss';

const HeaderModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const { user } = useAuth();

  function handleSignOut() {
    onConfirm();
    onClose();
  }
  return (
    <Modal
      customClassName={styles.headerModal}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className={styles.headerModalContent}>
        {user && <p>{user?.email}</p>}
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </Modal>
  );
};

export default HeaderModal;

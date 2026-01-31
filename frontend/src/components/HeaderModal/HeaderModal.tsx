import { useAuth } from '../../auth/useAuth';
import { Modal } from '../Modal/Modal';

import './style.css';

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function HeaderModal({ isOpen, onClose, onConfirm }: ProfileModalProps) {
  const { user } = useAuth();

  function handleSignOut() {
    onConfirm();
    onClose();
  }
  return (
    <Modal customClassName="header-modal" isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      <div className="header-modal-content">
        {user && <p>{user?.email}</p>}
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </Modal>
  );
}

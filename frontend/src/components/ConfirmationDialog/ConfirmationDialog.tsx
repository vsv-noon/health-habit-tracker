import { Modal } from '../Modal/Modal';
import useCtrlEnterKey from '../../hooks/useCtrlEnterKey';
import type { ConfirmationDialogProps } from './types';
import styles from '@/components/Modal/Modal.module.scss';

export function ConfirmationDialog({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
}: ConfirmationDialogProps) {
  useCtrlEnterKey(handleConfirm);

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      <div className={styles.modalHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.modalBody}>
        <p>{message}</p>
      </div>
      <div className={styles.modalFooter}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </Modal>
  );
}

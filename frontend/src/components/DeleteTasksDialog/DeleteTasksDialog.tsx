import { type ChangeEvent } from 'react';
import { Modal } from '../Modal/Modal';

import './style.css';

interface DeleteTasksDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mode: string;
  setMode: (item: string) => void;
}

function DeleteTasksDialog({ isOpen, onClose, onConfirm, mode, setMode }: DeleteTasksDialogProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setMode(event.target.value);
  }
  function handleConfirm() {
    onConfirm();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      <fieldset className="delete-tasks-dialog">
        <h2>Delete Recurring Task</h2>
        <label>
          <input
            type="radio"
            name="modeGroup"
            value="this"
            checked={mode === 'this'}
            onChange={handleChange}
          />
          <span>This task</span>
        </label>
        <label>
          <input
            type="radio"
            name="modeGroup"
            value="following"
            checked={mode === 'following'}
            onChange={handleChange}
          />
          <span>This and following tasks</span>
        </label>
        <label>
          <input
            type="radio"
            name="modeGroup"
            value="all"
            checked={mode === 'all'}
            onChange={handleChange}
          />
          <span>All tasks</span>
        </label>
        <div className="buttons-block">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>OK</button>
        </div>
      </fieldset>
    </Modal>
  );
}

export default DeleteTasksDialog;

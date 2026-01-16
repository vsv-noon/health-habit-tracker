import type { Todo } from '../../types/todo';

export type AddTodoModalProps = {
  isOpen: boolean;
  defaultDate: string;
  onClose: () => void;
  onCreated: (todo: Todo) => void;
};

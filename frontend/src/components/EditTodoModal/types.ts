import type { Todo } from '../../types/todo';

export type EditTodoModalProps = {
  todo: Todo | null;
  onClose: () => void;
  onUpdated: (todo: Todo) => void;
};

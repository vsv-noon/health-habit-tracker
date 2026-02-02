import type { Todo } from '../../types/todo';

export type TodoItemProps = {
  todo: Todo;
  onComplete: () => void;
  onEdit: () => void;

  onDelete: () => void;

  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
};

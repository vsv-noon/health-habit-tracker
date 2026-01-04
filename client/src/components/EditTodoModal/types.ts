import type { Todo } from "../../types/todo";

export interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
  onSave: (todo: Todo) => void;
}
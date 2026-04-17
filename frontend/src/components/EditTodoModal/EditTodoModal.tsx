import { useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { useTodoForm } from '../../hooks/useTodoForm';
import { TodoForm } from '../TodoForm/TodoForm';
import { updateTodo } from '../../services/api/todos.api';
import type { EditTodoModalProps } from './types';
import { formattedDate } from '../../utils/date';
import { initialForm } from '../AddTodoModal/constants';

export function EditTodoModal({ todo, onClose, onUpdated }: EditTodoModalProps) {
  const { form, setForm, update, validate, error } = useTodoForm(initialForm);
  // console.log(todo?.remind_at)
  useEffect(() => {
    if (todo) {
      setForm({
        title: todo.title,
        description: todo.description || '',
        due_date: todo.due_date,
        remind_at: todo.remind_at ? formattedDate(todo.remind_at, 16) : '',
        priority: todo.priority,
        completed: todo.completed,
      });
    }
  }, [todo, setForm]);

  if (!todo) return null;

  async function submit() {
    if (!validate()) return;
    if (todo) {
      const updated = await updateTodo(todo.id, form);
      onUpdated(updated);
    }
    onClose();
  }

  return (
    <Modal isOpen={true} onClose={onClose} onConfirm={submit}>
      <TodoForm
        todoFormTitle="✏️ Edit task"
        form={form}
        update={update}
        error={error}
        submitLabel="Save"
        onSubmit={submit}
        onClose={onClose}
        showCompleted
      />
    </Modal>
  );
}

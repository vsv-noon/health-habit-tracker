import { useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { useTodoForm } from '../../hooks/useTodoForm';
import { TodoForm } from '../TodoForm/TodoForm';
import { updateTodo } from '../../api/todos.api';
// import { updateTodo } from '../../features/todos/services/todoService';
import type { EditTodoModalProps } from './types';
import { formattedDate } from '../../utils/date';

export function EditTodoModal({ todo, onClose, onUpdated }: EditTodoModalProps) {
  const { form, setForm, update, validate, error } = useTodoForm({
    title: '',
    description: '',
    due_date: '',
    remind_at: '',
    priority: 'medium',
    completed: false,
  });

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

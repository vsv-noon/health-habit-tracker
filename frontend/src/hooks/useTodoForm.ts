import { useState } from 'react';
import type { TodoFormData } from '../../components/TodoForm/types';

export function useTodoForm(initial: TodoFormData) {
  const [form, setForm] = useState<TodoFormData>(initial);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof TodoFormData>(key: K, value: TodoFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    if (!form.title.trim()) {
      setError('Title is required');
      return false;
    }

    if (!form.due_date) {
      setError('Due date is required');
      return false;
    }

    setError(null);
    return true;
  }

  return {
    form,
    setForm,
    update,
    validate,
    error,
  };
}

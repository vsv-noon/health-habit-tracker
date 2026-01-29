import { useCallback, useState } from 'react';
import type { TodoFormData } from '../components/TodoForm/types';

type UseTodoFormResult = {
  form: TodoFormData;
  setForm: (data: TodoFormData) => void;
  update: <K extends keyof TodoFormData>(field: K, value: TodoFormData[K]) => void;
  validate: () => boolean;
  error: string | null;
  reset: (data?: Partial<TodoFormData>) => void;
};

export function useTodoForm(initial: TodoFormData): UseTodoFormResult {
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

  const reset = useCallback(
    (data?: Partial<TodoFormData>) => {
      setForm({ ...initial, ...data });
      setError(null);
    },
    [initial],
  );

  return {
    form,
    setForm,
    update,
    validate,
    error,
    reset,
  };
}

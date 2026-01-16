import { apiFetch } from '../../../api/api';
import type { Todo } from '../../../types/todo';
import type { TodoFormData } from '../types';

export async function createTodo(data: TodoFormData): Promise<Todo> {
  return apiFetch<Todo>('/todos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTodo(id: number, data: TodoFormData): Promise<Todo> {
  return apiFetch<Todo>(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

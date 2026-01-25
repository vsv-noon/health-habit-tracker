import type { TodoFormData } from '../components/TodoForm/types';
import type { Todo } from '../types/todo';
import { apiFetch } from './client';

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

export async function fetchTitleSuggestions(query: string) {
  return await apiFetch<string[]>(`/todos/suggestions?query=${encodeURIComponent(query)}`);
}

export async function fetchDeletedTodos(q = '') {
  return apiFetch<Todo[]>(`/todos/deleted?q=${encodeURIComponent(q)}`);
}

export async function bulkRestore(ids: number[]) {
  return await apiFetch(`/todos/bulk-restore`, {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
}

export async function bulkHardDelete(ids: number[]) {
  return await apiFetch(`/todos/bulk-delete`, {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
}

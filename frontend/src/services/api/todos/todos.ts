import type { Todo } from '../../../types/todo';
import { request } from '../core/request';

export const getTodos = async (filters?: {
  date?: string;
  search?: string;
  status?: string;
}): Promise<Todo[]> => {
  const params = new URLSearchParams();
  if (filters?.date) params.append('date', filters.date);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.status && filters.status !== 'all') params.append('status', filters.status);

  const endpoint = `/todos${params.toString() ? `?${params}` : ''}`;
  return request<Todo[]>(endpoint);
};

// export const getCalendarCounts = async () => {
//   return request('/todos/calendar-counts');
// };

// export const getStats = async (type: StatsType, from?: string, to?: string) => {
//   const params = new URLSearchParams({ type });
//   if (from) params.append('from', from);
//   if (to) params.append('to', to);
//   return request(`/stats?${params}`);
// };

export const createTodo = async (
  todo: Omit<Todo, 'id' | 'created_at' | 'updated_at'>,
): Promise<Todo> => {
  return request('/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
  });
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  return request(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

export const deleteTodo = async (id: number): Promise<void> => {
  await request(`/todos/${id}`, { method: 'DELETE' });
};

export const getTitleSuggestions = async (query: string): Promise<string[]> => {
  const params = new URLSearchParams({ query });
  return request(`/todos/suggestions?${params}`);
};

export const getDeletedTodos = async (search?: string): Promise<Todo[]> => {
  const params = search ? new URLSearchParams({ q: search }) : new URLSearchParams();
  return request(`/todos/deleted?${params}`);
};

// export const bulkRestoreTodos = async (ids: number[]): Promise<{ restored: number[] }> => {
//   return request('/todos/bulk-restore', {
//     method: 'POST',
//     body: JSON.stringify({ ids }),
//   });
// };

// export const bulkHardDeleteTodos = async (ids: number[]): Promise<{ deleted: number[] }> => {
//   return request('/todos/bulk-delete', {
//     method: 'POST',
//     body: JSON.stringify({ ids }),
//   });
// };

import {
  bulkHardDeleteTodos,
  bulkRestoreTodos,
  createTodo,
  getCalendarCounts,
  getDeletedTodos,
  getTitleSuggestions,
  getTodos,
  softDeleteTodo,
  updateTodo,
  type TodoRow,
} from '../models/todo.model.js';

export async function createTodoItem(
  // userId: number,
  data: {
    title: string;
    description?: string;
    due_date: string;
    remind_at?: string;
    priority?: number;
  }
): Promise<TodoRow> {
  // return createTodo(userId, data);
  return createTodo(data);
}

export async function updateTodoItem(
  // userId: number,
  id: number,
  updates: Partial<{
    title: string;
    description: string;
    completed: boolean;
    due_date: string;
    remind_at: string;
    priority: number;
  }>
): Promise<TodoRow | null> {
  return updateTodo(id, updates);
  // return updateTodo(userId, id, updates)
}

export async function getTodoList(
  // userId: number,
  filters: {
    date?: string;
    search?: string;
    status?: 'all' | 'completed' | 'active';
  }
): Promise<TodoRow[]> {
  // return getTodos(userId, filters);
  return getTodos(filters);
}

export async function getCalendarTodoCounts(): Promise<Record<string, number>> {
  const counts = await getCalendarCounts();

  // return counts.reduce<Record<string, number>>((acc, row) => {
  //   if (row.date !== undefined && row.count !== undefined) {
  //     acc[row.date] = Number(row.count);
  //   }
  //   return acc;
  // }, {});

  return Object.fromEntries(counts.map((c) => [c.date, c.count]));
}

export async function getTodoSuggestions(query: string): Promise<string[]> {
  const suggestions = await getTitleSuggestions(query);
  return suggestions.map((s) => s.title);
}

export async function getDeletedTodoList(search?: string): Promise<TodoRow[]> {
  return getDeletedTodos(search);
}

export async function deleteTodoItem(id: number): Promise<boolean> {
  return softDeleteTodo(id);
}

export async function restoreDeletedTodos(ids: number[]): Promise<number[]> {
  return bulkRestoreTodos(ids);
}

export async function hardDeleteTodos(ids: number[]): Promise<number[]> {
  return bulkHardDeleteTodos(ids);
}

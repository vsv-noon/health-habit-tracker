import { pool } from '../config/db.js';
import {
  bulkHardDeleteTodos,
  bulkRestoreTodos,
  createTodo,
  getCalendarCounts,
  getDeletedTodos,
  getTitleSuggestions,
  getTodos,
  ReorderItem,
  softDeleteTodo,
  updateTodo,
  updateTodoPosition,
  type TodoRow,
} from '../models/todo.model.js';

export async function createTodoItem(
  userId: number,
  data: {
    title: string;
    description?: string;
    due_date: string;
    remind_at?: string;
    priority?: number;
  }
): Promise<TodoRow> {
  return createTodo(userId, data);
}

export async function updateTodoItem(
  userId: number,
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
  return updateTodo(userId, id, updates);
}

export async function reorderTodosService(items: ReorderItem[], userId: number) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const item of items) {
      await updateTodoPosition(client, item, userId);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function getTodoList(
  userId: number,
  filters: {
    date?: string;
    search?: string;
    status?: 'all' | 'completed' | 'active';
  }
): Promise<TodoRow[]> {
  return getTodos(userId, filters);
  // return getTodos(filters);
}

export async function getCalendarTodoCounts(userId: number): Promise<Record<string, number>> {
  const counts = await getCalendarCounts(userId);

  // return counts.reduce<Record<string, number>>((acc, row) => {
  //   if (row.date !== undefined && row.count !== undefined) {
  //     acc[row.date] = Number(row.count);
  //   }
  //   return acc;
  // }, {});

  return Object.fromEntries(counts.map((c) => [c.date, c.count]));
}

export async function getTodoSuggestions(userId: number, query: string): Promise<string[]> {
  const suggestions = await getTitleSuggestions(userId, query);
  return suggestions.map((s) => s.title);
}

export async function getDeletedTodoList(userId: number, search?: string): Promise<TodoRow[]> {
  return getDeletedTodos(userId, search);
}

export async function deleteTodoItem(userId: number, id: number): Promise<boolean> {
  return softDeleteTodo(userId, id);
}

export async function restoreDeletedTodos(userId: number, ids: number[]): Promise<number[]> {
  return bulkRestoreTodos(userId, ids);
}

export async function hardDeleteTodos(userId: number, ids: number[]): Promise<number[]> {
  return bulkHardDeleteTodos(userId, ids);
}

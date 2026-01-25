import { request } from '../core/request';

export const bulkRestoreTodos = async (ids: number[]): Promise<{ restored: number[] }> => {
  return request('/todos/bulk-restore', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
};

export const bulkHardDeleteTodos = async (ids: number[]): Promise<{ deleted: number[] }> => {
  return request('/todos/bulk-delete', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
};

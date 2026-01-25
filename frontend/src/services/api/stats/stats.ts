import type { StatsType } from '../../../types/todo';
import { request } from '../core/request';

export const getStats = async (type: StatsType, from?: string, to?: string) => {
  const params = new URLSearchParams({ type });
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  return request(`/stats?${params}`);
};

import { request } from '../core/request';

export const getCalendarCounts = async () => {
  return request('/todos/calendar-counts');
};

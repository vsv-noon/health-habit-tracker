import { getHeaders } from './headers';

export const rawRequest = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  return await fetch(`/api${endpoint}`, {
    headers: getHeaders(),
    ...options,
  });
};

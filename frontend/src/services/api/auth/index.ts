import type { AuthResponse } from '../../../types/todo';
import { request } from '../core/request';
import { API_URL } from '../constants';

export const registerUser = async (
  email: string,
  password: string,
): Promise<AuthResponse & { refreshToken: string }> => {
  return request<AuthResponse & { refreshToken: string }>(
    '/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    true,
  );
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthResponse & { refreshToken: string }> => {
  return request<AuthResponse & { refreshToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    true,
  );
};

export const logoutUser = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return;

  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
};

export const refreshTokenFunc = async (
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken?: string }> => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
};

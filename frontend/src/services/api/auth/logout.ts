// import { API_URL } from '../constants';

// export const logout = async (): Promise<void> => {
//   const refreshToken = localStorage.getItem('refreshToken');
//   if (!refreshToken) return;

//   await fetch(`${API_URL}/auth/logout`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ refreshToken }),
//   });
// };

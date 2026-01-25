// import { API_URL } from "../constants";

// export const refreshToken = async (
//   refreshToken: string,
// ): Promise<{ accessToken: string; refreshToken?: string }> => {
//   const response = await fetch(`${API_URL}/auth/refresh`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ refreshToken }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to refresh token');
//   }

//   return response.json();
// };

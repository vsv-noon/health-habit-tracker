// import { createContext, useEffect, useState, type ReactNode } from 'react';
// import type { AuthResponse, User } from '../types/todo';
// // import { api } from '../services/api';
// import { loginUser, registerUser, logoutUser, refreshTokenFunc } from '../services/api/auth/';

// interface AuthContextType {
//   user: User | null;
//   accessToken: string | null;
//   refreshToken: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   refreshAccessToken: () => Promise<string | null>;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [refreshToken, setRefreshToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedAccessToken = localStorage.getItem('accessToken');
//     const savedRefreshToken = localStorage.getItem('refreshToken');
//     const savedUser = localStorage.getItem('user');

//     if (savedAccessToken && savedRefreshToken && savedUser) {
//       setAccessToken(savedAccessToken);
//       setRefreshToken(savedRefreshToken);
//       try {
//         setUser(JSON.parse(savedUser));
//       } catch {
//         setUser(null);
//       }
//     }

//     setLoading(false);
//   }, []);

//   const saveSession = (data: AuthResponse & { refreshToken: string }) => {
//     setUser(data.user);
//     setAccessToken(data.accessToken);
//     setRefreshToken(data.refreshToken);

//     localStorage.setItem('accessToken', data.accessToken);
//     localStorage.setItem('refreshToken', data.refreshToken);
//     localStorage.setItem('user', JSON.stringify(data.user));
//   };

//   const clearSession = () => {
//     setUser(null);
//     setAccessToken(null);
//     setRefreshToken(null);

//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//   };

//   const login = async (email: string, password: string) => {
//     // const response: AuthResponse = await api.login(email, password);
//     const response: AuthResponse = await loginUser(email, password);
//     saveSession(response as AuthResponse & { refreshToken: string });
//   };

//   const register = async (email: string, password: string) => {
//     // const response: AuthResponse = await api.register(email, password);
//     const response: AuthResponse = await registerUser(email, password);
//     saveSession(response as AuthResponse & { refreshToken: string });
//     console.log('first');
//   };

//   const logout = async () => {
//     try {
//       await logoutUser();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       clearSession();
//     }
//   };

//   const refreshAccessToken = async (): Promise<string | null> => {
//     if (!refreshToken) return null;

//     try {
//       const data = await refreshTokenFunc(refreshToken);
//       setAccessToken(data.accessToken);
//       localStorage.setItem('accessToken', data.accessToken);

//       if ('refreshToken' in data && data.refreshToken) {
//         setRefreshToken(data.refreshToken);
//         localStorage.setItem('refreshToken', data.refreshToken);
//       }

//       return data.accessToken;
//     } catch (err) {
//       clearSession();
//       console.error(err);
//       return null;
//     }
//   };

//   const value: AuthContextType = {
//     user,
//     accessToken,
//     refreshToken,
//     login,
//     register,
//     logout,
//     refreshAccessToken,
//     loading,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import Loader from '../components/Loader/Loader';
// import type { AuthContextType } from './types';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

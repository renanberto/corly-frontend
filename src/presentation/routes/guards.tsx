import { Navigate } from 'react-router-dom';
import { sessionStore } from '@/presentation/viewmodels/useSessionStore';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStore((state) => state.accessToken);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const permissions = sessionStore((state) => state.permissions);
  if (!permissions.includes('admin:read')) {
    return <Navigate to="/app/forbidden" replace />;
  }
  return children;
};

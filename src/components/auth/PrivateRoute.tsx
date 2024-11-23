import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  role: 'investor' | 'project';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== role) {
    // Rediriger vers le bon dashboard en fonction du rôle
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

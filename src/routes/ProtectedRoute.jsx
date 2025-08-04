import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { authIsAuthenticated } = useAuth();

  return authIsAuthenticated ? children : <Navigate to='/login' replace /> 
  
}

export default ProtectedRoute;

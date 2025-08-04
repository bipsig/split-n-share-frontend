import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoute = ({ children }) => {
  const { authIsAuthenticated } = useAuth();

  return !authIsAuthenticated ? <Outlet /> : <Navigate to='/user/dashboard' replace /> 
  
}

export default PublicRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  // This line redirects to login page if user not authenticated
  // return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;

  return <Component {...rest}/>
};

export default ProtectedRoute;
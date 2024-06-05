import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthenticationContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { userID, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking authentication
  }

  return userID ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;

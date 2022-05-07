import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ( { loggedIn, redirection } ) => {
  if ( loggedIn ){
    return <Navigate to={ redirection } replace />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
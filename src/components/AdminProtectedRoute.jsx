import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdminAuthenticated } from '../lib/adminAuth';

/**
 * Protected Route wrapper for Admin Console pages.
 * Strictly verifies authentication status independently of viewport width or screen size.
 */
export default function AdminProtectedRoute({ children }) {
  const location = useLocation();
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    // Redirect unauthenticated requests directly to admin login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

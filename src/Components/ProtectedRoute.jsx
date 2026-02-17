import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  // Note: We rely on RLS on the backend to enforce "Admin Only" access to data.
  // This frontend check just ensures the user is authenticated.
  // If you later add a strict "role" column to your users table, you can check it here.

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

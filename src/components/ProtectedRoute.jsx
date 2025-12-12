// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) {
    // redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
}

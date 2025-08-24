// components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { session, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; 
  if (!session) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

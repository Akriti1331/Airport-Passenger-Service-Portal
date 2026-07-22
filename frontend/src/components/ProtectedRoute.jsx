import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, token } = useContext(AuthContext);

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;

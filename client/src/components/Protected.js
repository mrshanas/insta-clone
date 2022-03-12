import React from "react";
import { Navigate } from "react-router-dom";

// this is a reusable for creating protected routes
const Protected = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;

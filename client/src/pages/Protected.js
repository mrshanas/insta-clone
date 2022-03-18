import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// this is a reusable for creating protected routes
const Protected = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    // check if the jwt has expired

    const decodedToken = jwt_decode(user);

    const isTokenExpired = decodedToken.exp * 1000 < new Date().getTime();

    if (isTokenExpired) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  }
  return children;
};

export default Protected;

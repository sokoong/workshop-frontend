import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (element) => {
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const isAdmin = payload ? payload.isAdmin : false;
  if (!token || !isAdmin) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;

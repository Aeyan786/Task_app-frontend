import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (user) {
    return <Navigate to={"/dashboard/overview"} replace />;
  }
  return children;
};

export default UserRoute;

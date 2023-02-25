import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    return isLoggedIn ? (
        <Outlet />
    ) : auth?.email ? (
        <Navigate to="/unauthorized" />
    ) : (
        <Navigate to="/login" />
    );
};

export default RequireAuth;

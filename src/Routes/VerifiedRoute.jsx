import { Navigate } from "react-router";
import useAuth from "../Hooks/Auth/useAuth";
import useRole from "../Hooks/Role/useRole";
import Loading from "../Pages/Loading/Loading";
import React from 'react';

const VerifiedRoute = ({ children }) => {

    const { loading } = useAuth();
    const { status, isLoading } = useRole();

    if (loading || isLoading) return <Loading />;
    if (status === 'verified') return children;
    return <Navigate to={'/'} />;
};

export default VerifiedRoute;
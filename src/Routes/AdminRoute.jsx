import React from 'react';
import useAuth from "../Hooks/Auth/useAuth";
import useRole from "../Hooks/Role/useRole";
import Loading from "../Pages/Loading/Loading";
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {

    const { loading } = useAuth();
    const { role, isLoading } = useRole();

    if (role === 'admin') return children;
    if (loading || isLoading) return <Loading />;

    return <Navigate to='/login' state={location?.pathname} replace={true} ></Navigate>;
};

export default AdminRoute;


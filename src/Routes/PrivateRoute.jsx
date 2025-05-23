import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../Hooks/Auth/useAuth';
import Loading from '../Pages/Loading/Loading';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (user) return children;
    if (loading) return <Loading />;

    return <Navigate to='/login' state={location?.pathname} replace={true} ></Navigate>;
};

export default PrivateRoute;
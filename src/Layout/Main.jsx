import { Outlet, useLocation } from "react-router";
import ScrollTop from "../Utils/ScrollTop";
import React from 'react';
import Navbar from "../Components/Shared/Navbar/Navbar";

const Main = () => {

    return (
        <div>
            <ScrollTop>
                <Outlet />
            </ScrollTop>
        </div>
    );
};

export default Main;
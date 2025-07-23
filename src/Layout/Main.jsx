import { Outlet, useLocation } from "react-router";
import ScrollTop from "../Utils/ScrollTop";
import React from 'react';
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Main/Footer/Footer";

const Main = () => {

    return (
        <div>
            <ScrollTop>
                <Outlet />
                <Footer />
            </ScrollTop>
        </div>
    );
};

export default Main;
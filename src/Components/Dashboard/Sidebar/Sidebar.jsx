import React from 'react';

import { FiBarChart, FiHome, FiShoppingCart, FiUsers } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { IoPower } from "react-icons/io5";
import { FaDropbox } from "react-icons/fa6";
import toast from "react-hot-toast";
import TitleSection from './TitleSection';
import Option from './Option';
import ToggleClose from './ToggleClose';
import useAuth from '../../../Hooks/Auth/useAuth';
import { MdAdminPanelSettings } from 'react-icons/md';
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = ({ open, setOpen }) => {

    const [selected, setSelected] = useState("Dashboard");

    const { user, logOut } = useAuth();
    const handleLogOut = () => [
        logOut(),
        toast.success('Log Out Successfully')
    ];

    return (
        <motion.nav
            layout
            className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-[#BEBEBE] p-2"
            style={{
                width: open ? "140px" : "fit-content",
            }}
        >
            <TitleSection open={open} />

            <div className="space-y-1">
                <div>
                    <Option
                        Icon={FiHome}
                        title="Home"
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        location='/'
                    />
                    <Option
                        Icon={LuLayoutDashboard}
                        title="Dashboard"
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        location='/dashboard'
                    />
                    <Option
                        Icon={FiHome}
                        title="Home"
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        location='/'
                    />
                    <Option
                        Icon={CgProfile}
                        title="Profile"
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        location='/profile'
                    />
                    {/* <Option
                        Icon={MdWatch}
                        title="Watches"
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        location='/products'
                        notifs={3}
                    /> */}
                    <Option
                        Icon={FaBoxOpen}
                        title="Add Product"
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        location='add_product'
                    />
                    <Option
                        Icon={FiUsers}
                        title="Members"
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        location='/all_members'
                    />

                    <Option
                        Icon={MdAdminPanelSettings}
                        title="Admin"
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        location='/all_members'
                    />
                </div>

                <div>

                    {
                        user ?
                            <span onClick={handleLogOut} className="absolute bottom-16 w-[calc(100%-20px)]">
                                <Option
                                    Icon={IoPower}
                                    title="Log Out"
                                    setSelected={setSelected}
                                    open={open}
                                />
                            </span> :
                            <button type='button' className="absolute bottom-16 w-[calc(100%-20px)]">
                                <Option
                                    Icon={IoPower}
                                    title="Login"
                                    setSelected={setSelected}
                                    open={open}
                                    location='/login'
                                />
                            </button>
                    }


                </div>

            </div>

            <ToggleClose open={open} setOpen={setOpen} />
        </motion.nav>
    );
};

export default Sidebar;
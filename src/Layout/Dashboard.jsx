import ProfileButton from "../Components/Shared/Buttons/ProfileButton";
import { Outlet } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { FaHome, FaPowerOff, FaTeamspeak, FaUsers } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { MdSchedule } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { AiOutlineUpload } from 'react-icons/ai';
import { FaOpencart } from "react-icons/fa";
import { motion } from 'framer-motion';
import useAuth from "../Hooks/Auth/useAuth";
import useAxiosSecure from "../Hooks/Axios/useAxiosSecure";
import ScrollTop from "../Utils/ScrollTop";
import React, { useState } from 'react';
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";


const Dashboard = () => {

    const axiosSecure = useAxiosSecure();
    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false);

    const { data: userData = [] } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const { email, image, name } = userData;

    return (
        <div className="flex">


            {/* left navigate */}
            <Sidebar open={open} setOpen={setOpen} />

            {/* outlet */}
            <div className="min-h-[100vh] w-[calc(100%-140px)] mx-auto">
                <ScrollTop>
                    <Outlet />
                </ScrollTop>
            </div>
        </div>
    );
};

export default Dashboard;
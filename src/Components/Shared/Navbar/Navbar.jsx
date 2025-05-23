import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowScroll } from "react-use";
import { motion } from 'framer-motion';
import React from 'react';
import { FaHome, FaOpencart } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { GiCrossedAxes } from "react-icons/gi";
import useAuth from "../../../Hooks/Auth/useAuth";
import useRole from "../../../Hooks/Role/useRole";
import { Bs1CircleFill } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { BiCross } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { TbUsersGroup } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";


const Navbar = () => {

    const { user, logOut } = useAuth();
    const location = useLocation();
    const { role } = useRole();

    const navContainerRef = useRef(null);
    const navItems = [
        { name: 'হোম', destination: '/', icon: <LiaHomeSolid /> },
        { name: 'প্রোফাইল', destination: '/profile', icon: <CiUser /> },
        { name: 'HMS এর কমকতা সমুহ', destination: '/profile', icon: <TbUsersGroup /> },
    ];

    // scroll implementation using react-use
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const { y: currentScrollY } = useWindowScroll();


    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true),
                navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false),
                navContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true),
                navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);


    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        });
    }, [isNavVisible]);






    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6  mt-5">

            {isOpen && <div onClick={() => setIsOpen(!isOpen)} className="bg-black/30 min-h-screen w-screen absolute top-[-36px]" />}

            <header className="absolute top-1/2 w-full -translate-y-1/2 ">
                <nav className={`flex size-full items-center justify-evenly p-4  gap-5 text-[#C3937C]`}>

                    <Link to='/' className="text-[11px] text-[#C3937C]">
                        <span className="flex flex-col justify-center items-center">
                            <span className="text-2xl"><FaHome /></span>
                            Home</span>
                    </Link>

                    <Link to='/member_registration' className="text-[11px]" >
                        <span className="flex flex-col justify-center items-center">
                            <span className="text-2xl"><FaWpforms /></span>
                            Registration</span>
                    </Link>

                    <Link to='/all_members' className="text-[11px]" >
                        <span className="flex flex-col justify-center items-center">
                            <span className="text-2xl"><FaHandHoldingHeart /></span>
                            Request</span>
                    </Link>

                    <Link to='/products' className="text-[11px]" >
                        <span className="flex flex-col justify-center items-center">
                            <span className="text-2xl"><FaShop /></span>
                            Shop</span>
                    </Link>


                    <button
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <AiOutlineMenu className="text-2xl text-[#C3937C]" />
                    </button>




                    {/* modal */}
                    <motion.div
                        initial={{}}
                        animate={{ x: isOpen ? -300 : 0 }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="absolute  md:py-5 right-[-300px] top-[-32px] pl-5 w-4/5 min-h-[100dvh] md:w-64 bg-white shadow-lg"
                    >
                        <button
                            onClick={() => setIsOpen(!open)}
                            className="absolute p-4 text-xl md:text-2xl text-black right-2 md:right-10 top-5"
                        >
                            <RxCross2 />
                        </button>


                        <div className="mt-16 pr-5 flex flex-col items-center gap-2">
                            <img src="/images/winner.jpg" width={64} alt="" />
                            <p className="text-black text-center text-sm">বিশুদ্ধতা, বিশ্বস্ততা ও সুন্নাহ-সম্মত বিবাহের নির্ভরযোগ্য প্রতিষ্ঠান</p>
                            <button className="flex gap-2 items-center bg-gradient-to-r from-blue-500 via-fuchsia-500 to-purple-600 text-white px-4 py-2 rounded-md mt-2">
                                <FaYoutube className="text-red-500 text-2xl" />
                                <p className="text-center text-sm text-white opacity-70 ">আমাদের সম্পর্কে আরো জানতে ক্লিক করুন </p>
                            </button>
                        </div>



                        <nav className="mt-10 flex flex-col gap-4 text-xs md:text-sm">
                            <div className={` md:hidden text-white flex space-y-2 flex-col`}>
                                {navItems.map((nav, idx) => (
                                    <Link key={idx} to={nav?.destination} className="flex border-b -ml-5 px-5 pb-2 gap-2" >
                                        <span className="text-2xl text-[#C3937C]">{nav?.icon}</span>
                                        <button className={`uppercase nav-hover-btn text-black`}>{nav?.name}</button>
                                    </Link>
                                ))}
                                {role === 'admin' && <Link className={`uppercase nav-hover-btn text-black`} to='dashboard'>Admin</Link>}
                            </div>
                            {
                                user ?
                                    <button className="absolute bottom-5 left-10 text-base text-black font-raleway" onClick={logOut}>Logout</button> :
                                    <Link to='/login' className="absolute bottom-5 left-10 text-base text-black">Login</Link>
                            }
                        </nav>
                    </motion.div>





                </nav>
            </header>
        </div >
    );
};

export default Navbar;
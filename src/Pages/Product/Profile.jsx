import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import useRole from "../../Hooks/Role/useRole";
import Loading from "../Loading/Loading";
import React from 'react';
import { FaArrowLeft, FaEdit, FaImage, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";

const Profile = () => {
    const { loading, user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data = [], isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const { image, name, email, phone, address, status } = data;
    console.log(data);



    if (loading, isLoading) return <Loading />;

    return (
        <div className="bg-white">
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />
            <div>
                <div className="px-5 flex mt-16 flex-col min-h-screen">

                    <div className="flex items-center gap-10 w-full">
                        <img src={image || user?.photoURL} className="size-[80px] rounded-full  md:size-[300px]  object-cover" alt="" />
                        <div>
                            <p className=" font-galada text-xl">{name}</p>
                            <p className={`${status === 'verified' ? 'text-blue-600' : 'text-red-600'}`}>{status}</p>
                        </div>
                        <button><FaEdit /></button>
                    </div>

                    <div className="text-xs md:text-base space-y-2">

                        <div className="space-y-1 border-b py-3">
                            <p className="flex font-extralight items-center text-blue-600 gap-2"> <FaPhone className="text-black" /> {phone}</p>
                            <p className="flex font-extralight items-center gap-2"><FaMessage /> {email}</p>
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 my-4">
                        <Link to='/received_request' className="text-xs ">
                            <div className="bg-[#F2F2F2] flex gap-2 items-center p-4 rounded-xl ">
                                <FiSend className="text-2xl" />
                                <p className="font-galada">আপনার প্রস্তাব সমূহ</p>
                            </div>
                        </Link>

                        <Link to='/all_request' className=" text-xs ">
                            <div className="bg-[#F2F2F2] flex gap-2 items-center p-4 rounded-xl ">
                                <HiOutlineDownload className="text-2xl" />
                                <p className="font-galada">আপনার অনুরোধ সমূহ</p>
                            </div>
                        </Link>


                        <Link to={`/images/${user?.email}`} className=" text-xs ">
                            <div className="bg-[#F2F2F2] flex gap-2 items-center p-4 rounded-xl ">
                                <FaImage className="text-xl" />
                                <p className="font-galada">More Images</p>
                            </div>
                        </Link>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Profile;
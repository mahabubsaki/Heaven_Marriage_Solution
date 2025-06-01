import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Loading from "../Loading/Loading";
import useUser from "../../Hooks/User/useUser";
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";
import React from 'react';
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { FaSuitcase } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { RiLineHeight } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import default_img from '/images/default_img.jpg';
import male_default from '/images/male_default.png';
import female_default from '/images/female_default.png';
import useRole from "../../Hooks/Role/useRole";
import request_bg from '/images/request_bg.jpg';

const AllMembers = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { gender } = useRole();

    // all members
    const { data = [], isLoading: memberLoading } = useQuery({
        queryKey: ['allMembers'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all_members');
            return data;
        }
    });



    // user data from usersCollection
    const { status, isLoading, name, image, age, profession } = useUser();


    // request a marrige offer
    const { mutateAsync } = useMutation({
        mutationFn: async (request) => {
            const { data } = await axiosSecure.post('/sent_request', request);
            return data;
        },
        onSuccess: () => {
            toast.success('Request Sent');
        }
    });

    const sentProposal = async (to_data) => {
        if (to_data?.member_email === user?.email) {
            return toast.error('cant send request to yourself');
        }
        const requestData = {
            type: 'sent_proposal',
            to: to_data?.member_email,
            to_name: to_data?.name,
            to_image: to_data?.image,
            from: user?.email,
            from_name: name,
            from_image: image,
            request_status: 'requested'
        };
        // console.log(requestData);
        await mutateAsync(requestData);
    };


    if (loading || isLoading || memberLoading) return <Loading />;

    return (
        <div 
        className="p-5 bg-[#EFEFEF] bg-fixed space-y-3 min-h-[100dvh]"
        style={{
            backgroundImage: `url(${request_bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
        >


            {/* heading search and filter section*/}
            <div className="relative flex flex-col py-1 space-y-2">
                <div className="flex items-center gap-3">
                    <Link to='/' className="font-bold text-3xl text-left font-galada">Heaven Marriage Solutions</Link>
                </div>
                <div className="flex justify-between gap-2 relative">
                    <input type="text" placeholder="search" className="bg-white w-full outline-none border border-black p-2 rounded-lg" />
                    <button className="bg-[#373B4D] text-white  px-2 right-24 top-2 rounded absolute">Search</button>
                    <button className=" text-black bg-[#F2F2F2] border border-black px-5 rounded">Filter</button>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-2 ">

                <div className=" bg-[#FFFFFF] bg-opacity-80 p-2 rounded-2xl flex  gap-5 col-span-2 items-center">
                    <div>
                        <Link to={`/user_details/${user?.email}`}>
                            <img src={image || user?.photoURL || male_default} className="size-[50px] object-cover rounded-full" alt="" />
                        </Link>
                    </div>
                    <div>
                        <div className="flex flex-col w-full">
                            <Link to='/profile'>
                                <p className="text-black font-bold underline">{name || user?.displayName}</p>
                            </Link>
                            <div className="flex items-center justify-center gap-16">
                                <Link to={`/images/${user?.email}`} className="text-blue-400 underline font-light ">আরো ছবি</Link>
                                <p className={`${status === 'verified' ? 'text-green-600' : 'text-red-400'} text-xl mb-1`}>{status}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" rounded-2xl col-span-2 flex justify-between gap-3">

                    <Link to='/received_request' className="text-xs ">
                        <div className="bg-[#FFFFFF] bg-opacity-80 flex gap-2 justify-center items-center p-4 rounded-xl ">
                            <FiSend className="text-2xl" />
                            <p className="">আপনার প্রস্তাব সমূহ</p>
                        </div>
                    </Link>

                    <Link to='/all_request' className=" text-xs ">
                        <div className="bg-[#FFFFFF] bg-opacity-80 flex gap-2 justify-center items-center p-4 rounded-xl ">
                            <HiOutlineDownload className="text-2xl" />
                            <p className="">আপনার অনুরোধ সমূহ</p>
                        </div>
                    </Link>

                </div>

            </div>

            <div className="space-y-2 ">
                <h1 className=" text-2xl font-bold border-b border-black mb-3 pb-2 pl-2">সদস্য সমূহ</h1>

                {
                    status !== 'verified' && <p className=" text-2xl text-center py-10 ">এই পৃষ্ঠাটি দেখতে হলে আপনাকে অবশ্যই একজন সদস্য হতে হবে</p>
                }

                {/* toDO
                <p className="font-kau text-2xl text-center py-10 font-galada">দয়া করে আপনার  রেজিস্ট্রেশন  সম্পন্ন করুন।</p> */}

                {
                    status === 'verified' &&
                    data?.map((got, idx) => (
                        <div key={idx} className="border shadow rounded-2xl bg-[#FFFFFF] bg-opacity-80 flex p-3 gap-4 w-full space-y-4 mt-2 h-[220px]">
                            {/* {!got?.image &&
                                <img className="size-[110px] rounded-full object-cover" src={default_img} alt="" />
                            } */}

                            {got?.gender === 'male' &&
                                <img className="size-[110px] rounded-full object-cover" src={male_default} alt="" />
                            }

                            {
                                got?.gender === 'female' &&
                                < img className="size-[110px] rounded-full object-cover" src={female_default} alt="" />
                            }
                            <div className="flex flex-col space-y-1 w-full relative">
                                <h1 className="text-xs text-blue-500 font-bold">
                                    {got?.form_uuId.slice(0, 8)}
                                </h1>
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold ">
                                        <span className="text-green-700"></span>
                                        {got?.name.split(' ').slice(0, 3).join(' ')}
                                    </h1>
                                    <span className="text-blue-500"><RiVerifiedBadgeFill /></span>
                                </div>

                                <div className="w-full">
                                    <h1 className="flex gap-4 items-center font-extralight text-base ">
                                        <span className="text-green-700"><FaSuitcase /></span>
                                        {got?.income_source}
                                    </h1>
                                    <h1 className="flex gap-4 items-center font-extralight text-base ">
                                        <span className="text-green-700"><RiLineHeight /></span>
                                        {got?.height}
                                    </h1>
                                    <h1 className="flex gap-4 items-center font-extralight text-base ">
                                        <span className="text-green-700"><FiMapPin /></span>
                                        {got?.current_full_address.split(' ').slice(0, 2).join(' ')}
                                    </h1>
                                </div>

                                <div className="flex flex-row items-center justify-between pt-4">
                                    <Link to={`/user_details/${got?.member_email}`} className="text-xs font-semibold  border-b absolute bottom-3 border-blue-700">
                                        বিস্তারিত
                                    </Link>
                                    <button onClick={() => sentProposal(got)} className="text-xs font-semibold  border-b border-blue-700 absolute bottom-3 right-3">
                                        প্রস্তাব পাঠান
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                }


            </div>


        </div>
    );
};

export default AllMembers;

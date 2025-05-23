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

const AllMembers = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

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
            to: to_data?.member_email,
            to_name: to_data?.name,
            to_image: to_data?.image,
            from: user?.email,
            from_name: name,
            from_image: image,
            status: 'not verified',
            request_status: 'in process'
        };
        await mutateAsync(requestData);
    };


    if (loading || isLoading || memberLoading) return <Loading />;

    return (
        <div className="p-5 bg-white space-y-5 min-h-[100dvh]">


            <div className="relative flex flex-col py-1 space-y-2">
                <div className="flex items-center gap-3">
                    <Link to='/' className="font-bold text-3xl text-left font-vibes">Heaven Marriage Solutions</Link>
                </div>
                <div className="flex justify-between gap-2 relative">
                    <input type="text" placeholder="search" className="bg-white w-full outline-none border border-black p-2 rounded-lg" />
                    <button className="bg-[#373B4D] text-white  px-2 right-24 top-2 rounded absolute">Search</button>
                    <button className=" text-black border border-black px-5 rounded">Filter</button>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-4">

                <div className=" bg-[#CCCCCC] p-2 rounded-2xl flex  gap-5 col-span-2 items-center">
                    <div>
                        <Link to='/profile'>
                            <img src={image || user?.photoURL} className="size-[50px] object-cover rounded-full" alt="" />
                        </Link>
                    </div>
                    <div>
                        <div className="flex flex-col w-full">
                            <Link to='/profile'>
                                <p className="text-black font-bold underline">{name || user?.displayName}</p>
                            </Link>
                            <div className="flex gap-16">
                                <Link to={`/images/${user?.email}`} className="text-blue-400 underline font-light font-marck">More Images</Link>
                                <p className={`${status === 'verified' ? 'text-green-400' : 'text-red-400'} text-xl font-marck`}>{status}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" rounded-2xl col-span-2 flex justify-between gap-4">

                    <Link to='/received_request' className="text-xs ">
                        <div className="bg-[#F2F2F2] flex gap-2 justify-center items-center p-4 rounded-xl ">
                            <FiSend className="text-2xl" />
                            <p className="font-galada">আপনার প্রস্তাব সমূহ</p>
                        </div>
                    </Link>

                    <Link to='/all_request' className=" text-xs ">
                        <div className="bg-[#F2F2F2] flex gap-2 justify-center items-center p-4 rounded-xl ">
                            <HiOutlineDownload className="text-2xl" />
                            <p className="font-galada">আপনার অনুরোধ সমূহ</p>
                        </div>
                    </Link>

                </div>

            </div>

            <div className="space-y-2">
                <h1 className="font-galada border-b">সদস্য সমূহ</h1>

                {
                    status !== 'verified' && <p className="font-kau text-2xl text-center py-10 font-galada">Please Patiently wait for verification</p>
                }

                {
                    status === 'verified' &&
                    data?.map((got, idx) => (
                        <div key={idx} className="border border-[#373B4D] rounded-2xl flex p-2 gap-4 w-full bg-[#F2F2F2]">
                            <img className="size-[50px] object-cover rounded" src={got?.image} alt="" />
                            <div className="w-full space-y-1">
                                <h1 className="font-semibold font-lexend">{got?.name}</h1>
                                <div className="flex justify-between">
                                    <h1 className="font-merriway">{got?.age}</h1>
                                    <div className="flex flex-row gap-4 items-center justify-center">
                                        <Link to={`/user_details/${got?.member_email}`} className="text-xs font-alkatra">বিস্তারিত</Link>
                                        <button onClick={() => sentProposal(got)} className="text-xs font-alkatra">প্রস্তাব পাঠান</button>
                                    </div>
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
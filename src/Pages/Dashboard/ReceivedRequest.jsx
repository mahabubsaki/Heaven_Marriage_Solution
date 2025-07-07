import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Loading from "../Loading/Loading";
import React from 'react';
import HeadingSubHead from "../../Components/TextAnimations/HeadingSubHead";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import minar_top from '/images/minar_top.png';
import male_default from '/images/male_default.png';
import female_default from '/images/female_default.png';
import useRole from "../../Hooks/Role/useRole";

const ReceivedRequest = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { gender } = useRole();
    // console.log(gender);


    // fetch received requests
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['received_requests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/received_requests/${user?.email}`);
            return data;
        }
    });

    // console.log(data);


    // accept a request
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.patch(`/request_accept/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('You have accepted the request');
            refetch();
        }
    });

    // reject a request
    const { mutateAsync: reject } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.put(`/request_reject/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('You have rejected the request');
            refetch();
        }
    });


    const handleAccept = async (id) => {
        await mutateAsync(id);
    };

    const handleReject = async (id) => {
        await reject(id);
    };

    if (loading, isLoading) return <Loading />;


    return (
        <div className='pb-5 bg-[#c3cedf] min-h-[100dvh]'>
            <div>
                <h1 className="text-2xl font-bold text-gray-600 p-2">Heaven Marriage</h1>
            </div>
            <Navbar text={'text-gray-600'} />

            <div className='mt-16  flex justify-center items-center flex-col'>



                {
                    data.length === 0 ? <p className='text-center my-32 font-alkatra text-2xl mx-5'>দুঃখিত, আপনি এখনও কোন প্রস্তাব পাননি।</p> : <div>

                        <p className='font-bold text-gray-600 mb-3 text-xl'>প্রাপ্ত প্রস্তাব সমূহ</p>
                        {
                            data.map((got, idx) => (
                                <div key={idx}
                                    className={`flex mb-4 items-center px-5 py-3 gap-3 bg-[#c3cedf] shadow-[8px_8px_16px_#aab4c2,-8px_-8px_16px_#dce8f6] text-gray-600 rounded-full w-80 md:w-96`}
                                >
                                    <div className='w-1/4'>
                                        {
                                            gender === 'male' && <img src={got?.to_image || female_default} className='size-12 object-cover rounded-full' alt="" />
                                        }
                                        {
                                            gender === 'female' && <img src={got?.to_image || male_default} className='size-12 object-cover rounded-full' alt="" />
                                        }
                                    </div>
                                    <div className='w-3/6 flex flex-col text-sm'>
                                        <p className='text-black'>{(got?.from_name ?? '').split(' ').slice(0, 2).join(' ')}</p>
                                        <p className={`${got?.request_status === 'requested' ? 'text-red-800' : 'text-blue-700'}`}>{got?.request_status}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Link to={`/user_details/${got?.from}`} className="text-black text-sm shadow-[inset_4px_4px_5px_rgba(0,0,0,0.3),4px_4px_8px_rgba(0,0,0,0.1)] rounded-full px-2 py-1">Details</Link>
                                        <button
                                            onClick={() => handleAccept(got?._id)}
                                            className={`text-blue-600 ${got?.request_status === 'accepted' && 'hidden'} text-sm shadow-[inset_4px_4px_5px_rgba(0,0,0,0.3),4px_4px_8px_rgba(0,0,0,0.1)] rounded-full px-2 py-1`}>
                                            Accept
                                        </button>
                                    </div>

                                </div>
                            ))
                        }

                    </div>

                }


            </div>

        </div >
    );
};

export default ReceivedRequest;
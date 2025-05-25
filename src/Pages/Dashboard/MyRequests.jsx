import React, { useState } from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import Loading from '../Loading/Loading';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import HeadingSubHead from '../../Components/TextAnimations/HeadingSubHead';
import Navbar from '../../Components/Shared/Navbar/Navbar';
import minar_top from '/images/minar_top.png';
import default_img from '/images/default_img.jpg';


const MyRequests = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: ['my_requests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my_requests/${user?.email}`);
            return data;
        }
    });

    if (loading || isLoading) return <Loading />;

    return (
        <div className='pb-5'>

            <div>

                <div>
                    <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
                </div>
                <Navbar />

                <img src={minar_top} alt="" className="px-2 pt-14" />

                <div className="px-5 border-x-4 border-b-4 rounded border-[#93733F] -mt-[81px] mx-2 pt-[50px]">
                    <div className='mt-12'>

                        {
                            data.length === 0 ? <p className='text-center my-32 font-galada text-3xl'>দুঃখিত ! আপনার কোন অনুরোধ নেই ।</p> :

                                <div>
                                    <HeadingSubHead heading='অনুরোধ সমূহ' />

                                    <table className="max-w-4xl mx-auto mb-4">
                                        {/* heading */}
                                        <thead>
                                            <tr className="border-y">
                                                <th className="text-xs font-semibold font-raleway w-[30%] py-5"></th>
                                                <th className="text-xs font-semibold font-lexend w-[40%] py-5">Name</th>
                                                <th className="text-xs font-semibold font-lexend w-[15%] py-5">Request Status</th>
                                                <th className="text-xs font-semibold font-lexend w-[15%] py-5">Details</th>
                                            </tr>
                                        </thead>

                                        {/* body */}
                                        <tbody className="w-full">
                                            {data.map(got => (
                                                <tr key={got?._id} className="w-full text-xs md:text-base border-b">

                                                    <td className="">
                                                        <img src={got?.to_image || default_img} className='size-[50px] rounded-xl object-cover' alt="" />
                                                    </td>

                                                    <td className="text-center py-4 break-all md:whitespace-nowrap">{got?.to_name}</td>

                                                    <td className={`text-center py-4 ${got?.request_status === 'accepted' ? 'text-green-500' : 'text-red-600'} `}>
                                                        {got?.request_status}
                                                    </td>

                                                    <td className="text-center">
                                                        <Link to={`/user_details/${got?.to}`} className="underline ">Details</Link>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>


                        }
                    </div>
                </div>



            </div>

        </div>
    );
};

export default MyRequests;
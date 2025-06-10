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
            const { data } = await axiosSecure.put(`/request_accept/${id}`);
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
        <div className='pb-5'>
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />

            <img src={minar_top} alt="" className="px-2 pt-14" />

            <div className="px-5 border-x-4 border-b-4 rounded border-[#93733F] -mt-[78px] mx-2 pt-[50px]">
                {
                    data.length === 0 ? <p className='text-center my-32 font-galada text-3xl'>দুঃখিত ! আপনার কোন প্রস্তাব নেই ।</p> :
                        <div className="my-7">
                            <HeadingSubHead heading="প্রস্তাব সমূহ" />

                            <table className="max-w-5xl mx-auto w-full px-5">
                                {/* heading */}
                                <thead>
                                    <tr className="border-y">
                                        <th className="text-xs font-semibold font-raleway w-[20%] py-5">Image</th>
                                        <th className="text-xs font-semibold font-raleway w-[30%] py-5">Name</th>
                                        <th className="text-xs font-semibold font-raleway w-[20%] py-5">Request Status</th>
                                        <th className="text-xs font-semibold font-raleway w-[15%] py-5">Action</th>
                                        <th className="text-xs font-semibold font-raleway w-[15%] py-5"></th>
                                    </tr>
                                </thead>

                                {/* body */}
                                <tbody className="border-b border-black w-full">
                                    {data.map(got => (
                                        <tr key={got?._id} className="w-full text-xs md:text-base border-b bg-[#FFFFFF] rounded-full">

                                            <td className="pl-2 font-semibold py-2">
                                                {/* image exists */}
                                                {
                                                    got.from_image &&
                                                    <img src={got?.from_image} className='size-[50px] rounded-xl object-cover' alt="" />
                                                }

                                                {/* image do not exist and user gender is male */}
                                                {
                                                    !got.from_image && gender === 'male' &&
                                                    < img src={female_default} className='size-[50px] rounded-xl object-cover' alt="" />
                                                }


                                                {/* image do not exist and user gender is female */}
                                                {
                                                    !got.from_image && gender === 'female' &&
                                                    < img src={male_default} className='size-[50px] rounded-xl object-cover' alt="" />
                                                }


                                            </td>

                                            <td className="text-center py-4 break-all md:whitespace-nowrap">{got?.from_name}</td>

                                            <td className={`text-center py-4 ${got?.request_status === 'accepted' ? 'text-green-500' : 'text-red-600'} `}>
                                                {got?.request_status}
                                            </td>

                                            <td>
                                                <div className="gap-2 flex justify-center items-center">
                                                    <button onClick={() => handleAccept(got?._id)} className="text-xl text-green-700"><FaCheck /></button>
                                                    <button onClick={() => handleReject(got?._id)} className="text-xl text-red-700"><RxCross2 /></button>
                                                </div>
                                            </td>

                                            <td className="text-center pr-2">
                                                {
                                                    got?.request_status === 'accepted' ?
                                                        <Link to={`/user_details/${got?.from}`} className="underline ">যোগাযোগ</Link>
                                                        :
                                                        <Link to={`/user_details/${got?.from}`} className="underline ">Details</Link>
                                                }
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>
                }
            </div>

        </div >
    );
};

export default ReceivedRequest;
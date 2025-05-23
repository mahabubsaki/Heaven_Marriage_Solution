import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Loading from "../Loading/Loading";
import React from 'react';
import HeadingSubHead from "../../Components/TextAnimations/HeadingSubHead";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../Components/Shared/Navbar/Navbar";



const ReceivedRequest = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['received_requests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/received_requests/${user?.email}`);
            return data;
        }
    });

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


    const handleAccept = async (id) => {
        await mutateAsync(id);
    };

    if (loading, isLoading) return <Loading />;


    return (
        <div className='px-5'>
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />



            <div className="mt-14">
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
                            <tr key={got?._id} className="w-full text-xs md:text-base border-b">

                                <td className="pl-5 font-semibold">
                                    <img src={got?.from_image} className='size-[50px] rounded-xl object-cover' alt="" />
                                </td>

                                <td className="text-center py-4 break-all md:whitespace-nowrap">{got?.from_name}</td>

                                <td className={`text-center py-4 ${got?.request_status === 'accepted' ? 'text-green-500' : 'text-red-600'} `}>
                                    {got?.request_status}
                                </td>

                                <td><button onClick={() => handleAccept(got?._id)} className="text-blue-500">Accept</button></td>

                                <td className="text-center">
                                    <Link to={`/user_details/${got?.from}`} className="underline ">Details</Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div >
    );
};

export default ReceivedRequest;
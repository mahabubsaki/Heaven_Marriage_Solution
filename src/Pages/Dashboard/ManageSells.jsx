import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Loading from "../Loading/Loading";
import { useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import React from 'react';


const ManageSells = () => {

    const { user, loading } = useAuth();
    const [status, setStatus] = useState('');

    // get all request data
    const axiosSecure = useAxiosSecure();
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['manageSells'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/reqSells');
            return data;
        }
    });


    // update status

    const { mutateAsync } = useMutation({
        mutationFn: async (status) => {
            const { data } = await axiosSecure.put(`/updateStatus`, status);
            return data;
        },
        onSuccess: () => {
            toast.success('Data Updated');
            refetch();
            setStatus('');
        }
    });

    const handleUpdate = async (id) => {
        if (!status) {
            toast.error('select a status');
            return;
        }
        const update = {
            status,
            id
        };
        await mutateAsync(update);
    };


    if (loading || isLoading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto my-8">
            <h1 className="text-4xl text-center border-b py-10">Manage Sells</h1>

            <table className=" w-full my-20">
                {/* heading */}
                <thead>
                    <tr>
                        <th className="text-xs font-semibold font-raleway w-[12.28%]">Product</th>
                        <th className="text-xs font-semibold font-raleway w-[12.28%]">Quantity</th>
                        <th className="text-xs font-semibold font-raleway w-[12.28%]">Buyer Name</th>
                        <th className="text-xs font-semibold font-raleway w-[12.28%]">status</th>
                        <th className="text-xs font-semibold font-raleway w-[12.28%]">Contact</th>
                        <th className="text-xs font-semibold font-raleway w-[12.28%]">action</th>
                    </tr>
                </thead>

                {/* body */}
                <tbody className="w-full">
                    {data.map(got => (
                        <tr key={got?._id} className="w-full text-xs md:text-base">
                            <td className="pl-5">
                                {got?.product_name}
                            </td>
                            <td className="text-center py-4 break-all md:whitespace-nowrap">{got?.product_quantity}</td>
                            <td className="text-center py-4 break-all md:whitespace-nowrap">{got?.buyer_name}</td>
                            <td className={`text-center py-4 
                                        ${got?.status === 'on_process' ? 'text-green-600' : 'text-blue-600'} 
                                        ${got?.status === 'on_request' && 'text-red-700'} `}>{got?.status}</td>
                            <td className="text-center py-4 break-all md:whitespace-nowrap">{got?.buyer_number}</td>
                            <td className="text-center py-4">
                                <select onChange={(e) => setStatus(e.target.value)} className="bg-transparent outline-none">
                                    <option className="bg-[#BEBEBE]" disabled selected>Role</option>
                                    <option className="bg-[#BEBEBE]" value="on_process">Process</option>
                                    <option className="bg-[#BEBEBE]" value="delivered">Delivered</option>
                                </select>
                            </td>
                            <td className="text-center">
                                <button
                                    onClick={() => handleUpdate(got?._id)}
                                    className="font-lexend outline-none underline disabled:cursor-not-allowed">
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default ManageSells;
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import React from 'react';

const Users = () => {

    // get request data
    const axiosSecure = useAxiosSecure();
    const { data = [], refetch } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        }
    });

    // verify users data
    const { mutateAsync } = useMutation({
        mutationFn: async (verifiedData) => {
            const { data } = await axiosSecure.put('/update_user', verifiedData);
            return data;
        },
        onSuccess: () => {
            toast.success('User Updated');
            refetch();
        }
    });
    console.log(data);
    // update user
    const handleUpdate = async (email) => {
        const updatedData = {
            status: 'verified',
            role: 'member',
            form_submitted_by: email
        };
        await mutateAsync(updatedData);
    };


    return (
        <div className=" my-16">
            <h1 className="text-[clamp(25px,2vw,35px)] text-center">Users and request</h1>

            <table className="max-w-5xl mx-auto w-full my-20">
                {/* heading */}
                <thead>
                    <tr className="border-y">
                        <th className="text-xs font-semibold font-raleway w-[20%] py-5">Name</th>
                        <th className="text-xs font-semibold font-raleway w-[20%] py-5">status</th>
                        <th className="text-xs font-semibold font-raleway w-[20%] py-5">transaction status</th>
                        <th className="text-xs font-semibold font-raleway w-[20%] py-5">update</th>
                        <th className="text-xs font-semibold font-raleway w-[20%] py-5">action</th>
                    </tr>
                </thead>

                {/* body */}
                <tbody className="border-b border-black w-full">
                    {data.map(got => (
                        <tr key={got?._id} className="w-full text-xs md:text-base border-b">

                            <td className="pl-5 font-semibold">
                                {got?.name}
                            </td>

                            <td className={`text-center py-4 ${got?.status === 'verified' ? 'text-blue-600' : 'text-red-600'} `}>
                                {got?.status}
                            </td>
                            <td className={`text-center py-4 ${got?.transaction_status
                                === 'verified' ? 'text-blue-600' : 'text-red-600'} `}>
                                {got?.transaction_status
                                }
                            </td>

                            <td className="text-center py-4">
                                <button
                                    onClick={() => handleUpdate(got?.email)}
                                    className="text-blue-700 cursor-pointer">
                                    Verify
                                </button>
                            </td>

                            <td className="text-center">
                                <Link to={`/user_details/${got?.email}`} className="underline ">Details</Link>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>


        </div>
    );
};

export default Users;
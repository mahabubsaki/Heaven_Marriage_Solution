import React from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

const ProposalRequest = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // fetch all proposals
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['allProposals'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all_proposals');
            return data;
        }
    });


    // verify the proposals
    const { mutateAsync } = useMutation({
        mutationFn: async (verify) => {
            const { data } = await axiosSecure.put(`/verify_proposals`, verify);
            return data;
        },
        onSuccess: () => {
            toast.success('Updated');
            refetch();
        }
    });

    const handleVerify = async (email) => {
        const verifyData = {
            status: 'verified',
            email
        };
        await mutateAsync(verifyData);
    };

    if (loading || isLoading) return <Loading />;

    return (
        <div className=" my-16">
            <h1 className="text-[clamp(25px,2vw,35px)] text-center">Proposal Request</h1>

            <table className="max-w-5xl mx-auto w-full my-20">
                {/* heading */}
                <thead>
                    <tr className="border-y">
                        <th className="text-xs font-semibold font-raleway w-[25%] py-5">To</th>
                        <th className="text-xs font-semibold font-raleway w-[25%] py-5">From</th>
                        <th className="text-xs font-semibold font-raleway w-[25%] py-5">update</th>
                        <th className="text-xs font-semibold font-raleway w-[25%] py-5">action</th>
                    </tr>
                </thead>

                {/* body */}
                <tbody className="border-b border-black w-full">
                    {data.map(got => (
                        <tr key={got?._id} className="w-full text-xs md:text-base border-b">

                            <td className="pl-5 font-semibold break-all">
                                {got?.to}
                            </td>

                            <td className={`text-center py-4 break-all`}>
                                {got?.from}
                            </td>

                            <td className="text-center py-4">
                                <button
                                    onClick={() => handleVerify(got?.from)}
                                    className="text-blue-700 cursor-pointer">
                                    Verify
                                </button>
                            </td>

                            <td className="py-5 flex flex-col gap-4 justify-center items-center">
                                <Link to={`/user_details/${got?.to}`} className="underline ">To</Link>
                                <Link to={`/user_details/${got?.from}`} className="underline ">From</Link>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>


        </div>
    );
};

export default ProposalRequest;
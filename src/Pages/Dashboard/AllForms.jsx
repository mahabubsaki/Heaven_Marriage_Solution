import React from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllForms = () => {

    const axiosSecure = useAxiosSecure();

    // fetch all the forms data
    const { data = [], refetch } = useQuery({
        queryKey: ['allForms'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all_forms');
            return data;
        }
    });
    // console.log(data);


    // delete a form
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/delete_form/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('Form Deleted');
            refetch();
        }
    });


    const handleDelete = async (id) => {
        console.log(id);
        mutateAsync(id);
    };



    return (
        <div className='w-full min-h-screen bg-[#c3cedf]'>
            <div className='flex flex-col space-y-6 p-4 w-full mx-auto max-w-[1200px]'>
                <p className='text-2xl pl-2'>Forms</p>
                {
                    data.map((got, idx) => (
                        <div key={idx} className='flex items-center justify-between px-5 py-3 bg-[#c3cedf] shadow-[8px_8px_10px_#aab4c2,-8px_-8px_10px_#dce8f6] text-gray-600 rounded-full'>
                            <p>{got?.member_email}</p>
                            <button onClick={() => handleDelete(got?._id)} className='shadow-[inset_4px_4px_5px_rgba(0,0,0,0.3),4px_4px_8px_rgba(0,0,0,0.1)] rounded-full px-2 py-1'>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllForms;
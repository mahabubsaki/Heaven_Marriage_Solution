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
        <div className='w-full min-h-screen bg-red-500'>
            <div>
                {
                    data.map((got, idx) => (
                        <div key={idx} className='flex w-full bg-white justify-between space-y-5 border-y-2'>
                            <p>{got?.member_email}</p>
                            <button onClick={() => handleDelete(got?._id)}>X</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllForms;
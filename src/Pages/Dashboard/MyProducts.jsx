import React from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import useAuth from '../../Hooks/Auth/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoBag } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';

const MyProducts = () => {

    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth();

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['my_products'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/my_products');
            return data;
        }
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/product_delete/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('Product Deleted');
            refetch();
        }
    });


    const handleDelete = async (id) => {
        await mutateAsync(id);
    };

    if (isLoading || loading) return <Loading />;


    return (
        <div className='max-w-7xl mx-auto'>

            <div className='my-5 px-3'>
                <p className='text-3xl'>My Products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mb-14 place-items-center">
                {data?.map((got) => (
                    <div
                        key={got?._id}
                        className="flex flex-col bg-white rounded p-3 shadow-md h-[350px] w-[250px] relative border border-gray-200"
                    >
                        <button
                            onClick={() => handleDelete(got?._id)}
                            className='absolute text-2xl outline-none p-1 bg-white rounded-full -top-2 -right-2 z-20'> <RxCross2 /> </button>
                        <img
                            src={got?.images[0]}
                            alt=""
                            className="object-cover h-[120px] w-full"
                        />

                        <div className="flex flex-col flex-grow">
                            <p className="text-xs text-orange-500 my-2">{got?.category}</p>
                            <p className=" font-semibold">
                                {got?.name.split(' ').slice(0, 3).join(' ')}
                            </p>
                            <div className="flex bg-slate-100 font-bold w-[60px] rounded">
                                <p className="flex  items-center text-orange-400 border-r border-gray-300 p-1 gap-1">0<FaStar /> </p>
                                <p className="flex items-center px-2">0</p>
                            </div>
                            <p className="text-red-600 font-semibold"> <span className=" font-mina">৳</span>{got?.discountedPrice}</p>
                            <div className="flex gap-3 items-center">
                                <p className="line-through text-gray-400"><span className=" font-mina">৳</span>{got?.price}</p>
                                <p className="flex gap-3 bg-red-500 text-white px-2 rounded-lg">{got?.discount}% OFF</p>
                            </div>

                            <div className="mt-auto flex gap-2">
                                <Link to={`/product/${got?._id}`} className="px-2 bg-[#FC8934] text-center text-white py-1 rounded w-full">
                                    See Product
                                </Link >
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
};

export default MyProducts;
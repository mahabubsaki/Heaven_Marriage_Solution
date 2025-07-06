import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import { IoBag } from 'react-icons/io5';

const OrderedProduct = () => {

    const { buyerEmail } = useParams();
    const axiosSecure = useAxiosSecure();


    // buyer details;
    const { data: buyerDetails = [] } = useQuery({
        queryKey: ['product_orders'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/product_order/${buyerEmail}`);
            return data;
        }
    });


    // orders
    const { data = [] } = useQuery({
        queryKey: ['orderedProduct', buyerEmail],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/ordered_product/${buyerEmail}`);
            return data;
        }
    });

    console.log(buyerDetails);


    return (
        <div className='min-h-screen bg-white px-3'>

            <div className="max-w-md mx-auto bg-gray-200 shadow-lg rounded-2xl p-6 border border-gray-200 my-5">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Buyer Details</h2>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                        <span className="font-medium">Name:</span>
                        <span>{buyerDetails?.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span>{buyerDetails?.buyer_email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Mobile:</span>
                        <span>{buyerDetails?.mobile}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Address:</span>
                        <span>{buyerDetails?.address}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Delivery Area:</span>
                        <span>{buyerDetails?.delivery}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-14 ">
                {data?.map((got) => (
                    <Link
                        to={`/product/${got?._id}`}
                        key={got?._id}
                        className="flex flex-col bg-white rounded p-3 shadow-md h-[350px] w-[165px] overflow-hidden border border-gray-200"
                    >
                        <img
                            src={got?.image}
                            alt=""
                            className="object-cover h-[120px] w-full"
                        />

                        <div className="flex flex-col flex-grow">
                            <p className="text-xs text-orange-500 my-2">{got?.category}</p>
                            <p className=" font-semibold">
                                {got?.product_name}
                            </p>
                            <div>
                                <p>Quantity: {got?.quantity}</p>
                                <p>Pay : {got?.total_price} <span className='font-mina'>৳</span></p>
                                <p>Varient: {got?.variant}</p>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
};

export default OrderedProduct;
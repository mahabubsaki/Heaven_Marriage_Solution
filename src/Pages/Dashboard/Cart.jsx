import { useMutation, useQuery } from '@tanstack/react-query';
import { RxCross2 } from "react-icons/rx";
import toast from 'react-hot-toast';
import { useState } from 'react';
import WhiteButton from '../../Components/Shared/Buttons/WhiteButton';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import useAuth from '../../Hooks/Auth/useAuth';
import Loading from '../Loading/Loading';
import React from 'react';



const Cart = () => {

    const { user, loading } = useAuth();
    const [open, setOpen] = useState(false);

    const axiosSecure = useAxiosSecure();

    // total price
    const { data: cartTotalPrice = [], refetch: totalPriceRefetch } = useQuery({
        queryKey: ['cartDataInfo', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/cartDataInfo/${user?.email}`);
            return data;
        },
    });


    // cart data
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            const { data: product } = await axiosSecure.get(`/cartData/${user?.email}`);
            return product;
        }
    });

    console.log(data, cartTotalPrice);


    // delete cart Item
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/cartData/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('Deleted successfully !');
        }
    });

    const handleDelete = async (id) => {
        await mutateAsync(id);
        refetch();
        totalPriceRefetch();
    };




    if (loading || isLoading) return <Loading />;
    if (data?.length === 0) return <div className='min-h-screen flex items-center justify-center'>
        <h1 className='text-3xl'>Your Cart is Empty</h1>
    </div>;

    return (
        <div>
            <div className='flex flex-col md:flex-row justify-between'>


                {/* left div */}
                <div className='mx-auto max-w-full md:w-2/3 pt-20'>

                    {/* heading div */}
                    <div>
                        <div className="flex mx-10 justify-between py-5  my-5 text-black border-b border-black md:px-10">
                            <h1 className="font-lexend text-xl md:text-3xl font-bold">Shopping Cart</h1>
                            <p className="font-lexend text-xs md:text-base">{data.length} Items</p>
                        </div>
                    </div>



                    {/* table div */}
                    <div className=' max-w-[400px] my-10 px-5 md:p-0 lg:max-w-[800px] mx-auto'>
                        <table className="border-collapse w-full">
                            <thead className="uppercase w-full">
                                <tr className="w-full text-black">
                                    <th className="md:py-4  text-xs font-semibold font-raleway text-left w-[16.6%]">Product</th>
                                    <th className="md:py-4  text-xs font-semibold font-raleway w-[16.6%]"></th>
                                    <th className="md:py-4  text-xs font-semibold font-raleway w-[16.6%]">Quantity</th>
                                    <th className="md:py-4  text-xs font-semibold font-raleway w-[16.6%]">Price</th>
                                    <th className="md:py-4  text-xs font-semibold font-raleway w-[16.6%] md-lg-only">Total</th>
                                    <th className="md:py-4  text-xs font-semibold font-raleway w-[16.6%]">Action</th>
                                </tr>
                            </thead>

                            {data.map((product) => (
                                <tbody key={product._id} className="border-b border-black w-full">
                                    <tr className="w-full text-black">
                                        <td className="py-4 w-[16.6%]">
                                            <div
                                                className="size-10 md:size-20 bg-center bg-cover rounded"
                                                style={{ backgroundImage: `url('${product?.image}')` }}
                                            />
                                        </td>
                                        <td className="py-4 w-[16.6%]">
                                            <div>
                                                <h1 className="font-semibold">{product?.name}</h1>
                                                <p className="text-gray-500">{product?.category}</p>
                                            </div>
                                        </td>
                                        <td className="text-center py-4 w-[16.6%]">{product?.quantity}</td>
                                        <td className="text-center py-4 w-[16.6%]">${product?.price}</td>
                                        <td className="text-center py-4 w-[16.6%] md-lg-only">${product?.totalPrice}</td>
                                        <td className="text-center py-4 text-2xl w-[16.6%]">
                                            <button onClick={() => handleDelete(product?._id)}><RxCross2 /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>


                </div>



                {/* right div */}
                <div className=' w-full md:w-1/3'>

                    <div className="bg-[#262626] text-white w-full p-10 pt-32 items-center md:fixed md:right-0 min-h-screen md:w-[35%]">

                        <div className="w-full md:p-5 lg:p-10">

                            {/* Order Summary */}
                            <div className="border-b pb-5  space-y-5">
                                <h1 className="font-lexend text-xl md:text-3xl font-bold">Order Summary</h1>
                                <p className="font-lexend">Items {data.length}</p>

                                {/* Scrollable Order Items List */}
                                <div className="md:max-h-[500px] flex flex-col w-full justify-between md:overflow-y-scroll space-y-3 px-5">
                                    {data.map((got) => (
                                        <div className="flex justify-between" key={got?._id}>
                                            <p>{got?.name}</p>
                                            <p>{got?.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fixed Bottom Button */}
                            <div className="md:fixed mt-2 md:w-[20%] ">
                                <div className="flex justify-between">
                                    <h1>Total Cost</h1>
                                    <h1>$ {cartTotalPrice?.totalPrice ? cartTotalPrice?.totalPrice : 0}</h1>
                                </div>
                                <div onClick={() => setOpen(!open)} className="w-full mt-10">
                                    <WhiteButton size={240} text='Buy Now' />
                                </div>
                            </div>

                        </div>

                    </div>


                </div>


            </div>
        </div>
    );
};

export default Cart;
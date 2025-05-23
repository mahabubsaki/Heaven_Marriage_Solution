import React, { useState } from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import WhiteButton from '../../Components/Shared/Buttons/WhiteButton';
import BlackButton from '../../Components/Shared/Buttons/BlackButton';
import toast from 'react-hot-toast';
import CloseModal from '../../Components/Shared/Modal/CloseModal';
import BuyModal from '../../Components/Shared/Modal/BuyModal';
import CartModal from '../../Components/Shared/Modal/CartModal';
import { FaMinus, FaPlus } from "react-icons/fa6";

const Product = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { product_id } = useParams();

    const [open, setOpen] = useState(false);
    const [uxModal, setUxModal] = useState(false);
    const [buyModal, setBuyModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // getproduct data
    const { data = [], isLoading } = useQuery({
        queryKey: ['product', product_id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/product/${product_id}`);
            return data;
        }
    });

    // add to cart
    const { mutateAsync } = useMutation({
        mutationFn: async (add) => {
            const { data } = await axiosSecure.post('/cart', add);
            return data;
        },
        onSuccess: () => {
            toast.success('Added Successfully, Check Your Cart !');
        }
    });

    const { image, name, details, price, brand, category, material, waterResistance, warranty, SKU, availability } = data;

    const handleCart = async () => {

        const addCartData = {
            user: user?.email,
            name: name,
            quantity: quantity,
            totalPrice: quantity * price,
            image: image,
            category,
            brand,
            price,
            SKU
        };
        await mutateAsync(addCartData);
        setQuantity(1);
        setOpen(false);
    };

    const handleBuy = () => {
        setBuyModal(true);
    };


    if (loading, isLoading) return <Loading />;



    return (
        <div className=" w-full lg:px-10 pt-[120px] px-5">

            <div className=" border-t-[1px] flex flex-col lg:flex-row border-[#BEBEBE] lg:p-6 md:gap-10 gap-3 ">

                <div className="lg:w-1/2">
                    <div
                        className="w-full h-[180px] rounded-lg bg-cover bg-center"
                        style={{
                            backgroundImage: `url("${image}")`
                        }}
                    />
                </div>


                <div className="md:w-1/2 flex text-black flex-col h-full md:p-7">
                    <h1 className="text-4xl font-marck font-light">{name}</h1>
                    <p className="font-raleway">{details}</p>
                    <p className="font-lexend text-3xl font-extralight my-3">{price}$</p>

                    {/* color div */}
                    <div className="space-y-1">
                        <p className="uppercase font-raleway text-xl">varients:</p>
                        <div className="size-[45px] bg-cover p-3 hover:border bg-center rounded-sm shadow-md"
                            style={{ backgroundImage: `url(${image})` }}>
                        </div>
                    </div>

                    {/* product description div */}
                    <div className="ml-10 my-2">
                        <ul className="capitalize">
                            <li className="list-disc"><span className="font-semibold ">brand:</span> {brand}</li>
                            <li className="list-disc"><span className="font-semibold ">category:</span> {category}</li>
                            <li className="list-disc"><span className="font-semibold ">material:</span> {material}</li>
                            <li className="list-disc"><span className="font-semibold ">durability:</span> {waterResistance}</li>
                            <li className="list-disc"><span className="font-semibold ">warranty:</span> {warranty}</li>
                            <li className="list-disc"><span className="font-semibold ">sku:</span> {SKU}</li>
                            <li className="list-disc"><span className="font-semibold ">available:</span> {availability}</li>
                        </ul>
                    </div>

                    {/* Button div stays at bottom */}
                    <div className="flex gap-5 mb-10 ">

                        <div className="flex gap-5">
                            <span
                                onClick={() => setOpen(true)}
                            >
                                <WhiteButton text='Cart' />
                            </span>

                            <span
                                onClick={() => handleBuy(data)}
                            >
                                <BlackButton text='Buy Now' />
                            </span>
                        </div>

                        {/* pop up modal after the cart adding */}
                        <CloseModal uxModal={uxModal} setUxModal={setUxModal} />


                        {/* cart modal */}
                        <CartModal open={open} setOpen={setOpen}>
                            <div className="mx-auto max-w-2xl space-y-4 ">
                                <h2
                                    className="text-4xl font-bold font-lexend my-5 ">
                                    Buy Now
                                </h2>


                                <table className="w-full border-separate border-spacing-y-5">
                                    <thead>
                                        <tr className="text-left">
                                            <th className="font-extralight text-xl font-raleway">Item</th>
                                            <th className="font-extralight text-xl font-raleway">Name</th>
                                            <th className="font-extralight text-xl font-raleway">Quantity</th>
                                            <th className="font-extralight text-xl font-raleway">Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="text-left">
                                                <div
                                                    className="size-20 bg-center bg-cover"
                                                    style={{ backgroundImage: `url('${image}')` }}
                                                />
                                            </td>
                                            <td className="font-raleway">{name}</td>
                                            <td className="text-left">
                                                <div className="flex justify-start items-center gap-5">
                                                    <button
                                                        className="disabled:cursor-not-allowed"
                                                        disabled={quantity === 0}
                                                        onClick={() => setQuantity(quantity - 1)}
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <p className="text-xl">{quantity}</p>
                                                    <button
                                                        className="disabled:cursor-not-allowed"
                                                        disabled={quantity === 10}
                                                        onClick={() => setQuantity(quantity + 1)}
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-left ">$ {price * quantity}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="w-4/5 border-t-[1px]  border-black " />
                                <div className="flex gap-5 items-center">
                                    <h1 className="font-lexend text-xl">Total</h1>
                                    <p className="text-xl">$ {price * quantity}</p>
                                </div>
                                <div onClick={() => {
                                    handleCart();
                                    setUxModal(true);
                                }}>
                                    <button className="w-full disabled:cursor-not-allowed" disabled={quantity === 0} >
                                        <WhiteButton text="Add" size={226} />
                                    </button>
                                </div>

                            </div>
                        </CartModal>

                    </div>
                </div>

            </div >

        </div>
    );
};

export default Product;
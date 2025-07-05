import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/Axios/useAxiosCommon";
import React from 'react';
import { Link } from "react-router-dom";
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { IoCall, IoReorderThreeSharp } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";

import banner_1 from '/images/shop_5.jpg';
import banner_2 from '/images/shop_6.jpg';
import banner_3 from '/images/shop_7.jpg';
import banner_4 from '/images/shop_8.jpg';
import { FaHome, FaOpencart, FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const AllProducts = () => {
    const axiosCommon = useAxiosCommon();

    const { data = [] } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/products');
            return data;
        }
    });

    return (
        <div className="bg-gray-100">
            <div className="w-screen bg-[#FC8934] flex text-white py-2">
                <p className="w-[300px] mx-auto">আমাদের যেকোনো পন্য অর্ডার করতে কল বা হোয়াটসঅ্যাপ করুন: 01734874385</p>
            </div>

            <div className="max-h-screen overflow-y-auto relative px-3 pb-5">


                {/* bottom fixed menu bar */}
                <div className="fixed bg-white w-full flex justify-evenly bottom-0 left-0">

                    <Link to='/'>
                        <div className="pt-2">
                            <span className="flex flex-col justify-center items-center font-raleway">
                                <FaHome className="text-2xl" /> Home
                            </span>
                        </div>
                    </Link>

                    <Link to='/cart'>
                        <div className="pt-2">
                            <span className="flex flex-col justify-center items-center font-raleway">
                                <FaOpencart className="text-2xl" />Cart
                            </span>
                        </div>
                    </Link>

                    <Link to='/profile'>
                        <div className="pt-2">
                            <span className="flex flex-col justify-center items-center font-raleway">
                                <CgProfile className="text-2xl" />Profile
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="relative flex justify-between items-center my-2 text-[#FC8934]">
                    <div>
                        <IoReorderThreeSharp className="text-3xl text-black" />
                    </div>
                    <div className="flex items-center gap-2 ml-5 md:ml-0">
                        <img src="/images/shop_logo.png" alt="" className="size-[50px] object-cover" />
                        <div>
                            <p className="font-bold">Falah</p>
                            <p className="font-bold">Bazar</p>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <FaMagnifyingGlass className="text-2xl" />
                        <IoBagOutline className="text-2xl" />
                    </div>
                </div>

                {/* banner */}
                <div className="w-[85dvw] mx-auto h-[25dvh] md:h-[100dvh] my-1 md:min-h-screen">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        modules={[Autoplay]}
                        className="w-full rounded-xl h-full"
                    >
                        <SwiperSlide>
                            <img src={banner_1} alt="1" loading='lazy' className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={banner_2} alt="2" loading='lazy' className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={banner_3} alt="2" loading='lazy' className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={banner_4} alt="2" loading='lazy' className="w-full h-full object-cover" />
                        </SwiperSlide>
                    </Swiper>
                </div>


                {/* product card section */}
                <div className="">
                    <p className="font-bold text-xl my-4">সকল প্রডাক্ট</p>
                    <div className="grid grid-cols-2 gap-3 mb-14">
                        {data?.map((got) => (
                            <Link
                                to={`/product/${got?._id}`}
                                key={got?._id}
                                className="flex flex-col bg-white rounded p-3 shadow-md h-[350px] w-[165px] overflow-hidden border border-gray-200"
                            >
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
                                        <button className="p-2 border border-[#FC8934] text-[#FC8934] rounded-md"><IoBag /></button>
                                        <button className="px-2 bg-[#FC8934] text-white py-1 rounded w-full">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>


            </div>




        </div>
    );
};

export default AllProducts;
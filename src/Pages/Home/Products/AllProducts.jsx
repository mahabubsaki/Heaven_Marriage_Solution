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
import { FaHome, FaOpencart } from "react-icons/fa";
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
        <div className="">
            <div className="w-screen bg-[#FC8934] flex text-white py-2">
                <p className="w-[300px] mx-auto">আমাদের যেকোনো পন্য অর্ডার করতে কল বা হোয়াটসঅ্যাপ করুন: 01734874385</p>
            </div>

            <div className="max-h-screen overflow-y-auto relative px-5 pb-5">


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

                <div className="">
                    <p className="font-bold text-xl mt-2">Products:</p>
                    <div className="grid grid-cols-2 gap-5 mb-14">
                        {data?.map((got) => (
                            <Link to={`/product/${got?._id}`}
                                key={got?._id}
                                className="flex flex-col items-center rounded p-3 shadow-md h-[250px] w-[150px] overflow-hidden border border-gray-200"
                            >
                                <img
                                    src={got?.image}
                                    alt=""
                                    className="object-cover h-[120px] w-full"
                                />
                                <p className="text-center h-[30px]">
                                    {got?.name.length > 8 ? got?.name.slice(0, 11) + "..." : got?.name}
                                </p>
                                <p className="">Tk {got?.price}</p>
                                <button className="px-2 bg-[#FC8934] text-white grow py-1 rounded w-full">Buy Now</button>
                            </Link>
                        ))}
                    </div>
                </div>


            </div>




        </div>
    );
};

export default AllProducts;